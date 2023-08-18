import React, {FC, memo, useRef} from 'react';
import {Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styled from 'styled-components/native';
import {COLORS, SIZE} from '~/constants';
import Config from 'react-native-config';
import {CoordinateModel, RegionModel} from '~/models';

const StyledMap = styled(MapView)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
`;

type RegionProps = {
  region?: RegionModel;
  coordinates: CoordinateModel[];
};

const Map: FC<RegionProps> = props => {
  const {coordinates, region} = props;
  const mapRef = useRef<any>();

  return (
    <>
      <StyledMap ref={mapRef} provider={PROVIDER_GOOGLE} region={region}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={Config.GOOGLE_API_KEY}
          strokeWidth={SIZE.SIZE_10}
          strokeColor={COLORS.blue}
          lineDashPattern={Platform.OS === 'ios' ? [500, 500] : undefined} // Only support for iOS
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </StyledMap>
    </>
  );
};

export default memo(Map);
