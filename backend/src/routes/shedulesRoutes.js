import SchedulesController from "../controllers/SchedulesController.js";
import { Router } from "express";

const schedulesController = new SchedulesController()

const route = Router();

route.get('/', (req, res) => schedulesController.getAll(req, res))
route.get('/:id', (req, res) => schedulesController.getById(req, res))
route.post('/', (req, res) => schedulesController.create(req, res))
route.put('/:id', (req, res) => schedulesController.update(req, res))
route.delete('/:id', (req, res) => schedulesController.delete(req, res))


export default route;