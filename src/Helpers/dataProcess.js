const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN } = require("../Config");

const salt = 10; // The number of rounds to secure the hash

//Genarate salt to hash
module.exports.genarateSalt = async () => {
    return await bcrypt.genSalt(salt);
};

//hashing password
module.exports.createHashPassword = async (password, saltGenarated) => {
    return await bcrypt.hash(password, saltGenarated);
};

//compare password login with password in database
module.exports.validatePassword = async (
    passwordLogin,
    hashedPasswordInDatabase
) => {
    const checkPassword = await bcrypt.compare(
        passwordLogin,
        hashedPasswordInDatabase
    );
    if (checkPassword) return true;
    return false;
};

//generate Token
module.exports.GenerateToken = (payload, secret, expire = "30d") => {
    const token = jwt.sign({ ...payload }, secret, { expiresIn: expire });
    return token;
};

//format ID
module.exports.FormatID = (numberOfCollection) => {
    resultNewID = numberOfCollection + "";
    while (resultNewID.length < 7) {
        resultNewID = "0" + resultNewID;
    }
    resultNewID = "US" + resultNewID;
    return resultNewID;
};

//generate ID product
module.exports.FormatID = (numberOfCollectionProduct) => {
    resultNewID = numberOfCollectionProduct + "";
    while (resultNewID.length < 7) {
        resultNewID = "0" + resultNewID;
    }
    resultNewID = "FF" + resultNewID;
    return resultNewID;
};

//Decode accessToken
module.exports.VerifyAccessToken = (req) => {
    //get token
    const token = req.headers.authorization;

    if (token) {
        try {
            const authHeader = req.headers.authorization;
            const BearerToken = authHeader.split(' ');
            const accessToken = BearerToken[1];

            const decode = jwt.verify(accessToken, ACCESS_TOKEN);

            req.user = decode;
            return true;

        } catch (err) {
            return false;
        }
    }
}

//format data
module.exports.formatData = (data) => {
    if (data) {
        return { ...data };
    }
    throw new Error("Data Not found!");
};
