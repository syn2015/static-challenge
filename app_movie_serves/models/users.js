var mongoose = require('mongoose');
// 使unique生效
mongoose.set('useCreateIndex',true);
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
var UserModel = mongoose.model('user', UserSchema);
// 使unique生效
UserModel.createIndexes();
var save = async (data) => {
    var user = new UserModel(data);
    return  user.save()
                .then(() => {
                    return true;
                })
                .catch(() => {
                    return false;
                })
}
module.exports = {
    save
}