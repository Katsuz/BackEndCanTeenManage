const { Product } = require('./../Database/Model');
const { OnSell } = require('./../Database/Model');
const { ImportGood } = require('./../Database/Model');
const { Inventory } = require('./../Database/Model');
const { ExportGood } = require('./../Database/Model');



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
}

module.exports = new CashierController