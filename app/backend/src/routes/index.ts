import { Router } from 'express';
import TeamRouter from './TeamRouter';

const router = Router();
const teamRouter = new TeamRouter();

router.use('/teams', teamRouter.withGetAll().build());

export default router;
