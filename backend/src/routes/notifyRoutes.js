import NotifyController from "../controllers/NotifyController.js";
import { Router } from "express";

const notifyController = new NotifyController()

const route = Router();

route.get('/', (req, res) => notifyController.getAll(req, res))
route.get('/:id', (req, res) => notifyController.getById(req, res))
route.post('/', (req, res) => notifyController.create(req, res))
route.put('/:id', (req, res) => notifyController.update(req, res))
route.delete('/:id', (req, res) => notifyController.delete(req, res))


export default route;