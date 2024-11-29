import BaseRepository from './BaseRepository.js';
const columnsArray = ['title', 'summary', 'visualized', 'user_id', 'schedule_id'];

class NotifyRepository extends BaseRepository {
  async getAll(
    whereColumn1 = null,
    whereValue1 = null,
    whereColumn2 = null,
    whereValue2 = null
  ) {
    try {
      const response = await super.getAll(
        'notify',
        ['*'],
        whereColumn1,
        whereValue1,
        whereColumn2,
        whereValue2
      );

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

  async create(
    valuesArray,
    whereColumn1 = null,
    whereValue1 = null,
    whereColumn2 = null,
    whereValue2 = null
  ) {
    try {
      const response = await super.create(
        'notify',
        columnsArray,
        valuesArray,
        whereColumn1,
        whereValue1,
        whereColumn2,
        whereValue2
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  async update(
    valuesArray,
    id,
    whereColumn1 = null,
    whereValue1 = null,
    whereColumn2 = null,
    whereValue2 = null) 
   {
    try {
      const response = await super.update(
        'notify',
         columnsArray,
         valuesArray,
         id,
         );
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
