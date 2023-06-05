const db = require("../config/db");
const products = {

    createProductsTable() {
        var sql = "CREATE TABLE IF NOT EXISTS `gpos`.`products` ( `productid` INT UNSIGNED NOT NULL AUTO_INCREMENT, `productname` VARCHAR(45) NOT NULL, `productdesc` VARCHAR(255) NOT NULL, `productprice` INT UNSIGNED NOT NULL, `productpurchaseprice` INT UNSIGNED NOT NULL, `productqty` INT UNSIGNED NOT NULL, `ctgname` VARCHAR(45) NOT NULL, `subctgname` VARCHAR(45) NOT NULL, `productimage` VARCHAR(255) NOT NULL, PRIMARY KEY(`productid`));";
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                throw err;
            }
            // console.log("Product Table created");
        });
    },
    addProduct(obj1,filename) {
        const obj =JSON.parse(JSON.stringify(obj1))
        console.log("product wala ma aya ha");
        return new Promise(function (resolve, reject) {
            db.query(
                "INSERT INTO `gpos`.`products` (productname,productdesc,productprice,productpurchaseprice,productqty,ctgname,subctgname,productimage) VALUES (?,?,?,?,?,?,?,?)", [obj.productName, obj.productDesc,obj.productPrice,obj.productPurchasePrice,obj.productQty,obj.productCtgName,obj.productSubCtgName,filename],
                (err, result) => {
                    if (err) {
                        console.log("reject hoa ha "+err.message);
                        reject(false)
                    } else {
                        console.log("resolve hoa ha ");
                        resolve(true)
                    }
                }
            );
        });
    },
    getAllProducts()
    {
        return new Promise(function (resolve, reject) {
            db.query(
                "SELECT * FROM  `gpos`.`products`",
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
    deleteProduct(productid) {
        return new Promise(function(resolve, reject) {
            db.query(
                "DELETE FROM `gpos`.`products` where `productid`=?;",productid,
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
    updateProduct(obj1,filename)
    {
        const obj =JSON.parse(JSON.stringify(obj1))
        return new Promise(function(resolve, reject) {
        db.query(
            "UPDATE `gpos`.`products` set productname=?,productdesc=?,productprice=?,productpurchaseprice=?,productqty=?,ctgname=?,subctgname=?,productimage=? where productid=?", [obj.productName, obj.productDesc,obj.productPrice,obj.productPurchasePrice,obj.productQty,obj.productCtgName,obj.productSubCtgName,filename,obj.productId],
            (err, result) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(true)
                }
            }
        );
        })
    },

    getSearchProducts(search)
    {
        return new Promise(function (resolve, reject) {
            db.query(
                'SELECT * FROM gpos.products where productname like ?', '%' + search + '%',
                (err, result) => {
                    if (err) {
                        reject(new Error("Something went wrong while searching!!"));
                    } else {
                        resolve(result);
                    }
                }
            );
        });  
    },

}

exports.products = products