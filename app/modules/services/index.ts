import { AuthClass } from './auth.service';
import { ClientClass } from './client.service';
import { ContactClass } from '@modules/services/contact.service';
import { IndustryClass } from './industry.service';
import { MainClass } from './main.service';
import { MethodologyClass } from './methodology.service';
import { QuestionnaireClass } from './questionnaire.service';
import { RatingClass } from '@modules/services/rating.service';

class RMSClass extends MainClass {
  readonly auth = new AuthClass(this.token);
  readonly clients = new ClientClass(this.token);
  readonly contacts = new ContactClass(this.token);
  readonly industries = new IndustryClass(this.token);
  readonly methodologies = new MethodologyClass(this.token);
  readonly ratings = new RatingClass(this.token);
  readonly questionnaires = new QuestionnaireClass(this.token);
}

export const RMSservice = (token?: string) => new RMSClass(token);
