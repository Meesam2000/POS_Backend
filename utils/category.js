const db = require("../config/db");
const category = {
    createCategoryT() {
        var sql = "CREATE TABLE IF NOT EXISTS `pos`.`category` ( `idctg` INT NOT NULL AUTO_INCREMENT, `ctgname` VARCHAR(45) NOT NULL, `ctgdescription` VARCHAR(255) NOT NULL, `ctgdate` DATE NOT NULL, PRIMARY KEY(`idctg`))";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    },

    categoryAdd(obj) {
        return new Promise(function (resolve, reject) {
            const date = new Date()
            db.query(
                "INSERT INTO `pos`.`category` (ctgname,ctgdescription,ctgdate) VALUES (?,?,?)", [obj.ctgName, obj.ctgDescription, date],
                (err, result) => {
                    if (err) {
                        reject(false);
                    } else if (result) {
                        resolve(true);
                    }
                }
            );
        });
    },

    getAllCategoryData() {
        return new Promise(function (resolve, reject) {
            db.query(
                "SELECT * FROM  `pos`.`category`",
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


    deleteCategory(ctgname) {
       
        return new Promise(function(resolve, reject) {
            db.query(
                "DELETE FROM `pos`.`subcategory` where `ctgname`=? ;",ctgname,
                (err, result) => {
                    if (err) {
                        console.log(err)
                        reject(new Error("Error rows is undefined"));
                    } else {
                        db.query(
                            "DELETE FROM `pos`.`category` where `ctgname`=? ;",ctgname,
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                    reject(new Error("Error rows is undefined"));
                                } else {
                                    
                                    resolve(result);
                                }
                            }
                        );
                        resolve(result);
                    }
                }
            );
        });
    }
}

exports.category = category