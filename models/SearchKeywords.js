var mongoose = require('mongoose');

var searchKeyword = new mongoose.Schema({
    searchKeyword:{type:String},
    updatedTag:{type:String}
},{
    timestamps: true
});

module.exports = searchKeyword;
