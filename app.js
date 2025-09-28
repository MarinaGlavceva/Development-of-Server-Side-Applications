require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

app.disable('x-powered-by');
app.locals.appName = process.env.APP_NAME || 'TodoApp';

// view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

// РОУТЫ из файлов (важно!)
app.use('/', require('./src/routes/todoRoutes'));
app.use('/', require('./src/routes/staticRoutes'));

// 404 через контроллер ошибок
app.use(require('./src/controllers/errorController').notFound);

const PORT = process.env.PORT || 3000;
const NAME = process.env.APP_NAME || 'TodoApp';
const MODE = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`[${NAME}] слушает http://localhost:${PORT} (${MODE})`);
});
