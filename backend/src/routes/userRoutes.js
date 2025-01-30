import { Router } from 'express';
import UserController from '../controllers/UsersController.js';

const router = Router();
const userController = new UserController();

router.post('/login', (req, res) => userController.login(req, res));
router.get('/', (req, res) => userController.getAll(req, res));
router.get('/:id/update', (req, res) => userController.getAllData(req, res));
router.get('/:id', (req, res) => userController.getById(req, res));
router.post('/', async (req, res) => userController.create(req, res));
router.put('/:id', async (req, res) => userController.update(req, res));
router.delete('/:id', async (req, res) => userController.delete(req, res));


export default router;

