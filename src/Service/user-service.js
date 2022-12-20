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

const userService = {
    logout: async (_id) => {
        try {
            await userRepository.UpdateSateUserById(_id, false);
        } catch (err) {
            throw err;
        }
    },

    getProfile: async (id) => {
        try {
            const userInfo = await userRepository.FindUserById(id);
            if (!userInfo) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            return formatData({ userInfo })
        } catch {
            throw err;
        }
    },

    updateProfileUser: async (id, username) => {
        try {
            let user = await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            user = await userRepository.UpdateProfileUserById(id, username);

            return formatData({
                user
            })
        } catch (err) {
            throw err;
        }
    },

    updatePasswordUser: async (id, confirmPassword, newPassword) => {
        try {
            const user = await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };

            const compareOldPassword = await validatePassword(confirmPassword, user.password);
            if (!compareOldPassword) {
                throw new Error('old password incorrect', {
                    cause: status.BAD_REQUEST
                });
            }

            const salt = await genarateSalt();
            const passwordHashed = await createHashPassword(newPassword, salt);

            await userRepository.UpdatePasswordUserById(id, passwordHashed);

            const userUpdated = await userRepository.FindUserById(id);
            return formatData({
                userUpdated
            })

        } catch (err) {
            throw err;
        }
    },

    addProperty: async (id, codePrice) => {
        try {
            const user = await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };
            const listCode = await moneycodeRepository.getAllMoneyCode();

            //check code
            if (!listCode.some((e) => {
                return e.code === codePrice;
            })) {
                throw new Error('your code input not exist', {
                    cause: status.NOT_FOUND
                })
            }

            //Lay gia tien tu code
            const _price = await moneycodeRepository.getPriceFromCode(codePrice);
            //Lay tien nguoi dung
            //Cong tien
            const newProperty = _price.price + user.property;
            //Update tien moi

            await userRepository.UpdatePropertyUserById(id, newProperty);

            const userUpdated = await userRepository.FindUserById(id);
            return formatData({
                userUpdated
            })

        } catch (err) {
            throw err;
        }
    },

    getUncompleteBill: async (id) => {
        try {

            const idUncompleteBill = await billService.getOneUncompletedBillByUser_ID(id);

            let result = [];

            for (let i = 0; i < idUncompleteBill.length; i++) {
                let billUncomplete = await billRepository.getBillByIdBill(idUncompleteBill[i]);
                let data = [];
                for (let k = 0; k < billUncomplete.idProducts.length; k++) {
                    //console.log(billUncomplete.idProducts[k].type)
                    if (billUncomplete.idProducts[k].type == "noGas" || billUncomplete.idProducts[k].type == "gas"){
                        let temp = {
                            idProduct: billUncomplete.idProducts[k].id,
                            nameProduct: billUncomplete.idProducts[k].name,
                            position: "",
                            colorPos: "",
                            statusProduct: billUncomplete.statusProducts[k],
                            quantity: billUncomplete.quantity[k],
                        };
                        data.push(temp);
                    } else {
                        let temp = {
                            idProduct: billUncomplete.idProducts[k].id,
                            nameProduct: billUncomplete.idProducts[k].name,
                            position: billUncomplete.letterPositions[k] + billUncomplete.numberPositions[k],
                            colorPos: billUncomplete.colorPositions[k],
                            statusProduct: billUncomplete.statusProducts[k],
                            quantity: billUncomplete.quantity[k],
                        };
                        data.push(temp);
                    }
                }

                let idUser = billUncomplete.idUser.IdUser;
                let idBill = billUncomplete.idBill;
                let dataTemp = formatData({
                    idUser,
                    idBill,
                    data
                })
                result.push(dataTemp);
            }


            return formatData({
                result
            })
        } catch (err) {
            throw err;
        }
    },

    getHistoryBillByDate: async (id, date) => {
        try {
            let user = await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };

            const billByDate = await billRepository.getBillByIdUserAndDate(id, date);
            let result = [];

            let data = [];
            for (let i = 0; i < billByDate.length; i++) {
                let temp = {
                    nameProduct: billByDate[i].idProducts[i].name,
                    quantity: billByDate[i].quantity[i],
                    price: billByDate[i].idProducts[i].price,
                };
                data.push(temp);
                let time = billByDate[i].time;
                let username = billByDate[i].idUser.username;
                let idUser = billByDate[i].idUser.IdUser;
                let idBill = billByDate[i].idBill;
                let positions = billByDate[i].idPositions;
                let products = billByDate[i].idProducts;
                let dataTemp = formatData({
                    time,
                    username,
                    idUser,
                    idBill,
                    dataProduct: data,
                    positions,
                    products
                })
                result.push(dataTemp);
            }



            return result;
        } catch (err) {
            throw err;
        }
    },

    updateImageUser: async(id, image) => {
        try {
            let user = await userRepository.FindUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            };

            user = await userRepository.UpdateImageUser(id, image);

            return formatData({
                user
            })

        } catch (err) {
            throw err;
        }
    }
}

module.exports = userService;