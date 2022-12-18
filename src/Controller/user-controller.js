const { status } = require('./../Constant');
const { userService } = require('./../Service');
const { Product, Position } = require('./../Database/Model');
const { OnSell } = require('./../Database/Model');
const { Bill } = require('./../Database/Model');
const { User } = require('./../Database/Model');
const sleep = require('../Public/sleep')
const billservice = require('../Public/billService');
const { findOne } = require('../Database/Model/users/users-model');
const usersModel = require('../Database/Model/users/users-model');

class UserController {
    logout = async (req, res, next) => {
        try {
            const { _id } = req.user;
            await userService.logout(_id);
            res.status(status.OK).json({
                message: 'logout sucessfully',
                data: null
            });
        } catch (err) {
            next(err);
        }
    };

    getProfile = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { userInfo } = await userService.getProfile(_id);

            res.status(status.OK).json({
                message: 'get profile user successfuly',
                data: userInfo,
            })
        } catch (err) {
            next(err);
        }
    };

    updateProfileUser = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { username } = req.body;
            const { user } = await userService.updateProfileUser(_id, username);

            res.status(status.OK).json({
                message: 'change profile user successfuly',
                data: user,
            })
        } catch (err) {
            next(err);
        }
    };

    updatePasswordUser = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { confirmPassword, newPassword } = req.body;
            const { userUpdated } = await userService.updatePasswordUser(_id, confirmPassword, newPassword);

            res.status(status.OK).json({
                message: 'change password user successfuly',
                data: userUpdated,
            })
        } catch (err) {
            next(err);
        }
    };

    addProperty = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { codePrice } = req.body;
            const { userUpdated } = await userService.addProperty(_id, codePrice);

            res.status(status.OK).json({
                message: 'add property user successfuly',
                data: userUpdated,
            })
        } catch (err) {
            next(err);
        }
    };

    createBill = async (req, res, next) => {
        try {
            const { _id } = req.user;
            let listProducts = req.body.product;
            let numPosNeed = 0;

            let findBill = await Bill.find({});
            let newID = 0;
            let resultNewID = '';

            let today = new Date();
            let buyTime = today.getHours() + ':' + today.getMinutes() + ' ' +
                today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            //create new bill id
            if (findBill.length == 0) {
                resultNewID = 'HD0000000';
            } else {
                let curID = findBill[findBill.length - 1].idBill;

                curID = curID.slice(2);
                newID = 1 + parseInt(curID[0]) * 1000000 + parseInt(curID[1]) * 100000 + parseInt(curID[2]) * 10000
                    + parseInt(curID[3]) * 1000 + parseInt(curID[4]) * 100 + parseInt(curID[5]) * 10 + parseInt(curID[6]);

                resultNewID = newID + '';
                while (resultNewID.length < 7) {
                    resultNewID = '0' + resultNewID;
                }
                resultNewID = 'HD' + resultNewID;
            }

            for (let i = 0; i < listProducts.length; i++) {
                let id = listProducts[i].id;
                let number = listProducts[i].number;

                let findO = await OnSell.
                    find({}).
                    populate('product');

                for (let j = 0; j < findO.length; j++) {
                    if (findO[j].product.id == id) {
                        numPosNeed++;
                        if (number > findO[j].quantity) {
                            res.json({
                                message: "do not enought product to buy"
                            });
                            return;
                        }
                        if (findO[j].product.type == "cake" || findO[j].product.type == "gas"
                            || findO[j].product.type == "noGas") {
                            numPosNeed--;
                        }
                    }
                }
            }

            //check enough empty position
            let findEmpty = await Position.find({ isEmpty: true });
            if (findEmpty.length < numPosNeed) {
                res.json({
                    message: "queue is not enought now"
                });
                return;
            }

            let productIDArr = [];
            let positionIDArr = [];
            let statusCompleteArr = [];
            let quantityArr = [];

            for (let i = 0; i < listProducts.length; i++) {
                let id = listProducts[i].id;
                let number = listProducts[i].number;

                let findO = await OnSell.
                    find({}).
                    populate('product');

                for (let j = 0; j < findO.length; j++) {
                    if (findO[j].product.id == id) {

                        findO[j].quantity = findO[j].quantity - number;
                        await findO[j].save();


                        if (findO[j].product.type == "cake" || findO[j].product.type == "gas"
                            || findO[j].product.type == "noGas") {
                            await Product.findOneAndUpdate({ id: id }, { total: findO[j].quantity });
                            let emptyPosition = await Position.findOne({});
                            positionIDArr.push(emptyPosition._id);
                        } else {
                            let emptyPosition = await Position.findOneAndUpdate({ isEmpty: true }, { isEmpty: false });
                            positionIDArr.push(emptyPosition._id);
                        }

                        productIDArr.push(findO[j].product._id);
                        quantityArr.push(number);
                        statusCompleteArr.push("doing");

                    }
                }
            }

            let itemBill = {
                idBill: resultNewID,
                idUser: _id,
                idProducts: productIDArr,
                idPositions: positionIDArr,
                statusProducts: statusCompleteArr,
                quantity: quantityArr,
                typeBill: "online",
                paymentStatus: "pending",
                time: buyTime
            }
            let newBill = new Bill(itemBill);
            await newBill.save();

            const billRes = await billservice.getBillInfo(resultNewID);

            res.status(status.OK).json({
                message: 'successfully',
                data: billRes
            })

            await sleep.sleep(20000);

            let curBill = await Bill.find({ idBill: resultNewID });

            if (curBill.length != 0) {
                //roll back

                if (curBill[0].paymentStatus == "pending") {
                    //function roll back input idBill
                    await billservice.rollBack(resultNewID);
                }
            }

        } catch (err) {
            next(err);
        }
    }

    confirmBill = async (req, res, next) => {
        try {
            const { _id } = req.user;
            let idBill = req.body.idBill;
            let paymentStatus = req.body.confirm;

            let findBill = await Bill.find({ idBill: idBill });
            if (findBill.length == 0) {
                res.status(status.OK).json({
                    message: 'Bill has been deleted (time out of bill waiting time)',
                })
                return;
            } else {
                findBill[0].paymentStatus = "transaction";
                await findBill[0].save();
            }

            if (!paymentStatus) {

                await billservice.rollBack(idBill);

                res.status(status.OK).json({
                    message: 'successfully delete bill',
                })
                return;

            }

            const curBill = await billservice.getBillInfo(idBill);
            const totalCost = curBill.totalCost;

            let findUser = await User.findOne({ _id: _id });
            if (totalCost > findUser.property) {

                await billservice.rollBack(idBill);

                res.status(status.OK).json({
                    message: 'Bill has been deleted (insufficient funds in the account)',
                })
                return;
            }

            findUser.property = findUser.property - totalCost;
            await findUser.save();

            findBill[0].paymentStatus = "done";
            await findBill[0].save();

            res.status(status.OK).json({
                message: 'successfully',
            })

        } catch (err) {
            next(err);
        }
    };

    getUncompleteBill = async (req, res, next) => {
        try {

            const { _id } = req.user;
            const billUncomplete = await userService.getUncompleteBill(_id);
            res.status(status.OK).json({
                message: 'successfully',
                billUncomplete
            })
        } catch (err) {
            next(err);
        }

    };

    getHistoryBill = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const {date} = req.body;

            const BillOfUser = await userService.getHistoryBillByDate(_id,date);
            res.status(status.OK).json({
                message: 'successfully',
                BillOfUser
            })
        } catch (err) {
            next(err);
        }
       
    }
}

module.exports = UserController;