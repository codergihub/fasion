

const Apify = require('apify');
async function handler(page, context) {
    const { request: { userData: { subcategory, category, start, opts,node } } } = context
    debugger;


    const url = await page.url()

    debugger;

    await page.waitForSelector('#katalog')
    await autoScroll(page);
    const dataset = await Apify.openDataset();
    const { items } = await dataset.getData()
    debugger
    const data = await page.$$eval('.productItem', (productCards, _subcategory, _category, _opts,_node) => {
        return productCards.map(productCard => {
            const priceNew = productCard.querySelector('.currentPrice').innerHTML.replace('TL', '').replace(/\n/g,'')
            const longlink = productCard.querySelector('.proRowName a[title]').href
            const link = longlink.substring(longlink.indexOf("https://www.olegcassini.com.tr/") + 31)
             const longImgUrl = productCard.querySelector(".imgInner img").src
             const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://cdn.olegcassini.com.tr/") + 31)
            const title = productCard.querySelector('.proRowName a[title]').getAttribute('title')
            return {
                title: 'olegcassini ' + title.replace(/İ/g,'i').toLowerCase() + (_opts.keyword ? (title.toLowerCase().includes(_opts.keyword) ? '' : ' ' + _opts.keyword) : ''),

                priceNew,

               imageUrl: imageUrlshort,
              link,

                timestamp: Date.now(),

                marka: 'olegcassini',
             //   subcategory: _subcategory,
                category: _category,
                node: _node


            }
        })
    }, subcategory, category, opts,node)



    //----------

    console.log('data length_____', data.length, 'url:', url)



    debugger;
    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length-1]
        debugger
        return { ...m, subcategory: subcat }
    })
    return withSub
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}

async function autoScroll(page) {
    await page.evaluate(async () => {


        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            let inc = 0
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;
                inc = inc + 1
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });
}
module.exports = { handler, getUrls }

