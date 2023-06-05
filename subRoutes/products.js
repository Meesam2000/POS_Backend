const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");

const { products } = require("../utils/products")

router.use(cors());

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/productImg"); //important this is a direct path from our current file to storage location
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });


router.post("/addProduct", upload.single("image"), async (req, res) => {
    products.createProductsTable();
    await (products.addProduct(req.body, req.file.filename)).then((result) => {
        
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ Error: err.message, status: 404 })
    })
}
)

router.get("/getAllProducts", async (req, res) => {

    await products.getAllProducts().then((result) => {
        
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})

router.post("/deleteProduct", async (req, res) => {
    await products.deleteProduct(req.body.productId).then((result) => {
        
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })

})

router.post("/updateProduct", upload.single("image"), async (req, res) => {

    await (products.updateProduct(req.body, req.file.filename)).then((result) => {
        
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })


})

router.get("/getSearchProducts", async (req, res) => {

    await products.getSearchProducts(req.query.search).then((result) => {
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
})



module.exports = router;