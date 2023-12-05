const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    boss: {
        type: String,
        required: false
    },
    version: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false,
        default: ''
    },
},{
    timestamps: true
});

var Employees = mongoose.model('Employee', employeeSchema);

module.exports = Employees;