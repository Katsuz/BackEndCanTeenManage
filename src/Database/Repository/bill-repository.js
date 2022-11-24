const { model } = require('mongoose');
const {Bill} = require('./../Model');

const billRepository = {
    getBillByIdBill: async(IdBill) =>{
        try{
            const billResult = Bill.findOne({_id: IdBill}).populate([
                {path:'idUser', select:'username'},
                {path:'idProducts', select:'id name'},
                {path:'idPositions', select:'idPos color'}
            ]);
            //console.log(billResult);
            return billResult;
        } catch(err) {  
            throw err;
        }
    }
}

module.exports = billRepository