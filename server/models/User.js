const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 4
    },
    money:{
        type:Number,
        default: 10000
    },
    image:String,
})

UserSchema.pre('save',function(next){//save함수 하기전에하는 함수
    let user = this;//삽입하려고 하는 유저의 password

    if(user.isModified('password'))
    {
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err)
                return next(err)
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err)
                    return next(err)
                user.password = hash;
                next()
            })
    
        })
    }else{
        next();
    }

})
UserSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err)
            return cb(err)
        cb(null,isMatch)
    })
}
const User = mongoose.model('User',UserSchema)
module.exports = {User}