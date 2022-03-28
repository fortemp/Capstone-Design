const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 2;

const RoomSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    people:{
        type:Number,
        default:2,
        max:7,
    },
    password:{
        type: String,
        minlength: 4
    },
})

RoomSchema.pre('save',function(next){//save함수 하기전에하는 함수
    let room = this;

    if(room.isModified('password'))
    {
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err)
                return next(err)
    
            bcrypt.hash(room.password,salt,function(err,hash){
                if(err)
                    return next(err)
                room.password = hash;
                next()
            })
    
        })
    }else{
        next();
    }
})
RoomSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err)
            return cb(err)
        cb(null,isMatch)
    })
}
const Room= mongoose.model('Room',RoomSchema)
module.exports = {Room}