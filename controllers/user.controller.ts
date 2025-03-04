import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  validateUserData,
} from './../services/user.service';

const userController = Router();

/**
 * Get all users endpoint
 */
userController.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Get data of a specific user, by ID.
 *
 * @param {number} id - The ID of the user
 */
userController.get('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      res.status(400).send('Invalid user ID.');
      return;
    }

    const user = await getUserById(userId);
    res.json(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Create a new user.
 */
userController.post('/', async (req, res) => {
  const userData = req.body;

  const dataValidationErrors = await validateUserData(userData);

  if (dataValidationErrors.length > 0) {
    res.status(400).send('Invalid user data.');
    return;
  }

  try {
    const newUser = await createUser(userData);
    res.json(newUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Update an existing user
 */
userController.patch('/:id', async (req, res) => {
  const userId = Number(req.params.id);
  const updatedUserData = req.body;

  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID.');
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    res.status(404).send(`User with ID ${userId} was not found.`);
    return;
  }

  const dataValidationErrors = await validateUserData({
    ...user,
    ...updatedUserData,
  });

  if (dataValidationErrors.length > 0) {
    res.status(400).send('Invalid user data.');
    return;
  }

  try {
    const result = await updateUser(userId, updatedUserData);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * Delete an existing user
 */
userController.delete('/:id', async (req, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID.');
  }

  try {
    const result = await deleteUser(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default userController;
