import { convertZodSchema } from '@helpers/utils';
import { dbQuery } from '@helpers/prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { IndustrySchema } from '@helpers/zodPrisma';
import { MainClass } from '../services/main.service';
import { Prisma } from '@prisma/client';

interface AllArgs extends Prisma.IndustryFindManyArgs {
  limit: number;
  page: number;
}

export class IndustryClass extends MainClass {
  async all(args: AllArgs) {
    try {
      await this.hasAccess('all');
      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.industry.findMany({ where, orderBy, take, skip, include }),
        dbQuery.industry.count({ where }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return { industries: { page: setPage, limit: take, totalPages, totalDocs, hasNextPage, hasPrevPage, docs } };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async one(input: { id: string; include?: Prisma.IndustryInclude<DefaultArgs> | null | undefined }) {
    try {
      await this.hasAccess('all');

      const { id, include } = input;
      const industry = await dbQuery.industry.findUnique({ where: { id }, include });

      return { industry };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async create(input: { data: Prisma.IndustryCreateInput }) {
    try {
      const { data } = input;
      await this.hasAccess(['admin', 'hod']);
      const industry = await dbQuery.industry.create({ data });

      this.LogAction({
        table: 'industry',
        action: 'create',
        prevDocs: '',
        newDocs: JSON.stringify(industry),
        user: `${this.user?.id}`,
      });
      return { createIndustry: 'Industry successfully created', industry };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: Prisma.IndustryUpdateInput }) {
    try {
      await this.hasAccess(['admin', 'hod']);
      const { id, data } = input;

      const prevDocs = await dbQuery.industry.findUnique({ where: { id } });
      const result = await dbQuery.industry.update({ where: { id }, data });

      this.LogAction({
        table: 'industry',
        action: 'update',
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateIndustry: 'Industry successfully updated' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.industry.delete({ where: { id } });
      this.LogAction({
        table: 'industry',
        action: 'delete',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteIndustry: 'Industry successfully deleted' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject() {
    try {
      const formObject = convertZodSchema(IndustrySchema);
      return { formObject };
    } catch (error: unknown) {
      return { error: 'Something went wrong' };
    }
  }
}
