import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
export const DataMoreLikes = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/top5MoreLikes");
        const result = await response.json();
        const data = {
          labels: result.map((item) => item.titulo),
          datasets: [
            {
              label: "Likes",
              data: result.map((item) => item.likes),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return chartData ? (
    <div className="w-full h-[300px]">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "rgb(0, 0, 0)", 
              },
            },
          },
        }}
      />
    </div>
  ) : null;
};
