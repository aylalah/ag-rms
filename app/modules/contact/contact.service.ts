import { ContactSchema } from "@helpers/zodPrisma";
import { convertZodSchema } from "@helpers/utils";
import { dbQuery } from "@helpers/prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { MainClass } from "../services/main.service";
import { Prisma } from "@prisma/client";

interface AllArgs extends Prisma.ContactFindManyArgs {
  limit: number;
  page: number;
}

export class ContactClass extends MainClass {
  async all(args: AllArgs) {
    try {
      await this.hasAccess("all");
      const { where, orderBy, page, limit, include } = args;
      const setPage = page || 1;
      const take = limit || 10;
      const skip = (setPage - 1) * take || 0;
      const industries = await dbQuery.$transaction([
        dbQuery.contact.findMany({ where, orderBy, take, skip }),
        dbQuery.contact.count({ where }),
      ]);

      const [docs, totalDocs] = industries;
      const totalPages = Math.ceil(totalDocs / take);
      const hasNextPage = setPage < totalPages;
      const hasPrevPage = setPage > 1;

      return {
        contacts: {
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
    include?: Prisma.ContactInclude<DefaultArgs> | null | undefined;
  }) {
    try {
      await this.hasAccess("all");

      const { id, include } = input;
      const contact = await dbQuery.contact.findUnique({
        where: { id },
      });

      return { contact };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async create(input: { data: Prisma.ContactCreateInput }) {
    try {
      const { data } = input;
      // console.log(data);
      await this.hasAccess("all");
      const result = await dbQuery.contact.create({ data });

      this.LogAction({
        table: "contact",
        action: "create",
        prevDocs: "",
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });

      const clientUrl = process.env.ROOT_URL;

      //only send email when client is created
      if (result.canLogin) {
        sendEmailService({
          From: "info@agusto.com",
          To: `${data.email}`,
          Subject: "Rating Management System Login",
          HtmlBody: `<p>Please find attached your Login details</p><p>Email: ${data.email} </br> </br> Password; ${data.password}</p>.The Login Url is ${clientUrl}`,
        });
      }
      
      return { createContact: "Contact successfully created" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async update(input: { id: string; data: Prisma.ContactUpdateInput }) {
    try {
      await this.hasAccess("all");
      const { id, data } = input;

      const prevDocs = await dbQuery.contact.findUnique({ where: { id } });
      const result = await dbQuery.contact.update({ where: { id }, data });

      this.LogAction({
        table: "contact",
        action: "update",
        prevDocs: JSON.stringify(prevDocs),
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { updateContact: "Contact successfully updated" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async delete(input: { id: string }) {
    try {
      const { id } = input;
      await this.hasAccess("all");
      const result = await dbQuery.contact.delete({ where: { id } });
      this.LogAction({
        table: "contact",
        action: "delete",
        prevDocs: "",
        newDocs: JSON.stringify(result),
        user: `${this.user?.id}`,
      });
      return { deleteContact: "Contact successfully deleted" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async formObject() {
    try {
      const data = convertZodSchema(ContactSchema);
      const industry = await dbQuery.industry.findMany({
        select: { id: true, name: true },
      });
      const dataList = data
        .filter((el) => el?.field !== "role")
        .map((el) => {
          if (el.field === "industry") {
            el.type = "object";
            el.list = industry.map((el) => ({ id: el.id, name: el.name }));
          }
          return el;
        });

      return { formObject: dataList };
    } catch (error: unknown) {
      return { error: "Something went wrong" };
    }
  }
}
