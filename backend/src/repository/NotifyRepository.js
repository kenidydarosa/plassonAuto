import BaseRepository from './BaseRepository.js';
const columnsArray = ['title', 'summary', 'visualized', 'user_id', 'schedule_id'];

class NotifyRepository extends BaseRepository {
  async getAll(whereColumn = null, whereValue = null) {
    try {
      const response = await super.getAll('notify', ['*'], whereColumn, whereValue);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getByID(id) {
    try {
      const response = await super.getByID('notify', ['*'], id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(valuesArray, whereColumn = null, whereValue = null) {
    try {
      const response = await super.create(
        'notify',
        columnsArray,
        valuesArray,
        whereColumn,
        whereValue
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  async update(valuesArray, id) {
    try {
      const response = await super.update('notify', columnsArray, valuesArray, id);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await super.delete('notify', id);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default NotifyRepository;
