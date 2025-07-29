const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

const USERS_FILE = './users.json';

// Регистрация
app.post('/register', (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.json({message: 'Заполните все поля!'});
  }
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
  }
  if (users.find(u => u.username === username)) {
    return res.json({message: 'Пользователь уже существует!'});
  }
  users.push({username, password});
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({message: 'Регистрация успешна!'});
});

// Вход
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (!fs.existsSync(USERS_FILE)) {
    return res.json({message: 'Нет зарегистрированных пользователей!'});
  }
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({message: 'Вход выполнен успешно!'});
  } else {
    res.json({message: 'Неверный логин или пароль!'});
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});