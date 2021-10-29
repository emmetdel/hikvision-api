import { DeviceInfo, SessionParams, User } from './local';
import {
  RemoteSessionParams,
  RemoteUser,
  RemoteUserList,
  RemoteDeviceInfo
} from './remote';

export class RTL {
  public static sessionParams(params: RemoteSessionParams): SessionParams {
    const cap = params.SessionLoginCap;
    return {
      sessionId: cap.sessionID,
      challenge: cap.challenge,
      iterations: cap.iterations,
      isIrreversible: cap.isIrreversible,
      salt: cap.salt || '',
      salt2: cap.salt2 || ''
    };
  }

  public static deviceInfo(_info: RemoteDeviceInfo): DeviceInfo {
    const info = _info.DeviceInfo;
    return {
      name: info.deviceName,
      id: info.deviceID,
      model: info.model,
      serialNo: info.serialNumber,
      mac: info.macAddress,
      firmwareVersion: info.firmwareVersion,
      firmwareReleaseDate: info.firmwareVersion,
      encoderVersion: info.encoderVersion,
      encoderReleaseDate: info.encoderReleasedDate,
      deviceType: info.deviceType,
      code: info.telecontrolID
    };
  }

  private static user(user: RemoteUser): User {
    return {
      id: user.id,
      userName: user.userName,
      type: user.userLevel
    };
  }

  public static fetchUsers(_users: RemoteUserList): User[] {
    const users = _users.UserList.User;
    if (users) {
      if (Array.isArray(users)) {
        return users.map(remote => {
          return this.user(remote);
        });
      } else {
        return [this.user(users)];
      }
    } else {
      return [];
    }
  }

}

