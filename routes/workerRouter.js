const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const Employees = require('../models/employees');

const employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

employeeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Employees.find({})
    .then((employees) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employees);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Employees.create(req.body)
    .then((employee) => {
        console.log('Employee Created ', item);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employee);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /employees');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Employees.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

employeeRouter.route('/:employeeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Employees.findById(req.params.itemId)
    .then((employee) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employee);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /employees/'+ req.params.itemId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    Employees.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, { new: true })
    .then((employee) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employee);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Employees.findByIdAndRemove(req.params.itemId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = employeeRouter;