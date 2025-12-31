import type { Activity } from "../types/polymarket";

export const getActivityByUser = async (user: string): Promise<{data: Activity[] | null, status: 'ok' | 'error', message?: string }> => {
  // Get API URL from environment variable or use default
  const apiBaseUrl = import.meta.env.POLYMARKET_DATA_API || 'https://data-api.polymarket.com';
  const limit = 100;
  const MAX_RECORDS = 1000;
  let offset = 0;
  const allActivities: Activity[] = [];

  try {
    // Fetch pages of data up to MAX_RECORDS
    while (allActivities.length < MAX_RECORDS) {
      const apiUrl = new URL(`${apiBaseUrl}/activity`);

      // Add query parameters to the API URL
      if (user) {
        apiUrl.searchParams.set('user', user);
      }

      // Calculate how many records we still need
      const remainingRecords = MAX_RECORDS - allActivities.length;
      const currentLimit = Math.min(limit, remainingRecords);

      apiUrl.searchParams.set('limit', currentLimit.toString());
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

      // Add this page's data to the collection (only up to MAX_RECORDS)
      const recordsToAdd = Math.min(pageData.length, remainingRecords);
      allActivities.push(...pageData.slice(0, recordsToAdd));

      // If we've reached the maximum or got less than the limit, we're done
      if (allActivities.length >= MAX_RECORDS || pageData.length < limit) {
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