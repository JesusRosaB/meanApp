var moongose = require('mongoose');

var meanSchema = mongoose.Schema({
    name: { type: String},
    address: { type: String}
});

module.exports=moongose.model('mean', meanSchema);