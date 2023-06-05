const db = require("../config/db")
const nodemailer = require("../config/nodemailer")
const faq = {
    createFaqTable() {
        var sql = "CREATE TABLE IF NOT EXISTS `gpos`.`faq` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,`name` VARCHAR(450) NOT NULL,`email` VARCHAR(450) NOT NULL, `question` VARCHAR(450) NOT NULL,`answer` VARCHAR(450), PRIMARY KEY(`id`));";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("faq Table created");
        });
    },
    addQuestion(obj) {
        const tempObj = obj.body
        console.log(tempObj);
        return new Promise(function (resolve, reject) {
            db.query(
                "INSERT INTO `gpos`.`faq` (name,email,question) VALUES (?,?,?)", [tempObj.name,tempObj.email,tempObj.body],
                (err, result) => {
                    if (err) {
                        reject(false);
                    } else if (result) {
                        nodemailer.sendFaq(tempObj.name,tempObj.email,tempObj.subject,tempObj.body)
                        resolve(true);
                    }
                }
            );
        });
    },
    getAllFaqs() {
        return new Promise(function (resolve, reject) {
            db.query(
                "SELECT * FROM  `gpos`.`faq`",
                (err, result) => {
                    if (err) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    
}

exports.faq = faq