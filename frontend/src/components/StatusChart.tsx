import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatusChart() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
  }>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://localhost:3000/stats');
        const data = await response.json();
        const labels = Object.keys(data);
        const values = Object.values(data) as number[];

        setChartData({
          labels,
          datasets: [
            {
              label: 'Task Count by Status',
              data: values,
              backgroundColor: ['#3f51b5', '#f50057', '#ff9800', '#4caf50'],
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Task Status Distribution',
            },
          },
        }}
      />
    </div>
  );
}