// supplier.route.js

const express = require('express');
const app = express();
const supplierRoutes = express.Router();

// Require Supplier, Group model in our routes module
let Supplier = require('../models/Supplier');

app.use(express.static(path.join(__dirname, 'dist')));


// Defined store route
supplierRoutes.route('/add').post(function (req, res) {
  let supplier = new Supplier(req.body);
  supplier.save()
    .then(supplier => {
    res.status(200).json({'supplier': 'added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
supplierRoutes.route('/').get(function (req, res) {
  Supplier.find(function (err, suppliers){
    if(err){
      console.log(err);
    }
    else {
      res.json(suppliers);
    }
  });
});

// Defined edit route
supplierRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Supplier.findById(id, function (err, supplier){
      res.json(supplier);
  });
});

//  Defined update route
supplierRoutes.route('/update/:id').post(function (req, res) {
  Supplier.findById(req.params.id, function(err, supplier) {
    if (!supplier)
      return next(new Error('Could not load Document'));
    else {
      supplier.name = req.body.name;
      supplier.address = req.body.address;
      supplier.email = req.body.email;
      supplier.prefix = req.body.prefix;
      supplier.phone = req.body.phone;
      supplier.groups = req.body.groups;

      supplier.save().then(supplier => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
supplierRoutes.route('/delete/:id').get(function (req, res) {
  Supplier.findByIdAndRemove({_id: req.params.id}, function(err, supplier){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = supplierRoutes;