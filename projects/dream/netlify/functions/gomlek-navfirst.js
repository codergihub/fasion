

const { netlifyNavHandler } = require('../../netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'gomlek', keyOrder: '0' })
}

