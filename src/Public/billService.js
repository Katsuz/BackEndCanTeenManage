const {Product, Position, OnSell, Bill} = require('../Database/Model');
const { find } = require('../Database/Model/users/users-model');


module.exports.rollBack = async function (idBill){
    let findBill = await Bill.findOne({idBill: idBill})
                        //.populate('idProducts')
                        
    for (let i = 0; i < findBill.idProducts.length; i++){
        let num = findBill.quantity[i];

        //roll back onsell
        let findOnSell = await OnSell.findOne({product: findBill.idProducts[i]});
        findOnSell.quantity = findOnSell.quantity + num;
        await findOnSell.save();

        //roll back product if are goods
        let findProduct = await Product.findOne({_id: findBill.idProducts[i]});
        if (findProduct.type == "cake" || findProduct.type == "gas"
        || findProduct.type == "noGas"){
            findProduct.total = findProduct.total + num;
            await findProduct.save();
        } else {
            //roll back empty position
            let findPosition = await Position.findOneAndUpdate({_id: findBill.idPositions[i]}, {isEmpty: true});
        }

    }

    await findBill.delete();
    
}

module.exports.getBillInfo = async function (idBill){
    let findBill = await Bill.findOne({idBill: idBill})
                        .populate('idUser')
    
    let productArr = [];
    let totalCost = 0;

    for (let i = 0; i < findBill.idProducts.length; i++){
        let num = findBill.quantity[i];

        let findProduct = await Product.findOne({_id: findBill.idProducts[i]});

        let findPosition = await Position.findOne({_id: findBill.idPositions[i]._id});

        totalCost += findProduct.price * num;

        productArr.push({
            id: findProduct.id,
            name: findProduct.name,
            type: findProduct.type,
            quantity: num,
            price: findProduct.price,
            position: {
                id: findPosition.idPos,
                letter: findPosition.letter,
                number: findPosition.number,
                status: findBill.statusProducts[i],
                color: findPosition.color
            },
        })

    }

    let user = findBill.idUser;

    let itemBill = {
        idBill: idBill,
        time: findBill.time,
        product: productArr,
        totalCost: totalCost,
        username: user.username,
        idUser: user.idUser
    }

    return itemBill;
    
}

module.exports.isCompletedBill = function (bill) {

    const statusProductArr = bill.statusProducts;
    for (let i = 0; i < statusProductArr.length; i++){
        if (statusProductArr[i] == "doing"){
            return false;
        }
    }

    return true;
}

function isCompletedBillNoExport(bill) {

    const statusProductArr = bill.statusProducts;
    for (let i = 0; i < statusProductArr.length; i++){
        if (statusProductArr[i] == "doing"){
            return false;
        }
    }

    return true;
}

module.exports.getOneUncompletedBillByUser_ID = async function (_id){
    
    const findBills = await Bill.find({idUser: _id});
    let idBillArr = [];
    for (let i = 0; i < findBills.length; i++){
        if (!isCompletedBillNoExport(findBills[i])){
            idBillArr.push(findBills[i]._id);
        }
    }
    return idBillArr;
}

module.exports.getAllUncompletedBillByUser_ID = async function (){
    
    const findBills = await Bill.find();
    let idBillArr = [];
    for (let i = 0; i < findBills.length; i++){
        if (!isCompletedBillNoExport(findBills[i])){
            idBillArr.push(findBills[i]._id);
        }
    }

    return idBillArr;
}

module.exports.setDoneStatusProductInBillByID = async function (idBill, idProduct){
    
    let findBill = await Bill.findOne({idBill: idBill}).populate('idProducts');
    
    for (let i = 0; i < findBill.idProducts.length; i++){
        if (findBill.idProducts[i].id == idProduct){
            findBill.statusProducts[i] = "done";
            await findBill.save();
            return;
        }
    }

}

module.exports.getBillTotalCost = async function (idBill){
    
    let findBill = await Bill.findOne({idBill: idBill})

    let totalCost = 0;

    for (let i = 0; i < findBill.idProducts.length; i++){
        let num = findBill.quantity[i];

        let findProduct = await Product.findOne({_id: findBill.idProducts[i]});


        totalCost += findProduct.price * num;

    }

    return totalCost;
    
}