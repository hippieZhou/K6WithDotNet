import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false
    vus: 1, // 1 user looping for 10 seconds
    duration: '10s',
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
