const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/User')

module.exports = () =>
{
    passport.serializeUser((user,done)=>
    {
        done(null,user.user_id);
    });

    passport.deserializeUser((id,done)=>
    {
        User.findOne({where:{user_id:id}})
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });
    local();
};