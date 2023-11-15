const express = require('express');
const router = express.Router();


function checkAuth(req, res, next) {
    if (!req.session.user || (req.session.user.role !== 'admin' && req.session.user.role !== 'user')) {
        return res. redirect('/login');
    }
    next();
}


router.get('/', checkAuth,async (req, res) => {
    res.render('index',{session:req.session});
});

module.exports = router;
