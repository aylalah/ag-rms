import axios from "axios";
import { appDecryptData } from "@helpers/validation";
import { convertZodSchema } from "@helpers/utils";
import { dbQuery } from "@helpers/prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { MainClass } from "./main.service";
import { Prisma } from "@prisma/client";
import { RatingSchema, RatingStatusSchema } from "@helpers/zodPrisma";
import { send } from "node:process";

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
      await this.hasAccess("all");
      const unit = this.user?.unit;

      const whereUnit = unit === "Information Technology" ? {} : { unit };

      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.rating.findMany({
          where: { ...where, ...whereUnit },
          orderBy,
          take,
          skip,
          include: { ratingClassModel: true, ...include },
        }),
        dbQuery.rating.count({ where: { ...where, ...whereUnit } }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return {
        ratings: {
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

  async one(input: {
    id: string;
    include?: Prisma.RatingInclude<DefaultArgs>;
  }) {
    try {
      await this.hasAccess("all");

      const { id, include } = input;
      const rating = await dbQuery.rating.findUnique({
        where: { id },
        include: {
          reportModel: true,
          ratingClassModel: true,
          methodologyModel: true,
          questionnaireModel: true,
          clientModel: { include: { contactModel: true } },
          loeModel: true,
          invoiceModel: true,
          receiptModel: true,
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
      //await this.hasAccess(["admin", "hod", "all"]);
      await this.hasAccess("all");
      const unit = this.user?.unit;

      //const check for existing rating with year and client
      const check = await dbQuery.rating.findFirst({
        where: {
          ratingYear: data.ratingYear,
          client: data.client,
          ratingTitle: data.ratingTitle,
        },
      });

      if (check)
        throw new Error("Rating already exists for this year and client");

      const result = await dbQuery.rating.create({
        data: { ...data, unit },
        include: { clientModel: true },
      });

      const contacts = await dbQuery.contact.findMany({
        where: { client: result.clientModel.id },
      });
      const supervisor = JSON.parse(result?.supervisor || "{}");

      contacts.forEach((el) => {
        const HtmlBody = `<p>Dear Client,</p>
        <p>A new rating program has been created for you on the Agusto Rating Management System.</p> 
        <p>Please log in to the <a href="https://arms.agusto.com">portal</a> to access our rating methodology and information gathering questionnaire</p>
        <p>Best Regards,</p>
        <p>Agusto & Co RMS Team</p>`;

        sendEmail({
          to: `${el.fullName}`,
          email: `${el.email}`,
          subject: `New Rating - ${result.ratingTitle} `,
          html: HtmlBody,
        });
      });

      sendEmail({
        to: `${supervisor?.firstname} ${supervisor?.lastname}`,
        email: supervisor?.email,
        subject: `New Rating - ${result.ratingTitle} `,
        html: `<p>Dear ${supervisor?.firstname} ${supervisor?.lastname},</p>
       <p> Please be informed that ${result.ratingTitle} has been created on the Agusto RMS portal.</p>
       <p>Please log in to your account to view</p>

       <p>Best Regards,</p>
       <p>Agusto & Co RMS Team</p>`,
      });

      this.LogAction({
        table: "rating",
        action: "create",
        prevDocs: "",
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { createRating: "Rating successfully created" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: any }) {
    try {
      // await this.hasAccess(["admin", "client", "hod"]);
      await this.hasAccess("all");
      const { id, data } = input;

      const prevDocs = await dbQuery.rating.findUnique({ where: { id } });
      const result = await dbQuery.rating.update({
        where: { id },
        data: { ...data },
      });

      this.LogAction({
        table: "rating",
        action: "update",
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateRating: "Rating successfully updated" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess(["admin", "hod"]);
      const result = await dbQuery.rating.delete({ where: { id } });
      this.LogAction({
        table: "rating",
        action: "delete",
        prevDocs: "",
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteRating: "Rating successfully deleted" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject({
    apiToken,
    token,
    user,
  }: {
    apiToken?: string;
    token?: string;
    user: any;
  }) {
    try {
      //const user = { employee_id: 160687 }; // christian
      //const user = { employee_id: 220684 }; // ike
      // const user = await appDecryptData(token);

      const unit = user?.unit;

      const endPoint = process.env.AGUSTO_SERVICES;

      let unitMembers: any = [];

      if (
        user?.isAdmin !== true ||
        (user?.isAdmin === true && user?.unit.includes("Corporate"))
      ) {
        const { data } = await axios.get(
          `${endPoint}/users/getStaffBySupervisor/${user?.supervisor_id.toString()}`,
          {
            headers: { Authorization: `Bearer ${apiToken}` },
          }
        );

        unitMembers = data?.data || [];
      } else {
        const { data } = await axios.get(
          `${endPoint}/users/getStaffBySupervisor/${user?.id.toString()}`,
          {
            headers: { Authorization: `Bearer ${apiToken}` },
          }
        );
        unitMembers = data?.data || [];
      }

      if (unit?.includes("Corporate")) {
        unitMembers = unitMembers
          ?.filter(
            (el: any) =>
              el?.department?.name.includes("Corporate") ||
              el?.department?.name.includes("Executive")
          )
          .sort((a: any, b: any) => a.firstname.localeCompare(b.firstname));
      } else {
        unitMembers = unitMembers
          ?.filter(
            (member: any) => member?.department_id === user?.department_id
          )
          .sort((a: any, b: any) => a.firstname.localeCompare(b.firstname));
      }

      const objData = convertZodSchema(RatingSchema);

      objData.forEach((el: any) => {
        if (el.field === "loe" || el.field === "invoice") {
          el.type = "file";
        }
      });

      const ratingStatus = RatingStatusSchema;

      const methodology = await dbQuery.methodology.findMany({
        select: { id: true, name: true },
        where: { unit },
      });

      const questionnaire = await dbQuery.questionnaire.findMany({
        select: { id: true, name: true },
        where: { unit },
      });
      const ratingClass = await dbQuery.ratingClass.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      });

      const dataList = objData
        .filter((el) => el?.field !== "role")
        .map((el) => {
          //last 10 years
          if (el.field === "ratingYear") {
            el.type = "object";
            el.list = Array.from(
              { length: 3 },
              (_, i) => new Date().getFullYear() - i
            ).map((el) => ({
              id: el,
              name: el,
            }));
          }

          if (el.field === "status") {
            el.value = "ongoing";
            el.type = "object";
            el.list = Object.keys(ratingStatus?.Values).map((el) => ({
              id: el,
              name: el,
            }));
          }

          if (el.field === "supervisor") {
            const sup = unitMembers
              ?.filter((el: any) => el?.isAdmin === true)
              ?.map((el: any) => ({
                employee_id: el?.employee_id,
                id: JSON.stringify({
                  firstname: el?.firstname,
                  lastname: el?.lastname,
                  email: el?.corporate_email,
                  employee_id: el?.employee_id,
                }),
                name: `${el?.firstname} ${el?.lastname}`,
              }));

            el.value = sup?.[0]?.id || "";
            el.type = "object";
            el.list = sup;
          }

          if (el.field === "primaryAnalyst") {
            el.type = "object";
            el.list = unitMembers?.map((el: any) => ({
              employee_id: el?.employee_id,
              id: JSON.stringify({
                firstname: el?.firstname,
                lastname: el?.lastname,
                email: el?.corporate_email,
                employee_id: el?.employee_id,
              }),

              name: `${el?.firstname} ${el?.lastname}`,
            }));
          }

          if (el.field === "secondaryAnalyst") {
            el.type = "object";
            el.list = unitMembers?.map((el: any) => ({
              employee_id: el?.employee_id,
              id: JSON.stringify({
                firstname: el?.firstname,
                lastname: el?.lastname,
                email: el?.corporate_email,
                employee_id: el?.employee_id,
              }),
              name: `${el?.firstname} ${el?.lastname}`,
              // email: `${el?.corporate_email}`,
            }));
            // .filter((el: any) => el?.employee_id !== user?.employee_id);
          }

          if (el.field === "methodology") {
            el.type = "object";
            el.list = methodology.map((el) => ({ id: el.id, name: el.name }));
          }

          if (el.field === "questionnaire") {
            el.type = "object";
            el.list = questionnaire.map((el) => ({ id: el.id, name: el.name }));
          }

          if (el.field === "ratingClass") {
            el.type = "object";
            el.list = ratingClass.map((el) => ({ id: el.id, name: el.name }));
          }
          if (el.field === "letterOfEngagement") {
            el.type = "file";
          }
          if (el.field === "invoice") {
            el.type = "file";
          }
          if (el.field === "receipt") {
            el.type = "file";
          }
          return el;
        });

      const toBeRemoved = ["responses", "client"];

      //sort and move status to the end
      const filteredData = dataList.filter(
        (el) => !toBeRemoved.includes(el.field)
      );
      const status = filteredData.find((el) => el.field === "status");
      const rest = filteredData
        .filter((el) => el.field !== "status")
        .filter((el) => el.field !== "questionnaireFiles")
        .filter((el) => el.field !== "additionalFiles")
        .filter((el) => el.field !== "requireAdditionalFiles")
        .filter((el) => el.field !== "requireQuestionnaireFiles")
        .filter((el) => el.field !== "unit");
      rest.push(status as any);

      return { formObject: rest };
    } catch (error: any) {
      return { error: error?.message };
    }
  }
}
