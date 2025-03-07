import { AuthClass } from "../auth/auth.service";
import { ClientClass } from "../client/client.service";
import { ContactClass } from "@modules/contact/contact.service";
import { IndustryClass } from "../industry/industry.service";
import { MainClass } from "./main.service";
import { MethodologyClass } from "../methodology/methodology.service";
import { QuestionnaireClass } from "../questionnaire/questionnaire.service";
import { RatingClass } from "@modules/services/rating.service";

class RMSClass extends MainClass {
  readonly auth = new AuthClass(this.token);
  readonly clients = new ClientClass(this.token);
  readonly contacts = new ContactClass(this.token);
  readonly industries = new IndustryClass(this.token);
  readonly methodologies = new MethodologyClass(this.token);
  readonly ratings = new RatingClass(this.token);
  readonly report = new ReportClass(this.token);
  readonly questionnaires = new QuestionnaireClass(this.token);
  readonly general = new GeneralClass(this.token);
}

export const RMSservice = (token?: string) => new RMSClass(token);
