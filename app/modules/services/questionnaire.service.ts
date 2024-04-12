import { convertZodSchema } from '@helpers/utils';
import { dbQuery } from '@helpers/prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { MainClass } from './main.service';
import { Prisma } from '@prisma/client';
import { QuestionnaireSchema } from '@helpers/zodPrisma';

interface AllArgs extends Prisma.QuestionnaireFindManyArgs {
  limit: number;
  page: number;
}

export class QuestionnaireClass extends MainClass {
  async all(args: AllArgs) {
    try {
      await this.hasAccess('all');
      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.questionnaire.findMany({ where, orderBy, take, skip, include: { ...include } }),
        dbQuery.questionnaire.count({ where }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return { questionnaires: { page: setPage, limit: take, totalPages, totalDocs, hasNextPage, hasPrevPage, docs } };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async one(input: { id: string; include?: Prisma.QuestionnaireInclude<DefaultArgs> | null | undefined }) {
    try {
      await this.hasAccess('all');

      const { id, include } = input;
      const questionnaire = await dbQuery.questionnaire.findUnique({ where: { id }, include });

      return { questionnaire };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async create(input: { data: Prisma.QuestionnaireCreateInput }) {
    try {
      const { data } = input;
      await this.hasAccess(['admin']);
      const result = await dbQuery.questionnaire.create({ data });

      this.LogAction({
        table: 'questionnaire',
        action: 'create',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { createQuestionnaire: 'Questionnaire successfully created' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: Prisma.QuestionnaireUpdateInput }) {
    try {
      await this.hasAccess(['admin']);
      const { id, data } = input;

      const prevDocs = await dbQuery.questionnaire.findUnique({ where: { id } });
      const result = await dbQuery.questionnaire.update({ where: { id }, data });

      this.LogAction({
        table: 'questionnaire',
        action: 'update',
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateQuestionnaire: 'Questionnaire successfully updated' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.questionnaire.delete({ where: { id } });
      this.LogAction({
        table: 'questionnaire',
        action: 'delete',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteQuestionnaire: 'Questionnaire successfully deleted' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject() {
    try {
      const data = convertZodSchema(QuestionnaireSchema);
      const industry = await dbQuery.industry.findMany({ select: { id: true, name: true } });
      const dataList = data.filter((el) => el?.field !== 'ratingModel');
      return { formObject: dataList };
    } catch (error: unknown) {
      return { error: 'Something went wrong' };
    }
  }
}
