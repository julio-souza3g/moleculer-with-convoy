import GatewayService from './gateway.service';
import { Runner, RunnerOptions } from '../../runner';

const opts: RunnerOptions = {
  disableChannelsMiddleware: true,
};

new Runner(GatewayService, opts).start();
