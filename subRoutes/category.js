const express = require("express");
const router = express.Router();
const { category } = require("../utils/category")

router.post("/addCat", async (req, res) => {
    
    category.createCategoryT();
    if (await (category.categoryAdd(req.body.ctgObj))) {
        res.send({
            status: 200
        });
    } else {
        res.send({
            status: 502
        });
    }

    // res.send("Add ka code likh bhai")
})
router.get("/getAllCatData", async (req, res) => {
    await category.getAllCategoryData().then((result) => {
        
        res.send({
            result:result,
            status:200
        })
    }).catch((err) => {
        res.send({status:404})
    })

})

router.post("/deleteCat", async (req, res) => {
    await category.deleteCategory(req.body.ctgname).then((result) => {
        
        res.send({
            result:result,
            status:200
        })
    }).catch((err) => {
        res.send({status:404})
    })

})
module.exports = router;