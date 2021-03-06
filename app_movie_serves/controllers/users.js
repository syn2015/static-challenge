let {
    Email
} = require('../utils/config.js');
let UserModel = require('../models/users.js')
let login = async (req, res, next) => {

}
let register = async (req, res, next) => {
    console.log('reigister,', req.body);
    // post请求
    var {
        username,
        password,
        email,
        verify
    } = req.body;
    console.log('req.session,',req.session);
    if (email !== req.session.email || verify !== req.session.verify) {
        res.send({
            msg: '验证码错误',
            status: -1
        })
        return;
    }
    // 数据库操作
    var result = await UserModel.save({
        username,
        password,
        email
    });
    console.log('result,',result);
    // 判断
    if (result) {
        res.send({
            msg: '注册成功',
            status: 0
        })


    } else {
        res.send({
            msg: '注册失败',
            status: -2
        })

    }
}
let verify = async (req, res, next) => {
    console.log(req.query.email, Email.verify)
    let email = req.query.email;
    let verify = Email.verify;
    // 持久化session和email到服务器中的内存
    req.session.verify = verify;
    req.session.email = email;
    console.log( '/verify,req.session,', req.session)
    // 同时需要存入到redis缓存中

    let mailOptions = {
        from: '1816540197@qq.com',
        to: email,
        subject: 'movie在线邮箱验证码',
        text: '验证码:' + verify
    }
    // debugger;
    Email.transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err);
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