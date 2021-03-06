const express = require('express');
const jobRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const jobController = controllers.job;

jobRouter.use(bodyParser.json());

jobRouter.get('/all', function (req, res) {
    jobController.getAll(function (data, state) {
        if (state === false) {
            res.status(500).end();
            return;
        }
        if (data !== 0) {
            data = JSON.parse(data);
            res.json(data).status(200);
            return;
        }
        res.status(404).end();
    });
});

jobRouter.get('/:id', function (req, res) {
    jobController.getById(req.params.id, function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            data = JSON.parse(data);
            res.json(data).status(200);
        }
        res.status(404).end();
    });
});

jobRouter.post('/create', function (req, res) {
    jobController.create([req.body.name, req.body.address, req.body.city, req.body.cp, req.body.description, req.body.salary, req.body.active, req.body.idAsso], function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

jobRouter.put('/update/:id', function (req, res) {
    if (Number.parseInt(req.params.id)) {
        var values = []
        var columns = []

        for (var key in req.body) {
            values.push(req.body[key]);
            columns.push(key);
        }
        jobController.update(columns, values, req.params.id, function (state) {
            if (state === true) {
                res.json(state).status(200).end();
                return;
            }
            res.status(500).end();
            return;
        });
    }
    else {
        res.json("parameter is not an integer").status(500).end();
    }
});

jobRouter.delete('/delete/:id', function (req, res) {
    jobController.deleteById(req.params.id, function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});


module.exports = jobRouter;
