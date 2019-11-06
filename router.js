const express = require("express");
const ObjectID = require("mongodb").ObjectID;


const createRouter = function (collection) {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .findOne({
                _id: ObjectID(id)
            })
            .then((docs) => res.json(docs))
    });

    router.get("/test", async (req, res) => {
        try {
            res.json({
                response: "OK"
            })
        } catch (err) {
            res.json({
                status: 500,
                error: err.toString()
            });
        }
    });

    router.post("/new", async (req, res) => {
        try {
            const newData = req.body;
            collection
                .insertOne(newData)
                .then(() => collection.find().toArray())
                .then((docs) => docs.find((doc) => doc.name === req.body.name))
                .then((doc) => res.json(doc));
        } catch (err) {
            res.json({
                status: 500,
                error: err.toString()
            });
        }
    })

    router.get("*", function (req, res) {
        res.status(404).send("No response");
    });

    return router
};


module.exports = createRouter;