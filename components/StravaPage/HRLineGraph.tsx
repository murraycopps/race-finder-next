import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 4,
    scales: {
      y: {
        ticks: {
          // display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  
  export default function LineGraph({
    labels,
    data,
  }: {
    labels: string[];
    data: number[];
  }) {
    const mapData = {
      labels,
      datasets: [
        {
          data,
          borderColor: "rgb(239 68 68)",
          pointRadius: 0,
          borderWidth: 3,
        },
        
      ],
    };
    return <Line className="w-full h-full" options={options} data={mapData} />;
  }
  