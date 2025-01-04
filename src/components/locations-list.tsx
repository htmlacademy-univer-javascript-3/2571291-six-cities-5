import { CityLocations } from '@/constants';
import { changeCityAction } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function LocationsList() {
  const activeCity = useAppSelector((state) => state.cityReducer.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {Object.values(CityLocations).map((city) => (
        <li className="locations__item" key={city.title}>
          <a
            className={`locations__item-link tabs__item ${
              city.title === activeCity.title ? 'tabs__item--active' : ''
            }`}
            href="#"
            onClick={() => dispatch(changeCityAction(city))}
          >
            <span>{city.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default LocationsList;
