# hikvision-toolkit

## Summary
a simple library to interact with AX Hub Pro alarm system programtically.

## Installation
install with npm:
```shell
npm install hikvision-toolkit
```
install with yarn
```shell
yarn add hikvision-toolkit
```

## Usage
### create an alarm instance
```typescript
const alarm = new Alarm({
  host: '192.168.1.64',
  user: 'admin',
  password: '123456',
  version: 2.1
});
```
##### Tips:

### connect
```typescript
await alarm.connect();
```

### use other api
```typescript
alarm.armAlarmHomeMode()
alarm.disarmAlarm()
alarm.alarmStatus()
```
