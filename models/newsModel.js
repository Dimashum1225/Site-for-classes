const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Подключение модуля Schema из mongoose для создания схемы

// Создание схемы для новостей
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Заголовок новости, тип String, обязательное поле
  category: { type: String, required: true }, // Категория новости, тип String, обязательное поле
  description: { type: String, required: true }, // Описание новости, тип String, обязательное поле
  poster: { type: String, required: true }, // Путь к изображению новости, тип String, обязательное поле
  createdAt: { type: Date, default: Date.now }, // Дата создания новости, тип Date, значение по умолчанию - текущая дата
  postId: { type: String, required: true, unique: true } // Идентификатор новости, тип String, обязательное поле, уникальное значение
});

const News = mongoose.model('News', newsSchema); // Создание модели News на основе схемы newsSchema
module.exports = News; // Экспорт модели News для использования в других файлах
