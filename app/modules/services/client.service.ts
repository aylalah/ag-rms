import { ClientSchema } from '@helpers/zodPrisma';
import { convertZodSchema } from '@helpers/utils';
import { dbQuery } from '@helpers/prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { MainClass } from './main.service';
import { Prisma } from '@prisma/client';

interface AllArgs extends Prisma.ClientFindManyArgs {
  limit?: number;
  page?: number;
}

export class ClientClass extends MainClass {
  async all(args: AllArgs) {
    try {
      await this.hasAccess('all');
      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.client.findMany({ where, orderBy, take, skip, include: { ...include, industryModel: true } }),
        dbQuery.client.count({ where }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return {
        clients: {
          page: setPage,
          limit: take,
          totalPages,
          totalDocs,
          hasNextPage,
          hasPrevPage,
          docs,
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async one(input: { id: string; include?: Prisma.ClientInclude<DefaultArgs> | null | undefined }) {
    try {
      await this.hasAccess('all');

      const { id, include } = input;
      const client = await dbQuery.client.findUnique({
        where: { id },
        include: { industryModel: true, contactModel: true, ...include },
      });

      return { client };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async create(input: { data: Prisma.ClientCreateInput }) {
    try {
      const { data } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.client.create({ data });

      this.LogAction({
        table: 'client',
        action: 'create',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { createClient: 'Client successfully created' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: Prisma.ClientUpdateInput }) {
    try {
      await this.hasAccess(['admin', 'hod']);
      const { id, data } = input;

      const prevDocs = await dbQuery.client.findUnique({ where: { id } });
      const result = await dbQuery.client.update({ where: { id }, data });

      this.LogAction({
        table: 'client',
        action: 'update',
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateClient: 'Client successfully updated' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.client.delete({ where: { id } });
      this.LogAction({
        table: 'client',
        action: 'delete',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteClient: 'Client successfully deleted' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject() {
    try {
      const data = convertZodSchema(ClientSchema);
      const industry = await dbQuery.industry.findMany({ select: { id: true, name: true } });
      const dataList = data
        .filter((el) => el?.field !== 'role')
        .map((el) => {
          if (el.field === 'industry') {
            el.type = 'object';
            el.list = industry.map((el) => ({ id: el.id, name: el.name }));
          }
          return el;
        });

      return { formObject: dataList };
    } catch (error: unknown) {
      return { error: 'Something went wrong' };
    }
  }
}
