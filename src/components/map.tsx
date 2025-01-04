import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup, LatLngBounds } from 'leaflet';
import { useMap } from '@/hooks';
import { MarkersIcons } from '@/constants';
import 'leaflet/dist/leaflet.css';
import type { CityMap, OfferType, PointMap } from '@/types';

type Props = {
  city: CityMap;
  points: PointMap[];
  selectedPoint?: OfferType['id'];
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkersIcons.URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkersIcons.URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ city, points, selectedPoint }: Props) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayerRef = useRef(layerGroup());
  const markersRef = useRef<{ marker: Marker; id: OfferType['id'] }[]>([]);
  const lastSelectedPoint = useRef<{
    id: OfferType['id'];
    arrayIndex: number;
  }>();

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!markersRef.current.length) {
      points.forEach(({ latitude, longitude, id }, i) => {
        const marker = new Marker({ lat: latitude, lng: longitude })
          .setIcon(defaultCustomIcon)
          .addTo(markerLayerRef.current);
        marker.getElement()?.style.setProperty('z-index', `${i + 1}`);
        markersRef.current.push({ marker, id });
      });

      markerLayerRef.current.addTo(map);
    }

    const bounds = new LatLngBounds(
      points.map(({ latitude, longitude }) => [latitude, longitude])
    );
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      markerLayerRef.current.clearLayers();
      markersRef.current = [];
    };
  }, [map, points.length]);

  useEffect(() => {
    if (!map || !markersRef.current.length) {
      return;
    }

    if (lastSelectedPoint.current && !selectedPoint) {
      markersRef.current
        .find(({ id }) => id === lastSelectedPoint.current!.id)
        ?.marker?.setIcon(defaultCustomIcon);
      markersRef.current[lastSelectedPoint.current.arrayIndex].marker
        .getElement()
        ?.style.setProperty(
          'z-index',
          `${lastSelectedPoint.current.arrayIndex + 1}`
        );
      lastSelectedPoint.current = undefined;
    } else if (
      selectedPoint &&
      lastSelectedPoint.current &&
      selectedPoint !== lastSelectedPoint.current.id
    ) {
      markersRef.current
        .find(({ id }) => id === lastSelectedPoint.current?.id)
        ?.marker?.setIcon(defaultCustomIcon);
      markersRef.current[lastSelectedPoint.current.arrayIndex].marker
        .getElement()
        ?.style.setProperty(
          'z-index',
          `${lastSelectedPoint.current.arrayIndex + 1}`
        );
      const arrayIndex = markersRef.current.findIndex(
        ({ id }) => id === selectedPoint
      );
      markersRef.current[arrayIndex].marker.setIcon(currentCustomIcon);
      markersRef.current[arrayIndex].marker
        .getElement()
        ?.style.setProperty('z-index', '1000');
      lastSelectedPoint.current = { id: selectedPoint, arrayIndex };
    } else if (selectedPoint) {
      const arrayIndex = markersRef.current.findIndex(
        ({ id }) => id === selectedPoint
      );
      if (arrayIndex !== -1) {
        markersRef.current[arrayIndex].marker.setIcon(currentCustomIcon);
        markersRef.current[arrayIndex].marker
          .getElement()
          ?.style.setProperty('z-index', '1000');
        lastSelectedPoint.current = { id: selectedPoint, arrayIndex };
      } else {
        lastSelectedPoint.current = undefined;
      }
    } else {
      lastSelectedPoint.current = undefined;
    }
  }, [map, selectedPoint, markersRef.current.length]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
