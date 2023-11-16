// Подключение модуля Express
const express = require('express');
// Создание экземпляра маршрутизатора Express
const router = express.Router();

// Функция для проверки аутентификации пользователя
function checkAuth(req, res, next) {
    // Проверка наличия пользователя в сессии или его роли (admin или user)
    if (!req.session.user || (req.session.user.role !== 'admin' && req.session.user.role !== 'user')) {
        // Перенаправление на страницу входа, если пользователь не аутентифицирован или его роль не подходит
        return res.redirect('/login');
    }
    // Переход к следующему обработчику, если аутентификация прошла успешно
    next();
}

// Маршрут обработки GET-запроса по корневому пути
router.get('/', checkAuth, async (req, res) => {
    // Отображение страницы index с передачей данных из сессии в объекте {session: req.session}
    res.render('index', { session: req.session });
});

// Экспорт маршрута для использования в других частях приложения
module.exports = router;
