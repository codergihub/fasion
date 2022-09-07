
async function handler(page, context) {
    const { request: { userData: { subcategory, category,node } } } = context

    const url = await page.url()

    await page.waitForSelector('.owl-stage')
  //  await autoScroll(page)

    const data = await page.$$eval('.product', (productCards, _subcategory, _category,_node) => {
        return productCards.map(productCard => {

            const title = productCard.querySelector('.dl-event')? productCard.querySelector('.dl-event').getAttribute('title'): productCard.querySelector('.image-hover.hover-nav a').getAttribute('title')
            const img= productCard.querySelector('.dl-event img')? productCard.querySelector('.dl-event img').getAttribute('data-src'):productCard.querySelector('.image-hover.hover-nav a img').src
            const priceNew =productCard.querySelector('.price-sales') ?productCard.querySelector('.price-sales').innerHTML.replace('TL','').trim():(productCard.querySelector('.camp-price') ? productCard.querySelector('.camp-price').innerHTML.replace('TL','').trim():null)
            const link = productCard.querySelector('.dl-event')? productCard.querySelector('.dl-event').href:productCard.querySelector('.image-hover.hover-nav a').href

            return {
                title: 'dilvin '+title.replace(/İ/g,'i').toLowerCase(),
                priceNew,//:priceNew.replace(',','.'),
                imageUrl: img.substring(img.indexOf('https://kvyfm6d9dll6.merlincdn.net/productimages/')+49),
                link:link.substring(link.indexOf('https://www.dilvin.com.tr/')+26),
                timestamp: Date.now(),
                marka: 'dilvin',
               // subcategory: _subcategory,
                category: _category,
                node: _node
            }
        }).filter(f => f.priceNew !== null)
    }, subcategory, category,node)

    console.log('data length_____', data.length, 'url:', url)

    debugger;
    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length-1]
    
        return { ...m, subcategory: subcat }
    })
    return withSub
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
            }, 150);
        });
    });
}
async function getUrls(page) {
    const url = await page.url()
    const nextPageExists = await page.$('.pagination .last')
    const pageUrls = []
    if(nextPageExists){
   
        const totalPages = await page.$eval('.pagination .last', element => parseInt(element.href.substring( element.href.lastIndexOf('=')+1)))
        debugger;
        for (let i = 2; i <= totalPages; i++) {
            pageUrls.push(`${url}?rpg=` + i)
    
        }
    }


    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }