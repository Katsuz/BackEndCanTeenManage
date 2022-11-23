const { Product } = require('./../Database/Model');
const { OnSell } = require('./../Database/Model');
const { Position } = require('./../Database/Model');

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

    setPositionCode = async (req, res, next) => {
        try {
            let corlorArr = req.body.color;
            let letterArr = req.body.letter;
            let numPC = req.body.numPerColor;

            await Position.deleteMany(); //delete old position code

            for (let i = 0; i < letterArr.length; i++) {
                for (let j = 0; j < corlorArr.length; j++) {
                    for (let k = 1; k <= numPC; k++) {

                        let status = false;
                        let letter = letterArr[i];
                        let number = k;
                        let color = corlorArr[j].color;
                        let id = letter + number;
                        let itemPosition = {
                            idPos: id,
                            status: status,
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
}

module.exports = new PositionController;