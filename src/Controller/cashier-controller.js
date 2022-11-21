const {Product} = require('./../Database/Model');
const {OnSell} = require('./../Database/Model');
const {ImportGood} = require('./../Database/Model');
const {Inventory} = require('./../Database/Model');
const {ExportGood} = require('./../Database/Model');



class CashierController {
    insertFood = async(req,res,next) => {
        try {
            let listProducts = req.body.product;
            let daySell = parseInt(req.body.day);

            let updateP = await Product.updateMany({ daysell: daySell }, { daysell: -1 });

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
                let addP = await newProduct.save();
            }
            //Product.insertMany(req.body);
            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CashierController