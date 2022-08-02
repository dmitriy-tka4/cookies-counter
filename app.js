import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cookieParser());

app.set('views', path.resolve(__dirname, 'views'));
nunjucks.configure('views', {
  express: app,
  noCache: true
});
app.set('view engine', 'njk');

app.get('/', (req, res) => {
  // console.log(req.cookies);

  let counter = Number(req.cookies['counter']); // преобразуем строку в число

  if (!counter) {
    counter = 1;
  } else {
    counter++;
  }

  res.cookie('counter', counter);

  res.render('index.njk', { counter });
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));
