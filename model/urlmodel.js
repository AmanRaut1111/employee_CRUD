const mongoose = require('mongoose')



const UrlSchema = mongoose.Schema({
    shortId: { type: String,unique:true },
    redirectUrl: { type: String, require: true, required: true, },
    visitHistory:[{ timestamp:{type:Number} }]
}, { timestamps: true })

module.exports = mongoose.model('url', UrlSchema)
