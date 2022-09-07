
async function handler(page, context) {
    const { request: { userData: { subcategory, category, node } } } = context

    const url = await page.url()

    await page.waitForSelector('.products-listing.small')
    // onetrust-accept-btn-handler

    const acceptcookies = await page.$('#onetrust-accept-btn-handler')
    if (acceptcookies) {
        await page.click('#onetrust-accept-btn-handler')
    }

    return new Promise((resolve, reject) => {
        try {
            let inv = setInterval(async () => {
                // const { loaded, remained } = await page.$eval('.load-more-heading', el => {
                //     return { loaded: parseInt(el.getAttribute('data-items-shown')), remained: parseInt(el.getAttribute('data-total')) }
                // })
                const nextPageExists = await page.evaluate(() => document.querySelector('.button.js-load-more') && document.querySelector('.button.js-load-more').classList.contains('hidden') === false)

                if (nextPageExists === false) {

                    await page.click('.button.js-load-more')
                    await manualScroll(page)

                } else {

                    clearInterval(inv)
                    const data = await page.$$eval('.product-item', (productCards, _subcategory, _category, _node) => {
                        return productCards.map(productCard => {
                            const priceNew = productCard.querySelector('.price.regular').innerHTML.replace('TL', '').trim()
                            const longlink = productCard.querySelector('.item-heading a').href
                            const link = longlink.substring(longlink.indexOf("https://www2.hm.com/tr_tr/") + 26)
                            const longImgUrl = productCard.querySelector('[data-src]').getAttribute('data-src')
                            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("//lp2.hm.com/hmgoepprod?set=source[") + 35)
                            const title = productCard.querySelector('.item-heading a').textContent.replace(/[\n]/g, '').trim()

                            return {
                                title: 'hm ' + title.replace(/İ/g, 'i').toLowerCase(),
                                priceNew: priceNew.replace('&nbsp;', '.'),//:priceNew.replace('.','').replace(',','.').trim(),
                                imageUrl: imageUrlshort,
                                link,
                                timestamp: Date.now(),
                                marka: 'hm',
                                //   subcategory: _subcategory,
                                category: _category,
                                node: _node
                            }
                        })
                    }, subcategory, category, node)
                    console.log('data length_____', data.length, 'url:', url)

                    const withSub = data.map(m => {
                        const { title } = m
                        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
                        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length - 1]
                        debugger
                        return { ...m, subcategory: subcat }
                    })

                    return resolve(withSub)

                }

            }, 3000)
        } catch (error) {
            console.log('err', error)
            return resolve([])
        }
    })
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