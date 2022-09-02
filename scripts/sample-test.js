import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    insecureSkipTLSVerify: true, // skip TLS verify 
    noConnectionReuse: false, // disable keep-alive connections
    vus: 1, // 1 user looping for 10 seconds
    duration: '10s',
};

const BASE_URL = 'http://localhost:5188';

export default () => {
    const resp = http.get(`${BASE_URL}/GetWeatherForecastV1`);
    check(resp, {"status = 200": resp.status === 200});
    sleep(1); // suspend VU execution for the specified duration.
};
