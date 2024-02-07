import { AuthClass } from './auth.service';
import { ClientClass } from './clients.service';
import { IndustryClass } from './industry.service';
import { MainClass } from './main.service';

class RMSClass extends MainClass {
  readonly auth = new AuthClass(this.token);
  readonly clients = new ClientClass(this.token);
  readonly industries = new IndustryClass(this.token);
}

const RMSservice = (token?: string) => new RMSClass(token);

export default RMSservice;
