const { formatMoney } = require('accounting-js')
async function handler(page, context) {

    try {

        const { request: { userData: {  } } } = context

        const url = await page.url()

        await page.waitForSelector('.list-content')

        //
        await manualScroll(page)

        const acceptcookies = await page.$('#personaWelcomePopupCloseBtn')
        if (acceptcookies) {
            await page.click('#personaWelcomePopupCloseBtn')
        }
        return await new Promise((resolve, reject) => {
            try {
                let pause = false
                let inv = setInterval(async () => {
                    console.log('pause', pause)
                    if (pause === false) {

                        const collected = await page.evaluate(() => document.querySelectorAll('.product-item-wrapper').length)

                        console.log('collected', collected)

                        const loadmorebtn = await page.$eval('.load-more-button', (element) => element.classList.contains('hidden'))
                        debugger
                        if (loadmorebtn === false) {
                            debugger
                            await page.click('.load-more-button')
                            await manualScroll(page)
                        }
                        else {
                            pause = true
                           // clearInterval(inv)
                            debugger
                            const data = await page.$$eval('.product-item-wrapper', (productCards, _subcategory, _category, _opts, _node) => {
                                return productCards.map(productCard => {
                                    const priceNew = productCard.querySelector(".product-sale-price") ? productCard.querySelector(".product-sale-price").textContent.replace(/\n/g, '').trim().replace('₺', '').replace('TL', '').trim() : productCard.outerHTML
                                    const longlink = productCard.querySelector('.product-name a') ? productCard.querySelector('.product-name a').href : productCard.outerHTML
                                    const link = longlink.substring(longlink.indexOf("https://www.desa.com.tr/") + 24)
                                    const longImgUrl = productCard.querySelector('[data-src]') ? productCard.querySelector('[data-src]').getAttribute('data-src') : productCard.outerHTML
                                    const imageUrlshort = longImgUrl && longImgUrl.substring(longImgUrl.indexOf('https://cdn-ayae.akinon.net/') + 28)
                                    const title = productCard.querySelector(".product-name a") ? productCard.querySelector(".product-name a").innerHTML : productCard.outerHTML
                                    return {
                                        title: 'desa ' + title.replace(/İ/g,'i').toLowerCase(),//,+ (_opts.keyword ? (title.toLowerCase().includes(_opts.keyword) ? '' : ' ' + _opts.keyword) : ''),
                                        priceNew,
                                        imageUrl: imageUrlshort,
                                        link,
                                        timestamp: Date.now(),
                                        marka: 'desa',

                                    }
                                }).filter(f => f.imageUrl !== null)
                            })


                            console.log('data length_____', data.length, 'url:', url)
                            debugger
                   


                            resolve(data.map((m) => {
                                return { ...m, priceNew: formatMoney(parseFloat(m.priceNew), { symbol: "", precision: 2, thousand: ".", decimal: "," }) }
                            }).map(m=>{return {...m,title:m.title+" _"+process.env.GENDER }}))
                            clearInterval(inv)

                        }
                    }
                }, 150)

            } catch (error) {
                debugger
                console.log('error 1', error)
               reject(error)
            }
        })

    } catch (error) {
        console.log('error 2', error)

    }
}





async function manualScroll(page) {
    await page.evaluate(async () => {
        var totalHeight = 0;
        var distance = 100;
        let inc = 0
        window.scrollBy(0, distance);
        totalHeight += distance;
        inc = inc + 1
    });
}

async function getUrls(page) {

    const pageUrls = []



    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }