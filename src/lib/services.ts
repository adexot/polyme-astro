import type { Activity } from "../types/polymarket";

export const getActivityByUser = async (user: string): Promise<{data: Activity[] | null, status: 'ok' | 'error', message?: string }> => {
    // const response = await fetch(`${import.meta.env.POLYMARKET_DATA_API}/activity/${user}`);
    // const activityData: Activity[] = await response.json();
    // return activityData;


    // 

    // Extract query parameters from the request URL
  const limit = '500';
  const offset = '0';

  // Get API URL from environment variable or use default
  const apiBaseUrl = import.meta.env.POLYMARKET_DATA_API || 'https://data-api.polymarket.com';
  const apiUrl = new URL(`${apiBaseUrl}/activity`);

  // Add query parameters to the API URL
  if (user) {
    apiUrl.searchParams.set('user', user);
  }

  apiUrl.searchParams.set('limit', limit);
  apiUrl.searchParams.set('offset', offset);

  try {
    // Fetch data from the Polymarket Data API
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {data: null, status: 'error', message: `API request failed with status ${response.status}`};
    }

    const data = await response.json();

    return {data, status: 'ok'};
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { 
        status: 'error',
        message: errorMessage,
        data: null,
      };
  }
};