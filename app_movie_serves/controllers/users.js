let {
    Email
} = require('../utils/config.js');
let login = async (req, res, next) => {

}
let register = async (req, res, next) => {

}
let verify = async (req, res, next) => {
    let email = req.query.email;
    let mailOptions = {
        from: 'movie ',
        to: email,
        subject: 'movie在线邮箱验证码',
        text: '验证码:' + Email.verify
    }
    Email.transporter.sendMail(mailOptions, (err) => {
        if (err) {
            res.send({
                msg: '验证码发送失败',
                status: -1
            })
        } else {
            res.send({
                msg: '验证码发送成功',
                status: 0
            })
        }
    });

    // res.send({
    //     msg:'test',
    //     status:0
    // })
}
let logout = async (req, res, next) => {

}
let getUser = async (req, res, next) => {

}
let findPassword = async (req, res, next) => {

}
module.exports = {
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword
}