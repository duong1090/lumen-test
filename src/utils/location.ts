import {CoordinateModel} from '~/models';

const OFFSET = 0.005;

export const getRegionForCoordinates = (
  points: CoordinateModel[],
  xOffset: number = 0,
) => {
  let minX: number, maxX: number, minY: number, maxY: number;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude) - OFFSET - xOffset;
    maxX = Math.max(maxX, point.latitude) + OFFSET - xOffset;
    minY = Math.min(minY, point.longitude) - OFFSET;
    maxY = Math.max(maxY, point.longitude) + OFFSET;
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
};
