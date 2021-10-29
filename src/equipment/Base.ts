import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { SessionParams } from '../models/local';
import {
  RemoteSessionParams,
} from '../models/remote';
import { RTL } from '../models/transform';
import { sha256 } from '../utils/Sha256';
import { XmlHandler } from '../utils/XmlHandler';

export interface BaseConfig {
  host: string
  port?: number
  username: string
  password: string
  timeout?: number
  version?: number
  userPassword?: string
}

export abstract class Base {
  protected readonly host: string = '192.168.1.64';
  protected readonly port: number = 80;
  protected readonly username: string = 'admin';
  protected readonly password: string;
  protected request: AxiosInstance;


  protected constructor(config: BaseConfig) {
    this.host = config.host;
    this.port = config.port || this.port;
    this.username = config.username;
    this.password = config.password;

    this.request = axios.create({
      baseURL: this.url,
      timeout: config.timeout || 10000,
      withCredentials: true,
    });
  }

  protected get url(): string {
    return `http://${this.host}:${this.port}`;
  }

  protected async getSessionParams(): Promise<SessionParams> {
    const response = await this.request.get(`/ISAPI/Security/sessionLogin/capabilities?username=${this.username}`);
    const json = await XmlHandler.parser<RemoteSessionParams>(response.data);
    return RTL.sessionParams(json);
  }

  protected encodePassword(session: SessionParams): string {
    let result: string;
    if (session.isIrreversible) {
      result = sha256(this.username + session.salt + this.password);
      result = sha256(this.username + session.salt2 + result);
      result = sha256(result + session.challenge);

      for (let f = 2; session.iterations > f; f++) {
        result = sha256(result);
      }
    } else {
      result = sha256(this.password) + session.challenge;
      for (let f = 1; session.iterations > f; f++) {
        result = sha256(result);
      }
    }
    return result;
  }

  protected setHeaders(response: AxiosResponse<any>) {
    this.request.defaults.headers = {
      Cookie: (response.headers['set-cookie'][0] as string).split(';')[0]
    };
  }
}
