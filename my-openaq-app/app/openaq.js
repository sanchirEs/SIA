// lib/openaq.js
import axios from 'axios';

export const fetchAirQualityData = async () => {
  const locationId = '8160'; // US Diplomatic Post: Ulaanbaatar
  const dateFrom = '2022-05-14';
  const dateTo = '2024-05-14';
  const limit = 10000;

  const url = `https://api.openaq.org/v2/measurements?location_id=${locationId}&date_from=${dateFrom}&date_to=${dateTo}&limit=${limit}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.results) {
      return response.data.results;
    } else {
      throw new Error('No data found');
    }
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};
