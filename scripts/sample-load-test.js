import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 seconds.
        { duration: '10s', target: 100 }, // stay at 100 users for 10 seconds
        { duration: '5s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://localhost:5188';

export default () => {
    const length = http.get(`${BASE_URL}/GetWeatherForecastV1`).body;
    check(length, 1000000);
    sleep(1);
};
