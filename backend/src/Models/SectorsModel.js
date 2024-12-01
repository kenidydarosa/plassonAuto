import BaseModel from './BaseModel.js';

class sectorsModel extends BaseModel {
  async getAll(whereColumn = null, whereValue = null) {
    try {
      const response = await super.getAll('sectors', ['*'], whereColumn, whereValue);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async getByID(id) {
    try {
      const response = await super.getByID('sectors', ['*'], id);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(valuesArray) {
    try {
      const response = await super.create('sectors', ['name'], valuesArray);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(valuesArray, id) {
    try {
      const response = await super.update('sectors', ['name'], valuesArray, id);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const response = await super.delete('sectors', 'id');

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default sectorsModel;