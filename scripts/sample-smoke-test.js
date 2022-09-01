import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 seconds
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://localhost:5188';

export default () => {
    group('GetWeatherForecastV1',function () {
        const resp = http.get(`${BASE_URL}/GetWeatherForecastV1`);
        check(resp,{"status = 200": resp.status === 200});
        sleep(1);
    });
    group('GetWeatherForecastV2',function () {
        const resp = http.get(`${BASE_URL}/GetWeatherForecastV2`);
        check(resp,{"status = 200": resp.status === 200});
        sleep(1);
    });
};
