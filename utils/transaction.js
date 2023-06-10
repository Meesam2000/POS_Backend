const db = require("../config/db")
const transaction = {
    createTransactionTable() {
        var sql = "CREATE TABLE IF NOT EXISTS `pos`.`transaction` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `orderId` VARCHAR(45) NOT NULL, `orderDate` DATETIME NOT NULL, `grandTotal` INT UNSIGNED NOT NULL, `receiptId` VARCHAR(45) NOT NULL, PRIMARY KEY(`id`));";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Transaction Table created");
        });
    },
    createTransactionDetailsTable() {
        var sql = "CREATE TABLE IF NOT EXISTS `pos`.`transactiondetail` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `itemName` VARCHAR(45) NOT NULL, `itemQty` INT UNSIGNED NOT NULL, `unitPrice` INT UNSIGNED NOT NULL, `totalPrice` INT UNSIGNED NOT NULL,`productid` INT UNSIGNED NOT NULL,`orderId` VARCHAR(45) NOT NULL, PRIMARY KEY(`id`));";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Transactions Details Table created");
        });
    },
    createReverseTransactionTable() {
        var sql = "CREATE TABLE IF NOT EXISTS `pos`.`reversetransaction` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `orderId` VARCHAR(45) NOT NULL, `orderDate` DATETIME NOT NULL, `grandTotal` INT UNSIGNED NOT NULL, `receiptId` VARCHAR(45) NOT NULL, PRIMARY KEY(`id`));";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("reverseTransaction Table created");
        });
    },
    createReverseTransactionDetailsTable() {
        var sql = "CREATE TABLE IF NOT EXISTS `pos`.`reversetransactiondetail` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `itemName` VARCHAR(45) NOT NULL, `itemQty` INT UNSIGNED NOT NULL, `unitPrice` INT UNSIGNED NOT NULL, `totalPrice` INT UNSIGNED NOT NULL,`productid` INT UNSIGNED NOT NULL,`orderId` VARCHAR(45) NOT NULL, PRIMARY KEY(`id`));";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("reverseTransactions Details Table created");
        });
    },

    addTransaction(obj) {
        orderInfo = JSON.parse(obj.body.printObj)
        cartItems = obj.body.cartItems
        // console.log(orderInfo);
        // console.log(cartItems);
        // console.log("isma aya ha ");
        
        return new Promise(function (resolve, reject) {
            db.query(
                "INSERT INTO `pos`.`transaction` (orderId,orderDate,grandTotal,receiptId) VALUES (?,?,?,?)", [orderInfo.orderNo, new Date(orderInfo.orderDate),orderInfo.grandTotal,orderInfo.orderNo],
                (err, result) => {
                    if (err) {
                        console.log("reject hoa ha "+err.message);
                        reject(false)
                    } else {    
                        cartItems.map(item=>{
                            db.query(
                                "INSERT INTO `pos`.`transactiondetail` (itemName,itemQty,unitPrice,totalPrice,productid,orderId) VALUES (?,?,?,?,?,?)", [item.productname, item.cartqty,item.productprice,item.cartqty*item.productprice,item.productid,orderInfo.orderNo],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                         reject(new Error("Error rows is undefined"));
                                    } else {     
                                        // resolve(result);
                                    }   
                                }
                            )

                            db.query(
                                "UPDATE `pos`.`products` SET productqty=? WHERE productid=?", [item.productqty - item.cartqty, item.productid],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                         reject(new Error("Error rows is undefined"));
                                    } else {     
                                        // resolve(result);
                                    }   
                                }
                            )
                        }
                        )
                        resolve()
                        
                    }
                    resolve(result);
                }
            );
        });
    },

    addReverseTransaction(obj) {
        orderInfo = JSON.parse(obj.body.printObject)
        cartItems = obj.body.reverseCart
        // console.log(orderInfo);
        // console.log(cartItems);
        // console.log("isma aya ha ");
        
        return new Promise(function (resolve, reject) {
            db.query(
                "INSERT INTO `pos`.`reversetransaction` (orderId,orderDate,grandTotal,receiptId) VALUES (?,?,?,?)", [orderInfo.orderNo, new Date(orderInfo.orderDate),orderInfo.grandTotal,orderInfo.orderNo],
                (err, result) => {
                    if (err) {
                        console.log("reject hoa ha "+err.message);
                        reject(false)
                    } else {    
                        cartItems.map(item=>{
                            db.query(
                                "INSERT INTO `pos`.`reversetransactiondetail` (itemName,itemQty,unitPrice,totalPrice,productid, orderId) VALUES (?,?,?,?,?,?)", [item.productname, item.cartqty,item.productprice,item.cartqty*item.productprice,item.productid,orderInfo.orderNo],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                         reject(new Error("Error rows is undefined"));
                                    } else {     
                                        // resolve(result);
                                    }   
                                }
                            )

                            db.query(
                                "UPDATE `pos`.`products` SET productqty=productqty+? WHERE productid=?", [item.cartqty, item.productid],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                         reject(new Error("Error rows is undefined"));
                                    } else {     
                                        // resolve(result);
                                    }   
                                }
                            )
                    })
                        resolve()
                        
                    }
                    resolve(result);
                }
            );
        });
    },
    getAllTransactions()
    {
        return new Promise(function (resolve, reject) {
            db.query(
                "SELECT * FROM  `pos`.`transaction`",
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
    getAllReverseTransactions()
    {
        return new Promise(function (resolve, reject) {
            db.query(
                "SELECT * FROM  `pos`.`reversetransaction`",
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
    getSpecifTransaction(orderId) {
        console.log(orderId);
        return new Promise(function (resolve, reject) {
            db.query("SELECT * FROM `pos`.`transaction` JOIN `pos`.`transactiondetail` ON `pos`.`transaction`.orderId=`pos`.`transactiondetail`.orderId where `pos`.`transactiondetail`.orderId=?;", orderId, (err, result) => {
                if (err) {
                    reject(err)
                } else if (result) {
                    resolve(result)
                }
            });
        });
    },
    getSpecifReverseTransaction(orderId) {
        console.log(orderId);
        return new Promise(function (resolve, reject) {
            db.query("SELECT * FROM `pos`.`reversetransaction` JOIN `pos`.`reversetransactiondetail` ON `pos`.`reversetransaction`.orderId=`pos`.`reversetransactiondetail`.orderId where `pos`.`reversetransactiondetail`.orderId=?;", orderId, (err, result) => {
                if (err) {
                    reject(err)
                } else if (result) {
                    resolve(result)
                }
            });
        });
    },
    
}

exports.transaction = transaction