var mongoose = require('mongoose');

var imgUrls = new mongoose.Schema({
    imgUrl:{type:String}
},{
    timestamps: true
});

module.exports = imgUrls;
