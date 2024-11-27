// import NotifyRepository from "../repository/NotifyRepository.js";

// class NotifyController {
//     constructor() {
//         this.notifyRepository = new NotifyRepository()
//     }

//     async getAll(req, res) {
//         try {
//             const response = await this.notifyRepository.getAll()

//             if (!response) {
//                 throw error;
//             }

//             res.status(200).json(response);
//         } catch (error) {
//             console.log(error);

//             res.status(404).json({
//                 title: 'Erro',
//                 msg: 'Erro ao buscar notificações!',
//                 icon: 'close-circle'
//             })
//         }
//     }

//     async getById(req, res) {
//         try {
//             const { id } = req.params

//             const response = await this.notifyRepository.getByID(id)

//             if (!response) {
//                 throw error;
//             }

//             res.status(200).json(response);

//         } catch (error) {
//             console.log(error);

//             res.status(404).json({
//                 title: 'Erro',
//                 msg: 'Erro ao buscar notificação!',
//                 icon: 'close-circle'
//             })
//         }
//     }
//     async create(req, res) {
//         try {
//             const { body } = req;

//             const columnsArray = ['title', 'description', 'visualized', 'user_id'];
//             const valuesArray = columnsArray.reduce((acc, columnName) => {
//                 acc.push(body[columnName])
//                 return acc;
//             }, [])

//             const response = await this.notifyRepository.create(valuesArray)

//             if (!response) {
//                 throw error;
//             }

//             res.status(200).json({
//                 response,
//                 title: 'Sucesso',
//                 msg: 'Notificação criada com suceso!',
//                 icon: 'check-circle'
//             })


//         } catch (error) {
//             console.log(error);

//             res.status(404).json({
//                 title: 'Erro',
//                 msg: 'Erro ao buscar notificação!',
//                 icon: 'close-circle'
//             })
//         }
//     }
//     async update(req, res) {
//         try {
//             const { id } = req.params
//             const { body } = req;

//             const columnsArray = ['title', 'description', 'visualized', 'user_id'];
//             const valuesArray = columnsArray.reduce((acc, columnName) => {
//                 acc.push(body[columnName])
//                 return acc;
//             }, [])

//             const response = await this.notifyRepository.update(valuesArray, id)
            
//             if (!response) {
//                 throw error;
//             }

//             res.status(200).json({
//                 response,
//                 title: 'Sucesso',
//                 msg: 'Notificação atualizado com suceso!',
//                 icon: 'check-circle'
//             })

//         } catch (error) {
//             console.log(error);

//             res.status(404).json({
//                 title: 'Erro',
//                 msg: 'Erro ao buscar notificação!',
//                 icon: 'close-circle'
//             })
//         }
//     }

//     async delete(req, res) {
//         try {
//             const { id } = req.params;
//             const response = await this.notifyRepository.delete(id)

//             if (!response) {
//                 throw error;
//             }

//             res.status(200).json({
//                 response,
//                 title: 'Sucesso',
//                 msg: 'Notificação excluída com suceso!',
//                 icon: 'check-circle'
//             })

//         } catch (error) {
//             console.log(error);

//             res.status(404).json({
//                 title: 'Erro',
//                 msg: 'Erro ao buscar notificação!',
//                 icon: 'close-circle'
//             })
//         }
//     }
// }

// export default NotifyController;

import NotifyRepository from "../repository/NotifyRepository.js";
const columnsArray = ['title', 'description', 'visualized', 'user_id'];

class NotifyController {
    constructor(io) {
        this.io = io; // Adiciona o Socket.IO
        this.notifyRepository = new NotifyRepository();
    }

    async getAll(req, res) {
        try {
            const response = await this.notifyRepository.getAll();

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

            console.log(`Notificação criada e emitida:`, body);

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

    async update(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;

            const valuesArray = columnsArray.reduce((acc, columnName) => {
                acc.push(body[columnName]);
                return acc;
            }, []);

            const response = await this.notifyRepository.update(valuesArray, id);

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

