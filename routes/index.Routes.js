const express = require('express');
const router = express.Router();

router.get('/', checkAuth (req, res) => {
    res.render('index',{session:req.session});
});

module.exports = router;
