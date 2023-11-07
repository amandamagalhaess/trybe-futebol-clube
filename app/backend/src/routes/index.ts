import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';
import MatchRouter from './MatchRouter';
import LeaderboardRouter from './LeaderboardRouter';

const router = Router();
const teamRouter = new TeamRouter();
const userRouter = new UserRouter();
const matchRouter = new MatchRouter();
const leaderboardRouter = new LeaderboardRouter();

router.use('/teams', teamRouter.withGetAll().withGetById().build());
router.use('/login', userRouter.withLogin().withGetRole().build());
router.use(
  '/matches',
  matchRouter.withGetAll().withFinishMatch().withUpdateMatch().withCreateMatch()
    .build(),
);
router.use('/leaderboard', leaderboardRouter.withGetLeaderboardHome().build());

export default router;
