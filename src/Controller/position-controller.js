const { Product } = require('./../Database/Model');
const { OnSell } = require('./../Database/Model');
const { Position } = require('./../Database/Model');
const {status} = require('./../Constant');
const {positionService} = require('./../Service');
const billservice = require('../Public/billService');


class PositionController {
    createPositionCode = async (req, res, next) => {
        try {

            let corlorArr = req.body.color;
            let letterArr = req.body.letter;
            let numPC = req.body.numPerColor;

            await Position.deleteMany({}); //delete old position code

            for (let i = 0; i < letterArr.length; i++) {
                for (let j = 0; j < corlorArr.length; j++) {
                    for (let k = 1; k <= numPC; k++) {

                        let status = true;
                        let letter = letterArr[i];
                        let number = k;
                        let color = corlorArr[j].color;
                        let id = letter + number;
                        let itemPosition = {
                            idPos: id,
                            isEmpty: status,
                            letter: letter,
                            number: number,
                            color: color
                        }
                        
                        let newPosition = new Position(itemPosition);
                        await newPosition.save();
                    }
                }
            }

            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    setEmptyPositionCode = async (req, res, next) => {
        try {

            let arrPosition = req.body.listPosition;
            for (let i = 0; i < arrPosition.length; i++){
                await Position
                .findOneAndUpdate({color: arrPosition[i].color, letter: arrPosition[i].letter, number: arrPosition[i].number},
                    {isEmpty: true});
            }

            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    getPositionTableColor = async (req, res, next) => {
        try {
            let temp = await Position.find().distinct('color');
            
            res.json({
                colors: temp
            })

        } catch (error) {
            next(error);
        }
    };

    getListBillUncomplete = async(req,res,next) => {
        try {
            const listBill = await positionService.getListBillUncomplete();
            
            res.status(status.OK).json({
                message:"get list success",
                data: listBill
            })

        } catch (error) {
            next(error);
        }
    };

    getListBillUncompleteByID = async(req,res,next) => {
        try {
            const listBill = await positionService.getListBillUncompleteByID(req.body.idBill);
            
            res.status(status.OK).json({
                message:"get list success",
                data: listBill
            })

        } catch (error) {
            next(error);
        }
    };

    setStatusProduct = async(req,res,next) => {
        try {
            const listBill = req.body.listBill;
            for (let i = 0; i < listBill.length; i++){
                for (let j = 0; j < listBill[i].products.length; j++){
                    await billservice.setDoneStatusProductInBillByID(listBill[i].idBill, listBill[i].products[j]);
                }
            }
            
            res.status(status.OK).json({
                message:"set status product success"
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PositionController;