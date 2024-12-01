import { Router } from "express";
import NotifyController from "../controllers/NotifyController.js";

const route = Router();

export default (io) => {
    const notifyController = new NotifyController(io);

    route.get('/:id', (req, res) => notifyController.getAll(req, res));
    route.post('/', (req, res) => notifyController.create(req, res));
    route.put('/:id', (req, res) => notifyController.update(req, res));
    route.delete('/:id', (req, res) => notifyController.delete(req, res));

    return route;
};
