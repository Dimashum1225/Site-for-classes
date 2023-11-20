const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectToMongoDB = require('./database/connection');
const path = require('path');
const routes = require('./routes/routes');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/', routes);
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/img/avatars', express.static(path.join(__dirname, 'public', 'image', 'avatars')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Добавление папки 'views' как статической директории



app.get('/', (req, res) => {
    res.render('index', { session: req.session });
});
app.get('/Dmitry',(req,res)=>{
    res.render('Dmitry',{ session: req.session });
})
app.get('/Nurlan',(req,res)=>{
    res.render('Nurlan',{ session: req.session });
})
app.get('/Sergey',(req,res)=>{
    res.render('Sergey',{ session: req.session });
})

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

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    } catch (error) {
        console.error('Ошибка при подключении к базе данных:', error);
        // Добавить обработку ошибки для пользователя, если необходимо
    }
}

start();
