import SchedulesRepository from '../repository/SchedulesRepository.js';
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

class SchedulesController {
  constructor() {
    this.schedulesRepository = new SchedulesRepository();
  }

  async getAll(req, res) {
    try {
      const response = await this.schedulesRepository.getAll();

      if (!response) {
        throw error;
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar agendamentos!',
        icon: 'close-circle',
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const response = await this.schedulesRepository.getByID(id);

      if (!response) {
        throw error;
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar agendamento!',
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

      const response = await this.schedulesRepository.create(valuesArray);

      if (!response) {
        throw error;
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Agendamento criado com suceso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar agendamento!',
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

      const response = await this.schedulesRepository.update(valuesArray, id);

      if (!response) {
        throw error;
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Agendamento atualizado com suceso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar agendamento!',
        icon: 'close-circle',
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await this.schedulesRepository.delete(id);

      if (!response) {
        throw error;
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Agendamento excluído com suceso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);

      res.status(404).json({
        title: 'Erro',
        msg: 'Erro ao buscar agendamento!',
        icon: 'close-circle',
      });
    }
  }
}

export default SchedulesController;
