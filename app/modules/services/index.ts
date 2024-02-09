import { AuthClass } from './auth.service';
import { ClientClass } from './clients.service';
import { IndustryClass } from './industry.service';
import { MainClass } from './main.service';
import { MethodologyClass } from './methodology.service';
import { QuestionnaireClass } from './questionnaire.service';

class RMSClass extends MainClass {
  readonly auth = new AuthClass(this.token);
  readonly clients = new ClientClass(this.token);
  readonly industries = new IndustryClass(this.token);
  readonly methodologies = new MethodologyClass(this.token);
  readonly questionnaires = new QuestionnaireClass(this.token);
}

const RMSservice = (token?: string) => new RMSClass(token);

export default RMSservice;
