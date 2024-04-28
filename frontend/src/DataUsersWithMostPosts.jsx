import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';


export const DataUsersWithMostPosts = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/usersWithMostPosts');
        const result = await response.json();
        const data = {
          labels: Object.keys(result),
          datasets: [
            {
              label: 'Cantidad de posts',
              data: Object.values(result),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return chartData ? (
    <div className="w-full h-[300px]">
      <Bar
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
          scales: {
            x: {
              ticks: {
                color: "rgb(0, 0, 0)",
              },
            },
            y: {
              ticks: {
                color: "rgb(0, 0, 0)",
              },
            },
          },
        }}
      />
    </div>
  ) : null;
};