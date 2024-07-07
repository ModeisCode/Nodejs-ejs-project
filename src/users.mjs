import express from 'express';
import { body, validationResult } from 'express-validator';
import insertUser from './insertUser.mjs';

const router = express.Router();

const users = [
  {
    username: "johndoe",
    password: "password123",
    email: "johndoe@example.com"
  },

];

router.get('/users', (req, res) => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.render("../templates/user.ejs", { user: { username: randomUser.username, email: randomUser.email } });
});

router.post('/users', [
  body('username').notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters long'),
  body('password').notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be at least 6 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;
    console.log("---");
    console.log(username);
    try {
      await insertUser(username, password, email);
      res.status(201).send('User created successfully');
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        console.error('Validation errors:', err.errors);
        res.status(400).send('Validation errors');
      } else {
        console.error('Error saving user:', err);
        res.status(500).send('Error saving user');
      }
    }
  });

export default router;