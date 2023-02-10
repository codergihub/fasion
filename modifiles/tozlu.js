
const Apify = require('apify');
async function handler(page, context) {
    const { request: { userData: {  } } } = context

    const url = await page.url()

    await page.waitForSelector('#ProductPageProductList')
    const dataset = await Apify.openDataset();
    // onetrust-accept-btn-handler

    const acceptcookies = await page.$('.seg-popup-close')
    if (acceptcookies) {
        await page.click('.seg-popup-close')
    }


    return new Promise((resolve, reject) => {
        try {

                let totalProducts = 0
                let collected = 0
                let inv = setInterval(async () => {

            
                console.log('collected', collected)

                if (totalProducts>0 && totalProducts === collected) {
                 
                    clearInterval(inv)
                    debugger
                    const { items } = await dataset.getData()
                    const data = items.filter(f => f.products).map(p => [...p.products]).flat().map(m => {
                 
                         return {
                           title: 'tozlu ' +m.name.replace(/İ/g,'i').toLowerCase(),
                           priceNew: m.productSellPriceStr.replace('TL','').trim(),//.replace('.','').replace(',','.').trim() ,
                           imageUrl: ('https://img.tozlu.com/Uploads/UrunResimleri/thumb/'+m.imageName).replace('https://img.tozlu.com/',''),
                           link:m.defaultUrl,
                           timestamp: Date.now(),
                           marka: 'tozlu',

                         }
                       })
                       console.log('data length_____', data.length, 'url:', url)

                 
                    return resolve(data.map(m=>{return {...m,title:m.title+" _"+process.env.GENDER }}))

                } else {
                    await manualScroll(page)
                     totalProducts = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerHTML.replace(/[^\d]/g, '')))
                     collected = await page.evaluate(() => document.querySelectorAll('.ItemOrj.col-4').length)
    
                }

            }, 100)
        } catch (error) {
            debugger
            return reject(error)
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