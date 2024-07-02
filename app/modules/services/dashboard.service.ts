export class DashboardClass extends MainClass {
  async dashboard() {
    try {
      const result = await dbQuery.$transaction([
        dbQuery.client.count(),
        dbQuery.industry.count(),
        dbQuery.rating.count({ where: { status: "ongoing" } }),
        dbQuery.rating.count({ where: { status: "concluded" } }),
        dbQuery.rating.groupBy({ by: ["client"],where: { client: { not: null } } }),
      ]);

      return { clients: result[0], industries: result[1], pendingRatings: result[2], completedRatings: result[3] };
    } catch (error) {}
  }
}

//clients
//industries
//pending ratings
//completed ratings
//industry distribution
