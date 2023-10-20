const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectToMongoDB = require('./database/connection');
const path = require('path');
const routes=require('./routes/routes');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();
const store = new MongoDBStore({
    uri:process.env.MONGODB_URI,
    collection:'sessions'
})
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:'secret key',
    resave:false,
    saveUninitialized:false,
    store:store
}))
app.use('/',routes);
app.get('/', (req, res) => {
    res.render('index',{session:req.session});
});
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});
async function start() {
    try {
        const uri = await connectToMongoDB();
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(3000, () => {
            console.log('Сервер запущен на порту 3000');
        });

    } catch (error) {
        console.log(error);
    }
}

start();
