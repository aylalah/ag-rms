import axios from 'axios';
import { appDecryptData } from '@helpers/validation';
import { convertZodSchema } from '@helpers/utils';
import { dbQuery } from '@helpers/prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { MainClass } from './main.service';
import { Prisma } from '@prisma/client';
import { RatingSchema, RatingStatusSchema } from '@helpers/zodPrisma';

interface AllArgs extends Prisma.RatingFindManyArgs {
  limit: number;
  page: number;
  include?: Prisma.RatingInclude<DefaultArgs>;
  where?: Prisma.RatingWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.RatingOrderByWithRelationInput>;
}

export class RatingClass extends MainClass {
  async all(args: AllArgs) {
    try {
      await this.hasAccess('all');
      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.rating.findMany({ where, orderBy, take, skip, include: { ratingClassModel: true, ...include } }),
        dbQuery.rating.count({ where }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return { ratings: { page: setPage, limit: take, totalPages, totalDocs, hasNextPage, hasPrevPage, docs } };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async one(input: { id: string; include?: Prisma.RatingInclude<DefaultArgs> }) {
    try {
      await this.hasAccess('all');

      const { id, include } = input;
      const rating = await dbQuery.rating.findUnique({
        where: { id },
        include: {
          reportModel: true,
          ratingClassModel: true,
          methodologyModel: true,
          questionnaireModel: true,
          clientModel: true,
          ...include,
        },
      });

      return { rating };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async create(input: { data: any }) {
    try {
      const { data } = input;
      await this.hasAccess(['admin', 'hod']);

      //const check for existing rating with year and client
      const check = await dbQuery.rating.findFirst({
        where: { ratingYear: data.ratingYear, client: data.client },
      });

      if (check) throw new Error('Rating already exists for this year and client');

      const result = await dbQuery.rating.create({ data });

      this.LogAction({
        table: 'rating',
        action: 'create',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { createRating: 'Rating successfully created' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: Prisma.RatingUpdateInput }) {
    try {
      await this.hasAccess(['admin', 'client', 'hod']);
      const { id, data } = input;

      const prevDocs = await dbQuery.rating.findUnique({ where: { id } });
      const result = await dbQuery.rating.update({ where: { id }, data });

      this.LogAction({
        table: 'rating',
        action: 'update',
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateRating: 'Rating successfully updated' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess(['admin', 'hod']);
      const result = await dbQuery.rating.delete({ where: { id } });
      this.LogAction({
        table: 'rating',
        action: 'delete',
        prevDocs: '',
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteRating: 'Rating successfully deleted' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject({ apiToken, token }: { apiToken?: string; token?: string }) {
    try {
      const user = await appDecryptData(token);
      const endPoint = process.env.AGUSTO_SERVICES_URL;
      const { data } = await axios.get(`${endPoint}/users/getStaffBySupervisor/${user?.employee_id.toString()}`, {
        headers: { Authorization: `Bearer ${apiToken}` },
      });

      const unitMembers = data?.data || [];

      if (!unitMembers?.length || unitMembers?.length < 1)
        return { error: 'You are not a supervisor. Please contact your supervisor to create a rating' };

      const objData = convertZodSchema(RatingSchema);
      const ratingStatus = RatingStatusSchema;
      const methodology = await dbQuery.methodology.findMany({ select: { id: true, name: true } });
      const questionnaire = await dbQuery.questionnaire.findMany({ select: { id: true, name: true } });
      const ratingClass = await dbQuery.ratingClass.findMany({ select: { id: true, name: true } });

      const dataList = objData
        .filter((el) => el?.field !== 'role')
        .map((el) => {
          //last 10 years
          if (el.field === 'ratingYear') {
            el.type = 'object';
            el.list = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((el) => ({
              id: el,
              name: el,
            }));
          }

          if (el.field === 'status') {
            el.type = 'object';
            el.list = Object.keys(ratingStatus?.Values).map((el) => ({ id: el, name: el }));
          }

          if (el.field === 'supervisor') {
            el.type = 'object';
            el.list = unitMembers
              ?.map((el: any) => ({
                employee_id: el?.employee_id,
                id: `${el?.firstname} ${el?.lastname}`,
                name: `${el?.firstname} ${el?.lastname}`,
              }))
              .filter((el: any) => el?.employee_id === user?.employee_id);
          }

          if (el.field === 'primaryAnalyst') {
            el.type = 'object';
            el.list = unitMembers
              ?.map((el: any) => ({
                employee_id: el?.employee_id,
                id: `${el?.firstname} ${el?.lastname}`,
                name: `${el?.firstname} ${el?.lastname}`,
              }))
              .filter((el: any) => el?.employee_id !== user?.employee_id);
          }

          if (el.field === 'secondaryAnalyst') {
            el.type = 'object';
            el.list = unitMembers
              ?.map((el: any) => ({
                employee_id: el?.employee_id,
                id: `${el?.firstname} ${el?.lastname}`,
                name: `${el?.firstname} ${el?.lastname}`,
              }))
              .filter((el: any) => el?.employee_id !== user?.employee_id);
          }

          if (el.field === 'methodology') {
            el.type = 'object';
            el.list = methodology.map((el) => ({ id: el.id, name: el.name }));
          }

          if (el.field === 'questionnaire') {
            el.type = 'object';
            el.list = questionnaire.map((el) => ({ id: el.id, name: el.name }));
          }

          if (el.field === 'ratingClass') {
            el.type = 'object';
            el.list = ratingClass.map((el) => ({ id: el.id, name: el.name }));
          }

          return el;
        });

      const toBeRemoved = ['responses', 'client'];

      //sort and move status to the end
      const filteredData = dataList.filter((el) => !toBeRemoved.includes(el.field));
      const status = filteredData.find((el) => el.field === 'status');
      const rest = filteredData
        .filter((el) => el.field !== 'status')
        .filter((el) => el.field !== 'questionnaireFiles')
        .filter((el) => el.field !== 'additionalFiles')
        .filter((el) => el.field !== 'requireAdditionalFiles')
        .filter((el) => el.field !== 'requireQuestionnaireFiles');
      rest.push(status as any);

      return { formObject: rest };
    } catch (error: any) {
      return { error: error?.message };
    }
  }
}
