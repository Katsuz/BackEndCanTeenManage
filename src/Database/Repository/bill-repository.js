const { model } = require('mongoose');
const {Bill} = require('./../Model');

const billRepository = {
    getBillByIdBill: async(IdBill) =>{
        try{
            const billResult = Bill.findOne({_id: IdBill}).populate([
                {path:'idUser', select:'IdUser'},
                {path:'idProducts', select:'id name'}
            ]);
            //console.log(billResult);
            return billResult;
        } catch(err) {  
            throw err;
        }
    },

    getBillByIdUserAndDate: async(IDUser,date) =>{
        try{
            const beginDate = "00:00 " + date;
            const finishDate = "23:59 " +date;
            const billResult = Bill.find({$and: [{idUser: IDUser}, {time: {$gte: beginDate, $lt: finishDate}}]}).populate([
                {path:'idUser', select:'IdUser username'},
                {path:'idProducts', select:'id name price'},
                {path:'idPositions', select:'idPos letter color number'},
            ]);
            return billResult;
        } catch(err) {  
            throw err;
        }
    }
}

module.exports = billRepository