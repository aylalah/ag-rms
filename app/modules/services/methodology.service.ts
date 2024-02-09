import { convertZodSchema } from '@helpers/utils';
import { dbQuery } from '@helpers/prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { MainClass } from './main.service';
import { MethodologySchema } from '@helpers/zodPrisma';
import { Prisma } from '@prisma/client';

interface AllArgs extends Prisma.MethodologyFindManyArgs {
  limit: number;
  page: number;
}

export class MethodologyClass extends MainClass {
  async all(args: AllArgs) {
    try {
      await this.hasAccess('all');
      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.methodology.findMany({ where, orderBy, take, skip, include: { ...include } }),
        dbQuery.methodology.count({ where }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return { methodologies: { page: setPage, limit: take, totalPages, totalDocs, hasNextPage, hasPrevPage, docs } };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async one(input: { id: string; include?: Prisma.MethodologyInclude<DefaultArgs> | null | undefined }) {
    try {
      await this.hasAccess('all');

      const { id, include } = input;
      const methodology = await dbQuery.methodology.findUnique({ where: { id }, include });

      return { methodology };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async create(input: { data: Prisma.MethodologyCreateInput }) {
    try {
      const { data } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.methodology.create({ data });

      this.LogAction({
        table: 'methodology',
        action: 'create',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { createMethodology: 'Methodology successfully created' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: Prisma.MethodologyUpdateInput }) {
    try {
      await this.hasAccess(['admin', 'hod']);
      const { id, data } = input;

      const prevDocs = await dbQuery.methodology.findUnique({ where: { id } });
      const result = await dbQuery.methodology.update({ where: { id }, data });

      this.LogAction({
        table: 'methodology',
        action: 'update',
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateMethodology: 'Methodology successfully updated' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.methodology.delete({ where: { id } });
      this.LogAction({
        table: 'methodology',
        action: 'delete',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteMethodology: 'Methodology successfully deleted' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject() {
    try {
      const data = convertZodSchema(MethodologySchema);
      const industry = await dbQuery.industry.findMany({ select: { id: true, name: true } });
      const dataList = data.filter((el) => el?.field !== 'ratingModel');
      return { formObject: dataList };
    } catch (error: unknown) {
      return { error: 'Something went wrong' };
    }
  }
}
