import { check, fail, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '5m',
};

export default function () {
  const id = Math.floor(Math.random() * 2000000);
  const res = http.get(`http://localhost:3001/restaurant/${id}/reviews`);
  sleep(0.1);

  check(res, {
    'get reviews success': (res) => res.status == 200,
  }) || fail('post failed');
}
