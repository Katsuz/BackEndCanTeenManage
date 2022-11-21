const { OnSell } = require('../Model');
const { Product } = require('../Model');

const productRepository = {
    getCurrentProduct: async () => {
        try {

            let findO = await OnSell.
                find({}).
                populate('product');
            let todayProduct = [];
            for (let i = 0; i < findO.length; i++) {
                let item = {
                    id: findO[i].product.id,
                    type: findO[i].product.type,
                    img: findO[i].product.img,
                    total: findO[i].quantity,
                    name: findO[i].product.name,
                    price: findO[i].product.price
                }
                todayProduct[i] = item;
            }
            return todayProduct;
        } catch(err) {
            throw err;
        }

        //return todayProduct;
    }
}

module.exports = productRepository;