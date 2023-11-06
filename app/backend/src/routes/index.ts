import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';
import MatchRouter from './MatchRouter';

const router = Router();
const teamRouter = new TeamRouter();
const userRouter = new UserRouter();
const matchRouter = new MatchRouter();

router.use('/teams', teamRouter.withGetAll().withGetById().build());
router.use('/login', userRouter.withLogin().withGetRole().build());
router.use('/matches', matchRouter.withGetAll().withFinishMatch().withUpdateMatch().build());

export default router;
