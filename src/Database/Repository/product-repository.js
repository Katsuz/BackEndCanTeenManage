const { OnSell } = require('../Model');
const { Product } = require('../Model');

const productRepository = {
    GetCurrentProduct: async () => {
        try {

            let findO = await OnSell.
                find({}).
                populate('product');
            let riceArr = [];
            let noodlesArr = [];
            let gasArr = [];
            let noGasArr = [];
            let cakeArr = [];
            for (let i = 0; i < findO.length; i++) {
                let item = {
                    id: findO[i].product.id,
                    img: findO[i].product.img,
                    quantity: findO[i].quantity,
                    name: findO[i].product.name,
                    price: findO[i].product.price
                }

                if (findO[i].product.type == "rice"){
                    riceArr.push(item);
                }
                if (findO[i].product.type == "noodles"){
                    noodlesArr.push(item);
                }
                if (findO[i].product.type == "gas"){
                    gasArr.push(item);
                }
                if (findO[i].product.type == "noGas"){
                    noGasArr.push(item);
                }
                if (findO[i].product.type == "cake"){
                    cakeArr.push(item);
                }
            }
            
            let todayProduct = {
                "rice": riceArr,
                "noodles": noodlesArr,
                "gas": gasArr,
                "noGas": noGasArr,
                "cake": cakeArr
            };

            return todayProduct;
        } catch(err) {
            throw err;
        }

        //return todayProduct;
    }
}

module.exports = productRepository;