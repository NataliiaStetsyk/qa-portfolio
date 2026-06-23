import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * k6 smoke / light-load test against a public test endpoint.
 * Run locally:  k6 run performance/k6-smoke.js
 * Demonstrates virtual users, thresholds (SLAs), and response checks.
 */
export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_failed: ['rate<0.01'],      // < 1% errors
    http_req_duration: ['p(95)<800'],    // 95% of requests under 800ms
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });
  sleep(1);
}
