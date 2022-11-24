module.exports = {
    User : require("./users/users-model"),
    Role : require("./users/role-model"),
    Permission: require("./users/permision-model"),
    ExportGoods: require('./products/export-model'),
    ImportGoods: require('./products/import-model'),
    Inventory: require('./products/inventory-model'),
    OnSell: require('./products/onSell-model'),
    Product: require('./products/product-model'),
    Position: require('./position/position-model'),
    Moneycode: require('./moneycode/moneycode-model'),
    Bill: require('./products/bill-model')
}

