import { validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import dataSource from './../db/data-source';

export const userRepository = dataSource.getRepository(User);

const hashPassword = async (userData: Partial<User>) => {
  if (userData.password) {
    // Use 15 encryption rounds to generate the hash salt.
    const salt = await bcrypt.genSalt(15);

    // Hash the password before saving it to DB for security reasons
    const passwordHash = await bcrypt.hash(userData.password, salt);
    userData.password = passwordHash;
  }
};

export const validateUserData = async (userData: Partial<User>) => {
  const newUser = new User();
  Object.assign(newUser, userData);
  return await validate(newUser);
};

export const getUsers = async () => {
  return await userRepository.find();
};

export const getUserById = async (id: number) => {
  return await userRepository.findOneBy({ id });
};

export const getUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const createUser = async (userData: User) => {
  await hashPassword(userData);
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
};

export const updateUser = async (
  id: number,
  updatedUserData: Partial<User>
) => {
  await hashPassword(updatedUserData);
  const result = await userRepository.update(id, updatedUserData);
  return result.affected === 1;
};

export const deleteUser = async (id: number) => {
  const result = await userRepository.delete(id);
  return result.affected === 1;
};