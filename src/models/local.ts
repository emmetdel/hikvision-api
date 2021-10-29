export interface SessionParams {
  sessionId: string
  challenge: string
  iterations: number
  isIrreversible: boolean
  salt: string
  salt2: string
}

export interface DeviceInfo {
  name: string
  id: string
  model: string
  serialNo: string
  mac: string
  firmwareVersion: string
  firmwareReleaseDate: string
  encoderVersion: string
  encoderReleaseDate: string
  deviceType: string
  code: string
}

export interface User {
  id: number
  userName: string
  type: 'Administrator' | 'Operator' | 'Viewer'
  password?: string
}

