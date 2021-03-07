const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    isCondition: {type: Boolean, default: false}, //complete / not complete
    dateEx: {type: String, default: null},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Todo', schema)