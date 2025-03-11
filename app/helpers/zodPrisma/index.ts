import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const MethodologyScalarFieldEnumSchema = z.enum(['id','name','url','unit','createdAt','updatedAt']);

export const QuestionnaireScalarFieldEnumSchema = z.enum(['id','name','url','unit','createdAt','updatedAt']);

export const LetterOfEngagementScalarFieldEnumSchema = z.enum(['id','name','url','createdAt','updatedAt']);

export const InvoiceScalarFieldEnumSchema = z.enum(['id','name','url','createdAt','updatedAt']);

export const ReceiptScalarFieldEnumSchema = z.enum(['id','name','url','createdAt','updatedAt']);

export const IndustryScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ReportsScalarFieldEnumSchema = z.enum(['id','rating','reportTitle','reportFileUrl','finalLetterUrl','consentLetterUrl','version','status','createdAt','updatedAt']);

export const RatingScalarFieldEnumSchema = z.enum(['id','ratingTitle','ratingScore','unit','ratingClass','ratingYear','supervisor','primaryAnalyst','secondaryAnalyst','client','methodology','questionnaire','questionnaireFiles','additionalFiles','requireAdditionalFiles','requireQuestionnaireFiles','loe','invoice','receipt','status','issueDate','expiryDate','createdAt','updatedAt']);

export const RatingClassScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ClientScalarFieldEnumSchema = z.enum(['id','industry','companyName','logo','companyPhoneNumbers','numberAndStreet','building','area','landmark','regionOrState','country','website','role','createdBy','isDeleted','createdAt','updatedAt']);

export const ContactScalarFieldEnumSchema = z.enum(['id','fullName','email','password','position','phoneNumbers','magicToken','client','address','canLogin','createdAt','updatedAt']);

export const LogScalarFieldEnumSchema = z.enum(['id','user','action','table','message','prevDocs','newDocs','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RatingStatusSchema = z.enum(['ongoing','concluded','cancelled']);

export type RatingStatusType = `${z.infer<typeof RatingStatusSchema>}`

export const ReportStatusSchema = z.enum(['pending','sent']);

export type ReportStatusType = `${z.infer<typeof ReportStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// METHODOLOGY SCHEMA
/////////////////////////////////////////

export const MethodologySchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  unit: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Methodology = z.infer<typeof MethodologySchema>

// METHODOLOGY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const MethodologyOptionalDefaultsSchema = MethodologySchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type MethodologyOptionalDefaults = z.infer<typeof MethodologyOptionalDefaultsSchema>

// METHODOLOGY RELATION SCHEMA
//------------------------------------------------------

export type MethodologyRelations = {
  ratingModel: Rating[];
};

export type MethodologyWithRelations = z.infer<typeof MethodologySchema> & MethodologyRelations

export const MethodologyWithRelationsSchema: z.ZodType<MethodologyWithRelations> = MethodologySchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// METHODOLOGY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type MethodologyOptionalDefaultsRelations = {
  ratingModel: Rating[];
};

export type MethodologyOptionalDefaultsWithRelations = z.infer<typeof MethodologyOptionalDefaultsSchema> & MethodologyOptionalDefaultsRelations

export const MethodologyOptionalDefaultsWithRelationsSchema: z.ZodType<MethodologyOptionalDefaultsWithRelations> = MethodologyOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// QUESTIONNAIRE SCHEMA
/////////////////////////////////////////

export const QuestionnaireSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  unit: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Questionnaire = z.infer<typeof QuestionnaireSchema>

// QUESTIONNAIRE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const QuestionnaireOptionalDefaultsSchema = QuestionnaireSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type QuestionnaireOptionalDefaults = z.infer<typeof QuestionnaireOptionalDefaultsSchema>

// QUESTIONNAIRE RELATION SCHEMA
//------------------------------------------------------

export type QuestionnaireRelations = {
  ratingModel: Rating[];
};

export type QuestionnaireWithRelations = z.infer<typeof QuestionnaireSchema> & QuestionnaireRelations

export const QuestionnaireWithRelationsSchema: z.ZodType<QuestionnaireWithRelations> = QuestionnaireSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// QUESTIONNAIRE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type QuestionnaireOptionalDefaultsRelations = {
  ratingModel: Rating[];
};

export type QuestionnaireOptionalDefaultsWithRelations = z.infer<typeof QuestionnaireOptionalDefaultsSchema> & QuestionnaireOptionalDefaultsRelations

export const QuestionnaireOptionalDefaultsWithRelationsSchema: z.ZodType<QuestionnaireOptionalDefaultsWithRelations> = QuestionnaireOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// LETTER OF ENGAGEMENT SCHEMA
/////////////////////////////////////////

export const LetterOfEngagementSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type LetterOfEngagement = z.infer<typeof LetterOfEngagementSchema>

// LETTER OF ENGAGEMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LetterOfEngagementOptionalDefaultsSchema = LetterOfEngagementSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type LetterOfEngagementOptionalDefaults = z.infer<typeof LetterOfEngagementOptionalDefaultsSchema>

// LETTER OF ENGAGEMENT RELATION SCHEMA
//------------------------------------------------------

export type LetterOfEngagementRelations = {
  ratingModel: Rating[];
};

export type LetterOfEngagementWithRelations = z.infer<typeof LetterOfEngagementSchema> & LetterOfEngagementRelations

export const LetterOfEngagementWithRelationsSchema: z.ZodType<LetterOfEngagementWithRelations> = LetterOfEngagementSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// LETTER OF ENGAGEMENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type LetterOfEngagementOptionalDefaultsRelations = {
  ratingModel: Rating[];
};

export type LetterOfEngagementOptionalDefaultsWithRelations = z.infer<typeof LetterOfEngagementOptionalDefaultsSchema> & LetterOfEngagementOptionalDefaultsRelations

export const LetterOfEngagementOptionalDefaultsWithRelationsSchema: z.ZodType<LetterOfEngagementOptionalDefaultsWithRelations> = LetterOfEngagementOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// INVOICE SCHEMA
/////////////////////////////////////////

export const InvoiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Invoice = z.infer<typeof InvoiceSchema>

// INVOICE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const InvoiceOptionalDefaultsSchema = InvoiceSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type InvoiceOptionalDefaults = z.infer<typeof InvoiceOptionalDefaultsSchema>

// INVOICE RELATION SCHEMA
//------------------------------------------------------

export type InvoiceRelations = {
  ratingModel: Rating[];
};

export type InvoiceWithRelations = z.infer<typeof InvoiceSchema> & InvoiceRelations

export const InvoiceWithRelationsSchema: z.ZodType<InvoiceWithRelations> = InvoiceSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// INVOICE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type InvoiceOptionalDefaultsRelations = {
  ratingModel: Rating[];
};

export type InvoiceOptionalDefaultsWithRelations = z.infer<typeof InvoiceOptionalDefaultsSchema> & InvoiceOptionalDefaultsRelations

export const InvoiceOptionalDefaultsWithRelationsSchema: z.ZodType<InvoiceOptionalDefaultsWithRelations> = InvoiceOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// RECEIPT SCHEMA
/////////////////////////////////////////

export const ReceiptSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Receipt = z.infer<typeof ReceiptSchema>

// RECEIPT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ReceiptOptionalDefaultsSchema = ReceiptSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ReceiptOptionalDefaults = z.infer<typeof ReceiptOptionalDefaultsSchema>

// RECEIPT RELATION SCHEMA
//------------------------------------------------------

export type ReceiptRelations = {
  ratingModel: Rating[];
};

export type ReceiptWithRelations = z.infer<typeof ReceiptSchema> & ReceiptRelations

export const ReceiptWithRelationsSchema: z.ZodType<ReceiptWithRelations> = ReceiptSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// RECEIPT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ReceiptOptionalDefaultsRelations = {
  ratingModel: Rating[];
};

export type ReceiptOptionalDefaultsWithRelations = z.infer<typeof ReceiptOptionalDefaultsSchema> & ReceiptOptionalDefaultsRelations

export const ReceiptOptionalDefaultsWithRelationsSchema: z.ZodType<ReceiptOptionalDefaultsWithRelations> = ReceiptOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// INDUSTRY SCHEMA
/////////////////////////////////////////

export const IndustrySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Industry = z.infer<typeof IndustrySchema>

// INDUSTRY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const IndustryOptionalDefaultsSchema = IndustrySchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type IndustryOptionalDefaults = z.infer<typeof IndustryOptionalDefaultsSchema>

// INDUSTRY RELATION SCHEMA
//------------------------------------------------------

export type IndustryRelations = {
  clientModel: Client[];
};

export type IndustryWithRelations = z.infer<typeof IndustrySchema> & IndustryRelations

export const IndustryWithRelationsSchema: z.ZodType<IndustryWithRelations> = IndustrySchema.merge(z.object({
  clientModel: z.lazy(() => ClientSchema).array(),
}))

// INDUSTRY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type IndustryOptionalDefaultsRelations = {
  clientModel: Client[];
};

export type IndustryOptionalDefaultsWithRelations = z.infer<typeof IndustryOptionalDefaultsSchema> & IndustryOptionalDefaultsRelations

export const IndustryOptionalDefaultsWithRelationsSchema: z.ZodType<IndustryOptionalDefaultsWithRelations> = IndustryOptionalDefaultsSchema.merge(z.object({
  clientModel: z.lazy(() => ClientSchema).array(),
}))

/////////////////////////////////////////
// REPORTS SCHEMA
/////////////////////////////////////////

export const ReportsSchema = z.object({
  status: ReportStatusSchema,
  id: z.string(),
  rating: z.string(),
  reportTitle: z.string(),
  reportFileUrl: z.string().nullable(),
  finalLetterUrl: z.string().nullable(),
  consentLetterUrl: z.string().nullable(),
  version: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Reports = z.infer<typeof ReportsSchema>

// REPORTS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ReportsOptionalDefaultsSchema = ReportsSchema.merge(z.object({
  status: ReportStatusSchema.optional(),
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ReportsOptionalDefaults = z.infer<typeof ReportsOptionalDefaultsSchema>

// REPORTS RELATION SCHEMA
//------------------------------------------------------

export type ReportsRelations = {
  ratingModel: Rating;
};

export type ReportsWithRelations = z.infer<typeof ReportsSchema> & ReportsRelations

export const ReportsWithRelationsSchema: z.ZodType<ReportsWithRelations> = ReportsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema),
}))

// REPORTS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ReportsOptionalDefaultsRelations = {
  ratingModel: Rating;
};

export type ReportsOptionalDefaultsWithRelations = z.infer<typeof ReportsOptionalDefaultsSchema> & ReportsOptionalDefaultsRelations

export const ReportsOptionalDefaultsWithRelationsSchema: z.ZodType<ReportsOptionalDefaultsWithRelations> = ReportsOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema),
}))

/////////////////////////////////////////
// RATING SCHEMA
/////////////////////////////////////////

export const RatingSchema = z.object({
  status: RatingStatusSchema,
  id: z.string(),
  ratingTitle: z.string(),
  ratingScore: z.string().nullable(),
  unit: z.string().nullable(),
  ratingClass: z.string().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().nullable(),
  secondaryAnalyst: z.string().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().nullable(),
  additionalFiles: z.string().nullable(),
  requireAdditionalFiles: z.boolean(),
  requireQuestionnaireFiles: z.boolean(),
  loe: z.string().nullable(),
  invoice: z.string().nullable(),
  receipt: z.string().nullable(),
  issueDate: z.coerce.date().nullable(),
  expiryDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Rating = z.infer<typeof RatingSchema>

// RATING OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RatingOptionalDefaultsSchema = RatingSchema.merge(z.object({
  status: RatingStatusSchema.optional(),
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RatingOptionalDefaults = z.infer<typeof RatingOptionalDefaultsSchema>

// RATING RELATION SCHEMA
//------------------------------------------------------

export type RatingRelations = {
  ratingClassModel?: RatingClass | null;
  clientModel: Client;
  methodologyModel: Methodology;
  questionnaireModel: Questionnaire;
  loeModel?: LetterOfEngagement | null;
  invoiceModel?: Invoice | null;
  receiptModel?: Receipt | null;
  reportModel: Reports[];
};

export type RatingWithRelations = z.infer<typeof RatingSchema> & RatingRelations

export const RatingWithRelationsSchema: z.ZodType<RatingWithRelations> = RatingSchema.merge(z.object({
  ratingClassModel: z.lazy(() => RatingClassSchema).nullable(),
  clientModel: z.lazy(() => ClientSchema),
  methodologyModel: z.lazy(() => MethodologySchema),
  questionnaireModel: z.lazy(() => QuestionnaireSchema),
  loeModel: z.lazy(() => LetterOfEngagementSchema).nullable(),
  invoiceModel: z.lazy(() => InvoiceSchema).nullable(),
  receiptModel: z.lazy(() => ReceiptSchema).nullable(),
  reportModel: z.lazy(() => ReportsSchema).array(),
}))

// RATING OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RatingOptionalDefaultsRelations = {
  ratingClassModel?: RatingClass | null;
  clientModel: Client;
  methodologyModel: Methodology;
  questionnaireModel: Questionnaire;
  loeModel?: LetterOfEngagement | null;
  invoiceModel?: Invoice | null;
  receiptModel?: Receipt | null;
  reportModel: Reports[];
};

export type RatingOptionalDefaultsWithRelations = z.infer<typeof RatingOptionalDefaultsSchema> & RatingOptionalDefaultsRelations

export const RatingOptionalDefaultsWithRelationsSchema: z.ZodType<RatingOptionalDefaultsWithRelations> = RatingOptionalDefaultsSchema.merge(z.object({
  ratingClassModel: z.lazy(() => RatingClassSchema).nullable(),
  clientModel: z.lazy(() => ClientSchema),
  methodologyModel: z.lazy(() => MethodologySchema),
  questionnaireModel: z.lazy(() => QuestionnaireSchema),
  loeModel: z.lazy(() => LetterOfEngagementSchema).nullable(),
  invoiceModel: z.lazy(() => InvoiceSchema).nullable(),
  receiptModel: z.lazy(() => ReceiptSchema).nullable(),
  reportModel: z.lazy(() => ReportsSchema).array(),
}))

/////////////////////////////////////////
// RATING CLASS SCHEMA
/////////////////////////////////////////

export const RatingClassSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RatingClass = z.infer<typeof RatingClassSchema>

// RATING CLASS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RatingClassOptionalDefaultsSchema = RatingClassSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RatingClassOptionalDefaults = z.infer<typeof RatingClassOptionalDefaultsSchema>

// RATING CLASS RELATION SCHEMA
//------------------------------------------------------

export type RatingClassRelations = {
  ratingModel: Rating[];
};

export type RatingClassWithRelations = z.infer<typeof RatingClassSchema> & RatingClassRelations

export const RatingClassWithRelationsSchema: z.ZodType<RatingClassWithRelations> = RatingClassSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// RATING CLASS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RatingClassOptionalDefaultsRelations = {
  ratingModel: Rating[];
};

export type RatingClassOptionalDefaultsWithRelations = z.infer<typeof RatingClassOptionalDefaultsSchema> & RatingClassOptionalDefaultsRelations

export const RatingClassOptionalDefaultsWithRelationsSchema: z.ZodType<RatingClassOptionalDefaultsWithRelations> = RatingClassOptionalDefaultsSchema.merge(z.object({
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string(),
  industry: z.string(),
  companyName: z.string(),
  logo: z.string().nullable(),
  companyPhoneNumbers: z.string().nullable(),
  numberAndStreet: z.string().nullable(),
  building: z.string().nullable(),
  area: z.string().nullable(),
  landmark: z.string().nullable(),
  regionOrState: z.string().nullable(),
  country: z.string(),
  website: z.string().nullable(),
  role: z.string(),
  createdBy: z.string().nullable(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Client = z.infer<typeof ClientSchema>

// CLIENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ClientOptionalDefaultsSchema = ClientSchema.merge(z.object({
  id: z.string().optional(),
  country: z.string().optional(),
  role: z.string().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ClientOptionalDefaults = z.infer<typeof ClientOptionalDefaultsSchema>

// CLIENT RELATION SCHEMA
//------------------------------------------------------

export type ClientRelations = {
  industryModel: Industry;
  contactModel: Contact[];
  ratingModel: Rating[];
};

export type ClientWithRelations = z.infer<typeof ClientSchema> & ClientRelations

export const ClientWithRelationsSchema: z.ZodType<ClientWithRelations> = ClientSchema.merge(z.object({
  industryModel: z.lazy(() => IndustrySchema),
  contactModel: z.lazy(() => ContactSchema).array(),
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

// CLIENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ClientOptionalDefaultsRelations = {
  industryModel: Industry;
  contactModel: Contact[];
  ratingModel: Rating[];
};

export type ClientOptionalDefaultsWithRelations = z.infer<typeof ClientOptionalDefaultsSchema> & ClientOptionalDefaultsRelations

export const ClientOptionalDefaultsWithRelationsSchema: z.ZodType<ClientOptionalDefaultsWithRelations> = ClientOptionalDefaultsSchema.merge(z.object({
  industryModel: z.lazy(() => IndustrySchema),
  contactModel: z.lazy(() => ContactSchema).array(),
  ratingModel: z.lazy(() => RatingSchema).array(),
}))

/////////////////////////////////////////
// CONTACT SCHEMA
/////////////////////////////////////////

export const ContactSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().nullable(),
  position: z.string().nullable(),
  phoneNumbers: z.string().nullable(),
  magicToken: z.string().nullable(),
  client: z.string(),
  address: z.string().nullable(),
  canLogin: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Contact = z.infer<typeof ContactSchema>

// CONTACT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ContactOptionalDefaultsSchema = ContactSchema.merge(z.object({
  id: z.string().optional(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ContactOptionalDefaults = z.infer<typeof ContactOptionalDefaultsSchema>

// CONTACT RELATION SCHEMA
//------------------------------------------------------

export type ContactRelations = {
  clientModel: Client;
};

export type ContactWithRelations = z.infer<typeof ContactSchema> & ContactRelations

export const ContactWithRelationsSchema: z.ZodType<ContactWithRelations> = ContactSchema.merge(z.object({
  clientModel: z.lazy(() => ClientSchema),
}))

// CONTACT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ContactOptionalDefaultsRelations = {
  clientModel: Client;
};

export type ContactOptionalDefaultsWithRelations = z.infer<typeof ContactOptionalDefaultsSchema> & ContactOptionalDefaultsRelations

export const ContactOptionalDefaultsWithRelationsSchema: z.ZodType<ContactOptionalDefaultsWithRelations> = ContactOptionalDefaultsSchema.merge(z.object({
  clientModel: z.lazy(() => ClientSchema),
}))

/////////////////////////////////////////
// LOG SCHEMA
/////////////////////////////////////////

export const LogSchema = z.object({
  id: z.string(),
  user: z.string(),
  action: z.string(),
  table: z.string(),
  message: z.string(),
  prevDocs: z.string(),
  newDocs: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Log = z.infer<typeof LogSchema>

// LOG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LogOptionalDefaultsSchema = LogSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type LogOptionalDefaults = z.infer<typeof LogOptionalDefaultsSchema>

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// METHODOLOGY
//------------------------------------------------------

export const MethodologyIncludeSchema: z.ZodType<Prisma.MethodologyInclude> = z.object({
}).strict()

export const MethodologyArgsSchema: z.ZodType<Prisma.MethodologyDefaultArgs> = z.object({
  select: z.lazy(() => MethodologySelectSchema).optional(),
  include: z.lazy(() => MethodologyIncludeSchema).optional(),
}).strict();

export const MethodologyCountOutputTypeArgsSchema: z.ZodType<Prisma.MethodologyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MethodologyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MethodologyCountOutputTypeSelectSchema: z.ZodType<Prisma.MethodologyCountOutputTypeSelect> = z.object({
  ratingModel: z.boolean().optional(),
}).strict();

export const MethodologySelectSchema: z.ZodType<Prisma.MethodologySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  unit: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MethodologyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// QUESTIONNAIRE
//------------------------------------------------------

export const QuestionnaireIncludeSchema: z.ZodType<Prisma.QuestionnaireInclude> = z.object({
}).strict()

export const QuestionnaireArgsSchema: z.ZodType<Prisma.QuestionnaireDefaultArgs> = z.object({
  select: z.lazy(() => QuestionnaireSelectSchema).optional(),
  include: z.lazy(() => QuestionnaireIncludeSchema).optional(),
}).strict();

export const QuestionnaireCountOutputTypeArgsSchema: z.ZodType<Prisma.QuestionnaireCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => QuestionnaireCountOutputTypeSelectSchema).nullish(),
}).strict();

export const QuestionnaireCountOutputTypeSelectSchema: z.ZodType<Prisma.QuestionnaireCountOutputTypeSelect> = z.object({
  ratingModel: z.boolean().optional(),
}).strict();

export const QuestionnaireSelectSchema: z.ZodType<Prisma.QuestionnaireSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  unit: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuestionnaireCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LETTER OF ENGAGEMENT
//------------------------------------------------------

export const LetterOfEngagementIncludeSchema: z.ZodType<Prisma.LetterOfEngagementInclude> = z.object({
}).strict()

export const LetterOfEngagementArgsSchema: z.ZodType<Prisma.LetterOfEngagementDefaultArgs> = z.object({
  select: z.lazy(() => LetterOfEngagementSelectSchema).optional(),
  include: z.lazy(() => LetterOfEngagementIncludeSchema).optional(),
}).strict();

export const LetterOfEngagementCountOutputTypeArgsSchema: z.ZodType<Prisma.LetterOfEngagementCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LetterOfEngagementCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LetterOfEngagementCountOutputTypeSelectSchema: z.ZodType<Prisma.LetterOfEngagementCountOutputTypeSelect> = z.object({
  ratingModel: z.boolean().optional(),
}).strict();

export const LetterOfEngagementSelectSchema: z.ZodType<Prisma.LetterOfEngagementSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LetterOfEngagementCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INVOICE
//------------------------------------------------------

export const InvoiceIncludeSchema: z.ZodType<Prisma.InvoiceInclude> = z.object({
}).strict()

export const InvoiceArgsSchema: z.ZodType<Prisma.InvoiceDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceSelectSchema).optional(),
  include: z.lazy(() => InvoiceIncludeSchema).optional(),
}).strict();

export const InvoiceCountOutputTypeArgsSchema: z.ZodType<Prisma.InvoiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InvoiceCountOutputTypeSelectSchema: z.ZodType<Prisma.InvoiceCountOutputTypeSelect> = z.object({
  ratingModel: z.boolean().optional(),
}).strict();

export const InvoiceSelectSchema: z.ZodType<Prisma.InvoiceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RECEIPT
//------------------------------------------------------

export const ReceiptIncludeSchema: z.ZodType<Prisma.ReceiptInclude> = z.object({
}).strict()

export const ReceiptArgsSchema: z.ZodType<Prisma.ReceiptDefaultArgs> = z.object({
  select: z.lazy(() => ReceiptSelectSchema).optional(),
  include: z.lazy(() => ReceiptIncludeSchema).optional(),
}).strict();

export const ReceiptCountOutputTypeArgsSchema: z.ZodType<Prisma.ReceiptCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ReceiptCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReceiptCountOutputTypeSelectSchema: z.ZodType<Prisma.ReceiptCountOutputTypeSelect> = z.object({
  ratingModel: z.boolean().optional(),
}).strict();

export const ReceiptSelectSchema: z.ZodType<Prisma.ReceiptSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReceiptCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INDUSTRY
//------------------------------------------------------

export const IndustryIncludeSchema: z.ZodType<Prisma.IndustryInclude> = z.object({
}).strict()

export const IndustryArgsSchema: z.ZodType<Prisma.IndustryDefaultArgs> = z.object({
  select: z.lazy(() => IndustrySelectSchema).optional(),
  include: z.lazy(() => IndustryIncludeSchema).optional(),
}).strict();

export const IndustryCountOutputTypeArgsSchema: z.ZodType<Prisma.IndustryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => IndustryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IndustryCountOutputTypeSelectSchema: z.ZodType<Prisma.IndustryCountOutputTypeSelect> = z.object({
  clientModel: z.boolean().optional(),
}).strict();

export const IndustrySelectSchema: z.ZodType<Prisma.IndustrySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  clientModel: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndustryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORTS
//------------------------------------------------------

export const ReportsIncludeSchema: z.ZodType<Prisma.ReportsInclude> = z.object({
}).strict()

export const ReportsArgsSchema: z.ZodType<Prisma.ReportsDefaultArgs> = z.object({
  select: z.lazy(() => ReportsSelectSchema).optional(),
  include: z.lazy(() => ReportsIncludeSchema).optional(),
}).strict();

export const ReportsSelectSchema: z.ZodType<Prisma.ReportsSelect> = z.object({
  id: z.boolean().optional(),
  rating: z.boolean().optional(),
  reportTitle: z.boolean().optional(),
  reportFileUrl: z.boolean().optional(),
  finalLetterUrl: z.boolean().optional(),
  consentLetterUrl: z.boolean().optional(),
  version: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
}).strict()

// RATING
//------------------------------------------------------

export const RatingIncludeSchema: z.ZodType<Prisma.RatingInclude> = z.object({
}).strict()

export const RatingArgsSchema: z.ZodType<Prisma.RatingDefaultArgs> = z.object({
  select: z.lazy(() => RatingSelectSchema).optional(),
  include: z.lazy(() => RatingIncludeSchema).optional(),
}).strict();

export const RatingCountOutputTypeArgsSchema: z.ZodType<Prisma.RatingCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RatingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RatingCountOutputTypeSelectSchema: z.ZodType<Prisma.RatingCountOutputTypeSelect> = z.object({
  reportModel: z.boolean().optional(),
}).strict();

export const RatingSelectSchema: z.ZodType<Prisma.RatingSelect> = z.object({
  id: z.boolean().optional(),
  ratingTitle: z.boolean().optional(),
  ratingScore: z.boolean().optional(),
  unit: z.boolean().optional(),
  ratingClass: z.boolean().optional(),
  ratingYear: z.boolean().optional(),
  supervisor: z.boolean().optional(),
  primaryAnalyst: z.boolean().optional(),
  secondaryAnalyst: z.boolean().optional(),
  client: z.boolean().optional(),
  methodology: z.boolean().optional(),
  questionnaire: z.boolean().optional(),
  questionnaireFiles: z.boolean().optional(),
  additionalFiles: z.boolean().optional(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.boolean().optional(),
  invoice: z.boolean().optional(),
  receipt: z.boolean().optional(),
  status: z.boolean().optional(),
  issueDate: z.boolean().optional(),
  expiryDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingClassModel: z.union([z.boolean(),z.lazy(() => RatingClassArgsSchema)]).optional(),
  clientModel: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
  methodologyModel: z.union([z.boolean(),z.lazy(() => MethodologyArgsSchema)]).optional(),
  questionnaireModel: z.union([z.boolean(),z.lazy(() => QuestionnaireArgsSchema)]).optional(),
  loeModel: z.union([z.boolean(),z.lazy(() => LetterOfEngagementArgsSchema)]).optional(),
  invoiceModel: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
  receiptModel: z.union([z.boolean(),z.lazy(() => ReceiptArgsSchema)]).optional(),
  reportModel: z.union([z.boolean(),z.lazy(() => ReportsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RatingCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RATING CLASS
//------------------------------------------------------

export const RatingClassIncludeSchema: z.ZodType<Prisma.RatingClassInclude> = z.object({
}).strict()

export const RatingClassArgsSchema: z.ZodType<Prisma.RatingClassDefaultArgs> = z.object({
  select: z.lazy(() => RatingClassSelectSchema).optional(),
  include: z.lazy(() => RatingClassIncludeSchema).optional(),
}).strict();

export const RatingClassCountOutputTypeArgsSchema: z.ZodType<Prisma.RatingClassCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RatingClassCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RatingClassCountOutputTypeSelectSchema: z.ZodType<Prisma.RatingClassCountOutputTypeSelect> = z.object({
  ratingModel: z.boolean().optional(),
}).strict();

export const RatingClassSelectSchema: z.ZodType<Prisma.RatingClassSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RatingClassCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CLIENT
//------------------------------------------------------

export const ClientIncludeSchema: z.ZodType<Prisma.ClientInclude> = z.object({
}).strict()

export const ClientArgsSchema: z.ZodType<Prisma.ClientDefaultArgs> = z.object({
  select: z.lazy(() => ClientSelectSchema).optional(),
  include: z.lazy(() => ClientIncludeSchema).optional(),
}).strict();

export const ClientCountOutputTypeArgsSchema: z.ZodType<Prisma.ClientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ClientCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ClientCountOutputTypeSelectSchema: z.ZodType<Prisma.ClientCountOutputTypeSelect> = z.object({
  contactModel: z.boolean().optional(),
  ratingModel: z.boolean().optional(),
}).strict();

export const ClientSelectSchema: z.ZodType<Prisma.ClientSelect> = z.object({
  id: z.boolean().optional(),
  industry: z.boolean().optional(),
  companyName: z.boolean().optional(),
  logo: z.boolean().optional(),
  companyPhoneNumbers: z.boolean().optional(),
  numberAndStreet: z.boolean().optional(),
  building: z.boolean().optional(),
  area: z.boolean().optional(),
  landmark: z.boolean().optional(),
  regionOrState: z.boolean().optional(),
  country: z.boolean().optional(),
  website: z.boolean().optional(),
  role: z.boolean().optional(),
  createdBy: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  industryModel: z.union([z.boolean(),z.lazy(() => IndustryArgsSchema)]).optional(),
  contactModel: z.union([z.boolean(),z.lazy(() => ContactArgsSchema)]).optional(),
  ratingModel: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClientCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTACT
//------------------------------------------------------

export const ContactIncludeSchema: z.ZodType<Prisma.ContactInclude> = z.object({
}).strict()

export const ContactArgsSchema: z.ZodType<Prisma.ContactDefaultArgs> = z.object({
  select: z.lazy(() => ContactSelectSchema).optional(),
  include: z.lazy(() => ContactIncludeSchema).optional(),
}).strict();

export const ContactSelectSchema: z.ZodType<Prisma.ContactSelect> = z.object({
  id: z.boolean().optional(),
  fullName: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  position: z.boolean().optional(),
  phoneNumbers: z.boolean().optional(),
  magicToken: z.boolean().optional(),
  client: z.boolean().optional(),
  address: z.boolean().optional(),
  canLogin: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  clientModel: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
}).strict()

// LOG
//------------------------------------------------------

export const LogArgsSchema: z.ZodType<Prisma.LogDefaultArgs> = z.object({
  select: z.lazy(() => LogSelectSchema).optional(),
}).strict();

export const LogSelectSchema: z.ZodType<Prisma.LogSelect> = z.object({
  id: z.boolean().optional(),
  user: z.boolean().optional(),
  action: z.boolean().optional(),
  table: z.boolean().optional(),
  message: z.boolean().optional(),
  prevDocs: z.boolean().optional(),
  newDocs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MethodologyWhereInputSchema: z.ZodType<Prisma.MethodologyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MethodologyWhereInputSchema),z.lazy(() => MethodologyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MethodologyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MethodologyWhereInputSchema),z.lazy(() => MethodologyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const MethodologyOrderByWithRelationInputSchema: z.ZodType<Prisma.MethodologyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MethodologyWhereUniqueInputSchema: z.ZodType<Prisma.MethodologyWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => MethodologyWhereInputSchema),z.lazy(() => MethodologyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MethodologyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MethodologyWhereInputSchema),z.lazy(() => MethodologyWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const MethodologyOrderByWithAggregationInputSchema: z.ZodType<Prisma.MethodologyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MethodologyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MethodologyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MethodologyMinOrderByAggregateInputSchema).optional()
}).strict();

export const MethodologyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MethodologyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MethodologyScalarWhereWithAggregatesInputSchema),z.lazy(() => MethodologyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MethodologyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MethodologyScalarWhereWithAggregatesInputSchema),z.lazy(() => MethodologyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const QuestionnaireWhereInputSchema: z.ZodType<Prisma.QuestionnaireWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionnaireWhereInputSchema),z.lazy(() => QuestionnaireWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionnaireWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionnaireWhereInputSchema),z.lazy(() => QuestionnaireWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const QuestionnaireOrderByWithRelationInputSchema: z.ZodType<Prisma.QuestionnaireOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const QuestionnaireWhereUniqueInputSchema: z.ZodType<Prisma.QuestionnaireWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => QuestionnaireWhereInputSchema),z.lazy(() => QuestionnaireWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionnaireWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionnaireWhereInputSchema),z.lazy(() => QuestionnaireWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const QuestionnaireOrderByWithAggregationInputSchema: z.ZodType<Prisma.QuestionnaireOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QuestionnaireCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QuestionnaireMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QuestionnaireMinOrderByAggregateInputSchema).optional()
}).strict();

export const QuestionnaireScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QuestionnaireScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QuestionnaireScalarWhereWithAggregatesInputSchema),z.lazy(() => QuestionnaireScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuestionnaireScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuestionnaireScalarWhereWithAggregatesInputSchema),z.lazy(() => QuestionnaireScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LetterOfEngagementWhereInputSchema: z.ZodType<Prisma.LetterOfEngagementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LetterOfEngagementWhereInputSchema),z.lazy(() => LetterOfEngagementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LetterOfEngagementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LetterOfEngagementWhereInputSchema),z.lazy(() => LetterOfEngagementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const LetterOfEngagementOrderByWithRelationInputSchema: z.ZodType<Prisma.LetterOfEngagementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LetterOfEngagementWhereUniqueInputSchema: z.ZodType<Prisma.LetterOfEngagementWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => LetterOfEngagementWhereInputSchema),z.lazy(() => LetterOfEngagementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LetterOfEngagementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LetterOfEngagementWhereInputSchema),z.lazy(() => LetterOfEngagementWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const LetterOfEngagementOrderByWithAggregationInputSchema: z.ZodType<Prisma.LetterOfEngagementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LetterOfEngagementCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LetterOfEngagementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LetterOfEngagementMinOrderByAggregateInputSchema).optional()
}).strict();

export const LetterOfEngagementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LetterOfEngagementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LetterOfEngagementScalarWhereWithAggregatesInputSchema),z.lazy(() => LetterOfEngagementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LetterOfEngagementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LetterOfEngagementScalarWhereWithAggregatesInputSchema),z.lazy(() => LetterOfEngagementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InvoiceWhereInputSchema: z.ZodType<Prisma.InvoiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const InvoiceOrderByWithRelationInputSchema: z.ZodType<Prisma.InvoiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const InvoiceWhereUniqueInputSchema: z.ZodType<Prisma.InvoiceWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const InvoiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvoiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvoiceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvoiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvoiceMinOrderByAggregateInputSchema).optional()
}).strict();

export const InvoiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvoiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReceiptWhereInputSchema: z.ZodType<Prisma.ReceiptWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const ReceiptOrderByWithRelationInputSchema: z.ZodType<Prisma.ReceiptOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ReceiptWhereUniqueInputSchema: z.ZodType<Prisma.ReceiptWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptWhereInputSchema),z.lazy(() => ReceiptWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const ReceiptOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReceiptOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReceiptCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReceiptMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReceiptMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReceiptScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReceiptScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema),z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema),z.lazy(() => ReceiptScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IndustryWhereInputSchema: z.ZodType<Prisma.IndustryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndustryWhereInputSchema),z.lazy(() => IndustryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndustryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndustryWhereInputSchema),z.lazy(() => IndustryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  clientModel: z.lazy(() => ClientListRelationFilterSchema).optional()
}).strict();

export const IndustryOrderByWithRelationInputSchema: z.ZodType<Prisma.IndustryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  clientModel: z.lazy(() => ClientOrderByRelationAggregateInputSchema).optional()
}).strict();

export const IndustryWhereUniqueInputSchema: z.ZodType<Prisma.IndustryWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => IndustryWhereInputSchema),z.lazy(() => IndustryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndustryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndustryWhereInputSchema),z.lazy(() => IndustryWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  clientModel: z.lazy(() => ClientListRelationFilterSchema).optional()
}).strict());

export const IndustryOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndustryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IndustryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndustryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndustryMinOrderByAggregateInputSchema).optional()
}).strict();

export const IndustryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndustryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndustryScalarWhereWithAggregatesInputSchema),z.lazy(() => IndustryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndustryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndustryScalarWhereWithAggregatesInputSchema),z.lazy(() => IndustryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportsWhereInputSchema: z.ZodType<Prisma.ReportsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportsWhereInputSchema),z.lazy(() => ReportsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportsWhereInputSchema),z.lazy(() => ReportsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportFileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalLetterUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  consentLetterUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusNullableFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.union([ z.lazy(() => RatingRelationFilterSchema),z.lazy(() => RatingWhereInputSchema) ]).optional(),
}).strict();

export const ReportsOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  reportTitle: z.lazy(() => SortOrderSchema).optional(),
  reportFileUrl: z.lazy(() => SortOrderSchema).optional(),
  finalLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  consentLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByWithRelationInputSchema).optional()
}).strict();

export const ReportsWhereUniqueInputSchema: z.ZodType<Prisma.ReportsWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ReportsWhereInputSchema),z.lazy(() => ReportsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportsWhereInputSchema),z.lazy(() => ReportsWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportFileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalLetterUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  consentLetterUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusNullableFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.union([ z.lazy(() => RatingRelationFilterSchema),z.lazy(() => RatingWhereInputSchema) ]).optional(),
}).strict());

export const ReportsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  reportTitle: z.lazy(() => SortOrderSchema).optional(),
  reportFileUrl: z.lazy(() => SortOrderSchema).optional(),
  finalLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  consentLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportsScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportsScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportTitle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportFileUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  finalLetterUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  consentLetterUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusNullableWithAggregatesFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RatingWhereInputSchema: z.ZodType<Prisma.RatingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ratingTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ratingScore: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingClass: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingYear: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  supervisor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  primaryAnalyst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  methodology: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionnaire: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionnaireFiles: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  additionalFiles: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  requireQuestionnaireFiles: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  loe: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invoice: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receipt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumRatingStatusNullableFilterSchema),z.lazy(() => RatingStatusSchema) ]).optional().nullable(),
  issueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  expiryDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingClassModel: z.union([ z.lazy(() => RatingClassNullableRelationFilterSchema),z.lazy(() => RatingClassWhereInputSchema) ]).optional().nullable(),
  clientModel: z.union([ z.lazy(() => ClientRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  methodologyModel: z.union([ z.lazy(() => MethodologyRelationFilterSchema),z.lazy(() => MethodologyWhereInputSchema) ]).optional(),
  questionnaireModel: z.union([ z.lazy(() => QuestionnaireRelationFilterSchema),z.lazy(() => QuestionnaireWhereInputSchema) ]).optional(),
  loeModel: z.union([ z.lazy(() => LetterOfEngagementNullableRelationFilterSchema),z.lazy(() => LetterOfEngagementWhereInputSchema) ]).optional().nullable(),
  invoiceModel: z.union([ z.lazy(() => InvoiceNullableRelationFilterSchema),z.lazy(() => InvoiceWhereInputSchema) ]).optional().nullable(),
  receiptModel: z.union([ z.lazy(() => ReceiptNullableRelationFilterSchema),z.lazy(() => ReceiptWhereInputSchema) ]).optional().nullable(),
  reportModel: z.lazy(() => ReportsListRelationFilterSchema).optional()
}).strict();

export const RatingOrderByWithRelationInputSchema: z.ZodType<Prisma.RatingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ratingTitle: z.lazy(() => SortOrderSchema).optional(),
  ratingScore: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  ratingClass: z.lazy(() => SortOrderSchema).optional(),
  ratingYear: z.lazy(() => SortOrderSchema).optional(),
  supervisor: z.lazy(() => SortOrderSchema).optional(),
  primaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  secondaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  methodology: z.lazy(() => SortOrderSchema).optional(),
  questionnaire: z.lazy(() => SortOrderSchema).optional(),
  questionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  additionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireAdditionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireQuestionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  loe: z.lazy(() => SortOrderSchema).optional(),
  invoice: z.lazy(() => SortOrderSchema).optional(),
  receipt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  issueDate: z.lazy(() => SortOrderSchema).optional(),
  expiryDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingClassModel: z.lazy(() => RatingClassOrderByWithRelationInputSchema).optional(),
  clientModel: z.lazy(() => ClientOrderByWithRelationInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyOrderByWithRelationInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireOrderByWithRelationInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementOrderByWithRelationInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceOrderByWithRelationInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptOrderByWithRelationInputSchema).optional(),
  reportModel: z.lazy(() => ReportsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RatingWhereUniqueInputSchema: z.ZodType<Prisma.RatingWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  ratingTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ratingScore: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingClass: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingYear: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  supervisor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  primaryAnalyst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  methodology: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionnaire: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionnaireFiles: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  additionalFiles: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  requireQuestionnaireFiles: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  loe: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invoice: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receipt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumRatingStatusNullableFilterSchema),z.lazy(() => RatingStatusSchema) ]).optional().nullable(),
  issueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  expiryDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingClassModel: z.union([ z.lazy(() => RatingClassNullableRelationFilterSchema),z.lazy(() => RatingClassWhereInputSchema) ]).optional().nullable(),
  clientModel: z.union([ z.lazy(() => ClientRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  methodologyModel: z.union([ z.lazy(() => MethodologyRelationFilterSchema),z.lazy(() => MethodologyWhereInputSchema) ]).optional(),
  questionnaireModel: z.union([ z.lazy(() => QuestionnaireRelationFilterSchema),z.lazy(() => QuestionnaireWhereInputSchema) ]).optional(),
  loeModel: z.union([ z.lazy(() => LetterOfEngagementNullableRelationFilterSchema),z.lazy(() => LetterOfEngagementWhereInputSchema) ]).optional().nullable(),
  invoiceModel: z.union([ z.lazy(() => InvoiceNullableRelationFilterSchema),z.lazy(() => InvoiceWhereInputSchema) ]).optional().nullable(),
  receiptModel: z.union([ z.lazy(() => ReceiptNullableRelationFilterSchema),z.lazy(() => ReceiptWhereInputSchema) ]).optional().nullable(),
  reportModel: z.lazy(() => ReportsListRelationFilterSchema).optional()
}).strict());

export const RatingOrderByWithAggregationInputSchema: z.ZodType<Prisma.RatingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ratingTitle: z.lazy(() => SortOrderSchema).optional(),
  ratingScore: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  ratingClass: z.lazy(() => SortOrderSchema).optional(),
  ratingYear: z.lazy(() => SortOrderSchema).optional(),
  supervisor: z.lazy(() => SortOrderSchema).optional(),
  primaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  secondaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  methodology: z.lazy(() => SortOrderSchema).optional(),
  questionnaire: z.lazy(() => SortOrderSchema).optional(),
  questionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  additionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireAdditionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireQuestionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  loe: z.lazy(() => SortOrderSchema).optional(),
  invoice: z.lazy(() => SortOrderSchema).optional(),
  receipt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  issueDate: z.lazy(() => SortOrderSchema).optional(),
  expiryDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RatingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RatingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RatingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RatingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RatingSumOrderByAggregateInputSchema).optional()
}).strict();

export const RatingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RatingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RatingScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ratingTitle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ratingScore: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  unit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ratingClass: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ratingYear: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  supervisor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  primaryAnalyst: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  methodology: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  questionnaire: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  questionnaireFiles: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  additionalFiles: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  requireQuestionnaireFiles: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  loe: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  invoice: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  receipt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumRatingStatusNullableWithAggregatesFilterSchema),z.lazy(() => RatingStatusSchema) ]).optional().nullable(),
  issueDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  expiryDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RatingClassWhereInputSchema: z.ZodType<Prisma.RatingClassWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingClassWhereInputSchema),z.lazy(() => RatingClassWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingClassWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingClassWhereInputSchema),z.lazy(() => RatingClassWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const RatingClassOrderByWithRelationInputSchema: z.ZodType<Prisma.RatingClassOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RatingClassWhereUniqueInputSchema: z.ZodType<Prisma.RatingClassWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RatingClassWhereInputSchema),z.lazy(() => RatingClassWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingClassWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingClassWhereInputSchema),z.lazy(() => RatingClassWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const RatingClassOrderByWithAggregationInputSchema: z.ZodType<Prisma.RatingClassOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RatingClassCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RatingClassMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RatingClassMinOrderByAggregateInputSchema).optional()
}).strict();

export const RatingClassScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RatingClassScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RatingClassScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingClassScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingClassScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingClassScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingClassScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ClientWhereInputSchema: z.ZodType<Prisma.ClientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  industry: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numberAndStreet: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  building: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  area: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  landmark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionOrState: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  industryModel: z.union([ z.lazy(() => IndustryRelationFilterSchema),z.lazy(() => IndustryWhereInputSchema) ]).optional(),
  contactModel: z.lazy(() => ContactListRelationFilterSchema).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const ClientOrderByWithRelationInputSchema: z.ZodType<Prisma.ClientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  industry: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  companyPhoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  numberAndStreet: z.lazy(() => SortOrderSchema).optional(),
  building: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  landmark: z.lazy(() => SortOrderSchema).optional(),
  regionOrState: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  industryModel: z.lazy(() => IndustryOrderByWithRelationInputSchema).optional(),
  contactModel: z.lazy(() => ContactOrderByRelationAggregateInputSchema).optional(),
  ratingModel: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ClientWhereUniqueInputSchema: z.ZodType<Prisma.ClientWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  industry: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numberAndStreet: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  building: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  area: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  landmark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionOrState: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  industryModel: z.union([ z.lazy(() => IndustryRelationFilterSchema),z.lazy(() => IndustryWhereInputSchema) ]).optional(),
  contactModel: z.lazy(() => ContactListRelationFilterSchema).optional(),
  ratingModel: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const ClientOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  industry: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  companyPhoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  numberAndStreet: z.lazy(() => SortOrderSchema).optional(),
  building: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  landmark: z.lazy(() => SortOrderSchema).optional(),
  regionOrState: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClientCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClientMinOrderByAggregateInputSchema).optional()
}).strict();

export const ClientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  industry: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  numberAndStreet: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  building: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  area: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  landmark: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  regionOrState: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ContactWhereInputSchema: z.ZodType<Prisma.ContactWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactWhereInputSchema),z.lazy(() => ContactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactWhereInputSchema),z.lazy(() => ContactWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumbers: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  magicToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  canLogin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  clientModel: z.union([ z.lazy(() => ClientRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
}).strict();

export const ContactOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  phoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  magicToken: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  canLogin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  clientModel: z.lazy(() => ClientOrderByWithRelationInputSchema).optional()
}).strict();

export const ContactWhereUniqueInputSchema: z.ZodType<Prisma.ContactWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => ContactWhereInputSchema),z.lazy(() => ContactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactWhereInputSchema),z.lazy(() => ContactWhereInputSchema).array() ]).optional(),
  fullName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumbers: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  magicToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  canLogin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  clientModel: z.union([ z.lazy(() => ClientRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
}).strict());

export const ContactOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  phoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  magicToken: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  canLogin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContactCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContactMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContactMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContactScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContactScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContactScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phoneNumbers: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  magicToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  canLogin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LogWhereInputSchema: z.ZodType<Prisma.LogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  table: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prevDocs: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  newDocs: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LogOrderByWithRelationInputSchema: z.ZodType<Prisma.LogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  table: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  prevDocs: z.lazy(() => SortOrderSchema).optional(),
  newDocs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogWhereUniqueInputSchema: z.ZodType<Prisma.LogWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  user: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  table: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prevDocs: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  newDocs: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const LogOrderByWithAggregationInputSchema: z.ZodType<Prisma.LogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  table: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  prevDocs: z.lazy(() => SortOrderSchema).optional(),
  newDocs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LogMinOrderByAggregateInputSchema).optional()
}).strict();

export const LogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  table: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prevDocs: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  newDocs: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MethodologyCreateInputSchema: z.ZodType<Prisma.MethodologyCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutMethodologyModelInputSchema).optional()
}).strict();

export const MethodologyUncheckedCreateInputSchema: z.ZodType<Prisma.MethodologyUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutMethodologyModelInputSchema).optional()
}).strict();

export const MethodologyUpdateInputSchema: z.ZodType<Prisma.MethodologyUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutMethodologyModelNestedInputSchema).optional()
}).strict();

export const MethodologyUncheckedUpdateInputSchema: z.ZodType<Prisma.MethodologyUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutMethodologyModelNestedInputSchema).optional()
}).strict();

export const MethodologyCreateManyInputSchema: z.ZodType<Prisma.MethodologyCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MethodologyUpdateManyMutationInputSchema: z.ZodType<Prisma.MethodologyUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MethodologyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MethodologyUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionnaireCreateInputSchema: z.ZodType<Prisma.QuestionnaireCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutQuestionnaireModelInputSchema).optional()
}).strict();

export const QuestionnaireUncheckedCreateInputSchema: z.ZodType<Prisma.QuestionnaireUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutQuestionnaireModelInputSchema).optional()
}).strict();

export const QuestionnaireUpdateInputSchema: z.ZodType<Prisma.QuestionnaireUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutQuestionnaireModelNestedInputSchema).optional()
}).strict();

export const QuestionnaireUncheckedUpdateInputSchema: z.ZodType<Prisma.QuestionnaireUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutQuestionnaireModelNestedInputSchema).optional()
}).strict();

export const QuestionnaireCreateManyInputSchema: z.ZodType<Prisma.QuestionnaireCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const QuestionnaireUpdateManyMutationInputSchema: z.ZodType<Prisma.QuestionnaireUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionnaireUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QuestionnaireUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LetterOfEngagementCreateInputSchema: z.ZodType<Prisma.LetterOfEngagementCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutLoeModelInputSchema).optional()
}).strict();

export const LetterOfEngagementUncheckedCreateInputSchema: z.ZodType<Prisma.LetterOfEngagementUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutLoeModelInputSchema).optional()
}).strict();

export const LetterOfEngagementUpdateInputSchema: z.ZodType<Prisma.LetterOfEngagementUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutLoeModelNestedInputSchema).optional()
}).strict();

export const LetterOfEngagementUncheckedUpdateInputSchema: z.ZodType<Prisma.LetterOfEngagementUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutLoeModelNestedInputSchema).optional()
}).strict();

export const LetterOfEngagementCreateManyInputSchema: z.ZodType<Prisma.LetterOfEngagementCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LetterOfEngagementUpdateManyMutationInputSchema: z.ZodType<Prisma.LetterOfEngagementUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LetterOfEngagementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LetterOfEngagementUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceCreateInputSchema: z.ZodType<Prisma.InvoiceCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutInvoiceModelInputSchema).optional()
}).strict();

export const InvoiceUncheckedCreateInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutInvoiceModelInputSchema).optional()
}).strict();

export const InvoiceUpdateInputSchema: z.ZodType<Prisma.InvoiceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutInvoiceModelNestedInputSchema).optional()
}).strict();

export const InvoiceUncheckedUpdateInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutInvoiceModelNestedInputSchema).optional()
}).strict();

export const InvoiceCreateManyInputSchema: z.ZodType<Prisma.InvoiceCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvoiceUpdateManyMutationInputSchema: z.ZodType<Prisma.InvoiceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReceiptCreateInputSchema: z.ZodType<Prisma.ReceiptCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutReceiptModelInputSchema).optional()
}).strict();

export const ReceiptUncheckedCreateInputSchema: z.ZodType<Prisma.ReceiptUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutReceiptModelInputSchema).optional()
}).strict();

export const ReceiptUpdateInputSchema: z.ZodType<Prisma.ReceiptUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutReceiptModelNestedInputSchema).optional()
}).strict();

export const ReceiptUncheckedUpdateInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutReceiptModelNestedInputSchema).optional()
}).strict();

export const ReceiptCreateManyInputSchema: z.ZodType<Prisma.ReceiptCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReceiptUpdateManyMutationInputSchema: z.ZodType<Prisma.ReceiptUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReceiptUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndustryCreateInputSchema: z.ZodType<Prisma.IndustryCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  clientModel: z.lazy(() => ClientCreateNestedManyWithoutIndustryModelInputSchema).optional()
}).strict();

export const IndustryUncheckedCreateInputSchema: z.ZodType<Prisma.IndustryUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  clientModel: z.lazy(() => ClientUncheckedCreateNestedManyWithoutIndustryModelInputSchema).optional()
}).strict();

export const IndustryUpdateInputSchema: z.ZodType<Prisma.IndustryUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  clientModel: z.lazy(() => ClientUpdateManyWithoutIndustryModelNestedInputSchema).optional()
}).strict();

export const IndustryUncheckedUpdateInputSchema: z.ZodType<Prisma.IndustryUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  clientModel: z.lazy(() => ClientUncheckedUpdateManyWithoutIndustryModelNestedInputSchema).optional()
}).strict();

export const IndustryCreateManyInputSchema: z.ZodType<Prisma.IndustryCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IndustryUpdateManyMutationInputSchema: z.ZodType<Prisma.IndustryUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndustryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndustryUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsCreateInputSchema: z.ZodType<Prisma.ReportsCreateInput> = z.object({
  id: z.string().optional(),
  reportTitle: z.string(),
  reportFileUrl: z.string().optional().nullable(),
  finalLetterUrl: z.string().optional().nullable(),
  consentLetterUrl: z.string().optional().nullable(),
  version: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedOneWithoutReportModelInputSchema)
}).strict();

export const ReportsUncheckedCreateInputSchema: z.ZodType<Prisma.ReportsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.string(),
  reportTitle: z.string(),
  reportFileUrl: z.string().optional().nullable(),
  finalLetterUrl: z.string().optional().nullable(),
  consentLetterUrl: z.string().optional().nullable(),
  version: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportsUpdateInputSchema: z.ZodType<Prisma.ReportsUpdateInput> = z.object({
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateOneRequiredWithoutReportModelNestedInputSchema).optional()
}).strict();

export const ReportsUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportsUncheckedUpdateInput> = z.object({
  rating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsCreateManyInputSchema: z.ZodType<Prisma.ReportsCreateManyInput> = z.object({
  id: z.string().optional(),
  rating: z.string(),
  reportTitle: z.string(),
  reportFileUrl: z.string().optional().nullable(),
  finalLetterUrl: z.string().optional().nullable(),
  consentLetterUrl: z.string().optional().nullable(),
  version: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportsUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportsUpdateManyMutationInput> = z.object({
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportsUncheckedUpdateManyInput> = z.object({
  rating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateInputSchema: z.ZodType<Prisma.RatingCreateInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateInputSchema: z.ZodType<Prisma.RatingUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUpdateInputSchema: z.ZodType<Prisma.RatingUpdateInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingCreateManyInputSchema: z.ZodType<Prisma.RatingCreateManyInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateManyMutationInputSchema: z.ZodType<Prisma.RatingUpdateManyMutationInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingClassCreateInputSchema: z.ZodType<Prisma.RatingClassCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutRatingClassModelInputSchema).optional()
}).strict();

export const RatingClassUncheckedCreateInputSchema: z.ZodType<Prisma.RatingClassUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutRatingClassModelInputSchema).optional()
}).strict();

export const RatingClassUpdateInputSchema: z.ZodType<Prisma.RatingClassUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutRatingClassModelNestedInputSchema).optional()
}).strict();

export const RatingClassUncheckedUpdateInputSchema: z.ZodType<Prisma.RatingClassUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutRatingClassModelNestedInputSchema).optional()
}).strict();

export const RatingClassCreateManyInputSchema: z.ZodType<Prisma.RatingClassCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingClassUpdateManyMutationInputSchema: z.ZodType<Prisma.RatingClassUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingClassUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RatingClassUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientCreateInputSchema: z.ZodType<Prisma.ClientCreateInput> = z.object({
  id: z.string().optional(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  industryModel: z.lazy(() => IndustryCreateNestedOneWithoutClientModelInputSchema),
  contactModel: z.lazy(() => ContactCreateNestedManyWithoutClientModelInputSchema).optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientUncheckedCreateInputSchema: z.ZodType<Prisma.ClientUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  industry: z.string(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contactModel: z.lazy(() => ContactUncheckedCreateNestedManyWithoutClientModelInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientUpdateInputSchema: z.ZodType<Prisma.ClientUpdateInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  industryModel: z.lazy(() => IndustryUpdateOneRequiredWithoutClientModelNestedInputSchema).optional(),
  contactModel: z.lazy(() => ContactUpdateManyWithoutClientModelNestedInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateInput> = z.object({
  industry: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contactModel: z.lazy(() => ContactUncheckedUpdateManyWithoutClientModelNestedInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const ClientCreateManyInputSchema: z.ZodType<Prisma.ClientCreateManyInput> = z.object({
  id: z.string().optional(),
  industry: z.string(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ClientUpdateManyMutationInputSchema: z.ZodType<Prisma.ClientUpdateManyMutationInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyInput> = z.object({
  industry: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactCreateInputSchema: z.ZodType<Prisma.ContactCreateInput> = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phoneNumbers: z.string().optional().nullable(),
  magicToken: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutContactModelInputSchema)
}).strict();

export const ContactUncheckedCreateInputSchema: z.ZodType<Prisma.ContactUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phoneNumbers: z.string().optional().nullable(),
  magicToken: z.string().optional().nullable(),
  client: z.string(),
  address: z.string().optional().nullable(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ContactUpdateInputSchema: z.ZodType<Prisma.ContactUpdateInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutContactModelNestedInputSchema).optional()
}).strict();

export const ContactUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactUncheckedUpdateInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactCreateManyInputSchema: z.ZodType<Prisma.ContactCreateManyInput> = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phoneNumbers: z.string().optional().nullable(),
  magicToken: z.string().optional().nullable(),
  client: z.string(),
  address: z.string().optional().nullable(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ContactUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactUpdateManyMutationInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactUncheckedUpdateManyInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogCreateInputSchema: z.ZodType<Prisma.LogCreateInput> = z.object({
  id: z.string().optional(),
  user: z.string(),
  action: z.string(),
  table: z.string(),
  message: z.string(),
  prevDocs: z.string(),
  newDocs: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LogUncheckedCreateInputSchema: z.ZodType<Prisma.LogUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  user: z.string(),
  action: z.string(),
  table: z.string(),
  message: z.string(),
  prevDocs: z.string(),
  newDocs: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LogUpdateInputSchema: z.ZodType<Prisma.LogUpdateInput> = z.object({
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prevDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogUncheckedUpdateInputSchema: z.ZodType<Prisma.LogUncheckedUpdateInput> = z.object({
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prevDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogCreateManyInputSchema: z.ZodType<Prisma.LogCreateManyInput> = z.object({
  id: z.string().optional(),
  user: z.string(),
  action: z.string(),
  table: z.string(),
  message: z.string(),
  prevDocs: z.string(),
  newDocs: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LogUpdateManyMutationInputSchema: z.ZodType<Prisma.LogUpdateManyMutationInput> = z.object({
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prevDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LogUncheckedUpdateManyInput> = z.object({
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prevDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  newDocs: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const RatingListRelationFilterSchema: z.ZodType<Prisma.RatingListRelationFilter> = z.object({
  every: z.lazy(() => RatingWhereInputSchema).optional(),
  some: z.lazy(() => RatingWhereInputSchema).optional(),
  none: z.lazy(() => RatingWhereInputSchema).optional()
}).strict();

export const RatingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RatingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MethodologyCountOrderByAggregateInputSchema: z.ZodType<Prisma.MethodologyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MethodologyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MethodologyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MethodologyMinOrderByAggregateInputSchema: z.ZodType<Prisma.MethodologyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const QuestionnaireCountOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionnaireCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionnaireMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionnaireMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuestionnaireMinOrderByAggregateInputSchema: z.ZodType<Prisma.QuestionnaireMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LetterOfEngagementCountOrderByAggregateInputSchema: z.ZodType<Prisma.LetterOfEngagementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LetterOfEngagementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LetterOfEngagementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LetterOfEngagementMinOrderByAggregateInputSchema: z.ZodType<Prisma.LetterOfEngagementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReceiptCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReceiptMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReceiptMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReceiptMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientListRelationFilterSchema: z.ZodType<Prisma.ClientListRelationFilter> = z.object({
  every: z.lazy(() => ClientWhereInputSchema).optional(),
  some: z.lazy(() => ClientWhereInputSchema).optional(),
  none: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndustryCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndustryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndustryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndustryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndustryMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndustryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReportStatusNullableFilterSchema: z.ZodType<Prisma.EnumReportStatusNullableFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional().nullable(),
  in: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const RatingRelationFilterSchema: z.ZodType<Prisma.RatingRelationFilter> = z.object({
  is: z.lazy(() => RatingWhereInputSchema).optional(),
  isNot: z.lazy(() => RatingWhereInputSchema).optional()
}).strict();

export const ReportsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  reportTitle: z.lazy(() => SortOrderSchema).optional(),
  reportFileUrl: z.lazy(() => SortOrderSchema).optional(),
  finalLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  consentLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  reportTitle: z.lazy(() => SortOrderSchema).optional(),
  reportFileUrl: z.lazy(() => SortOrderSchema).optional(),
  finalLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  consentLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  reportTitle: z.lazy(() => SortOrderSchema).optional(),
  reportFileUrl: z.lazy(() => SortOrderSchema).optional(),
  finalLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  consentLetterUrl: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReportStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional().nullable(),
  in: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportStatusNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumRatingStatusNullableFilterSchema: z.ZodType<Prisma.EnumRatingStatusNullableFilter> = z.object({
  equals: z.lazy(() => RatingStatusSchema).optional().nullable(),
  in: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NestedEnumRatingStatusNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const RatingClassNullableRelationFilterSchema: z.ZodType<Prisma.RatingClassNullableRelationFilter> = z.object({
  is: z.lazy(() => RatingClassWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RatingClassWhereInputSchema).optional().nullable()
}).strict();

export const ClientRelationFilterSchema: z.ZodType<Prisma.ClientRelationFilter> = z.object({
  is: z.lazy(() => ClientWhereInputSchema).optional(),
  isNot: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const MethodologyRelationFilterSchema: z.ZodType<Prisma.MethodologyRelationFilter> = z.object({
  is: z.lazy(() => MethodologyWhereInputSchema).optional(),
  isNot: z.lazy(() => MethodologyWhereInputSchema).optional()
}).strict();

export const QuestionnaireRelationFilterSchema: z.ZodType<Prisma.QuestionnaireRelationFilter> = z.object({
  is: z.lazy(() => QuestionnaireWhereInputSchema).optional(),
  isNot: z.lazy(() => QuestionnaireWhereInputSchema).optional()
}).strict();

export const LetterOfEngagementNullableRelationFilterSchema: z.ZodType<Prisma.LetterOfEngagementNullableRelationFilter> = z.object({
  is: z.lazy(() => LetterOfEngagementWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LetterOfEngagementWhereInputSchema).optional().nullable()
}).strict();

export const InvoiceNullableRelationFilterSchema: z.ZodType<Prisma.InvoiceNullableRelationFilter> = z.object({
  is: z.lazy(() => InvoiceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InvoiceWhereInputSchema).optional().nullable()
}).strict();

export const ReceiptNullableRelationFilterSchema: z.ZodType<Prisma.ReceiptNullableRelationFilter> = z.object({
  is: z.lazy(() => ReceiptWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ReceiptWhereInputSchema).optional().nullable()
}).strict();

export const ReportsListRelationFilterSchema: z.ZodType<Prisma.ReportsListRelationFilter> = z.object({
  every: z.lazy(() => ReportsWhereInputSchema).optional(),
  some: z.lazy(() => ReportsWhereInputSchema).optional(),
  none: z.lazy(() => ReportsWhereInputSchema).optional()
}).strict();

export const ReportsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingCountOrderByAggregateInputSchema: z.ZodType<Prisma.RatingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ratingTitle: z.lazy(() => SortOrderSchema).optional(),
  ratingScore: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  ratingClass: z.lazy(() => SortOrderSchema).optional(),
  ratingYear: z.lazy(() => SortOrderSchema).optional(),
  supervisor: z.lazy(() => SortOrderSchema).optional(),
  primaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  secondaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  methodology: z.lazy(() => SortOrderSchema).optional(),
  questionnaire: z.lazy(() => SortOrderSchema).optional(),
  questionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  additionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireAdditionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireQuestionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  loe: z.lazy(() => SortOrderSchema).optional(),
  invoice: z.lazy(() => SortOrderSchema).optional(),
  receipt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  issueDate: z.lazy(() => SortOrderSchema).optional(),
  expiryDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RatingAvgOrderByAggregateInput> = z.object({
  ratingYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RatingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ratingTitle: z.lazy(() => SortOrderSchema).optional(),
  ratingScore: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  ratingClass: z.lazy(() => SortOrderSchema).optional(),
  ratingYear: z.lazy(() => SortOrderSchema).optional(),
  supervisor: z.lazy(() => SortOrderSchema).optional(),
  primaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  secondaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  methodology: z.lazy(() => SortOrderSchema).optional(),
  questionnaire: z.lazy(() => SortOrderSchema).optional(),
  questionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  additionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireAdditionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireQuestionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  loe: z.lazy(() => SortOrderSchema).optional(),
  invoice: z.lazy(() => SortOrderSchema).optional(),
  receipt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  issueDate: z.lazy(() => SortOrderSchema).optional(),
  expiryDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingMinOrderByAggregateInputSchema: z.ZodType<Prisma.RatingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ratingTitle: z.lazy(() => SortOrderSchema).optional(),
  ratingScore: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  ratingClass: z.lazy(() => SortOrderSchema).optional(),
  ratingYear: z.lazy(() => SortOrderSchema).optional(),
  supervisor: z.lazy(() => SortOrderSchema).optional(),
  primaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  secondaryAnalyst: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  methodology: z.lazy(() => SortOrderSchema).optional(),
  questionnaire: z.lazy(() => SortOrderSchema).optional(),
  questionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  additionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireAdditionalFiles: z.lazy(() => SortOrderSchema).optional(),
  requireQuestionnaireFiles: z.lazy(() => SortOrderSchema).optional(),
  loe: z.lazy(() => SortOrderSchema).optional(),
  invoice: z.lazy(() => SortOrderSchema).optional(),
  receipt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  issueDate: z.lazy(() => SortOrderSchema).optional(),
  expiryDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingSumOrderByAggregateInputSchema: z.ZodType<Prisma.RatingSumOrderByAggregateInput> = z.object({
  ratingYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumRatingStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRatingStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RatingStatusSchema).optional().nullable(),
  in: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NestedEnumRatingStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRatingStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRatingStatusNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const RatingClassCountOrderByAggregateInputSchema: z.ZodType<Prisma.RatingClassCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingClassMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RatingClassMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingClassMinOrderByAggregateInputSchema: z.ZodType<Prisma.RatingClassMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndustryRelationFilterSchema: z.ZodType<Prisma.IndustryRelationFilter> = z.object({
  is: z.lazy(() => IndustryWhereInputSchema).optional(),
  isNot: z.lazy(() => IndustryWhereInputSchema).optional()
}).strict();

export const ContactListRelationFilterSchema: z.ZodType<Prisma.ContactListRelationFilter> = z.object({
  every: z.lazy(() => ContactWhereInputSchema).optional(),
  some: z.lazy(() => ContactWhereInputSchema).optional(),
  none: z.lazy(() => ContactWhereInputSchema).optional()
}).strict();

export const ContactOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContactOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  industry: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  companyPhoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  numberAndStreet: z.lazy(() => SortOrderSchema).optional(),
  building: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  landmark: z.lazy(() => SortOrderSchema).optional(),
  regionOrState: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  industry: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  companyPhoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  numberAndStreet: z.lazy(() => SortOrderSchema).optional(),
  building: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  landmark: z.lazy(() => SortOrderSchema).optional(),
  regionOrState: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  industry: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  companyPhoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  numberAndStreet: z.lazy(() => SortOrderSchema).optional(),
  building: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => SortOrderSchema).optional(),
  landmark: z.lazy(() => SortOrderSchema).optional(),
  regionOrState: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  phoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  magicToken: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  canLogin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContactMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  phoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  magicToken: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  canLogin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  phoneNumbers: z.lazy(() => SortOrderSchema).optional(),
  magicToken: z.lazy(() => SortOrderSchema).optional(),
  client: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  canLogin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogCountOrderByAggregateInputSchema: z.ZodType<Prisma.LogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  table: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  prevDocs: z.lazy(() => SortOrderSchema).optional(),
  newDocs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  table: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  prevDocs: z.lazy(() => SortOrderSchema).optional(),
  newDocs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LogMinOrderByAggregateInputSchema: z.ZodType<Prisma.LogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  table: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  prevDocs: z.lazy(() => SortOrderSchema).optional(),
  newDocs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingCreateNestedManyWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutMethodologyModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMethodologyModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutMethodologyModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMethodologyModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const RatingUpdateManyWithoutMethodologyModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutMethodologyModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutMethodologyModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutMethodologyModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMethodologyModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutMethodologyModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutMethodologyModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutMethodologyModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutMethodologyModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutMethodologyModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutMethodologyModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutMethodologyModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutMethodologyModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutMethodologyModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyMethodologyModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutMethodologyModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutMethodologyModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutMethodologyModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutMethodologyModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutQuestionnaireModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyQuestionnaireModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutQuestionnaireModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyQuestionnaireModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutQuestionnaireModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutQuestionnaireModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyQuestionnaireModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutQuestionnaireModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutQuestionnaireModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyQuestionnaireModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutQuestionnaireModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutLoeModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutLoeModelInputSchema),z.lazy(() => RatingCreateWithoutLoeModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyLoeModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutLoeModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutLoeModelInputSchema),z.lazy(() => RatingCreateWithoutLoeModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyLoeModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutLoeModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutLoeModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutLoeModelInputSchema),z.lazy(() => RatingCreateWithoutLoeModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutLoeModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutLoeModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyLoeModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutLoeModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutLoeModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutLoeModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutLoeModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutLoeModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutLoeModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutLoeModelInputSchema),z.lazy(() => RatingCreateWithoutLoeModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutLoeModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutLoeModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutLoeModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyLoeModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutLoeModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutLoeModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutLoeModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutLoeModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutInvoiceModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyInvoiceModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutInvoiceModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyInvoiceModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutInvoiceModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutInvoiceModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutInvoiceModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutInvoiceModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyInvoiceModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutInvoiceModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutInvoiceModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutInvoiceModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutInvoiceModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutInvoiceModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutInvoiceModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutInvoiceModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutInvoiceModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutInvoiceModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyInvoiceModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutInvoiceModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutInvoiceModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutInvoiceModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutInvoiceModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutReceiptModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateWithoutReceiptModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyReceiptModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutReceiptModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateWithoutReceiptModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyReceiptModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutReceiptModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutReceiptModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateWithoutReceiptModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutReceiptModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutReceiptModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyReceiptModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutReceiptModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutReceiptModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutReceiptModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutReceiptModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutReceiptModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutReceiptModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateWithoutReceiptModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutReceiptModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutReceiptModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutReceiptModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyReceiptModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutReceiptModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutReceiptModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutReceiptModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutReceiptModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClientCreateNestedManyWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientCreateNestedManyWithoutIndustryModelInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateWithoutIndustryModelInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyIndustryModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClientUncheckedCreateNestedManyWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUncheckedCreateNestedManyWithoutIndustryModelInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateWithoutIndustryModelInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyIndustryModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClientUpdateManyWithoutIndustryModelNestedInputSchema: z.ZodType<Prisma.ClientUpdateManyWithoutIndustryModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateWithoutIndustryModelInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClientUpsertWithWhereUniqueWithoutIndustryModelInputSchema),z.lazy(() => ClientUpsertWithWhereUniqueWithoutIndustryModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyIndustryModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClientUpdateWithWhereUniqueWithoutIndustryModelInputSchema),z.lazy(() => ClientUpdateWithWhereUniqueWithoutIndustryModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClientUpdateManyWithWhereWithoutIndustryModelInputSchema),z.lazy(() => ClientUpdateManyWithWhereWithoutIndustryModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClientUncheckedUpdateManyWithoutIndustryModelNestedInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyWithoutIndustryModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateWithoutIndustryModelInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema),z.lazy(() => ClientCreateOrConnectWithoutIndustryModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClientUpsertWithWhereUniqueWithoutIndustryModelInputSchema),z.lazy(() => ClientUpsertWithWhereUniqueWithoutIndustryModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyIndustryModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClientUpdateWithWhereUniqueWithoutIndustryModelInputSchema),z.lazy(() => ClientUpdateWithWhereUniqueWithoutIndustryModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClientUpdateManyWithWhereWithoutIndustryModelInputSchema),z.lazy(() => ClientUpdateManyWithWhereWithoutIndustryModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedOneWithoutReportModelInputSchema: z.ZodType<Prisma.RatingCreateNestedOneWithoutReportModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReportModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RatingCreateOrConnectWithoutReportModelInputSchema).optional(),
  connect: z.lazy(() => RatingWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumReportStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumReportStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportStatusSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const RatingUpdateOneRequiredWithoutReportModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateOneRequiredWithoutReportModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReportModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RatingCreateOrConnectWithoutReportModelInputSchema).optional(),
  upsert: z.lazy(() => RatingUpsertWithoutReportModelInputSchema).optional(),
  connect: z.lazy(() => RatingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RatingUpdateToOneWithWhereWithoutReportModelInputSchema),z.lazy(() => RatingUpdateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutReportModelInputSchema) ]).optional(),
}).strict();

export const RatingClassCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingClassCreateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RatingClassCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => RatingClassWhereUniqueInputSchema).optional()
}).strict();

export const ClientCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional()
}).strict();

export const MethodologyCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => MethodologyCreateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MethodologyCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => MethodologyWhereUniqueInputSchema).optional()
}).strict();

export const QuestionnaireCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => QuestionnaireCreateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuestionnaireCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => QuestionnaireWhereUniqueInputSchema).optional()
}).strict();

export const LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => LetterOfEngagementCreateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LetterOfEngagementCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => LetterOfEngagementWhereUniqueInputSchema).optional()
}).strict();

export const InvoiceCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional()
}).strict();

export const ReceiptCreateNestedOneWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptCreateNestedOneWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReceiptCreateOrConnectWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => ReceiptWhereUniqueInputSchema).optional()
}).strict();

export const ReportsCreateNestedManyWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsCreateNestedManyWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => ReportsCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateWithoutRatingModelInputSchema).array(),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportsCreateManyRatingModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUncheckedCreateNestedManyWithoutRatingModelInput> = z.object({
  create: z.union([ z.lazy(() => ReportsCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateWithoutRatingModelInputSchema).array(),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportsCreateManyRatingModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableEnumRatingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumRatingStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RatingStatusSchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const RatingClassUpdateOneWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.RatingClassUpdateOneWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingClassCreateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RatingClassCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => RatingClassUpsertWithoutRatingModelInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RatingClassWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RatingClassWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RatingClassUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => RatingClassUpdateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.ClientUpdateOneRequiredWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClientUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => ClientUpdateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.MethodologyUpdateOneRequiredWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => MethodologyCreateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MethodologyCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => MethodologyUpsertWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => MethodologyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MethodologyUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => MethodologyUpdateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuestionnaireCreateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuestionnaireCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => QuestionnaireUpsertWithoutRatingModelInputSchema).optional(),
  connect: z.lazy(() => QuestionnaireWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuestionnaireUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUpdateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.LetterOfEngagementUpdateOneWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => LetterOfEngagementCreateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LetterOfEngagementCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => LetterOfEngagementUpsertWithoutRatingModelInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LetterOfEngagementWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LetterOfEngagementWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LetterOfEngagementUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUpdateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const InvoiceUpdateOneWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.InvoiceUpdateOneWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => InvoiceUpsertWithoutRatingModelInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => InvoiceUpdateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const ReceiptUpdateOneWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.ReceiptUpdateOneWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReceiptCreateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutRatingModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReceiptCreateOrConnectWithoutRatingModelInputSchema).optional(),
  upsert: z.lazy(() => ReceiptUpsertWithoutRatingModelInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ReceiptWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ReceiptWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReceiptUpdateToOneWithWhereWithoutRatingModelInputSchema),z.lazy(() => ReceiptUpdateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutRatingModelInputSchema) ]).optional(),
}).strict();

export const ReportsUpdateManyWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.ReportsUpdateManyWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportsCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateWithoutRatingModelInputSchema).array(),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportsUpsertWithWhereUniqueWithoutRatingModelInputSchema),z.lazy(() => ReportsUpsertWithWhereUniqueWithoutRatingModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportsCreateManyRatingModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportsUpdateWithWhereUniqueWithoutRatingModelInputSchema),z.lazy(() => ReportsUpdateWithWhereUniqueWithoutRatingModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportsUpdateManyWithWhereWithoutRatingModelInputSchema),z.lazy(() => ReportsUpdateManyWithWhereWithoutRatingModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportsScalarWhereInputSchema),z.lazy(() => ReportsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema: z.ZodType<Prisma.ReportsUncheckedUpdateManyWithoutRatingModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportsCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateWithoutRatingModelInputSchema).array(),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema),z.lazy(() => ReportsCreateOrConnectWithoutRatingModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportsUpsertWithWhereUniqueWithoutRatingModelInputSchema),z.lazy(() => ReportsUpsertWithWhereUniqueWithoutRatingModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportsCreateManyRatingModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportsWhereUniqueInputSchema),z.lazy(() => ReportsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportsUpdateWithWhereUniqueWithoutRatingModelInputSchema),z.lazy(() => ReportsUpdateWithWhereUniqueWithoutRatingModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportsUpdateManyWithWhereWithoutRatingModelInputSchema),z.lazy(() => ReportsUpdateManyWithWhereWithoutRatingModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportsScalarWhereInputSchema),z.lazy(() => ReportsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutRatingClassModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyRatingClassModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutRatingClassModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyRatingClassModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutRatingClassModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutRatingClassModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutRatingClassModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutRatingClassModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyRatingClassModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutRatingClassModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutRatingClassModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutRatingClassModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutRatingClassModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutRatingClassModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutRatingClassModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutRatingClassModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutRatingClassModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutRatingClassModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyRatingClassModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutRatingClassModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutRatingClassModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutRatingClassModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutRatingClassModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndustryCreateNestedOneWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryCreateNestedOneWithoutClientModelInput> = z.object({
  create: z.union([ z.lazy(() => IndustryCreateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedCreateWithoutClientModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndustryCreateOrConnectWithoutClientModelInputSchema).optional(),
  connect: z.lazy(() => IndustryWhereUniqueInputSchema).optional()
}).strict();

export const ContactCreateNestedManyWithoutClientModelInputSchema: z.ZodType<Prisma.ContactCreateNestedManyWithoutClientModelInput> = z.object({
  create: z.union([ z.lazy(() => ContactCreateWithoutClientModelInputSchema),z.lazy(() => ContactCreateWithoutClientModelInputSchema).array(),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactCreateManyClientModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutClientModelInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutClientModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutClientModelInputSchema),z.lazy(() => RatingCreateWithoutClientModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyClientModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContactUncheckedCreateNestedManyWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUncheckedCreateNestedManyWithoutClientModelInput> = z.object({
  create: z.union([ z.lazy(() => ContactCreateWithoutClientModelInputSchema),z.lazy(() => ContactCreateWithoutClientModelInputSchema).array(),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactCreateManyClientModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutClientModelInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutClientModelInputSchema),z.lazy(() => RatingCreateWithoutClientModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyClientModelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndustryUpdateOneRequiredWithoutClientModelNestedInputSchema: z.ZodType<Prisma.IndustryUpdateOneRequiredWithoutClientModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndustryCreateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedCreateWithoutClientModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndustryCreateOrConnectWithoutClientModelInputSchema).optional(),
  upsert: z.lazy(() => IndustryUpsertWithoutClientModelInputSchema).optional(),
  connect: z.lazy(() => IndustryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IndustryUpdateToOneWithWhereWithoutClientModelInputSchema),z.lazy(() => IndustryUpdateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedUpdateWithoutClientModelInputSchema) ]).optional(),
}).strict();

export const ContactUpdateManyWithoutClientModelNestedInputSchema: z.ZodType<Prisma.ContactUpdateManyWithoutClientModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactCreateWithoutClientModelInputSchema),z.lazy(() => ContactCreateWithoutClientModelInputSchema).array(),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactUpsertWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => ContactUpsertWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactCreateManyClientModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactUpdateWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => ContactUpdateWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactUpdateManyWithWhereWithoutClientModelInputSchema),z.lazy(() => ContactUpdateManyWithWhereWithoutClientModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactScalarWhereInputSchema),z.lazy(() => ContactScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutClientModelNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutClientModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutClientModelInputSchema),z.lazy(() => RatingCreateWithoutClientModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyClientModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutClientModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutClientModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactUncheckedUpdateManyWithoutClientModelNestedInputSchema: z.ZodType<Prisma.ContactUncheckedUpdateManyWithoutClientModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactCreateWithoutClientModelInputSchema),z.lazy(() => ContactCreateWithoutClientModelInputSchema).array(),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => ContactCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactUpsertWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => ContactUpsertWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactCreateManyClientModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactWhereUniqueInputSchema),z.lazy(() => ContactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactUpdateWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => ContactUpdateWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactUpdateManyWithWhereWithoutClientModelInputSchema),z.lazy(() => ContactUpdateManyWithWhereWithoutClientModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactScalarWhereInputSchema),z.lazy(() => ContactScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutClientModelNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutClientModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutClientModelInputSchema),z.lazy(() => RatingCreateWithoutClientModelInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema),z.lazy(() => RatingCreateOrConnectWithoutClientModelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyClientModelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutClientModelInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutClientModelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutClientModelInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutClientModelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClientCreateNestedOneWithoutContactModelInputSchema: z.ZodType<Prisma.ClientCreateNestedOneWithoutContactModelInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutContactModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutContactModelInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional()
}).strict();

export const ClientUpdateOneRequiredWithoutContactModelNestedInputSchema: z.ZodType<Prisma.ClientUpdateOneRequiredWithoutContactModelNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutContactModelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutContactModelInputSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutContactModelInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClientUpdateToOneWithWhereWithoutContactModelInputSchema),z.lazy(() => ClientUpdateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutContactModelInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumReportStatusNullableFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusNullableFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional().nullable(),
  in: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumReportStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional().nullable(),
  in: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportStatusNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRatingStatusNullableFilterSchema: z.ZodType<Prisma.NestedEnumRatingStatusNullableFilter> = z.object({
  equals: z.lazy(() => RatingStatusSchema).optional().nullable(),
  in: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NestedEnumRatingStatusNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumRatingStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRatingStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RatingStatusSchema).optional().nullable(),
  in: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RatingStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NestedEnumRatingStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRatingStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRatingStatusNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const RatingCreateWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutMethodologyModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutMethodologyModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutMethodologyModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema) ]),
}).strict();

export const RatingCreateManyMethodologyModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyMethodologyModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyMethodologyModelInputSchema),z.lazy(() => RatingCreateManyMethodologyModelInputSchema).array() ]),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutMethodologyModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutMethodologyModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutMethodologyModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutMethodologyModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutMethodologyModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutMethodologyModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutMethodologyModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutMethodologyModelInputSchema) ]),
}).strict();

export const RatingScalarWhereInputSchema: z.ZodType<Prisma.RatingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ratingTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ratingScore: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingClass: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingYear: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  supervisor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  primaryAnalyst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  methodology: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionnaire: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionnaireFiles: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  additionalFiles: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  requireQuestionnaireFiles: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  loe: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invoice: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receipt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumRatingStatusNullableFilterSchema),z.lazy(() => RatingStatusSchema) ]).optional().nullable(),
  issueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  expiryDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RatingCreateWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutQuestionnaireModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutQuestionnaireModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutQuestionnaireModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema) ]),
}).strict();

export const RatingCreateManyQuestionnaireModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyQuestionnaireModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyQuestionnaireModelInputSchema),z.lazy(() => RatingCreateManyQuestionnaireModelInputSchema).array() ]),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutQuestionnaireModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutQuestionnaireModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutQuestionnaireModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutQuestionnaireModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutQuestionnaireModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutQuestionnaireModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutQuestionnaireModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutQuestionnaireModelInputSchema) ]),
}).strict();

export const RatingCreateWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutLoeModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutLoeModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutLoeModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema) ]),
}).strict();

export const RatingCreateManyLoeModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyLoeModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyLoeModelInputSchema),z.lazy(() => RatingCreateManyLoeModelInputSchema).array() ]),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutLoeModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutLoeModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutLoeModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutLoeModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutLoeModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutLoeModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutLoeModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutLoeModelInputSchema) ]),
}).strict();

export const RatingCreateWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutInvoiceModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutInvoiceModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutInvoiceModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema) ]),
}).strict();

export const RatingCreateManyInvoiceModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyInvoiceModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyInvoiceModelInputSchema),z.lazy(() => RatingCreateManyInvoiceModelInputSchema).array() ]),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutInvoiceModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutInvoiceModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutInvoiceModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutInvoiceModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutInvoiceModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutInvoiceModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutInvoiceModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutInvoiceModelInputSchema) ]),
}).strict();

export const RatingCreateWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutReceiptModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutReceiptModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutReceiptModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema) ]),
}).strict();

export const RatingCreateManyReceiptModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyReceiptModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyReceiptModelInputSchema),z.lazy(() => RatingCreateManyReceiptModelInputSchema).array() ]),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutReceiptModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutReceiptModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReceiptModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutReceiptModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutReceiptModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutReceiptModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutReceiptModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutReceiptModelInputSchema) ]),
}).strict();

export const ClientCreateWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientCreateWithoutIndustryModelInput> = z.object({
  id: z.string().optional(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contactModel: z.lazy(() => ContactCreateNestedManyWithoutClientModelInputSchema).optional(),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientUncheckedCreateWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutIndustryModelInput> = z.object({
  id: z.string().optional(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contactModel: z.lazy(() => ContactUncheckedCreateNestedManyWithoutClientModelInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientCreateOrConnectWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutIndustryModelInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema) ]),
}).strict();

export const ClientCreateManyIndustryModelInputEnvelopeSchema: z.ZodType<Prisma.ClientCreateManyIndustryModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ClientCreateManyIndustryModelInputSchema),z.lazy(() => ClientCreateManyIndustryModelInputSchema).array() ]),
}).strict();

export const ClientUpsertWithWhereUniqueWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUpsertWithWhereUniqueWithoutIndustryModelInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ClientUpdateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutIndustryModelInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutIndustryModelInputSchema) ]),
}).strict();

export const ClientUpdateWithWhereUniqueWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUpdateWithWhereUniqueWithoutIndustryModelInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ClientUpdateWithoutIndustryModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutIndustryModelInputSchema) ]),
}).strict();

export const ClientUpdateManyWithWhereWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUpdateManyWithWhereWithoutIndustryModelInput> = z.object({
  where: z.lazy(() => ClientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ClientUpdateManyMutationInputSchema),z.lazy(() => ClientUncheckedUpdateManyWithoutIndustryModelInputSchema) ]),
}).strict();

export const ClientScalarWhereInputSchema: z.ZodType<Prisma.ClientScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  industry: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numberAndStreet: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  building: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  area: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  landmark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  regionOrState: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RatingCreateWithoutReportModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutReportModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutReportModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutReportModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingCreateOrConnectWithoutReportModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutReportModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReportModelInputSchema) ]),
}).strict();

export const RatingUpsertWithoutReportModelInputSchema: z.ZodType<Prisma.RatingUpsertWithoutReportModelInput> = z.object({
  update: z.union([ z.lazy(() => RatingUpdateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutReportModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutReportModelInputSchema) ]),
  where: z.lazy(() => RatingWhereInputSchema).optional()
}).strict();

export const RatingUpdateToOneWithWhereWithoutReportModelInputSchema: z.ZodType<Prisma.RatingUpdateToOneWithWhereWithoutReportModelInput> = z.object({
  where: z.lazy(() => RatingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RatingUpdateWithoutReportModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutReportModelInputSchema) ]),
}).strict();

export const RatingUpdateWithoutReportModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutReportModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutReportModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutReportModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingClassCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingClassUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingClassCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => RatingClassWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingClassCreateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const ClientCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  industryModel: z.lazy(() => IndustryCreateNestedOneWithoutClientModelInputSchema),
  contactModel: z.lazy(() => ContactCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  industry: z.string(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contactModel: z.lazy(() => ContactUncheckedCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const MethodologyCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MethodologyUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MethodologyCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => MethodologyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MethodologyCreateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const QuestionnaireCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const QuestionnaireUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  unit: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const QuestionnaireCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => QuestionnaireWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuestionnaireCreateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const LetterOfEngagementCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LetterOfEngagementUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LetterOfEngagementCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => LetterOfEngagementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LetterOfEngagementCreateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const InvoiceCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvoiceUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InvoiceCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const ReceiptCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReceiptUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReceiptCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ReceiptWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReceiptCreateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const ReportsCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  reportTitle: z.string(),
  reportFileUrl: z.string().optional().nullable(),
  finalLetterUrl: z.string().optional().nullable(),
  consentLetterUrl: z.string().optional().nullable(),
  version: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportsUncheckedCreateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUncheckedCreateWithoutRatingModelInput> = z.object({
  id: z.string().optional(),
  reportTitle: z.string(),
  reportFileUrl: z.string().optional().nullable(),
  finalLetterUrl: z.string().optional().nullable(),
  consentLetterUrl: z.string().optional().nullable(),
  version: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportsCreateOrConnectWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsCreateOrConnectWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ReportsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportsCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const ReportsCreateManyRatingModelInputEnvelopeSchema: z.ZodType<Prisma.ReportsCreateManyRatingModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportsCreateManyRatingModelInputSchema),z.lazy(() => ReportsCreateManyRatingModelInputSchema).array() ]),
}).strict();

export const RatingClassUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => RatingClassUpdateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingClassCreateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => RatingClassWhereInputSchema).optional()
}).strict();

export const RatingClassUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => RatingClassWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RatingClassUpdateWithoutRatingModelInputSchema),z.lazy(() => RatingClassUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const RatingClassUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingClassUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.RatingClassUncheckedUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => ClientUpdateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ClientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ClientUpdateWithoutRatingModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const ClientUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientUpdateWithoutRatingModelInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  industryModel: z.lazy(() => IndustryUpdateOneRequiredWithoutClientModelNestedInputSchema).optional(),
  contactModel: z.lazy(() => ContactUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutRatingModelInput> = z.object({
  industry: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contactModel: z.lazy(() => ContactUncheckedUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const MethodologyUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => MethodologyUpdateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => MethodologyCreateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => MethodologyWhereInputSchema).optional()
}).strict();

export const MethodologyUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => MethodologyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MethodologyUpdateWithoutRatingModelInputSchema),z.lazy(() => MethodologyUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const MethodologyUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MethodologyUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.MethodologyUncheckedUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionnaireUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => QuestionnaireUpdateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => QuestionnaireCreateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => QuestionnaireWhereInputSchema).optional()
}).strict();

export const QuestionnaireUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => QuestionnaireWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => QuestionnaireUpdateWithoutRatingModelInputSchema),z.lazy(() => QuestionnaireUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const QuestionnaireUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuestionnaireUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.QuestionnaireUncheckedUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LetterOfEngagementUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => LetterOfEngagementUpdateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => LetterOfEngagementCreateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => LetterOfEngagementWhereInputSchema).optional()
}).strict();

export const LetterOfEngagementUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => LetterOfEngagementWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LetterOfEngagementUpdateWithoutRatingModelInputSchema),z.lazy(() => LetterOfEngagementUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const LetterOfEngagementUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LetterOfEngagementUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.LetterOfEngagementUncheckedUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => InvoiceWhereInputSchema).optional()
}).strict();

export const InvoiceUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutRatingModelInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const InvoiceUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReceiptUpsertWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptUpsertWithoutRatingModelInput> = z.object({
  update: z.union([ z.lazy(() => ReceiptUpdateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => ReceiptCreateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedCreateWithoutRatingModelInputSchema) ]),
  where: z.lazy(() => ReceiptWhereInputSchema).optional()
}).strict();

export const ReceiptUpdateToOneWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptUpdateToOneWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ReceiptWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReceiptUpdateWithoutRatingModelInputSchema),z.lazy(() => ReceiptUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const ReceiptUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReceiptUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReceiptUncheckedUpdateWithoutRatingModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsUpsertWithWhereUniqueWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUpsertWithWhereUniqueWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ReportsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportsUpdateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedUpdateWithoutRatingModelInputSchema) ]),
  create: z.union([ z.lazy(() => ReportsCreateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedCreateWithoutRatingModelInputSchema) ]),
}).strict();

export const ReportsUpdateWithWhereUniqueWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUpdateWithWhereUniqueWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ReportsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportsUpdateWithoutRatingModelInputSchema),z.lazy(() => ReportsUncheckedUpdateWithoutRatingModelInputSchema) ]),
}).strict();

export const ReportsUpdateManyWithWhereWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUpdateManyWithWhereWithoutRatingModelInput> = z.object({
  where: z.lazy(() => ReportsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportsUpdateManyMutationInputSchema),z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelInputSchema) ]),
}).strict();

export const ReportsScalarWhereInputSchema: z.ZodType<Prisma.ReportsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportsScalarWhereInputSchema),z.lazy(() => ReportsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportsScalarWhereInputSchema),z.lazy(() => ReportsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportFileUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  finalLetterUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  consentLetterUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusNullableFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RatingCreateWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutRatingClassModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  clientModel: z.lazy(() => ClientCreateNestedOneWithoutRatingModelInputSchema),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutRatingClassModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutRatingClassModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema) ]),
}).strict();

export const RatingCreateManyRatingClassModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyRatingClassModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyRatingClassModelInputSchema),z.lazy(() => RatingCreateManyRatingClassModelInputSchema).array() ]),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutRatingClassModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutRatingClassModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutRatingClassModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutRatingClassModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutRatingClassModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutRatingClassModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutRatingClassModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutRatingClassModelInputSchema) ]),
}).strict();

export const IndustryCreateWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryCreateWithoutClientModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IndustryUncheckedCreateWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryUncheckedCreateWithoutClientModelInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IndustryCreateOrConnectWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryCreateOrConnectWithoutClientModelInput> = z.object({
  where: z.lazy(() => IndustryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndustryCreateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedCreateWithoutClientModelInputSchema) ]),
}).strict();

export const ContactCreateWithoutClientModelInputSchema: z.ZodType<Prisma.ContactCreateWithoutClientModelInput> = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phoneNumbers: z.string().optional().nullable(),
  magicToken: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ContactUncheckedCreateWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUncheckedCreateWithoutClientModelInput> = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phoneNumbers: z.string().optional().nullable(),
  magicToken: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ContactCreateOrConnectWithoutClientModelInputSchema: z.ZodType<Prisma.ContactCreateOrConnectWithoutClientModelInput> = z.object({
  where: z.lazy(() => ContactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactCreateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema) ]),
}).strict();

export const ContactCreateManyClientModelInputEnvelopeSchema: z.ZodType<Prisma.ContactCreateManyClientModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContactCreateManyClientModelInputSchema),z.lazy(() => ContactCreateManyClientModelInputSchema).array() ]),
}).strict();

export const RatingCreateWithoutClientModelInputSchema: z.ZodType<Prisma.RatingCreateWithoutClientModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingClassModel: z.lazy(() => RatingClassCreateNestedOneWithoutRatingModelInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyCreateNestedOneWithoutRatingModelInputSchema),
  questionnaireModel: z.lazy(() => QuestionnaireCreateNestedOneWithoutRatingModelInputSchema),
  loeModel: z.lazy(() => LetterOfEngagementCreateNestedOneWithoutRatingModelInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceCreateNestedOneWithoutRatingModelInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptCreateNestedOneWithoutRatingModelInputSchema).optional(),
  reportModel: z.lazy(() => ReportsCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingUncheckedCreateWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutClientModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportModel: z.lazy(() => ReportsUncheckedCreateNestedManyWithoutRatingModelInputSchema).optional()
}).strict();

export const RatingCreateOrConnectWithoutClientModelInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutClientModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema) ]),
}).strict();

export const RatingCreateManyClientModelInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyClientModelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyClientModelInputSchema),z.lazy(() => RatingCreateManyClientModelInputSchema).array() ]),
}).strict();

export const IndustryUpsertWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryUpsertWithoutClientModelInput> = z.object({
  update: z.union([ z.lazy(() => IndustryUpdateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedUpdateWithoutClientModelInputSchema) ]),
  create: z.union([ z.lazy(() => IndustryCreateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedCreateWithoutClientModelInputSchema) ]),
  where: z.lazy(() => IndustryWhereInputSchema).optional()
}).strict();

export const IndustryUpdateToOneWithWhereWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryUpdateToOneWithWhereWithoutClientModelInput> = z.object({
  where: z.lazy(() => IndustryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IndustryUpdateWithoutClientModelInputSchema),z.lazy(() => IndustryUncheckedUpdateWithoutClientModelInputSchema) ]),
}).strict();

export const IndustryUpdateWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryUpdateWithoutClientModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndustryUncheckedUpdateWithoutClientModelInputSchema: z.ZodType<Prisma.IndustryUncheckedUpdateWithoutClientModelInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactUpsertWithWhereUniqueWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUpsertWithWhereUniqueWithoutClientModelInput> = z.object({
  where: z.lazy(() => ContactWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContactUpdateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedUpdateWithoutClientModelInputSchema) ]),
  create: z.union([ z.lazy(() => ContactCreateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedCreateWithoutClientModelInputSchema) ]),
}).strict();

export const ContactUpdateWithWhereUniqueWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUpdateWithWhereUniqueWithoutClientModelInput> = z.object({
  where: z.lazy(() => ContactWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContactUpdateWithoutClientModelInputSchema),z.lazy(() => ContactUncheckedUpdateWithoutClientModelInputSchema) ]),
}).strict();

export const ContactUpdateManyWithWhereWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUpdateManyWithWhereWithoutClientModelInput> = z.object({
  where: z.lazy(() => ContactScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContactUpdateManyMutationInputSchema),z.lazy(() => ContactUncheckedUpdateManyWithoutClientModelInputSchema) ]),
}).strict();

export const ContactScalarWhereInputSchema: z.ZodType<Prisma.ContactScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactScalarWhereInputSchema),z.lazy(() => ContactScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactScalarWhereInputSchema),z.lazy(() => ContactScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumbers: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  magicToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  client: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  canLogin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutClientModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutClientModelInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedCreateWithoutClientModelInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutClientModelInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutClientModelInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutClientModelInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutClientModelInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutClientModelInputSchema) ]),
}).strict();

export const ClientCreateWithoutContactModelInputSchema: z.ZodType<Prisma.ClientCreateWithoutContactModelInput> = z.object({
  id: z.string().optional(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  industryModel: z.lazy(() => IndustryCreateNestedOneWithoutClientModelInputSchema),
  ratingModel: z.lazy(() => RatingCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientUncheckedCreateWithoutContactModelInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutContactModelInput> = z.object({
  id: z.string().optional(),
  industry: z.string(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ratingModel: z.lazy(() => RatingUncheckedCreateNestedManyWithoutClientModelInputSchema).optional()
}).strict();

export const ClientCreateOrConnectWithoutContactModelInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutContactModelInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutContactModelInputSchema) ]),
}).strict();

export const ClientUpsertWithoutContactModelInputSchema: z.ZodType<Prisma.ClientUpsertWithoutContactModelInput> = z.object({
  update: z.union([ z.lazy(() => ClientUpdateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutContactModelInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedCreateWithoutContactModelInputSchema) ]),
  where: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientUpdateToOneWithWhereWithoutContactModelInputSchema: z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutContactModelInput> = z.object({
  where: z.lazy(() => ClientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ClientUpdateWithoutContactModelInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutContactModelInputSchema) ]),
}).strict();

export const ClientUpdateWithoutContactModelInputSchema: z.ZodType<Prisma.ClientUpdateWithoutContactModelInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  industryModel: z.lazy(() => IndustryUpdateOneRequiredWithoutClientModelNestedInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateWithoutContactModelInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutContactModelInput> = z.object({
  industry: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const RatingCreateManyMethodologyModelInputSchema: z.ZodType<Prisma.RatingCreateManyMethodologyModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutMethodologyModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutMethodologyModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutMethodologyModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutMethodologyModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateManyQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingCreateManyQuestionnaireModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutQuestionnaireModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutQuestionnaireModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutQuestionnaireModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutQuestionnaireModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateManyLoeModelInputSchema: z.ZodType<Prisma.RatingCreateManyLoeModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutLoeModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutLoeModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutLoeModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutLoeModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateManyInvoiceModelInputSchema: z.ZodType<Prisma.RatingCreateManyInvoiceModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutInvoiceModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutInvoiceModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutInvoiceModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutInvoiceModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateManyReceiptModelInputSchema: z.ZodType<Prisma.RatingCreateManyReceiptModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutReceiptModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutReceiptModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutReceiptModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutReceiptModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientCreateManyIndustryModelInputSchema: z.ZodType<Prisma.ClientCreateManyIndustryModelInput> = z.object({
  id: z.string().optional(),
  companyName: z.string(),
  logo: z.string().optional().nullable(),
  companyPhoneNumbers: z.string().optional().nullable(),
  numberAndStreet: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  regionOrState: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ClientUpdateWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUpdateWithoutIndustryModelInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contactModel: z.lazy(() => ContactUpdateManyWithoutClientModelNestedInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutIndustryModelInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contactModel: z.lazy(() => ContactUncheckedUpdateManyWithoutClientModelNestedInputSchema).optional(),
  ratingModel: z.lazy(() => RatingUncheckedUpdateManyWithoutClientModelNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateManyWithoutIndustryModelInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyWithoutIndustryModelInput> = z.object({
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyPhoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberAndStreet: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  building: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  area: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landmark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regionOrState: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsCreateManyRatingModelInputSchema: z.ZodType<Prisma.ReportsCreateManyRatingModelInput> = z.object({
  id: z.string().optional(),
  reportTitle: z.string(),
  reportFileUrl: z.string().optional().nullable(),
  finalLetterUrl: z.string().optional().nullable(),
  consentLetterUrl: z.string().optional().nullable(),
  version: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportsUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUpdateWithoutRatingModelInput> = z.object({
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsUncheckedUpdateWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUncheckedUpdateWithoutRatingModelInput> = z.object({
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportsUncheckedUpdateManyWithoutRatingModelInputSchema: z.ZodType<Prisma.ReportsUncheckedUpdateManyWithoutRatingModelInput> = z.object({
  reportTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportFileUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finalLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  consentLetterUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NullableEnumReportStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateManyRatingClassModelInputSchema: z.ZodType<Prisma.RatingCreateManyRatingClassModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  client: z.string(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingUpdateWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutRatingClassModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  clientModel: z.lazy(() => ClientUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutRatingClassModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutRatingClassModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutRatingClassModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  client: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactCreateManyClientModelInputSchema: z.ZodType<Prisma.ContactCreateManyClientModelInput> = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  phoneNumbers: z.string().optional().nullable(),
  magicToken: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  canLogin: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RatingCreateManyClientModelInputSchema: z.ZodType<Prisma.RatingCreateManyClientModelInput> = z.object({
  id: z.string().optional(),
  ratingTitle: z.string().optional(),
  ratingScore: z.string().optional().nullable(),
  unit: z.string().optional().nullable(),
  ratingClass: z.string().optional().nullable(),
  ratingYear: z.number().int(),
  supervisor: z.string(),
  primaryAnalyst: z.string().optional().nullable(),
  secondaryAnalyst: z.string().optional().nullable(),
  methodology: z.string(),
  questionnaire: z.string(),
  questionnaireFiles: z.string().optional().nullable(),
  additionalFiles: z.string().optional().nullable(),
  requireAdditionalFiles: z.boolean().optional(),
  requireQuestionnaireFiles: z.boolean().optional(),
  loe: z.string().optional().nullable(),
  invoice: z.string().optional().nullable(),
  receipt: z.string().optional().nullable(),
  status: z.lazy(() => RatingStatusSchema).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  expiryDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ContactUpdateWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUpdateWithoutClientModelInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactUncheckedUpdateWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUncheckedUpdateWithoutClientModelInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactUncheckedUpdateManyWithoutClientModelInputSchema: z.ZodType<Prisma.ContactUncheckedUpdateManyWithoutClientModelInput> = z.object({
  fullName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumbers: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  magicToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  canLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingUpdateWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUpdateWithoutClientModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ratingClassModel: z.lazy(() => RatingClassUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  methodologyModel: z.lazy(() => MethodologyUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  questionnaireModel: z.lazy(() => QuestionnaireUpdateOneRequiredWithoutRatingModelNestedInputSchema).optional(),
  loeModel: z.lazy(() => LetterOfEngagementUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  invoiceModel: z.lazy(() => InvoiceUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  receiptModel: z.lazy(() => ReceiptUpdateOneWithoutRatingModelNestedInputSchema).optional(),
  reportModel: z.lazy(() => ReportsUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutClientModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportModel: z.lazy(() => ReportsUncheckedUpdateManyWithoutRatingModelNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateManyWithoutClientModelInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutClientModelInput> = z.object({
  ratingTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingScore: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingClass: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingYear: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  supervisor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondaryAnalyst: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  methodology: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionnaireFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  additionalFiles: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  requireAdditionalFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  requireQuestionnaireFiles: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  loe: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invoice: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receipt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => RatingStatusSchema),z.lazy(() => NullableEnumRatingStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expiryDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const MethodologyFindFirstArgsSchema: z.ZodType<Prisma.MethodologyFindFirstArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereInputSchema.optional(),
  orderBy: z.union([ MethodologyOrderByWithRelationInputSchema.array(),MethodologyOrderByWithRelationInputSchema ]).optional(),
  cursor: MethodologyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MethodologyScalarFieldEnumSchema,MethodologyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MethodologyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MethodologyFindFirstOrThrowArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereInputSchema.optional(),
  orderBy: z.union([ MethodologyOrderByWithRelationInputSchema.array(),MethodologyOrderByWithRelationInputSchema ]).optional(),
  cursor: MethodologyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MethodologyScalarFieldEnumSchema,MethodologyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MethodologyFindManyArgsSchema: z.ZodType<Prisma.MethodologyFindManyArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereInputSchema.optional(),
  orderBy: z.union([ MethodologyOrderByWithRelationInputSchema.array(),MethodologyOrderByWithRelationInputSchema ]).optional(),
  cursor: MethodologyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MethodologyScalarFieldEnumSchema,MethodologyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MethodologyAggregateArgsSchema: z.ZodType<Prisma.MethodologyAggregateArgs> = z.object({
  where: MethodologyWhereInputSchema.optional(),
  orderBy: z.union([ MethodologyOrderByWithRelationInputSchema.array(),MethodologyOrderByWithRelationInputSchema ]).optional(),
  cursor: MethodologyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MethodologyGroupByArgsSchema: z.ZodType<Prisma.MethodologyGroupByArgs> = z.object({
  where: MethodologyWhereInputSchema.optional(),
  orderBy: z.union([ MethodologyOrderByWithAggregationInputSchema.array(),MethodologyOrderByWithAggregationInputSchema ]).optional(),
  by: MethodologyScalarFieldEnumSchema.array(),
  having: MethodologyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MethodologyFindUniqueArgsSchema: z.ZodType<Prisma.MethodologyFindUniqueArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereUniqueInputSchema,
}).strict() ;

export const MethodologyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MethodologyFindUniqueOrThrowArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereUniqueInputSchema,
}).strict() ;

export const QuestionnaireFindFirstArgsSchema: z.ZodType<Prisma.QuestionnaireFindFirstArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereInputSchema.optional(),
  orderBy: z.union([ QuestionnaireOrderByWithRelationInputSchema.array(),QuestionnaireOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionnaireWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionnaireScalarFieldEnumSchema,QuestionnaireScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionnaireFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QuestionnaireFindFirstOrThrowArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereInputSchema.optional(),
  orderBy: z.union([ QuestionnaireOrderByWithRelationInputSchema.array(),QuestionnaireOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionnaireWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionnaireScalarFieldEnumSchema,QuestionnaireScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionnaireFindManyArgsSchema: z.ZodType<Prisma.QuestionnaireFindManyArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereInputSchema.optional(),
  orderBy: z.union([ QuestionnaireOrderByWithRelationInputSchema.array(),QuestionnaireOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionnaireWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuestionnaireScalarFieldEnumSchema,QuestionnaireScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const QuestionnaireAggregateArgsSchema: z.ZodType<Prisma.QuestionnaireAggregateArgs> = z.object({
  where: QuestionnaireWhereInputSchema.optional(),
  orderBy: z.union([ QuestionnaireOrderByWithRelationInputSchema.array(),QuestionnaireOrderByWithRelationInputSchema ]).optional(),
  cursor: QuestionnaireWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const QuestionnaireGroupByArgsSchema: z.ZodType<Prisma.QuestionnaireGroupByArgs> = z.object({
  where: QuestionnaireWhereInputSchema.optional(),
  orderBy: z.union([ QuestionnaireOrderByWithAggregationInputSchema.array(),QuestionnaireOrderByWithAggregationInputSchema ]).optional(),
  by: QuestionnaireScalarFieldEnumSchema.array(),
  having: QuestionnaireScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const QuestionnaireFindUniqueArgsSchema: z.ZodType<Prisma.QuestionnaireFindUniqueArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereUniqueInputSchema,
}).strict() ;

export const QuestionnaireFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.QuestionnaireFindUniqueOrThrowArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereUniqueInputSchema,
}).strict() ;

export const LetterOfEngagementFindFirstArgsSchema: z.ZodType<Prisma.LetterOfEngagementFindFirstArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereInputSchema.optional(),
  orderBy: z.union([ LetterOfEngagementOrderByWithRelationInputSchema.array(),LetterOfEngagementOrderByWithRelationInputSchema ]).optional(),
  cursor: LetterOfEngagementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LetterOfEngagementScalarFieldEnumSchema,LetterOfEngagementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LetterOfEngagementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LetterOfEngagementFindFirstOrThrowArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereInputSchema.optional(),
  orderBy: z.union([ LetterOfEngagementOrderByWithRelationInputSchema.array(),LetterOfEngagementOrderByWithRelationInputSchema ]).optional(),
  cursor: LetterOfEngagementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LetterOfEngagementScalarFieldEnumSchema,LetterOfEngagementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LetterOfEngagementFindManyArgsSchema: z.ZodType<Prisma.LetterOfEngagementFindManyArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereInputSchema.optional(),
  orderBy: z.union([ LetterOfEngagementOrderByWithRelationInputSchema.array(),LetterOfEngagementOrderByWithRelationInputSchema ]).optional(),
  cursor: LetterOfEngagementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LetterOfEngagementScalarFieldEnumSchema,LetterOfEngagementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LetterOfEngagementAggregateArgsSchema: z.ZodType<Prisma.LetterOfEngagementAggregateArgs> = z.object({
  where: LetterOfEngagementWhereInputSchema.optional(),
  orderBy: z.union([ LetterOfEngagementOrderByWithRelationInputSchema.array(),LetterOfEngagementOrderByWithRelationInputSchema ]).optional(),
  cursor: LetterOfEngagementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LetterOfEngagementGroupByArgsSchema: z.ZodType<Prisma.LetterOfEngagementGroupByArgs> = z.object({
  where: LetterOfEngagementWhereInputSchema.optional(),
  orderBy: z.union([ LetterOfEngagementOrderByWithAggregationInputSchema.array(),LetterOfEngagementOrderByWithAggregationInputSchema ]).optional(),
  by: LetterOfEngagementScalarFieldEnumSchema.array(),
  having: LetterOfEngagementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LetterOfEngagementFindUniqueArgsSchema: z.ZodType<Prisma.LetterOfEngagementFindUniqueArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereUniqueInputSchema,
}).strict() ;

export const LetterOfEngagementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LetterOfEngagementFindUniqueOrThrowArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereUniqueInputSchema,
}).strict() ;

export const InvoiceFindFirstArgsSchema: z.ZodType<Prisma.InvoiceFindFirstArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema,InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvoiceFindFirstOrThrowArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema,InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceFindManyArgsSchema: z.ZodType<Prisma.InvoiceFindManyArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema,InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceAggregateArgsSchema: z.ZodType<Prisma.InvoiceAggregateArgs> = z.object({
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoiceGroupByArgsSchema: z.ZodType<Prisma.InvoiceGroupByArgs> = z.object({
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithAggregationInputSchema.array(),InvoiceOrderByWithAggregationInputSchema ]).optional(),
  by: InvoiceScalarFieldEnumSchema.array(),
  having: InvoiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoiceFindUniqueArgsSchema: z.ZodType<Prisma.InvoiceFindUniqueArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvoiceFindUniqueOrThrowArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const ReceiptFindFirstArgsSchema: z.ZodType<Prisma.ReceiptFindFirstArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReceiptScalarFieldEnumSchema,ReceiptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReceiptFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReceiptFindFirstOrThrowArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReceiptScalarFieldEnumSchema,ReceiptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReceiptFindManyArgsSchema: z.ZodType<Prisma.ReceiptFindManyArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReceiptScalarFieldEnumSchema,ReceiptScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReceiptAggregateArgsSchema: z.ZodType<Prisma.ReceiptAggregateArgs> = z.object({
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithRelationInputSchema.array(),ReceiptOrderByWithRelationInputSchema ]).optional(),
  cursor: ReceiptWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReceiptGroupByArgsSchema: z.ZodType<Prisma.ReceiptGroupByArgs> = z.object({
  where: ReceiptWhereInputSchema.optional(),
  orderBy: z.union([ ReceiptOrderByWithAggregationInputSchema.array(),ReceiptOrderByWithAggregationInputSchema ]).optional(),
  by: ReceiptScalarFieldEnumSchema.array(),
  having: ReceiptScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReceiptFindUniqueArgsSchema: z.ZodType<Prisma.ReceiptFindUniqueArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ReceiptFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReceiptFindUniqueOrThrowArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const IndustryFindFirstArgsSchema: z.ZodType<Prisma.IndustryFindFirstArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereInputSchema.optional(),
  orderBy: z.union([ IndustryOrderByWithRelationInputSchema.array(),IndustryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndustryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IndustryScalarFieldEnumSchema,IndustryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IndustryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndustryFindFirstOrThrowArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereInputSchema.optional(),
  orderBy: z.union([ IndustryOrderByWithRelationInputSchema.array(),IndustryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndustryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IndustryScalarFieldEnumSchema,IndustryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IndustryFindManyArgsSchema: z.ZodType<Prisma.IndustryFindManyArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereInputSchema.optional(),
  orderBy: z.union([ IndustryOrderByWithRelationInputSchema.array(),IndustryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndustryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IndustryScalarFieldEnumSchema,IndustryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IndustryAggregateArgsSchema: z.ZodType<Prisma.IndustryAggregateArgs> = z.object({
  where: IndustryWhereInputSchema.optional(),
  orderBy: z.union([ IndustryOrderByWithRelationInputSchema.array(),IndustryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndustryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IndustryGroupByArgsSchema: z.ZodType<Prisma.IndustryGroupByArgs> = z.object({
  where: IndustryWhereInputSchema.optional(),
  orderBy: z.union([ IndustryOrderByWithAggregationInputSchema.array(),IndustryOrderByWithAggregationInputSchema ]).optional(),
  by: IndustryScalarFieldEnumSchema.array(),
  having: IndustryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IndustryFindUniqueArgsSchema: z.ZodType<Prisma.IndustryFindUniqueArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereUniqueInputSchema,
}).strict() ;

export const IndustryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndustryFindUniqueOrThrowArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereUniqueInputSchema,
}).strict() ;

export const ReportsFindFirstArgsSchema: z.ZodType<Prisma.ReportsFindFirstArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereInputSchema.optional(),
  orderBy: z.union([ ReportsOrderByWithRelationInputSchema.array(),ReportsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportsScalarFieldEnumSchema,ReportsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportsFindFirstOrThrowArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereInputSchema.optional(),
  orderBy: z.union([ ReportsOrderByWithRelationInputSchema.array(),ReportsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportsScalarFieldEnumSchema,ReportsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportsFindManyArgsSchema: z.ZodType<Prisma.ReportsFindManyArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereInputSchema.optional(),
  orderBy: z.union([ ReportsOrderByWithRelationInputSchema.array(),ReportsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportsScalarFieldEnumSchema,ReportsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportsAggregateArgsSchema: z.ZodType<Prisma.ReportsAggregateArgs> = z.object({
  where: ReportsWhereInputSchema.optional(),
  orderBy: z.union([ ReportsOrderByWithRelationInputSchema.array(),ReportsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportsGroupByArgsSchema: z.ZodType<Prisma.ReportsGroupByArgs> = z.object({
  where: ReportsWhereInputSchema.optional(),
  orderBy: z.union([ ReportsOrderByWithAggregationInputSchema.array(),ReportsOrderByWithAggregationInputSchema ]).optional(),
  by: ReportsScalarFieldEnumSchema.array(),
  having: ReportsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportsFindUniqueArgsSchema: z.ZodType<Prisma.ReportsFindUniqueArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereUniqueInputSchema,
}).strict() ;

export const ReportsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportsFindUniqueOrThrowArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereUniqueInputSchema,
}).strict() ;

export const RatingFindFirstArgsSchema: z.ZodType<Prisma.RatingFindFirstArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RatingFindFirstOrThrowArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingFindManyArgsSchema: z.ZodType<Prisma.RatingFindManyArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingAggregateArgsSchema: z.ZodType<Prisma.RatingAggregateArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RatingGroupByArgsSchema: z.ZodType<Prisma.RatingGroupByArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithAggregationInputSchema.array(),RatingOrderByWithAggregationInputSchema ]).optional(),
  by: RatingScalarFieldEnumSchema.array(),
  having: RatingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RatingFindUniqueArgsSchema: z.ZodType<Prisma.RatingFindUniqueArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RatingFindUniqueOrThrowArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingClassFindFirstArgsSchema: z.ZodType<Prisma.RatingClassFindFirstArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereInputSchema.optional(),
  orderBy: z.union([ RatingClassOrderByWithRelationInputSchema.array(),RatingClassOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingClassScalarFieldEnumSchema,RatingClassScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingClassFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RatingClassFindFirstOrThrowArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereInputSchema.optional(),
  orderBy: z.union([ RatingClassOrderByWithRelationInputSchema.array(),RatingClassOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingClassScalarFieldEnumSchema,RatingClassScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingClassFindManyArgsSchema: z.ZodType<Prisma.RatingClassFindManyArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereInputSchema.optional(),
  orderBy: z.union([ RatingClassOrderByWithRelationInputSchema.array(),RatingClassOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingClassScalarFieldEnumSchema,RatingClassScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingClassAggregateArgsSchema: z.ZodType<Prisma.RatingClassAggregateArgs> = z.object({
  where: RatingClassWhereInputSchema.optional(),
  orderBy: z.union([ RatingClassOrderByWithRelationInputSchema.array(),RatingClassOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingClassWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RatingClassGroupByArgsSchema: z.ZodType<Prisma.RatingClassGroupByArgs> = z.object({
  where: RatingClassWhereInputSchema.optional(),
  orderBy: z.union([ RatingClassOrderByWithAggregationInputSchema.array(),RatingClassOrderByWithAggregationInputSchema ]).optional(),
  by: RatingClassScalarFieldEnumSchema.array(),
  having: RatingClassScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RatingClassFindUniqueArgsSchema: z.ZodType<Prisma.RatingClassFindUniqueArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereUniqueInputSchema,
}).strict() ;

export const RatingClassFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RatingClassFindUniqueOrThrowArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereUniqueInputSchema,
}).strict() ;

export const ClientFindFirstArgsSchema: z.ZodType<Prisma.ClientFindFirstArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClientFindFirstOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindManyArgsSchema: z.ZodType<Prisma.ClientFindManyArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientAggregateArgsSchema: z.ZodType<Prisma.ClientAggregateArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientGroupByArgsSchema: z.ZodType<Prisma.ClientGroupByArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithAggregationInputSchema.array(),ClientOrderByWithAggregationInputSchema ]).optional(),
  by: ClientScalarFieldEnumSchema.array(),
  having: ClientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientFindUniqueArgsSchema: z.ZodType<Prisma.ClientFindUniqueArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClientFindUniqueOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ContactFindFirstArgsSchema: z.ZodType<Prisma.ContactFindFirstArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereInputSchema.optional(),
  orderBy: z.union([ ContactOrderByWithRelationInputSchema.array(),ContactOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactScalarFieldEnumSchema,ContactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactFindFirstOrThrowArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereInputSchema.optional(),
  orderBy: z.union([ ContactOrderByWithRelationInputSchema.array(),ContactOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactScalarFieldEnumSchema,ContactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactFindManyArgsSchema: z.ZodType<Prisma.ContactFindManyArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereInputSchema.optional(),
  orderBy: z.union([ ContactOrderByWithRelationInputSchema.array(),ContactOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactScalarFieldEnumSchema,ContactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactAggregateArgsSchema: z.ZodType<Prisma.ContactAggregateArgs> = z.object({
  where: ContactWhereInputSchema.optional(),
  orderBy: z.union([ ContactOrderByWithRelationInputSchema.array(),ContactOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ContactGroupByArgsSchema: z.ZodType<Prisma.ContactGroupByArgs> = z.object({
  where: ContactWhereInputSchema.optional(),
  orderBy: z.union([ ContactOrderByWithAggregationInputSchema.array(),ContactOrderByWithAggregationInputSchema ]).optional(),
  by: ContactScalarFieldEnumSchema.array(),
  having: ContactScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ContactFindUniqueArgsSchema: z.ZodType<Prisma.ContactFindUniqueArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereUniqueInputSchema,
}).strict() ;

export const ContactFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactFindUniqueOrThrowArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereUniqueInputSchema,
}).strict() ;

export const LogFindFirstArgsSchema: z.ZodType<Prisma.LogFindFirstArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LogFindFirstOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogFindManyArgsSchema: z.ZodType<Prisma.LogFindManyArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogScalarFieldEnumSchema,LogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LogAggregateArgsSchema: z.ZodType<Prisma.LogAggregateArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithRelationInputSchema.array(),LogOrderByWithRelationInputSchema ]).optional(),
  cursor: LogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LogGroupByArgsSchema: z.ZodType<Prisma.LogGroupByArgs> = z.object({
  where: LogWhereInputSchema.optional(),
  orderBy: z.union([ LogOrderByWithAggregationInputSchema.array(),LogOrderByWithAggregationInputSchema ]).optional(),
  by: LogScalarFieldEnumSchema.array(),
  having: LogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LogFindUniqueArgsSchema: z.ZodType<Prisma.LogFindUniqueArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LogFindUniqueOrThrowArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const MethodologyCreateArgsSchema: z.ZodType<Prisma.MethodologyCreateArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  data: z.union([ MethodologyCreateInputSchema,MethodologyUncheckedCreateInputSchema ]),
}).strict() ;

export const MethodologyUpsertArgsSchema: z.ZodType<Prisma.MethodologyUpsertArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereUniqueInputSchema,
  create: z.union([ MethodologyCreateInputSchema,MethodologyUncheckedCreateInputSchema ]),
  update: z.union([ MethodologyUpdateInputSchema,MethodologyUncheckedUpdateInputSchema ]),
}).strict() ;

export const MethodologyCreateManyArgsSchema: z.ZodType<Prisma.MethodologyCreateManyArgs> = z.object({
  data: z.union([ MethodologyCreateManyInputSchema,MethodologyCreateManyInputSchema.array() ]),
}).strict() ;

export const MethodologyDeleteArgsSchema: z.ZodType<Prisma.MethodologyDeleteArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  where: MethodologyWhereUniqueInputSchema,
}).strict() ;

export const MethodologyUpdateArgsSchema: z.ZodType<Prisma.MethodologyUpdateArgs> = z.object({
  select: MethodologySelectSchema.optional(),
  include: MethodologyIncludeSchema.optional(),
  data: z.union([ MethodologyUpdateInputSchema,MethodologyUncheckedUpdateInputSchema ]),
  where: MethodologyWhereUniqueInputSchema,
}).strict() ;

export const MethodologyUpdateManyArgsSchema: z.ZodType<Prisma.MethodologyUpdateManyArgs> = z.object({
  data: z.union([ MethodologyUpdateManyMutationInputSchema,MethodologyUncheckedUpdateManyInputSchema ]),
  where: MethodologyWhereInputSchema.optional(),
}).strict() ;

export const MethodologyDeleteManyArgsSchema: z.ZodType<Prisma.MethodologyDeleteManyArgs> = z.object({
  where: MethodologyWhereInputSchema.optional(),
}).strict() ;

export const QuestionnaireCreateArgsSchema: z.ZodType<Prisma.QuestionnaireCreateArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  data: z.union([ QuestionnaireCreateInputSchema,QuestionnaireUncheckedCreateInputSchema ]),
}).strict() ;

export const QuestionnaireUpsertArgsSchema: z.ZodType<Prisma.QuestionnaireUpsertArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereUniqueInputSchema,
  create: z.union([ QuestionnaireCreateInputSchema,QuestionnaireUncheckedCreateInputSchema ]),
  update: z.union([ QuestionnaireUpdateInputSchema,QuestionnaireUncheckedUpdateInputSchema ]),
}).strict() ;

export const QuestionnaireCreateManyArgsSchema: z.ZodType<Prisma.QuestionnaireCreateManyArgs> = z.object({
  data: z.union([ QuestionnaireCreateManyInputSchema,QuestionnaireCreateManyInputSchema.array() ]),
}).strict() ;

export const QuestionnaireDeleteArgsSchema: z.ZodType<Prisma.QuestionnaireDeleteArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  where: QuestionnaireWhereUniqueInputSchema,
}).strict() ;

export const QuestionnaireUpdateArgsSchema: z.ZodType<Prisma.QuestionnaireUpdateArgs> = z.object({
  select: QuestionnaireSelectSchema.optional(),
  include: QuestionnaireIncludeSchema.optional(),
  data: z.union([ QuestionnaireUpdateInputSchema,QuestionnaireUncheckedUpdateInputSchema ]),
  where: QuestionnaireWhereUniqueInputSchema,
}).strict() ;

export const QuestionnaireUpdateManyArgsSchema: z.ZodType<Prisma.QuestionnaireUpdateManyArgs> = z.object({
  data: z.union([ QuestionnaireUpdateManyMutationInputSchema,QuestionnaireUncheckedUpdateManyInputSchema ]),
  where: QuestionnaireWhereInputSchema.optional(),
}).strict() ;

export const QuestionnaireDeleteManyArgsSchema: z.ZodType<Prisma.QuestionnaireDeleteManyArgs> = z.object({
  where: QuestionnaireWhereInputSchema.optional(),
}).strict() ;

export const LetterOfEngagementCreateArgsSchema: z.ZodType<Prisma.LetterOfEngagementCreateArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  data: z.union([ LetterOfEngagementCreateInputSchema,LetterOfEngagementUncheckedCreateInputSchema ]),
}).strict() ;

export const LetterOfEngagementUpsertArgsSchema: z.ZodType<Prisma.LetterOfEngagementUpsertArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereUniqueInputSchema,
  create: z.union([ LetterOfEngagementCreateInputSchema,LetterOfEngagementUncheckedCreateInputSchema ]),
  update: z.union([ LetterOfEngagementUpdateInputSchema,LetterOfEngagementUncheckedUpdateInputSchema ]),
}).strict() ;

export const LetterOfEngagementCreateManyArgsSchema: z.ZodType<Prisma.LetterOfEngagementCreateManyArgs> = z.object({
  data: z.union([ LetterOfEngagementCreateManyInputSchema,LetterOfEngagementCreateManyInputSchema.array() ]),
}).strict() ;

export const LetterOfEngagementDeleteArgsSchema: z.ZodType<Prisma.LetterOfEngagementDeleteArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  where: LetterOfEngagementWhereUniqueInputSchema,
}).strict() ;

export const LetterOfEngagementUpdateArgsSchema: z.ZodType<Prisma.LetterOfEngagementUpdateArgs> = z.object({
  select: LetterOfEngagementSelectSchema.optional(),
  include: LetterOfEngagementIncludeSchema.optional(),
  data: z.union([ LetterOfEngagementUpdateInputSchema,LetterOfEngagementUncheckedUpdateInputSchema ]),
  where: LetterOfEngagementWhereUniqueInputSchema,
}).strict() ;

export const LetterOfEngagementUpdateManyArgsSchema: z.ZodType<Prisma.LetterOfEngagementUpdateManyArgs> = z.object({
  data: z.union([ LetterOfEngagementUpdateManyMutationInputSchema,LetterOfEngagementUncheckedUpdateManyInputSchema ]),
  where: LetterOfEngagementWhereInputSchema.optional(),
}).strict() ;

export const LetterOfEngagementDeleteManyArgsSchema: z.ZodType<Prisma.LetterOfEngagementDeleteManyArgs> = z.object({
  where: LetterOfEngagementWhereInputSchema.optional(),
}).strict() ;

export const InvoiceCreateArgsSchema: z.ZodType<Prisma.InvoiceCreateArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  data: z.union([ InvoiceCreateInputSchema,InvoiceUncheckedCreateInputSchema ]),
}).strict() ;

export const InvoiceUpsertArgsSchema: z.ZodType<Prisma.InvoiceUpsertArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
  create: z.union([ InvoiceCreateInputSchema,InvoiceUncheckedCreateInputSchema ]),
  update: z.union([ InvoiceUpdateInputSchema,InvoiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvoiceCreateManyArgsSchema: z.ZodType<Prisma.InvoiceCreateManyArgs> = z.object({
  data: z.union([ InvoiceCreateManyInputSchema,InvoiceCreateManyInputSchema.array() ]),
}).strict() ;

export const InvoiceDeleteArgsSchema: z.ZodType<Prisma.InvoiceDeleteArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceUpdateArgsSchema: z.ZodType<Prisma.InvoiceUpdateArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  data: z.union([ InvoiceUpdateInputSchema,InvoiceUncheckedUpdateInputSchema ]),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceUpdateManyArgsSchema: z.ZodType<Prisma.InvoiceUpdateManyArgs> = z.object({
  data: z.union([ InvoiceUpdateManyMutationInputSchema,InvoiceUncheckedUpdateManyInputSchema ]),
  where: InvoiceWhereInputSchema.optional(),
}).strict() ;

export const InvoiceDeleteManyArgsSchema: z.ZodType<Prisma.InvoiceDeleteManyArgs> = z.object({
  where: InvoiceWhereInputSchema.optional(),
}).strict() ;

export const ReceiptCreateArgsSchema: z.ZodType<Prisma.ReceiptCreateArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  data: z.union([ ReceiptCreateInputSchema,ReceiptUncheckedCreateInputSchema ]),
}).strict() ;

export const ReceiptUpsertArgsSchema: z.ZodType<Prisma.ReceiptUpsertArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
  create: z.union([ ReceiptCreateInputSchema,ReceiptUncheckedCreateInputSchema ]),
  update: z.union([ ReceiptUpdateInputSchema,ReceiptUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReceiptCreateManyArgsSchema: z.ZodType<Prisma.ReceiptCreateManyArgs> = z.object({
  data: z.union([ ReceiptCreateManyInputSchema,ReceiptCreateManyInputSchema.array() ]),
}).strict() ;

export const ReceiptDeleteArgsSchema: z.ZodType<Prisma.ReceiptDeleteArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ReceiptUpdateArgsSchema: z.ZodType<Prisma.ReceiptUpdateArgs> = z.object({
  select: ReceiptSelectSchema.optional(),
  include: ReceiptIncludeSchema.optional(),
  data: z.union([ ReceiptUpdateInputSchema,ReceiptUncheckedUpdateInputSchema ]),
  where: ReceiptWhereUniqueInputSchema,
}).strict() ;

export const ReceiptUpdateManyArgsSchema: z.ZodType<Prisma.ReceiptUpdateManyArgs> = z.object({
  data: z.union([ ReceiptUpdateManyMutationInputSchema,ReceiptUncheckedUpdateManyInputSchema ]),
  where: ReceiptWhereInputSchema.optional(),
}).strict() ;

export const ReceiptDeleteManyArgsSchema: z.ZodType<Prisma.ReceiptDeleteManyArgs> = z.object({
  where: ReceiptWhereInputSchema.optional(),
}).strict() ;

export const IndustryCreateArgsSchema: z.ZodType<Prisma.IndustryCreateArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  data: z.union([ IndustryCreateInputSchema,IndustryUncheckedCreateInputSchema ]),
}).strict() ;

export const IndustryUpsertArgsSchema: z.ZodType<Prisma.IndustryUpsertArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereUniqueInputSchema,
  create: z.union([ IndustryCreateInputSchema,IndustryUncheckedCreateInputSchema ]),
  update: z.union([ IndustryUpdateInputSchema,IndustryUncheckedUpdateInputSchema ]),
}).strict() ;

export const IndustryCreateManyArgsSchema: z.ZodType<Prisma.IndustryCreateManyArgs> = z.object({
  data: z.union([ IndustryCreateManyInputSchema,IndustryCreateManyInputSchema.array() ]),
}).strict() ;

export const IndustryDeleteArgsSchema: z.ZodType<Prisma.IndustryDeleteArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  where: IndustryWhereUniqueInputSchema,
}).strict() ;

export const IndustryUpdateArgsSchema: z.ZodType<Prisma.IndustryUpdateArgs> = z.object({
  select: IndustrySelectSchema.optional(),
  include: IndustryIncludeSchema.optional(),
  data: z.union([ IndustryUpdateInputSchema,IndustryUncheckedUpdateInputSchema ]),
  where: IndustryWhereUniqueInputSchema,
}).strict() ;

export const IndustryUpdateManyArgsSchema: z.ZodType<Prisma.IndustryUpdateManyArgs> = z.object({
  data: z.union([ IndustryUpdateManyMutationInputSchema,IndustryUncheckedUpdateManyInputSchema ]),
  where: IndustryWhereInputSchema.optional(),
}).strict() ;

export const IndustryDeleteManyArgsSchema: z.ZodType<Prisma.IndustryDeleteManyArgs> = z.object({
  where: IndustryWhereInputSchema.optional(),
}).strict() ;

export const ReportsCreateArgsSchema: z.ZodType<Prisma.ReportsCreateArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  data: z.union([ ReportsCreateInputSchema,ReportsUncheckedCreateInputSchema ]),
}).strict() ;

export const ReportsUpsertArgsSchema: z.ZodType<Prisma.ReportsUpsertArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereUniqueInputSchema,
  create: z.union([ ReportsCreateInputSchema,ReportsUncheckedCreateInputSchema ]),
  update: z.union([ ReportsUpdateInputSchema,ReportsUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReportsCreateManyArgsSchema: z.ZodType<Prisma.ReportsCreateManyArgs> = z.object({
  data: z.union([ ReportsCreateManyInputSchema,ReportsCreateManyInputSchema.array() ]),
}).strict() ;

export const ReportsDeleteArgsSchema: z.ZodType<Prisma.ReportsDeleteArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  where: ReportsWhereUniqueInputSchema,
}).strict() ;

export const ReportsUpdateArgsSchema: z.ZodType<Prisma.ReportsUpdateArgs> = z.object({
  select: ReportsSelectSchema.optional(),
  include: ReportsIncludeSchema.optional(),
  data: z.union([ ReportsUpdateInputSchema,ReportsUncheckedUpdateInputSchema ]),
  where: ReportsWhereUniqueInputSchema,
}).strict() ;

export const ReportsUpdateManyArgsSchema: z.ZodType<Prisma.ReportsUpdateManyArgs> = z.object({
  data: z.union([ ReportsUpdateManyMutationInputSchema,ReportsUncheckedUpdateManyInputSchema ]),
  where: ReportsWhereInputSchema.optional(),
}).strict() ;

export const ReportsDeleteManyArgsSchema: z.ZodType<Prisma.ReportsDeleteManyArgs> = z.object({
  where: ReportsWhereInputSchema.optional(),
}).strict() ;

export const RatingCreateArgsSchema: z.ZodType<Prisma.RatingCreateArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  data: z.union([ RatingCreateInputSchema,RatingUncheckedCreateInputSchema ]),
}).strict() ;

export const RatingUpsertArgsSchema: z.ZodType<Prisma.RatingUpsertArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
  create: z.union([ RatingCreateInputSchema,RatingUncheckedCreateInputSchema ]),
  update: z.union([ RatingUpdateInputSchema,RatingUncheckedUpdateInputSchema ]),
}).strict() ;

export const RatingCreateManyArgsSchema: z.ZodType<Prisma.RatingCreateManyArgs> = z.object({
  data: z.union([ RatingCreateManyInputSchema,RatingCreateManyInputSchema.array() ]),
}).strict() ;

export const RatingDeleteArgsSchema: z.ZodType<Prisma.RatingDeleteArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingUpdateArgsSchema: z.ZodType<Prisma.RatingUpdateArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  data: z.union([ RatingUpdateInputSchema,RatingUncheckedUpdateInputSchema ]),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingUpdateManyArgsSchema: z.ZodType<Prisma.RatingUpdateManyArgs> = z.object({
  data: z.union([ RatingUpdateManyMutationInputSchema,RatingUncheckedUpdateManyInputSchema ]),
  where: RatingWhereInputSchema.optional(),
}).strict() ;

export const RatingDeleteManyArgsSchema: z.ZodType<Prisma.RatingDeleteManyArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
}).strict() ;

export const RatingClassCreateArgsSchema: z.ZodType<Prisma.RatingClassCreateArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  data: z.union([ RatingClassCreateInputSchema,RatingClassUncheckedCreateInputSchema ]),
}).strict() ;

export const RatingClassUpsertArgsSchema: z.ZodType<Prisma.RatingClassUpsertArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereUniqueInputSchema,
  create: z.union([ RatingClassCreateInputSchema,RatingClassUncheckedCreateInputSchema ]),
  update: z.union([ RatingClassUpdateInputSchema,RatingClassUncheckedUpdateInputSchema ]),
}).strict() ;

export const RatingClassCreateManyArgsSchema: z.ZodType<Prisma.RatingClassCreateManyArgs> = z.object({
  data: z.union([ RatingClassCreateManyInputSchema,RatingClassCreateManyInputSchema.array() ]),
}).strict() ;

export const RatingClassDeleteArgsSchema: z.ZodType<Prisma.RatingClassDeleteArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  where: RatingClassWhereUniqueInputSchema,
}).strict() ;

export const RatingClassUpdateArgsSchema: z.ZodType<Prisma.RatingClassUpdateArgs> = z.object({
  select: RatingClassSelectSchema.optional(),
  include: RatingClassIncludeSchema.optional(),
  data: z.union([ RatingClassUpdateInputSchema,RatingClassUncheckedUpdateInputSchema ]),
  where: RatingClassWhereUniqueInputSchema,
}).strict() ;

export const RatingClassUpdateManyArgsSchema: z.ZodType<Prisma.RatingClassUpdateManyArgs> = z.object({
  data: z.union([ RatingClassUpdateManyMutationInputSchema,RatingClassUncheckedUpdateManyInputSchema ]),
  where: RatingClassWhereInputSchema.optional(),
}).strict() ;

export const RatingClassDeleteManyArgsSchema: z.ZodType<Prisma.RatingClassDeleteManyArgs> = z.object({
  where: RatingClassWhereInputSchema.optional(),
}).strict() ;

export const ClientCreateArgsSchema: z.ZodType<Prisma.ClientCreateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
}).strict() ;

export const ClientUpsertArgsSchema: z.ZodType<Prisma.ClientUpsertArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
  create: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
  update: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
}).strict() ;

export const ClientCreateManyArgsSchema: z.ZodType<Prisma.ClientCreateManyArgs> = z.object({
  data: z.union([ ClientCreateManyInputSchema,ClientCreateManyInputSchema.array() ]),
}).strict() ;

export const ClientDeleteArgsSchema: z.ZodType<Prisma.ClientDeleteArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateArgsSchema: z.ZodType<Prisma.ClientUpdateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateManyArgsSchema: z.ZodType<Prisma.ClientUpdateManyArgs> = z.object({
  data: z.union([ ClientUpdateManyMutationInputSchema,ClientUncheckedUpdateManyInputSchema ]),
  where: ClientWhereInputSchema.optional(),
}).strict() ;

export const ClientDeleteManyArgsSchema: z.ZodType<Prisma.ClientDeleteManyArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
}).strict() ;

export const ContactCreateArgsSchema: z.ZodType<Prisma.ContactCreateArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  data: z.union([ ContactCreateInputSchema,ContactUncheckedCreateInputSchema ]),
}).strict() ;

export const ContactUpsertArgsSchema: z.ZodType<Prisma.ContactUpsertArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereUniqueInputSchema,
  create: z.union([ ContactCreateInputSchema,ContactUncheckedCreateInputSchema ]),
  update: z.union([ ContactUpdateInputSchema,ContactUncheckedUpdateInputSchema ]),
}).strict() ;

export const ContactCreateManyArgsSchema: z.ZodType<Prisma.ContactCreateManyArgs> = z.object({
  data: z.union([ ContactCreateManyInputSchema,ContactCreateManyInputSchema.array() ]),
}).strict() ;

export const ContactDeleteArgsSchema: z.ZodType<Prisma.ContactDeleteArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  where: ContactWhereUniqueInputSchema,
}).strict() ;

export const ContactUpdateArgsSchema: z.ZodType<Prisma.ContactUpdateArgs> = z.object({
  select: ContactSelectSchema.optional(),
  include: ContactIncludeSchema.optional(),
  data: z.union([ ContactUpdateInputSchema,ContactUncheckedUpdateInputSchema ]),
  where: ContactWhereUniqueInputSchema,
}).strict() ;

export const ContactUpdateManyArgsSchema: z.ZodType<Prisma.ContactUpdateManyArgs> = z.object({
  data: z.union([ ContactUpdateManyMutationInputSchema,ContactUncheckedUpdateManyInputSchema ]),
  where: ContactWhereInputSchema.optional(),
}).strict() ;

export const ContactDeleteManyArgsSchema: z.ZodType<Prisma.ContactDeleteManyArgs> = z.object({
  where: ContactWhereInputSchema.optional(),
}).strict() ;

export const LogCreateArgsSchema: z.ZodType<Prisma.LogCreateArgs> = z.object({
  select: LogSelectSchema.optional(),
  data: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
}).strict() ;

export const LogUpsertArgsSchema: z.ZodType<Prisma.LogUpsertArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
  create: z.union([ LogCreateInputSchema,LogUncheckedCreateInputSchema ]),
  update: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
}).strict() ;

export const LogCreateManyArgsSchema: z.ZodType<Prisma.LogCreateManyArgs> = z.object({
  data: z.union([ LogCreateManyInputSchema,LogCreateManyInputSchema.array() ]),
}).strict() ;

export const LogDeleteArgsSchema: z.ZodType<Prisma.LogDeleteArgs> = z.object({
  select: LogSelectSchema.optional(),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogUpdateArgsSchema: z.ZodType<Prisma.LogUpdateArgs> = z.object({
  select: LogSelectSchema.optional(),
  data: z.union([ LogUpdateInputSchema,LogUncheckedUpdateInputSchema ]),
  where: LogWhereUniqueInputSchema,
}).strict() ;

export const LogUpdateManyArgsSchema: z.ZodType<Prisma.LogUpdateManyArgs> = z.object({
  data: z.union([ LogUpdateManyMutationInputSchema,LogUncheckedUpdateManyInputSchema ]),
  where: LogWhereInputSchema.optional(),
}).strict() ;

export const LogDeleteManyArgsSchema: z.ZodType<Prisma.LogDeleteManyArgs> = z.object({
  where: LogWhereInputSchema.optional(),
}).strict() ;