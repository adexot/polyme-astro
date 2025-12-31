import type { Activity } from "../types/polymarket";

export const getActivityByUser = async (user: string): Promise<{data: Activity[] | null, status: 'ok' | 'error', message?: string }> => {
  // Get API URL from environment variable or use default
  const apiBaseUrl = import.meta.env.POLYMARKET_DATA_API || 'https://data-api.polymarket.com';
  const limit = 500;
  let offset = 0;
  const allActivities: Activity[] = [];

  try {
    // Fetch all pages of data
    while (true) {
      const apiUrl = new URL(`${apiBaseUrl}/activity`);

      // Add query parameters to the API URL
      if (user) {
        apiUrl.searchParams.set('user', user);
      }

      apiUrl.searchParams.set('limit', limit.toString());
      apiUrl.searchParams.set('offset', offset.toString());

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

      const pageData: Activity[] = await response.json();

      // If no data returned or less than limit, we've reached the end
      if (!pageData || pageData.length === 0) {
        break;
      }

      // Add this page's data to the collection
      allActivities.push(...pageData);

      // If we got less than the limit, we've reached the end
      if (pageData.length < limit) {
        break;
      }

      // Move to next page
      offset += limit;
    }

    return {data: allActivities, status: 'ok'};
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { 
        status: 'error',
        message: errorMessage,
        data: null,
      };
  }
};