import { Alarm } from './equipment/Alarm';
import { Endpoint } from './models/alarm';

const config = {
  host: '192.168.1.205',
  port: 80,
  username: '', // username to log into ax pro hub
  password: '', // password to log into ax pro hub
  timeout: 10000,
  version: 2.1
};


const main = async () => {
  const alarm = new Alarm(config);
  while(true){
    await alarm.connect();
    await alarm.getAlertStream();
    // const resp = await alarm.makeRequest(Endpoint.subSystemStatus, true, "GET");
    // console.log(resp?.data);
    // await sleep(10);
  }
};

const sleep = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

main();