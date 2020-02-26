import http from 'k6/http';
import { check, fail, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '5m',
};


export default function () {
  const user = Math.floor(Math.random() * (3000000 - 1)) + 1;
  const restaurant = Math.floor(Math.random() * (2000000 - 1)) + 1;
  const url = `http://localhost:3001/restaurant/${restaurant}/user/${user}/review`;
  const review = {
    userId: user,
    restaurantId: restaurant,
    rating: Math.floor(Math.random() * Math.floor(6)),
    reviewDate: 'Test Date',
    reviewText: 'Test Text',
    previousReview: null,
  };
  const data = JSON.stringify(review);
  const headers = { headers: { 'Content-Type': 'application/json' } };
  const res = http.post(url, data, headers);
  sleep(0.1);

  // Verify that post was successful
  check(res, {
    'post succeeded': (res) => res.status == 201,
  }) || fail('post failed');
}
