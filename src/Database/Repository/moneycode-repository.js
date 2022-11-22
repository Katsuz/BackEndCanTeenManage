const {Moneycode} = require('./../Model');


const moneycodeRepository = {
    getAllMoneyCode: async() => {
        try {
            const result = Moneycode.find();
            return result;
        } catch (err) {
            throw err;
        }
    },

    getPriceFromCode: async(code) => {
        try {
            const result = Moneycode.findOne({code: code});
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = moneycodeRepository;