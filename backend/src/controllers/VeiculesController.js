import VeiculesRepository from '../repository/VeiculesRepository.js';

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
class VeiculesController {
  constructor() {
    this.veiculesRepository = new VeiculesRepository();
  }
  async getAll(req, res) {
    try {
      const response = await this.veiculesRepository.getAll();

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar veículos!',
        icon: 'error',
      });
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const response = await this.veiculesRepository.getByID(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar veículo!',
        icon: 'error',
      });
    }
  }
  async create(req, res) {
    try {
      const { body } = req;

      const valuesArray = columnsArray.reduce((acc, columnName) => {
        acc.push(body[columnName]);
        return acc;
      }, []);

      const response = await this.veiculesRepository.create(valuesArray);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Veiculo adicionado com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao adicionar veículo!',
        icon: 'error',
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      const valuesArray = columnsArray.reduce((acc, columnName) => {
        acc.push(body[columnName]);
        return acc;
      }, []);

      const response = await this.veiculesRepository.update(id, valuesArray);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Veiculo atualizado com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao atualizar veiculo!',
        icon: 'error',
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await this.veiculesRepository.delete(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Veiculo excluído com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao atualizar veiculo!',
        icon: 'error',
      });
    }
  }
}

export default VeiculesController;
