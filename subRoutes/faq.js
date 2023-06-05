const express = require("express");
const router = express.Router();
const { faq } = require("../utils/faq")

router.post("/addQuestion", async (req, res) => {
    faq.createFaqTable()
    faq.addQuestion(req).then((result) => {
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ Error: err.message, status: 404 })
    })
}
)

router.get("/getAllFaqs", async (req, res) => {
    await faq.getAllFaqs().then((result) => {
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})

module.exports = router