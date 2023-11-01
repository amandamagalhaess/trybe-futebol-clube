import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';

const router = Router();
const teamRouter = new TeamRouter();
const userRouter = new UserRouter();

router.use('/teams', teamRouter.withGetAll().withGetById().build());
router.use('/login', userRouter.withLogin().withGetRole().build());

export default router;
