const express = require("express");
const router = express.Router();
const { account } = require("../utils/accounts")
var multer = require('multer');
const jwt = require("jsonwebtoken")
// const auth = require('../middleware/auth')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/profileImg"); //important this is a direct path from our current file to storage location
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });



router.post("/signup", async (req, res) => {
    await (account.signup(req.body)).then((result) => {
        res.send({ status: 200 });
    }).catch((error) => {
        res.send({ status: 502, result: error });
    })


});
router.post("/login", async (req, res) => {
    await account.login(req.body).then((result) => {
        const id = result[0].email;
        const token = jwt.sign({ id }, "login", { expiresIn: 120 });
        res.send({ auth: true, token: token, result: result[0] });
    }).catch((err) => {
        res.send({ auth: false, err: err });
    })
});

// router.get("/login", (req, res) => {
//     if (req.session.user) {
//         res.send({ loggedIn: true, user: req.session.user });
//     } else {
//         res.send({ loggedIn: false });
//     }
// });



router.post("/updateProfile", upload.single("image"), async (req, res) => {
    await (account.update(req.body, req.file.filename)).then((result) => {
        console.log(result);
        res.send({
            result: result,
            status: 200
        })
    }).catch((err) => {
        res.send({ status: 404 })
    })
});

router.post("/confirm", async (req, res) => {
    await account.verifyUser(req.body).then((result => {
        res.send({ auth: true, status: 200 });
    })).catch((error) => {
        res.send({ auth: false, status: 502 });
    })
});


router.post("/forgotPassword", async (req, res) => {
    console.log("Enter email send");
    await account.getUser(req.body).then((result) => {
        res.send({ auth: true, status: 200, result: result });
    }).catch((error) => {
        res.send({ auth: false, status: 502 });
    })
});

router.post("/confirmToken", async (req, res) => {
    await account.confirmToken(req.body).then((result) => {
        res.send({ auth: true, status: 200, result: result });
    }).catch((error) => {
        res.send({ auth: false, status: 502 });
    })
});

router.post("/updatePassword", async (req, res) => {
    await account.updatePassword(req.body).then((result) => {
        res.send({ auth: true, status: 200, result: result });
    }).catch((error) => {
        res.send({ auth: false, status: 502 });
    })
});

module.exports = router