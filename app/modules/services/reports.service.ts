export class ReportClass extends MainClass {
  async create(input: { data: any }) {
    try {
      const { data } = input;
      await this.hasAccess("all");
      // await this.hasAccess(["admin", "hod"]);

      //const check for existing rating with year and client
      const check = await dbQuery.reports.findFirst({
        where: {
          rating: data?.rating,
          reportTitle: data.reportTitle,
          version: data?.version,
        },
      });

      if (check) {
        await dbQuery.reports.update({ data, where: { id: check?.id } });
      } else {
        const result = await dbQuery.reports.create({ data });

        this.LogAction({
          table: "rating",
          action: "create",
          prevDocs: "",
          newDocs: JSON.stringify(result),
          user: `${this.user?.id}`,
        });
        return { CreateReport: "Report uploaded successfully" };
      }

      return { CreateReport: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
