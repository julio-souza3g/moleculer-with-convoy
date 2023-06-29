import AuthService from './auth.service';
import { Runner, RunnerOptions } from '../../runner';

const opts: RunnerOptions = {
  disableChannelsMiddleware: true,
};

new Runner(AuthService, opts).start();
