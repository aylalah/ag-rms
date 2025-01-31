interface DashboardData {
  clients: number;
  industries: number;
  pendingRatings: number;
  completedRatings: number;
  industryDistribution: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  error?: string; // Add the error property here
}

export class GeneralClass extends MainClass {
  async dashboard(): Promise<DashboardData> {
    try {
      //this.hasAccess("all");
      const result = await dbQuery.$transaction([
        dbQuery.client.count(),
        dbQuery.industry.count(),
        dbQuery.rating.count({ where: { status: "ongoing" } }),
        dbQuery.rating.count({ where: { status: "concluded" } }),
        dbQuery.industry.findMany({
          where: { clientModel: { some: { companyName: { not: "" } } } },
          select: { name: true, clientModel: { select: { id: true } } },
        }),
      ]);

      let industryDistribution = result[4]
        .map((el) => ({ name: el.name, count: el.clientModel.length }))
        .sort((a, b) => b.count - a.count);

      const slice = 4;
      const main = industryDistribution.slice(0, slice);
      const others = industryDistribution.slice(slice).reduce(
        (acc, curr) => {
          acc.count += curr.count;
          return acc;
        },
        { name: "Others", count: 0 }
      );
      industryDistribution = [...main, others].filter((el) => el.count > 0);

      const chartData = {
        labels: industryDistribution.map((el) => el.name),
        datasets: [
          {
            label: "Industry Distribution",
            data: industryDistribution.map((el) => el.count),
            backgroundColor: "#CE5A61",
          },
        ],
      };

      return {
        clients: result[0],
        industries: result[1],
        pendingRatings: result[2],
        completedRatings: result[3],
        industryDistribution: chartData,
      };
    } catch (error: any) {
      // return { error: error?.message };
      console.error("Error in dashboard:", error?.message);
      return {
        // Return a DashboardData object with the error property
        clients: 0,
        industries: 0,
        pendingRatings: 0,
        completedRatings: 0,
        industryDistribution: { labels: [], datasets: [] },
        error: error?.message || "An error occurred",
      };
    }
  }
}
