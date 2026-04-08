export const fetchData = async (url: string, options?: { page?: number; headers?: Record<string, string> }) => {
  try {
    const { page = 1, headers = "" } = options ?? {};
    const response = await fetch(`${url}&page=${page}`, 
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};