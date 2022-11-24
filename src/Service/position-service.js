const { status, expire } = require('../Constant');
const { userRepository, roleRepository, moneycodeRepository, billRepository } = require('./../Database');
const billService = require('./../Public/billService');

const {
    genarateSalt,
    validatePassword,
    createHashPassword,
    GenerateToken,
    FormatID,
    formatData
} = require('./../Helpers')

const positionService = {
    getListBillUncomplete: async() => {
        try {
            const idUncompleteBill = await billService.getAllUncompletedBillByUser_ID();

            let result = [];

            for (let i = 0; i < idUncompleteBill.length; i++) {
                let billUncomplete = await billRepository.getBillByIdBill(idUncompleteBill[i]);
                let data = [];
                for (let k = 0; k < billUncomplete.idProducts.length; k++) {
                    let temp = {
                        idProduct: billUncomplete.idProducts[k].id,
                        nameProduct: billUncomplete.idProducts[k].name,
                        position: billUncomplete.idPositions[k].idPos,
                        colorPos: billUncomplete.idPositions[k].color,
                        statusProduct: billUncomplete.statusProducts[k],
                        quantity: billUncomplete.quantity[k]
                    };
                    data.push(temp);
                }

                let idUser = billUncomplete.idUser.IdUser;
                let idBill = billUncomplete.idBill;
                let dataTemp = formatData({
                    idUser,
                    idBill,
                    dataProduct: data
                })
                result.push(dataTemp);
            }
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = positionService;