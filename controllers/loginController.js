// Подключение модуля для шифрования паролей
const bcrypt = require('bcryptjs');
// Импорт модели пользователя
const User = require('../models/user');

// Обработчик для входа пользователя
async function login(req, res) {
    // Получение email и password из запроса
    const { email, password } = req.body;

    // Проверка наличия email и password в запросе
    if (!email || !password) {
        return res.status(400).send('Введите email и пароль');
    }

    // Поиск пользователя по email в базе данных
    const user = await User.findOne({ email });
    
    // Проверка наличия пользователя
    if (!user) {
        return res.status(400).send('Неверный email или пароль');
    }

    // Сравнение введенного пароля с зашифрованным паролем в базе данных
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send('Неверный email или пароль');
    }

    // Установка флага аутентификации в сессии и сохранение данных пользователя
    req.session.isAuthenticated = true;
    req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        userDetails: user.userDetails,
    };

    // Перенаправление на главную страницу после успешной аутентификации
    res.redirect('/');
}

// Экспорт обработчика входа для использования в других частях приложения
module.exports = {
    login
};
