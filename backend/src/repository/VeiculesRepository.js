import BaseRepository from './BaseRepository.js';

const columnsArray = [
  'imgKey',
  'model',
  'brand',
  'year',
  'color',
  'plate',
  'renavam',
  'sector',
  'status',
  'kilometers',
  'booster',
];

class VeiculesRepository extends BaseRepository {
  async getAll() {
    try {
      const response = await super.getAll('veicules', ['*']);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getByID(id) {
    try {
      const response = await super.getByID('veicules', ['*'], id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(valuesArray) {
    try {
      const response = await super.create('veicules', columnsArray, valuesArray);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id, valuesArray) {
    try {
      const response = await super.update('veicules', columnsArray, valuesArray, id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await super.delete('veicules', id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default VeiculesRepository;
