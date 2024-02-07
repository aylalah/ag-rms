import { AuthClass } from './auth';
import { MainClass } from '@modules/services/main';

class RMSClass extends MainClass {
  readonly auth = new AuthClass(this.token);
}

const RMSservice = (token?: string) => new RMSClass(token);

export default RMSservice;
