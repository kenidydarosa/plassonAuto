import NotifyRepository from "../repository/NotifyRepository.js";
const columnsArray = ['title', 'summary', 'visualized', 'user_id', 'schedule_id'];

class NotifyController {
    constructor(io) {
        this.io = io; // Adiciona o Socket.IO
        this.notifyRepository = new NotifyRepository();
    }

    async getAll(req, res) {
        try {
            const { id } = req.params;

            const response = await this.notifyRepository.getAll('user_id', id, 'visualized', false);

            if (!response) {
                throw new Error("Erro ao buscar notificações");
            }

            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificações!',
                icon: 'close-circle'
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const response = await this.notifyRepository.getByID(id);

            if (!response) {
                throw new Error("Erro ao buscar notificação");
            }

            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificação!',
                icon: 'close-circle'
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

            // Salvar notificação no banco de dados
            const response = await this.notifyRepository.create(valuesArray);

            if (!response) {
                throw new Error("Erro ao criar notificação");
            }

            // Emitir notificação em tempo real
            this.io.emit(`notification:${body.user_id}`, body);
            res.status(200).json({
                response,
                title: 'Sucesso',
                msg: 'Notificação criada com sucesso!',
                icon: 'check-circle'
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao criar notificação!',
                icon: 'close-circle'
            });
        }
    }
    // Método específico para o Socket.IO
    async createFromSocket(notificationData) {
        try {
            const valuesArray = columnsArray.reduce((acc, columnName) => {
                acc.push(notificationData[columnName]);
                return acc;
            }, []);

            // Salvar notificação no banco de dados
            const response = await this.notifyRepository.create(valuesArray, 'user_id', notificationData.user_id );

            if (!response) {
                throw new Error("Erro ao criar notificação");
            }

            // Emitir notificação em tempo real para o usuário
            this.io.emit(`notification:${notificationData}`, {
                ...notificationData,
                id: response.id,
            });

            return response; // Retorna o resultado da operação
        } catch (error) {
            console.error("Erro ao criar notificação:", error);
            throw new Error("Falha ao criar notificação."); // Lança erro para ser tratado pelo socket
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

            const response = await this.notifyRepository.update(valuesArray, id, 'user_id', body.user_id, 'visualized', 0);

            if (!response) {
                throw new Error("Erro ao atualizar notificação");
            }

            res.status(200).json({
                response,
                title: 'Sucesso',
                msg: 'Notificação atualizada com sucesso!',
                icon: 'check-circle'
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao atualizar notificação!',
                icon: 'close-circle'
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const response = await this.notifyRepository.delete(id);

            if (!response) {
                throw new Error("Erro ao excluir notificação");
            }
            res.status(200).json({
                response,
                title: 'Sucesso',
                msg: 'Notificação excluída com sucesso!',
                icon: 'check-circle'
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao excluir notificação!',
                icon: 'close-circle'
            });
        }
    }
}

export default NotifyController;

