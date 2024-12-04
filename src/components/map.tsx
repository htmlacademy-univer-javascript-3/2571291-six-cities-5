import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '@/hooks/use-map';
import { MarkersIcons } from '@/constants';
import 'leaflet/dist/leaflet.css';

type Props = {
  city: CityMap;
  points: PointMap[];
  selectedPoint?: Offer['id'];
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkersIcons.URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkersIcons.URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points, selectedPoint }: Props) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayerRef = useRef(layerGroup());
  const markersRef = useRef<{ marker: Marker; id: Offer['id'] }[]>([]);
  const lastSelectedPoint = useRef<{ id: Offer['id']; arrayIndex: number }>();

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!markersRef.current.length) {
      points.forEach(({ latitude, longitude, id }, i) => {
        const marker = new Marker({ lat: latitude, lng: longitude })
          .setIcon(
            selectedPoint && id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayerRef.current);
        marker.getElement()?.style.setProperty('z-index', `${i + 1}`);
        markersRef.current.push({ marker, id });
      });

      markerLayerRef.current.addTo(map);
    } else {
      markersRef.current.forEach(({ marker, id }) => {
        marker.setIcon(
          selectedPoint && id === selectedPoint
            ? currentCustomIcon
            : defaultCustomIcon
        );
      });
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

    return () => {
      markerLayerRef.current?.clearLayers();
      markersRef.current = [];
      lastSelectedPoint.current = undefined;
    };
  }, [map, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
