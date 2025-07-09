import { getDistance } from 'geolib';

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  try {
    const distanceInMeters = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );
    // メートルをキロメートルに変換し、小数点以下1桁で丸める
    return Math.round((distanceInMeters / 1000) * 10) / 10;
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
};
