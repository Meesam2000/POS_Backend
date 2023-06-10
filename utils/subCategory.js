const db = require("../config/db")
const subCategory = {
    createSubCategoryT() {
        var sql = "CREATE TABLE IF NOT EXISTS `pos`.`subcategory` ( `idsubctg` INT UNSIGNED NOT NULL AUTO_INCREMENT, `subctgname` VARCHAR(45) NOT NULL, `subctgdescription` VARCHAR(255) NOT NULL, `subctgdate` DATE NOT NULL, `ctgname` VARCHAR(45) NOT NULL, PRIMARY KEY(`idsubctg`));";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Sub Category Table created");
        });
    },

    addSubCatogery(obj) {
        return new Promise(function(resolve, reject) {
        const date = new Date()
        console.log(date);
        db.query(
            "INSERT INTO `pos`.`subcategory` (subctgname,subctgdescription,subctgdate,ctgname) VALUES (?,?,?,?)", [obj.subCatName, obj.subCatDescription, date, obj.subCatCategory],
            (err, result) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(true)
                }
            }
        );
        });
    },

    getAllSubCategory(name) {
        return new Promise(function(resolve, reject) {
            db.query(
                "SELECT * FROM `pos`.`subcategory` where `ctgname`=?;",name,
                (err, result) => {
                    if (err) {
                        console.log(err)
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    getAllItemsData(ctgname,subctgname) {
        return new Promise(function(resolve, reject) {
            db.query(
                "SELECT * FROM `pos`.`items` where `ctgname`=? and subctgname=?;",[ctgname,subctgname],
                (err, result) => {
                    if (err) {
                        console.log(err)
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    deleteSubCategory(ctgname,subctgname) {
        return new Promise(function(resolve, reject) {
            db.query(
                "DELETE FROM `pos`.`subcategory` where `ctgname`=? and subctgname=?;",[ctgname,subctgname],
                (err, result) => {
                    if (err) {
                        console.log(err)
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

exports.subCategory = subCategory