const { Product } = require('./../Database/Model');
const { OnSell } = require('./../Database/Model');
const { Position } = require('./../Database/Model');

class PositionController {
    createPositionCode = async (req, res, next) => {
        try {
            console.log(req.body);

            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }

    setPositionCode = async (req, res, next) => {
        try {
            let corlorArr = req.body.color;
            let letterArr = req.body.letter;
            let numPCArr = req.body.numPerColor;

            

            res.json({
                message: "success"
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PositionController;