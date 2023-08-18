export type LocationModel = {
  name: string;
  address: string;
  lat: number;
  long: number;
};

export type CoordinateModel = {
  latitude: number;
  longitude: number;
};

export type RegionModel = CoordinateModel & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type JobModel = {
  name: string;
  cost: number;
  duration: string;
  from: LocationModel;
  to: LocationModel;
};
