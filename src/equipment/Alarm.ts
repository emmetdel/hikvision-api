import { AxiosRequestConfig } from 'axios';
import { createWriteStream } from 'graceful-fs';
import { Endpoint } from '../models/alarm';
import { XmlHandler } from '../utils/XmlHandler';
import { Base, BaseConfig } from './Base';

import * as stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);

export class Alarm extends Base {

  constructor(config: BaseConfig) {
    super(config);
  }

  public async connect(): Promise<void> {
    const params = await this.getSessionParams();

    const encodedPassword = this.encodePassword(params);

    const body = XmlHandler.build({
      SessionLogin: {
        userName: this.username,
        password: encodedPassword,
        sessionID: params.sessionId,
        isSessionIDValidLongTerm: false,
        sessionIDVersion: 2.1
      }
    });

    const response = await this.request.post(`/ISAPI/Security/sessionLogin?timeStamp=${Date.now()}`, body);

    if (response.status !== 200) throw Error(response.statusText);

    this.setHeaders(response);
  }

  public buildUrl(endpoint: string, json: boolean): string {
    return json ? `${endpoint}?format=json` : endpoint;
  }

  public makeRequest<T>(endpoint: string, json: boolean, method: AxiosRequestConfig['method'], data?: AxiosRequestConfig['data']) {
    try {
      const url = this.buildUrl(endpoint, json);
      console.debug(url)
      return this.request.request<T>({ url, method, data });
    } catch (error) {
      console.error(error);
    }
  }

  // private async streamToString(stream: any) {
  //   const chunks: Array<Buffer> = [];
  //   return new Promise((resolve, reject) => {
  //     stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
  //     stream.on('error', (err: any) => reject(err));
  //     stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  //   })
  // }

  public async getAlertStream(): Promise<void> {

    this.request.get(this.buildUrl(Endpoint.alertStream, true), { responseType: 'stream' })
      .then(async response => {
        const stream = response.data;
        let prev = "";
        stream.on('data', (chunk: any) => {
          const stringContent = Buffer.from(chunk).toString('utf8');
          // console.debug(stringContent);
          const arr = stringContent.match('([^}]+})') || [""];
          const current = arr[0];
          if (current !== prev){
            console.debug(current);
            prev = current;
          }
        });

        stream.on('error', (err: any) => console.error(err));

      }).catch(err => console.error(err));
  }

}
