
require('dotenv').config()

const { getGoogleToken } = require('./google/google.oauth')
const fs = require('fs')
const { getSheetValues, appendSheetValues } = require('./google.sheet.js')
const makeDir = require('make-dir');
const Apify = require('apify');

var _ = require('lodash');
Apify.main(async () => {
    await Apify.openDataset();

    const { utils: { log } } = Apify;
    const requestQueue = await Apify.openRequestQueue();
    const marka = process.env.marka// process.env.START_URL.match(/(?<=www.).*(?=.com)/g)[0]
    const { urls } = require(`./urls/${marka}`)

    for (let obj of urls) {

        const { url, category, subcategory, opts, node } = obj

        await requestQueue.addRequest({ url, userData: { start: true, category, subcategory, opts, node } })

    }



    const productsDataset = await Apify.openDataset(`products`);



    process.env.dataLength = 0
    const handlePageFunction = async (context) => {

        const { page, request: { userData: { start, subcategory, category, opts, node } } } = context

        const marka = process.env.marka
        const { handler, getUrls } = require(`./handlers/${process.env.marka}`);
        const { pageUrls, productCount } = await getUrls(page)
        process.env.productCount = productCount

        if (start) {
            let order = 1
            for (let url of pageUrls) {
                if (pageUrls.length === order) {
                    requestQueue.addRequest({ url, userData: { start: false, subcategory, category, opts, node } })
                } else {
                    requestQueue.addRequest({ url, userData: { start: false, subcategory, category, opts, node } })
                }
                ++order;
            }
        }

        const dataCollected = await handler(page, context)



        await productsDataset.pushData(dataCollected)

        process.env.dataLength = parseInt(process.env.dataLength) + dataCollected.length

        console.log('total collected', process.env.dataLength)
    }

    const crawler = new Apify.PuppeteerCrawler({
        // requestList,
        requestQueue,
        maxConcurrency: parseInt(process.env.MAX_CONCURRENCY) || 1,
        handlePageTimeoutSecs: 600,
        // maxRequestRetries:4,
        // navigationTimeoutSecs:120,
        launchContext: {
            // Chrome with stealth should work for most websites.
            // If it doesn't, feel free to remove this.
            // useChrome: true,
            launchOptions: {
                headless: process.env.HEADLESS === 'true' ? true : false, args: ['--no-sandbox', '--disable-setuid-sandbox', "--disable-web-security",
                    `--window-size=1200,1250`,
                    "--allow-insecure-localhost",
                    //  "--user-data-dir=/tmp/foo",
                    "--ignore-certificate-errors",
                    "--unsafely-treat-insecure-origin-as-secure=https://localhost:8888",
                    '--disable-gpu-rasterization',
                    '--disable-low-res-tiling',
                    '--disable-skia-runtime-opts',
                    '--disable-yuv420-biplanar',
                    '--disable-site-isolation-trials'

                ]
            }

        },
        handlePageFunction,
        //  navigationTimeoutSecs:120,
        preNavigationHooks: [
            async (crawlingContext, gotoOptions) => {
                const base64Data = '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'
                const buffer = Buffer.from(base64Data, 'base64');
                const { page } = crawlingContext;

                await page.setDefaultNavigationTimeout(0);
                await page.setRequestInterception(true);
                page.on('request', req => {
                    const resourceType = req.resourceType();

                    if (resourceType === 'image' || (resourceType === 'fetch' && req._url.includes('.jpg'))) {
                        req.respond({
                            status: 200,
                            contentType: 'image/jpeg',
                            body: buffer
                        });


                    } else {
                        req.continue();
                    }
                });
                page.on('response', async response => {
                    const request = response.request();

                    // if (request.url().includes('https://shop.mango.com/services/productlist/products')) {
                    //     const json = await response.json();
                    //     const _url = response._url
                    //     console.log('JSON_url---------------------------------------------------------', _url)

                    //     await Apify.pushData(json);

                    // }

                    const status = response.status()
                    if (status === 200) {
                        try {
                            const text = await response.text()
                            if (isJsonString(text)) {


                                const json = JSON.parse(text);
                                if (Array.isArray(json)) {

                                    await Apify.pushData({ arr: json });
                                    //   response.continue();

                                } else {

                                    await Apify.pushData(json);
                                    //   response.continue();
                                }



                            }
                        } catch (error) {

                        }

                    }


                })
                function isJsonString(str) {
                    try {
                        JSON.parse(str);
                    } catch (e) {
                        return false;
                    }
                    return true;
                }
            },
        ],
        handleFailedRequestFunction: async ({ request: { errorMessages, url, userData: { gender, start } } }) => {
            const google_access_token1 = await getGoogleToken()
            await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '1IeaYAURMnrbZAsQA_NO_LA_y_qq8MmwxjSo854vz5YM', range: 'ERROR!A:B', values: [[url, errorMessages[0].substring(0, 150), gender, start]] })


        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    const { items: productItems } = await productsDataset.getData();


    // await makeDir('data');

    if (productItems.length > 0) {
        const productItemsWithoutDublicate = uniqify(productItems, 'imageUrl')
        const groupBySubcategory = groupBy(productItemsWithoutDublicate, 'subcategory')
        for (let subcategory in groupBySubcategory) {
            debugger
            const products = groupBySubcategory[subcategory]
            debugger
            const groupByProject = groupBy(products, 'node')
            for (let project in groupByProject) {
                debugger
                const data = groupByProject[project]
                for (let d of data) {
                    const id = d.imageUrl.replace(/[/]/g, '-').replace(/[.jpg]/g, '')
                    await makeDir(`projects/${project}/data/${marka}/${subcategory}/${marka}`)
                    const exists = fs.existsSync(`projects/${project}/data/${marka}/${subcategory}/${marka}/${id}.json`)
                    if (exists) {
                        const obj = JSON.parse(fs.readFileSync(`projects/${project}/data/${marka}/${subcategory}/${marka}/${id}.json`))
                        if (_.isEqual(obj, d) === false) {
                            fs.unlinkSync(`projects/${project}/data/${marka}/${subcategory}/${marka}/${id}.json`)
                            fs.appendFileSync(`projects/${project}/data/${marka}/${subcategory}/${marka}/${id}.json`, JSON.stringify(d));
                        }
                    } else {
                        fs.unlinkSync(`projects/${project}/data/${marka}/${subcategory}/${marka}/${id}.json`)
                    }
                }
                debugger
            }
        }
    }
    else {
        console.log('UNSUCCESSFUL DATA COLLECTION.......')
    }
    console.log('Crawl finished.');
});


const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);




var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};