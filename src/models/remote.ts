export interface RemoteSessionParams {
  SessionLoginCap: {
    sessionID: string,
    challenge: string,
    iterations: number,
    isIrreversible: boolean,
    salt: string
    salt2: string
  }
}

export interface RemoteLoginResult {
  SessionUserCheck?: {
    statusValue: string,
    statusString: string,
    isDefaultPassword: string,
    isRiskPassword: string,
    isActivated: string,
    sessionID: string
  },
  SessionLogin?: {
    statusValue: string,
    statusString: string,
    sessionID: string
  }
}

export interface RemoteSSHStatus {
  SSH: {
    enabled: boolean
  }
}

export interface RemoteDeviceInfo {
  DeviceInfo: {
    deviceName: string
    deviceID: string
    model: string
    serialNumber: string
    macAddress: string
    firmwareVersion: string
    firmwareReleasedDate: string
    encoderVersion: string
    encoderReleasedDate: string
    deviceType: string
    telecontrolID: string
  }
}

export interface RemoteUser {
  id: number
  userName: string
  userLevel: 'Administrator' | 'Operator' | 'Viewer'
  bondIpAddressList: {
    bondIpAddress: {
      id: string
      ipAddress: string
      ipv6Address: string
    }
  },
  bondMacAddressList: {
    bondMacAddress: {
      id: string
      macAddress: string
    }
  },
  attribute: {
    inherent: boolean
  }
}

export interface RemoteUserList {
  UserList: {
    User: RemoteUser | RemoteUser[]
  }
}

export interface SecurityVersion {
  SecurityCap: {
    supportUserNums: string
    userBondIpNums: string
    userBondMacNums: string
    securityVersion: { '$': any },
    keyIterateNum: string,
    isSupportUserCheck: boolean
    isIrreversible: boolean
    salt: string
    isSupportGUIDFileDataExport: boolean
    isSupportSecurityQuestionConfig: boolean
    isSupportGetOnlineUserListSC: boolean
    SecurityLimits: {
      LoginPasswordLenLimit: any,
      SecurityAnswerLenLimit: any
    },
    RSAKeyLength: { '$': any },
    isSupportONVIFUserManagement: boolean
    WebCertificateCap: { CertificateType: any },
    isSupportConfigFileImport: boolean
    isSupportConfigFileExport: boolean
    cfgFileSecretKeyLenLimit: { '$': any },
    isSupportPictureURlCertificate: boolean
  }
}