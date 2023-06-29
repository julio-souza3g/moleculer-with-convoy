import webhookRoutes from './webhook';
import authRoutes from './auth';

export default [
  ...authRoutes,
  ...webhookRoutes,
].flat();
