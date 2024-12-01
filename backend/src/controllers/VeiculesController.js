import VeiculesModel from '../Models/VeiculesModel.js';

const columnsArray = [
  'imgKey',
  'model',
  'brand',
  'year',
  'color',
  'plate',
  'renavam',
  'sector_id',
  'status',
  'kilometers',
  'booster',
];
class VeiculesController {
  constructor() {
    this.veiculesModel = new VeiculesModel();
  }
  async getAll(req, res) {
    try {
      const response = await this.veiculesModel.getAll();

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar veículos!',
        icon: 'close-circle',
      });
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const response = await this.veiculesModel.getByID(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar veículo!',
        icon: 'close-circle',
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

      const response = await this.veiculesModel.create(valuesArray);
      
      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Veiculo adicionado com sucesso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao adicionar veículo!',
        icon: 'close-circle',
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

      const response = await this.veiculesModel.update(id, valuesArray);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Veiculo atualizado com sucesso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao atualizar veiculo!',
        icon: 'close-circle',
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await this.veiculesModel.delete(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Veiculo excluído com sucesso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao atualizar veiculo!',
        icon: 'close-circle',
      });
    }
  }
}

export default VeiculesController;
