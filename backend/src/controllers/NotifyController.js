import NotifyRepository from "../repository/NotifyRepository.js";

class NotifyController {
    constructor() {
        this.notifyRepository = new NotifyRepository()
    }

    async getAll(req, res) {
        try {
            const response = await this.notifyRepository.getAll()

            if (!response) {
                throw error;
            }

            res.status(200).json(response);
        } catch (error) {
            console.log(error);

            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificações!',
                icon: 'error'
            })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params

            const response = await this.notifyRepository.getByID(id)

            if (!response) {
                throw error;
            }

            res.status(200).json(response);

        } catch (error) {
            console.log(error);

            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificação!',
                icon: 'error'
            })
        }
    }
    async create(req, res) {
        try {
            const { body } = req;

            const columnsArray = ['title', 'description', 'visualized', 'user_id'];
            const valuesArray = columnsArray.reduce((acc, columnName) => {
                acc.push(body[columnName])
                return acc;
            }, [])

            const response = await this.notifyRepository.create(valuesArray)

            if (!response) {
                throw error;
            }

            res.status(200).json({
                response,
                title: 'Sucesso',
                msg: 'Notificação criada com suceso!',
                icon: 'success'
            })


        } catch (error) {
            console.log(error);

            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificação!',
                icon: 'error'
            })
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params
            const { body } = req;

            const columnsArray = ['title', 'description', 'visualized', 'user_id'];
            const valuesArray = columnsArray.reduce((acc, columnName) => {
                acc.push(body[columnName])
                return acc;
            }, [])

            const response = await this.notifyRepository.update(valuesArray, id)
            
            if (!response) {
                throw error;
            }

            res.status(200).json({
                response,
                title: 'Sucesso',
                msg: 'Notificação atualizado com suceso!',
                icon: 'success'
            })

        } catch (error) {
            console.log(error);

            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificação!',
                icon: 'error'
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const response = await this.notifyRepository.delete(id)

            if (!response) {
                throw error;
            }

            res.status(200).json({
                response,
                title: 'Sucesso',
                msg: 'Notificação excluída com suceso!',
                icon: 'success'
            })

        } catch (error) {
            console.log(error);

            res.status(404).json({
                title: 'Erro',
                msg: 'Erro ao buscar notificação!',
                icon: 'error'
            })
        }
    }
}

export default NotifyController;