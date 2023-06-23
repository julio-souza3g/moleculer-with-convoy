import { BrokerOptions } from 'moleculer';

const commonOptions: BrokerOptions = {
  validator: {
    type: 'Fastest',
    options: {
      useNewCustomCheckerFunction: true,
      messages: {
        // Register our new error message text
        minDateDiff: 'The difference between the dates must be greater than {expected}! Actual: {actual}',
        maxDateDiff: 'The difference between the dates must be smaller than {expected}! Actual: {actual}',
      },
    },
  },
};

export default commonOptions;
