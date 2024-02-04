const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
// const Employees = require('../models/employees');
const Employees = require('../models/workers');

const employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

employeeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Employees.findAll({})
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
    Employees.findByPk(req.params.employeeId)
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

employeeRouter.route('/bosses')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    console.info('employeeRouter.route(/bosses)')
    Employees.findAll({})
    .then((employees) => {
        console.info('employees', employees)
        const employeesBossesIds = employees.map((elm, idx) => {
            if (elm.employeeId) {
                const currentBossId = elm.employeeId;
                return currentBossId
            }
        })
        console.info('employeesBossesIds', employeesBossesIds)
        // Employees.findAll({
        //     where: {
        //       id: {
        //         [Op.in]: employeesBossesIds
        //       }
        //     }
        // })
        // .then((bosses) => {
        //     console.info('bosses', bosses)
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type', 'application/json');
        //     res.json(bosses);
        // }, (err) => next(err))
        // .catch((err) => next(err));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // res.json(bosses);
        return res.json(bosses);
        // return
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

module.exports = employeeRouter;