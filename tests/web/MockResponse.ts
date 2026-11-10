/**
 * @description An object used for testing functions to be ran by express.js
 *
 * It's not designed to be a complete `Response` re-implementation, just things necessery for testing.
 */
export default class MockResponse {
  statusCode: number;
  headers: {[key: string]: string};
  _body: any;

  constructor() {
    this.statusCode = 0;
    this.headers = {}
    this._body = undefined;
  }
  status(code: number) {
    this.statusCode = code
    return this;
  }
  setHeader(key: string, val: string) {
    this.headers[key] = val;
    return this;
  }
  send(data?: any) {
    this._body = data
  }
}