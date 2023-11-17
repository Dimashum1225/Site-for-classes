const express = require('express');
const router = express.Router();

const dashboardRoutes = require('./dashboardRoutes');
const indexRoutes = require('./index.Routes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const registerRoutes = require('./registerRoutes');
const addNewsRoutes = require('./addNewsRoutes')

router.use('/',indexRoutes);
router.use('/dashboard',dashboardRoutes);
router.use('/login',loginRoutes);
router.use('/logout',logoutRoutes);
router.use('/register',registerRoutes);
router.use('/dashboard',addNewsRoutes)
module.exports=router;