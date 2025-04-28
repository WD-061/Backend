import { Router } from 'express';
import { getAllEntries, createEntry } from '../controllers/entries.js';

const entryRouter = Router();

entryRouter.get('/', getAllEntries);
entryRouter.post('/', createEntry);

// You can chaing different methods for a single endpoint like below
// entryRouter.route('/').get(getAllEntries).post(createEntry);

export default entryRouter;
