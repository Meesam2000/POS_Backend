const express = require("express");
const router = express.Router();
const { transaction } = require("../utils/transaction")




router.post("/addTransaction", async (req, res) => {
    transaction.createTransactionTable()
    transaction.createTransactionDetailsTable()
    
    transaction.addTransaction(req).then((result) => {
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ Error: err.message, status: 404 })
    })
}
)
router.post("/reverseTransaction", async (req, res) => {
    transaction.createReverseTransactionTable()
    transaction.createReverseTransactionDetailsTable()
    
    transaction.addReverseTransaction(req).then((result) => {
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ Error: err.message, status: 404 })
    })
}
)

router.get("/getAllTransactions", async (req, res) => {

    transaction.getAllTransactions().then((result) => {     
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})
router.get("/getAllReverseTransactions", async (req, res) => {

    transaction.getAllReverseTransactions().then((result) => {     
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})
router.get("/getSpecificTransaction/:orderId", async (req, res) => {
    
    transaction.getSpecifTransaction(req.params.orderId).then((result) => {     
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})
router.get("/getSpecificReverseTransaction/:orderId", async (req, res) => {
    
    transaction.getSpecifReverseTransaction(req.params.orderId).then((result) => {     
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})



module.exports = router