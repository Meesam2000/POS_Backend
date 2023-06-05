const express = require("express");
const router = express.Router();

const { subCategory } = require("../utils/subCategory")

router.post("/addSubCat", async(req, res) => {
    // console.log(req.body.subCtgObj);
    subCategory.createSubCategoryT();
    if(await(subCategory.addSubCatogery(req.body.subCtgObj))){
        res.send({
            status:200
        })
    }else{
        res.send({
            status:502
        })
    }
})

router.post("/getAllSub", async(req, res) => {
    // console.log(req.body.ctgname);
    await subCategory.getAllSubCategory(req.body.ctgname).then((result) => {
        res.send({
            result:result,
            status:200
        })
    }).catch((err) => {
        res.send({status:404})
    })

})

router.post("/deleteSubCat", async(req, res) => {
    
    await subCategory.deleteSubCategory(req.body.ctgname,req.body.subctgname).then((result) => {
        res.send({
            check:true,
            result:result,
            status:200
        })
    }).catch((err) => {
        res.send({status:404})
    })

})

//Later add this function into separate class
router.post("/getAllItems", async(req, res) => {
    
    await subCategory.getAllItemsData(req.body.ctgname,req.body.subctgname).then((result) => {
        res.send({
            result:result,
            status:200
        })
    }).catch((err) => {
        res.send({status:404})
    })

})

module.exports = router;