const { Product } = require('./../Database/Model');
const { OnSell } = require('./../Database/Model');
const { ImportGoods } = require('./../Database/Model');
const { Inventory } = require('./../Database/Model');
const { ExportGoods } = require('./../Database/Model');



class CashierController {
    insertFood = async (req, res, next) => {
        try {
            let listProducts = req.body.product;
            let daySell = parseInt(req.body.day);

            //delete Product won't sell
            let findOldProduct = await Product.find({daysell: daySell});
            for (let i = 0; i < findOldProduct.length; i++){
                let isDelete = true;
                let oldId = findOldProduct[i].id;
                for (let j = 0; j < listProducts.length; j++){
                    if (listProducts[j].id == oldId){
                        isDelete = false;
                        break;
                    }
                }
                if (isDelete){
                    await Product.updateMany({ id: oldId }, { daysell: -1 });
                }
            }

            for (let i = 0; i < listProducts.length; i++) {
                if (listProducts[i].id == "new") {
                    let findP = await Product.find({});
                    let newID = 0;
                    let resultNewID = '';

                    if (findP.length == 0) {
                        resultNewID = 'FF0000000';
                    } else {
                        let curID = findP[findP.length - 1].id;

                        curID = curID.slice(2);
                        newID = 1 + parseInt(curID[0]) * 1000000 + parseInt(curID[1]) * 100000 + parseInt(curID[2]) * 10000
                            + parseInt(curID[3]) * 1000 + parseInt(curID[4]) * 100 + parseInt(curID[5]) * 10 + parseInt(curID[6]);

                        resultNewID = newID + '';
                        while (resultNewID.length < 7) {
                            resultNewID = '0' + resultNewID;
                        }
                        resultNewID = 'FF' + resultNewID;
                    }

                    //add product
                    let item = {
                        id: resultNewID,
                        name: listProducts[i].name,
                        img: listProducts[i].img,
                        type: listProducts[i].type,
                        price: listProducts[i].price,
                        daysell: daySell,
                        total: listProducts[i].total
                    }
    
                    let newProduct = new Product(item);
                    await newProduct.save();
                } else {
                    let findP = await Product.find({id: listProducts[i].id});
                    findP[0].name = listProducts[i].name;
                    findP[0].price = listProducts[i].price;
                    findP[0].total = listProducts[i].total;
                    findP[0].img = listProducts[i].img;
                    await findP[0].save();
                }
            }

            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    importGoods = async (req, res, next) => {
        try {
            let listProducts = req.body.product;

            //generate new ID
            let findP = await Product.find({});
            let newID = 0;
            let resultNewID = '';
            if (findP.length == 0) {
                resultNewID = 'FF0000000';
            } else {
                let curID = findP[findP.length - 1].id;

                curID = curID.slice(2);
                newID = 1 + parseInt(curID[0]) * 1000000 + parseInt(curID[1]) * 100000 + parseInt(curID[2]) * 10000
                        + parseInt(curID[3]) * 1000 + parseInt(curID[4]) * 100 + parseInt(curID[5]) * 10 + parseInt(curID[6]);
                
                resultNewID = newID + '';
                while (resultNewID.length < 7){
                    resultNewID = '0' + resultNewID;
                }
                resultNewID = 'FF' + resultNewID;
            }
            

            for (let i = 0; i < listProducts.length; i++) {

                if (i != 0){
                    newID++;
                    resultNewID = newID + '';
                    while (resultNewID.length < 7){
                        resultNewID = '0' + resultNewID;
                    }
                    resultNewID = 'FF' + resultNewID;
                }

                //add product
                let itemProduct = {
                    id: resultNewID,
                    name: listProducts[i].name,
                    img: listProducts[i].img,
                    type: listProducts[i].type,
                    price: listProducts[i].price,
                    daysell: -1,
                    total: 0
                }
                let newProduct = new Product(itemProduct);
                await newProduct.save();

                //add good
                let itemImport = {
                    productID: newProduct._id,
                    time: listProducts[i].time,
                    total: listProducts[i].total,
                    totalPrice: listProducts[i].totalPrice,
                    source: listProducts[i].source
                }
                let newImport = new ImportGoods(itemImport);
                await newImport.save();

                //add inventory
                let itemInventory = {
                    productID: newProduct._id,
                    quantity: listProducts[i].total
                }
                let newInventory = new Inventory(itemInventory);
                await newInventory.save();
            }

            //Product.insertMany(req.body);
            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    importHistory = async (req, res, next) => {
        try {
            let findImport = await ImportGoods.
                find({}).
                populate('productID');
            let importArr = [];
            for (let i = 0; i < findImport.length; i++) {
                let item = {
                    id: findImport[i].productID.id,
                    name: findImport[i].productID.name,
                    type: findImport[i].productID.type,
                    total: findImport[i].total,
                    totalPrice: findImport[i].totalPrice,
                    source: findImport[i].source,
                    time: findImport[i].time
                }
                importArr.push(item);
            }

            res.json({
                products: importArr
            });

        } catch (error) {
            next(error);
        }
    }

    currentInventory = async (req, res, next) => {
        try {
            let findInventory = await Inventory.
                find({}).
                populate('productID');
            
            let cakeArr = [];
            let gasArr = [];
            let noGasArr = [];

            for (let i = 0; i < findInventory.length; i++) {
                if (findInventory[i].productID.type == "cake"){
                    let item = {
                        id: findInventory[i].productID.id,
                        name: findInventory[i].productID.name,
                        quantity: findInventory[i].quantity
                    }
                    cakeArr.push(item);
                }
                if (findInventory[i].productID.type == "gas"){
                    let item = {
                        id: findInventory[i].productID.id,
                        name: findInventory[i].productID.name,
                        quantity: findInventory[i].quantity
                    }
                    gasArr.push(item);
                }
                if (findInventory[i].productID.type == "noGas"){
                    let item = {
                        id: findInventory[i].productID.id,
                        name: findInventory[i].productID.name,
                        quantity: findInventory[i].quantity
                    }
                    noGasArr.push(item);
                }
            }

            res.json({
                gas: gasArr,
                noGas: noGasArr,
                cake: cakeArr
            });

        } catch (error) {
            next(error);
        }
    }

    async exportGoods(req, res, next) {
        try {
            let id = req.body.id;
            let quantity = req.body.quantity;
            let today = new Date();
            let timeExport = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

            let findProduct = await Product.find({id: id});
            
            let ObjectId = findProduct[0]._id;

            let findInventory = await Inventory.find({productID: ObjectId});

            if (findInventory[0].quantity > quantity){
                let newQuantity = findProduct[0].total + quantity;
                findProduct[0].total = newQuantity;
                await findProduct[0].save();
    
                findInventory[0].quantity = findInventory[0].quantity - quantity;
                await findInventory[0].save();

                let findOnSell = await OnSell.find({product: ObjectId});
                if (findOnSell.length != 0){
                    findOnSell[0].quantity = newQuantity;
                    await findOnSell[0].save();
                } else {
                    let itemOnSell = {
                        product: ObjectId,
                        quantity: newQuantity
                    }

                    let newOnSell = new OnSell(itemOnSell);
                    await newOnSell.save();
                }

                //add export
                let itemExport = {
                    productID: ObjectId,
                    time: timeExport,
                    quantity: quantity
                }
                let newExport = new ExportGoods(itemExport);
                await newExport.save();

                res.json({
                    message: "success"
                })

            } else {
                res.json({
                    message: "invalid quantity export"
                })
            }
        } catch (error) {
            next(error);
        }
    }

    exportHistory = async (req, res, next) => {
        try {
            let findExport = await ExportGoods.
                find({}).
                populate('productID');

            let exportArr = [];
            for (let i = 0; i < findExport.length; i++) {
                let item = {
                    id: findExport[i].productID.id,
                    name: findExport[i].productID.name,
                    type: findExport[i].productID.type,
                    quantity: findExport[i].quantity,
                    time: findExport[i].time
                }
                exportArr.push(item);
            }

            res.json({
                products: exportArr
            });

        } catch (error) {
            next(error);
        }
    }

    createBill = async (req, res, next) => {
        try {

            let listProducts = req.body;
            

            // let findExport = await ExportGoods.
            //     find({}).
            //     populate('productID');

            // let exportArr = [];
            // for (let i = 0; i < findExport.length; i++) {
            //     let item = {
            //         id: findExport[i].productID.id,
            //         name: findExport[i].productID.name,
            //         type: findExport[i].productID.type,
            //         quantity: findExport[i].quantity,
            //         time: findExport[i].time
            //     }
            //     exportArr.push(item);
            // }

            res.json({
                products: exportArr
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CashierController