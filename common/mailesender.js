const nodemailer = require('nodemailer');

let sendMail = async (receiver, key) => {

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.mailUser,
                pass: process.env.mailPass 
            },
        });

        let mail = await transporter.sendMail({
            to: receiver, // list of receivers
            subject: "Password Rset", // Subject line
            text: `Your New Password is : ${key}`,
        },(err, info) => {
            if(err) return false
            return true
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendMail
}