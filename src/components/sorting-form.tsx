import { setFilteredOffersAction } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState, useCallback, useEffect } from 'react';
import { SortingOptions } from '@/constants';

export function SortingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<
    ValueOf<typeof SortingOptions>
  >(SortingOptions.Popular);
  const handleOptionClick = useCallback(
    (option: ValueOf<typeof SortingOptions>) => {
      setActiveOption(option);
      setIsOpen(false);
    },
    []
  );
  const {
    city: selectedCity,
    offers,
    isOffersLoading,
  } = useAppSelector((state) => state.offersReducer);
  const dispatch = useAppDispatch();

  useEffect(
    () => () => setActiveOption(SortingOptions.Popular),
    [selectedCity.name]
  );

  useEffect(() => {
    if (isOffersLoading) {
      return;
    }

    dispatch(
      setFilteredOffersAction(
        offers
          .filter((o) => o.city.name === selectedCity.name)
          .sort((a, b) => {
            switch (activeOption) {
              case SortingOptions.Popular:
                return 0;
              case SortingOptions.PriceLowToHigh:
                return a.price - b.price;
              case SortingOptions.PriceHighToLow:
                return b.price - a.price;
              case SortingOptions.TopRatedFirst:
                return b.rating - a.rating;
              default:
                return 0;
            }
          })
      )
    );

    // Так как React не может обрабатывать массивы, а если передать offers, то ререндер будет постоянным
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dispatch, activeOption, selectedCity.name, isOffersLoading]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {Object.values(SortingOptions).map((option) => (
          <li
            className={`places__option ${
              activeOption === option ? 'places__option--active' : ''
            }
            `}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
            key={option}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
