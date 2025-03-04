import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './../services/user.service';

const authController = Router();

/**
 * Login endpoint
 */
authController.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Email or password is missing.');
    return;
  }

  // Check if the user exists in the DB
  const user = await getUserByEmail(email);

  if (user) {
    /* We use Bcrypt to compare the hash of the request body
      password with the hashed password saved in the DB. */
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      res.json(true);
    } else {
      res.status(401).send('Wrong password.');
    }
  } else {
    res.status(404).send(`User with email ${email} was not found.`);
  }
});

export default authController;
