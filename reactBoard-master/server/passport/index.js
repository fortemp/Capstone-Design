const passport = require('passport');
const local = require('./localStrategy');
const {User} = require('../models/User')

module.exports = () =>
{
    passport.serializeUser((user,done)=>
    {
        done(null,user._id);
    });

    passport.deserializeUser((id,done)=>
    {
        console.log('디시리얼라이즈됨')
        User.findOne({_id:id})
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });
    local();
};