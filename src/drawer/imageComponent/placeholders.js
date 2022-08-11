//const imagePrefixCloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_400/'
const imagePrefixImageKit = 'https://ik.imagekit.io/mumrjdehaou/'

const placeholder = 'https://www.mavi.com/_ui/responsive/theme-mavi/images/placeholder.jpg'
const placeholders = {
    defacto: { logo: { image: './logo/defacto.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://dfcdn.defacto.com.tr/AssetsV2/dist/img/placeholders/placeholder.svg', imageHost: 'https://dfcdn.defacto.com.tr/', detailHost: 'https://www.defacto.com.tr/', postfix: '', imgPostFix: '' },
    koton: { logo: { image: './logo/koton.webp', width: '80', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder: 'http://img-kotonw.mncdn.com/_ui/shared/images/koton-loading-gif2.gif', imageHost: 'https://ktnimg2.mncdn.com/', detailHost: 'https://www.koton.com/', postfix: '&listName=Kad%C4%B1n%20Giyim%20Modelleri%20I%20Koton', imgPostFix: '?tr=w-400' },
    boyner: { logo: { image: "./logo/boyner.svg", width: '29%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://statics.boyner.com.tr/assets/images/loading-icon.gif', imageHost: 'https://statics.boyner.com.tr/mnresize/325/451/productimages/', detailHost: 'https://www.boyner.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
    ipekyol: { logo: { image: './logo/ipekyol.svg', width: '23%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img2-ipekyol.mncdn.com/mnresize/', detailHost: 'https://www.ipekyol.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
    machka: { logo: { image: './logo/machka.svg', width: '35%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://storage.machka.com.tr/Machka/frontend/images/logo-emblem.svg', imageHost: 'https://image.machka.com.tr/unsafe/660x0/10.116.1.50:8000//Machka/products/', detailHost: 'https://www.machka.com.tr/urun/', postfix: '', imgPostFix: '' },
    lcwaikiki: { logo: { image: './logo/lcwaikiki.svg', width: '80', height: 'auto' }, imagePrefix:imagePrefixImageKit , placeholder: "./placeholder-img/lcwaikiki.svg", imageHost: 'https://img-lcwaikiki.mncdn.com/', detailHost: 'https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/', postfix: '', imgPostFix: '' },
    mavi: { logo: { image: './logo/mavi.svg', width: '18%', height: 10 }, imagePrefix: imagePrefixImageKit, placeholder: 'https://www.mavi.com/_ui/responsive/theme-mavi/images/placeholder.jpg', imageHost: 'https://sky-static.mavi.com/sys-master/maviTrImages/', detailHost: 'https://www.mavi.com/', postfix: '', imgPostFix: '?tr=w-400' },
    adl: { logo: { width: 'auto', heigth: '20', image: './logo/adl.jpg' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://www.mavi.com/_ui/responsive/theme-mavi/images/placeholder.jpg', imageHost: 'https://lmb-adl.akinoncdn.com/products/', detailHost: 'https://www.adl.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
    penti: { logo: { image: './logo/penti.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://file-penti.mncdn.com/mnresize/', detailHost: 'https://www.penti.com/tr/', postfix: '', imgPostFix: '' },
    roman: { logo: { image: './logo/roman.png', width: '80', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://romancdn.sysrun.net/Content/ProductImage/Original/', detailHost: 'https://www.roman.com.tr/detay/', postfix: '', imgPostFix: '' },
    beymen: { logo: { image: './logo/beymen.svg', width: '45%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://cdn.beymen.com/assets/desktop/img/beymen-placeholder.svg', imageHost: 'https://cdn.beymen.com/mnresize/', detailHost: 'https://www.beymen.com/', postfix: '', imgPostFix: '?tr=w-400' },
    vakko: { logo: { image: './logo/vakko.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://vakko.akinoncdn.com/products/', detailHost: 'https://www.vakko.com/', postfix: '', imgPostFix: '?tr=w-400' },
    zara: { logo: { image: './logo/zara.jpg', width: '15%', height: '' }, imagePrefix: '', placeholder, imageHost: 'https://static.zara.net/photos/', detailHost: 'https://www.zara.com/tr/tr/', postfix: '', imgPostFix: ''},
    twist: { logo: { image: './logo/twist.svg', width: '15%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img2-twist.mncdn.com/mnresize/800/-//Twist/products/', detailHost: 'https://www.twist.com.tr/', postfix: '', imgPostFix: ''},
    hm: { logo: { image: './logo/hm.jpg', width: '30', height: 'auto' }, imagePrefix: '', placeholder:'./placeholder-img/h&m.webp', imageHost: 'http://lp2.hm.com/hmgoepprod?set=source[', detailHost: 'https://www2.hm.com/tr_tr/', postfix: '', imgPostFix: '' },
    adidas: { logo: { image: './logo/adidas.jpg', width: '28%', height: '' }, imagePrefix: '', placeholder:'./placeholder-img/adidas.svg', imageHost: 'https://assets.adidas.com/images/', detailHost: 'https://www.adidas.com.tr/tr/', postfix: '', imgPostFix: '' },
    baqa: { logo: { image: './logo/baqa.jpg', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.baqa.com.tr', detailHost: 'https://www.baqa.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    beyyoglu: { logo: { image: './logo/beyyoglu.svg', width: '45%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://beyyoglu.akinoncdn.com/products/', detailHost: 'https://www.beyyoglu.com/', postfix: '', imgPostFix:'?tr=w-400' },
    dogo: { logo: { image: './logo/dogo.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.dogostore.com/', detailHost: 'https://www.dogostore.com/', postfix: '', imgPostFix:'?tr=w-400' },
    dilvin: { logo: { image: './logo/dilvin.png', width: '50', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://kvyfm6d9dll6.merlincdn.net/productimages/', detailHost: 'https://www.dilvin.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    dagi: { logo: { image: './logo/dagi.png', width: '50', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img-dagi.mncdn.com/mnpadding/', detailHost: 'https://www.dagi.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    colins: { logo: { image: './logo/colins.png', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img-colinstr.mncdn.com/mnresize/', detailHost: 'https://www.colins.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    butigo: { logo: { image: './logo/butigo.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://floimages.mncdn.com/mnpadding/', detailHost: 'https://www.butigo.com.tr', postfix: '', imgPostFix:'?tr=w-400' },
    faststep: { logo: { image: './logo/faststep.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.faststep.com.tr?img=catalog/urunresim/', detailHost: 'https://www.faststep.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    fullamoda: { logo: { image: './logo/fullamoda.webp', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://images.farktorcdn.com/img/', detailHost: 'https://www.fullamoda.com/', postfix: '', imgPostFix:'?tr=w-400' },
    gizia: { logo: { image: './logo/gizia.svg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://pic.gizia.com/', detailHost: 'https://www.gizia.com/', postfix: '', imgPostFix:'?tr=w-400' },
    vitrin: { logo: { image: './logo/vitrin.png', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.vitrin.com.tr/', detailHost: 'https://www.vitrin.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    xint: { logo: { image: './logo/xint.png', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://xint.com.tr/', detailHost: 'https://xint.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    tozlu: { logo: { image: './logo/tozlu.svg', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img.tozlu.com/', detailHost: 'https://www.tozlu.com/', postfix: '', imgPostFix:'?tr=w-400' },

    quzu: { logo: { image: './logo/quzu.webp', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.quzu.com.tr/', detailHost: 'https://www.quzu.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    saygigiyim: { logo: { image: './logo/saygigiyim.webp', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.saygigiyim.com/', detailHost: 'https://www.saygigiyim.com/', postfix: '', imgPostFix:'?tr=w-400' },
    manuka: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.manuka.com.tr/', detailHost: 'https://www.manuka.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },

    kikiriki: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.vebigo.com/', detailHost: 'https://tr.kikiriki.com/', postfix: '', imgPostFix:'?tr=w-400' },
    jimmykey: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.sorsware.com/', detailHost: 'https://www.jimmykey.com/tr/', postfix: '', imgPostFix:'?tr=w-400' },
    perspective: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.sorsware.com/', detailHost: 'https://www.perspective.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    mango: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://st.mngbcn.com/', detailHost: 'https://shop.mango.com/', postfix: '', imgPostFix:'?tr=w-400' },
    olegcassini: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.olegcassini.com.tr/', detailHost: 'https://www.olegcassini.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },
    addax: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn2.sorsware.com/', detailHost: 'https://www.addax.com.tr/', postfix: '', imgPostFix:'?tr=w-400' },

}

export default placeholders