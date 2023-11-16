// Подключение модуля для шифрования паролей
const bcrypt = require('bcryptjs');
// Импорт модели пользователя
const User = require('../models/user');

// Функция для регистрации нового пользователя
async function register(req, res) {
    // Получение email и password из запроса
    const { email, password } = req.body;

    // Проверка наличия email и password в запросе
    if (!email || !password) {
        return res.status(400).send('Введите email и пароль');
    }

    // Поиск пользователя по email в базе данных
    const existingUser = await User.findOne({ email });

    // Проверка наличия пользователя с таким email
    if (existingUser) {
        return res.status(400).send('Пользователь с таким email уже зарегистрирован');
    }

    // Хеширование пароля перед сохранением в базу данных
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Создание нового экземпляра пользователя
    const user = new User({
        email,
        password: hashedPassword,
    });

    try {
        // Сохранение нового пользователя в базе данных
        await user.save();
        res.send('Вы успешно зарегистрировались');
    } catch (err) {
        res.status(500).send('Ошибка при сохранении пользователя в базе данных');
    }
}

// Экспорт функции регистрации для использования в других частях приложения
module.exports = {
    register
};
