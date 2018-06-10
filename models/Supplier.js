const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for suppliers
let supplier = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  prefix: {
    type: String
  },
  phone: {
    type: String
  },
  groups: {
    type: Array
  }
},{
    collection: 'suppliers'
});

module.exports = mongoose.model('Supplier', supplier);