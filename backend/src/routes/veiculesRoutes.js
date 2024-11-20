import { Router } from "express";
import VeiculesController from "../controllers/VeiculesController.js";

const veiculesController = new VeiculesController()

const router = Router();

router.get('/', (req, res) => veiculesController.getAll(req, res))
router.get('/:id', (req, res) => veiculesController.getById(req, res))
router.post('/', (req, res) => veiculesController.create(req, res))
router.put('/:id', (req, res) => veiculesController.update(req, res))
router.delete('/:id', (req, res) => veiculesController.delete(req, res))

export default router;