// usersController.js
import UserRepository from '../repository/UserRepository.js';
import SchedulesRepository from '../repository/SchedulesRepository.js';
import NotifyRepository from '../repository/NotifyRepository.js';
import VeiculesRepository from '../repository/VeiculesRepository.js';
import sectorsRepository from '../repository/sectorsRepository.js';

const columnsArray = [
  'name',
  'username',
  'password',
  'job',
  'sector',
  'registration',
  'email',
];
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.schedulesRepository = new SchedulesRepository();
    this.notifyRepository = new NotifyRepository();
    this.veiculesRepository = new VeiculesRepository();
    this.sectorsRepository = new sectorsRepository();
  }

  async getAll(req, res) {
    try {
      const response = await this.userRepository.getAll();

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao buscar dados!',
        icon: 'error',
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const response = await this.userRepository.getByID(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao buscar usuário.',
        icon: 'error',
      });
    }
  }
  async create(req, res) {
    try {
      const { body } = req;

      // Serve para organizar caso o usuário adicione informações faltantes, ou fora de ordem
      const valuesArray = columnsArray.reduce((acc, columnName) => {
        acc.push(body[columnName]);
        return acc;
      }, []);

      const response = await this.userRepository.create(valuesArray);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Usuário criado com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      res.status(500).json({
        response,
        title: 'Erro',
        msg: 'Erro ao criar usuário!',
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

      const response = await this.userRepository.updateValue(valuesArray, id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Usuário atualizado com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao atualizar usuário.',
        icon: 'error',
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log('ID do usuário a ser deletado:', id);

      const response = await this.userRepository.delete(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Usuário excluído com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.log('Erro no UserController:', error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao excluir usuário.',
        icon: 'error',
      });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await this.userRepository.login(username, password);

      // Se não encontrar o usuário, retorne erro
      if (!user) {
        throw new Error();
      }

      // Promise.all para executar as consultas em paralelo
      const [schedules, notify, veicules, users, sectors] = await Promise.all([
        this.schedulesRepository.getAll('user_id', user.id), // Consulta agendamentos
        this.notifyRepository.getAll('user_id', user.id), // Consulta notificações
        this.veiculesRepository.getAll(), // Consulta veículos
        this.userRepository.getAll(), // Consulta todos os usuários
        this.sectorsRepository.getAll(), // Consulta todos os usuários
      ]);

      res.status(200).json({
        user,
        schedules,
        notify,
        veicules,
        users,
        sectors,
        title: 'Sucesso',
        msg: 'Login realizado com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        title: 'Erro',
        msg: 'Usuário ou senha inválidos.',
        icon: 'error',
      });
    }
  }
}

export default UserController;
