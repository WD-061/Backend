import { Router } from 'express';
import { getAllEntries, createEntry } from '../controllers/entries.js';

const entryRouter = Router();

entryRouter.route('/').get(getAllEntries).post(createEntry);

export default entryRouter;
