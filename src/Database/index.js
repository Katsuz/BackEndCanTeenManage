module.exports = {
    userRepository: require('./Repository/user-repository'),
    roleRepository: require('./Repository/role-repository'),
    productRepository: require('./Repository/product-repository'),
    mongoConnection: require('./connect')
}