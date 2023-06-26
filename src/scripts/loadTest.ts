/* eslint-disable */

/* This script will send requests to the webhook endpoint, simulating a load test.
To run the script, you can use the following command: k6 run src/scripts/loadTest.ts */

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  iterations: 10, // number of iterations to perform (number of requests to send)
  vus: 1, // number of virtual users to use (number of concurrent users)
};

export default function () {
  const url = 'http://localhost:4000/api/webhook';

  const headers = { 'Content-Type': 'application/json' };

  const payload = {
    event_type: 'user.created',
    data: {
      event_type: 'user.created',
      name: 'Julio teste',
      email: 'julioteste@gmail.com',
      created_at: '26/06/2023',
    },
  };

  const response = http.post(url, JSON.stringify(payload), { headers });

  if (response.status === 200) {
    console.log('Event sent successfully');
  } else {
    console.log('Error sending event');
  }

  sleep(1); // wait 1 second between iterations
}
