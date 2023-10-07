import {Router} from 'express';
import{getClients, getClientById, createClient, updateClient, deleteClient} from '../controllers/clients.controllers.js';

const router = Router();

router.get('/api/clients', getClients);

router.get('/api/clients/:id', getClientById);

router.post('/api/clients', createClient);

router.put('/api/clients/:id', updateClient);

router.delete('/api/clients/:id', deleteClient);

export default router;