import { Alarm } from '../src/equipment/Alarm';
import { SessionParams } from '../src/models/local';

describe('Camera', () => {
  const _global: any = typeof window === 'undefined' ? global : window;
  const alarm = new Alarm(_global.alarmConfig);

  beforeAll(async () => {
    return await alarm.connect();
  });

  test('encodePassword', async () => {
    const sessionParams: SessionParams = {
      challenge: '413dfe13f075df217f9f48db5f1302ed',
      isIrreversible: true,
      iterations: 100,
      salt: '13B0F1C6E38E3A0B02D859A7BC317602E714A63F598D6BF826A6EADA72773962',
      salt2: 'DDA525FCEB2108924CDAE5F2E92E327BEC7D7503B4AC141AA087BFBB8E016301',
      sessionId: '',
    };

    const password = (alarm as any).encodePassword(sessionParams);

    expect(password).toEqual('dccb0593e99f79ef9dda218e073c9282b81ec6ccbcd6d846efd3005a6d34fcb9');
  });

  const sysCap = 'System/capabilities';
  const subEvtCap = 'Event/notification/subscribeEventCap';
  const subEvt = 'Event/notification/subscribeEvent';
  const evtTriggers = 'Event/triggers';
  const status = 'SecurityCP/status/zones?format=json';
  const exDevStatus = 'SecurityCP/status/exDevStatus?format=json';
  const commStatus = 'SecurityCP/status/communication?format=json';
  const hostStatus = 'SecurityCP/status/host?format=json';
  const magStatus = 'SecurityCP/Configuration/magneticContact/capabilities?format=json';
  const magZone = 'SecurityCP/Configuration/magneticContact/zone/0?format=json';
  const logServer = 'System/logServer';
  const Ipc = 'SecurityCP/Configuration/transmitter/paramCfgList?format=json';

  const star = 'SecurityCP/status/pircam/zone/3';
  const star1 = 'Event/notification/alertStream';

  test('getAlertStream', async () => {
    await alarm.getAlertStream();
  });



  // test('Alarm Status', async () => {
  //   const resp = await alarm.alarmStatus();
  //   // console.debug(JSON.stringify(resp.data));
  // });

  // test('Alarm Arm Home Mode', async () => {
  //   const resp = await alarm.armAlarmHomeMode();
  //   // console.debug(JSON.stringify(resp.data));
  // });

  // test('Alarm Disamr', async () => {
  //   const resp = await alarm.disarmAlarm();
  //   // console.debug(JSON.stringify(resp.data));
  // });

});
