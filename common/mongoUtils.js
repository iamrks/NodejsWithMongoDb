var mongoose = require('mongoose');
var mongoosedb = require('../db/mongoosedb');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var Index = new Schema({
    _id: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number,
        required: true,
        default: 1
    }
});

Index.plugin(uniqueValidator);

var IndexModel = mongoose.model('Index', Index);

module.exports = {
    getNextIndex: function (oIndex, callback) {
        IndexModel.findByIdAndUpdate(oIndex, { $inc: { seq: 1 } }, { upsert: true }, function (err, seqRec) {
            if (!err) {
                return callback(null, (seqRec || {}).seq || 1);
            }
            else {
                return callback(err);
            }
        });
    },
    resetIndex: function (oIndex, callback) {
        var initialVal = 1;
        IndexModel.findByIdAndUpdate(oIndex, { $set: { seq: initialVal } }, function (err, seqRec) {
            if (!err) {
                return callback(null, (seqRec || {}).seq);
            }
            else {
                return callback(err);
            }
        });
    }
};