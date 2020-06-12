let mongoose = require('mongoose');
let nodemailer = require('nodemailer');

let Mongoose = {
    url: 'mongodb://localhost:27017/movie',
    connect() {
        mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log('connect failed');
                return;
            }
            console.log('connect successful');
        })
    }

}
let Email = {
    config: {
        host: 'smtp.qq.com',
        port: 587,
        secureConnection: true, // 使用了 SSL
        auth: {

            user: '1816540197@qq.com',
            pass: 'qgklewwqgcemehdj'
        },

    },
    get transporter() {
        return nodemailer.createTransport(this.config);
    },
    get verify() {
        return Math.random().toString().substring(2, 6);
    }

}
module.exports = {
    Mongoose,
    Email
}