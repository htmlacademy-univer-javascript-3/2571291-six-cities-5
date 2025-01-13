import { CityLocations } from '@/constants';
import { changeCityAction } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';

function LocationsList() {
  const activeCity = useAppSelector((state) => state.offersReducer.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {Object.values(CityLocations).map((city) => (
        <li className="locations__item" key={city.name}>
          <Link
            className={`locations__item-link tabs__item ${
              city.name === activeCity.name ? 'tabs__item--active' : ''
            }`}
            to="#"
            onClick={() => dispatch(changeCityAction(city))}
          >
            <span>{city.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationsList;
