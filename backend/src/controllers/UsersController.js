// usersController.js
import UserModel from '../Models/UserModel.js';
import SchedulesModel from '../Models/SchedulesModel.js';
import NotifyModel from '../Models/NotifyModel.js';
import VeiculesModel from '../Models/VeiculesModel.js';
import sectorsModel from '../Models/SectorsModel.js';

const columnsArray = [
  'name',
  'username',
  'password',
  'job',
  'sector_id',
  'registration',
  'email',
  'status',
];
class UserController {
  constructor() {
    this.userModel = new UserModel();
    this.schedulesModel = new SchedulesModel();
    this.notifyModel = new NotifyModel();
    this.veiculesModel = new VeiculesModel();
    this.sectorsModel = new sectorsModel();
  }

  async getAll(req, res) {
    try {
      const response = await this.userModel.getAll();

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao buscar dados!',
        icon: 'close-circle',
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const response = await this.userModel.getByID(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao buscar usuário.',
        icon: 'close-circle',
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

      const response = await this.userModel.create(valuesArray);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Usuário criado com sucesso!',
        icon: 'check-circle',
      });
    } catch (error) {
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao criar usuário!',
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

      const response = await this.userModel.update(valuesArray, id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Usuário atualizado com sucesso!',
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao atualizar usuário.',
        icon: 'close-circle',
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log('ID do usuário a ser deletado:', id);

      const response = await this.userModel.delete(id);

      if (!response) {
        throw new Error();
      }

      res.status(200).json({
        response,
        title: 'Sucesso',
        msg: 'Usuário excluído com sucesso!',
        icon: 'check-circle',
      });
    } catch (error) {
      res.status(500).json({
        title: 'Erro',
        msg: 'Erro ao excluir usuário.',
        icon: 'close-circle',
      });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await this.userModel.login(username, password);
      
      if (!user) {
        throw new Error("Usuário ou senha incorretos");
      }

      if (user.status == 'Inativo') {
        res.status(401).json({
          title: 'Erro',
          msg: 'Usuário bloqueado. Contate o administrador.',
          icon: 'close-circle',
        });
        return;
      }

      const [schedules, notify, veicules, users, sectors] = await Promise.all([
        this.schedulesModel.getAll(), // Consulta agendamentos
        this.notifyModel.getAll('user_id', user.id, 'visualized', false), // Consulta notificações
        this.veiculesModel.getAll(), // Consulta veículos
        this.userModel.getAll(), // Consulta todos os usuários
        this.sectorsModel.getAll(), // Consulta todos os usuários
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
        icon: 'check-circle',
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        title: 'Erro!',
        msg: 'Usuário ou senha inválidos.',
        icon: 'close-circle',
      });
    }
  }
  async getAllData(req, res){
    try {
      const { id } = req.params;
      const user = await this.userModel.getByID(id);

      if (!user) {
        throw new Error();
      }

      const [schedules, notify, veicules, users, sectors] = await Promise.all([
        this.schedulesModel.getAll(), // Consulta agendamentos
        this.notifyModel.getAll('user_id', user.id, 'visualized', false), // Consulta notificações
        this.veiculesModel.getAll(), // Consulta veículos
        this.userModel.getAll(), // Consulta todos os usuários
        this.sectorsModel.getAll(), // Consulta todos os usuários
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
        icon: 'check-circle',
      });
      
    } catch (error) {
      console.log(error);
      res.status(401).json({
        title: 'Erro!',
        msg: 'Erro ao atualizar.',
        icon: 'close-circle',
      });
    }
  }
}

export default UserController;
