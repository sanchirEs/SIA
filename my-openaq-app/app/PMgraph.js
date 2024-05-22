// Graph.js
'use client'
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { fetchAirQualityData } from './openaq';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AirQualityGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAirQualityData();
        console.log('Fetched data:', data); // Debugging log
        const formattedData = formatChartData(data);
        console.log('Formatted data:', formattedData); // Debugging log
        setChartData(formattedData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatChartData = (data) => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Filter out invalid data points
    const filteredData = data.filter(entry => entry.value >= 0 && entry.value <= 500); // Adjust the upper limit as needed

    const labels = filteredData.map((entry) => new Date(entry.date.utc).toLocaleDateString());
    const values = filteredData.map((entry) => entry.value);

    return {
      labels,
      datasets: [
        {
          label: 'PM2.5 Levels',
          data: values,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {chartData && chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default AirQualityGraph;
