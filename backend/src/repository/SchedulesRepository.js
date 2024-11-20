import BaseRepository from './BaseRepository.js';

const columnsArray = [
    'user_id',
    'veicule_id',
    'title',
    'summary',
    'color',
    'locale',
    'start',
    'end',
    'allDay',
    'keyHandOverTime',
    'returnOfKeyTime',
    'status',
    'notes',
  ];

class SchedulesRepository extends BaseRepository {
  async getAll(whereColumn = null, whereValue = null) {
    try {
      const response = await super.getAll('schedules', ['*'], whereColumn, whereValue);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async getByID(id) {
    try {
      const response = await super.getByID('schedules', ['*'], id);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(valuesArray) {
    try {
      const response = await super.create('schedules', columnsArray, valuesArray);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(valuesArray, id) {
    try {
      const response = await super.update('schedules', columnsArray, valuesArray, id);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const response = await super.delete('schedules', 'id');

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default SchedulesRepository;
