export const getLocationFromIp = async (
  ip: string
): Promise<{ longitude: number; latitude: number }> => {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  const data = await response.json();
  return {
    // country: data.country_name || 'Unknown',
    // city: data.city || 'Unknown',
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
  };
};
