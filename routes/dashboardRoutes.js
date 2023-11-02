const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetails');
const User = require('../models/user');

router.get('/', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('dashboard', { session: req.session });
});

router.get('/user-data', (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.redirect('/dashboard');
    }
    res.render('UserDataForm', { session: req.session });
});

router.get('/profile/:id', async (req, res) => {
    try {
        const userDetails = await UserDetails.findOne({ user: req.params.id }).populate('user');
        if (!userDetails) {
            return res.redirect('/dashboard');
        }
        res.render('userProfile', { session: req.session, userDetails });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка на сервере');
    }
});

router.post('/user-data', async (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.redirect('/dashboard');
    }

    try {
        let userDetails = await UserDetails.findOne({ user: req.session.user._id });

        if (!userDetails) {
            userDetails = new UserDetails({
                nickname: req.body.nickname,
                avatarUrl: req.body.avatarUrl,
                about: req.body.about,
                user: req.session.user._id,
            });
        } else {
            userDetails.nickname = req.body.nickname;
            userDetails.avatarUrl = req.body.avatarUrl;
            userDetails.about = req.body.about;
        }

        await userDetails.save();

        const user = await User.findById(req.session.user._id);
        user.userDetails = userDetails._id;
        await user.save();

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка на сервере');
    }
});

module.exports = router;
