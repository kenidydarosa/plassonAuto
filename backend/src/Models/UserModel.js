import BaseModel from './BaseModel.js';
import { openDb } from '../db/conn.js'

const columnsArray = [
  'name',
  'username',
  'password',
  'job',
  'sector_id',
  'registration',
  'email',
  'status'
];
class UserModel extends BaseModel {
  async login(username, password) {
    const db = await openDb();
    try {
      const queryText = `SELECT * FROM users WHERE username = ? AND password = ?`;
      const response = await db.get(queryText, [username, password]);

      delete response.password;
      return response;

    } catch (error) {
      throw error;
    } finally {
      await db.close();
    }
  }
  async getAll() {
    try {
      const response = await super.getAll('users', ['*']);
      delete response.password;

      return response;
    } catch (error) {
      throw error;
    }
  }
  async getByID(id) {
    try {
      const response = await super.getByID('users', ['*'], id);
      delete response.password;

      return response;
    } catch (error) {
      throw error;
    }
  }
  async create(valuesArray) {
    try {
      const response = await super.create('users', columnsArray, valuesArray);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(valuesArray, id) {
    try {
      const response = await super.update('users', columnsArray, valuesArray, id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await super.delete('users', id);
      return response;
    } catch (error) {}
  }
}

export default UserModel;
