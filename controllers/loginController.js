const bcrypt = require('bcryptjs');
const User = require('../models/user');


async function login(req,res){
        const { email, password} = req.body;
    
        if (!email || !password) {
            return res.status(400).send('Введите email и пароль');
        }
    
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).send('Неверный email или пароль');
        }
    
        const isPasswodCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswodCorrect) {
            return res.status(400).send('Неверный email или пароль');
        }
    
        req.session.isAuthenticated = true;
        req.session.user = {
            _id: user._id,
            email: user.email,
            role: user.role,
            userDetails: user.userDetails,
        };
    
        res.redirect('/');
    }
module.exports={
    login
};
