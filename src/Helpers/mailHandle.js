const transporter = require('./../Config/nodemailerConfig');
const {forgotPassMailTemplate} = require('./../Public/mailService');


module.exports.sendingMail = async(email, newPassword) => {
    try {
        const {data} = forgotPassMailTemplate(email,newPassword);
        
        //send data to mail
        await transporter.sendMail(data);
    } catch(err) {
        throw err;
    }
}