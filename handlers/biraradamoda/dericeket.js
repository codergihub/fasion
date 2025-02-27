

async function handler(page, context) {
    const { request: { userData: { } } } = context

    const url = await page.url()

    await page.waitForSelector('#ProductPageProductList')


    const data = await page.$$eval('.productItem', (productCards) => {
        return productCards.map(document => {

            const imageUrl = document.querySelector('.detailUrl [data-original]').getAttribute('data-original')
            const title = document.querySelector('.detailUrl a[title]').getAttribute('title').trim()
            const priceNew = document.querySelector('.discountPrice span').innerText.replace('₺', '')
            const longlink = document.querySelector('.detailUrl a[title]').href
            const link = longlink.substring(longlink.indexOf('https://www.dericeket.com.tr/') + 29)
            const longImgUrl = imageUrl && 'https:' + imageUrl.substring(imageUrl.lastIndexOf('//'), imageUrl.lastIndexOf('.jpg') + 4)
            const imageUrlshort = imageUrl && longImgUrl.substring(longImgUrl.indexOf('https://static.ticimax.cloud/') + 29)

            return {
                title: 'dericeket ' + title.replace(/İ/g,'i').toLowerCase(),
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'dericeket',
            }
        }).filter(f => f.imageUrl && f.title.length > 5)
    })

    console.log('data length_____', data.length, 'url:', url,process.env.GENDER)


    console.log("process.env.GENDER ")
    const mapgender = data.map((m) => {
        return { ...m, title: m.title + " _" + process.env.GENDER }
    })

debugger
    return mapgender
}

async function getUrls(page) {
    const url = await page.url()
    await page.waitForSelector('.FiltrelemeUrunAdet span')
    const productCount = await page.$eval('.FiltrelemeUrunAdet span', element => parseInt(element.innerText.replace(/[^\d]/g, '')))
    const totalPages = Math.ceil(productCount / 20)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {



        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }