import { useState, useCallback } from 'react';
import { SortingFormListItem } from '@/components/sorting-form-list-item';

export function SortingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('Popular');
  const handleOptionClick = useCallback((option: string) => {
    setActiveOption(option);
    setIsOpen(false);
  }, []);

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
        <SortingFormListItem
          item="Popular"
          onClick={handleOptionClick}
          activeOption={activeOption}
        />
        <SortingFormListItem
          item="Price: low to high"
          onClick={handleOptionClick}
          activeOption={activeOption}
        />
        <SortingFormListItem
          item="Price: high to low"
          onClick={handleOptionClick}
          activeOption={activeOption}
        />
        <SortingFormListItem
          item="Top rated first"
          onClick={handleOptionClick}
          activeOption={activeOption}
        />
      </ul>
    </form>
  );
}
