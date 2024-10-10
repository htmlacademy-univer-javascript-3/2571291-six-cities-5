export function SortingFormListItem({
  item,
  onClick,
  activeOption,
}: {
  item: string;
  onClick: (item: string) => void;
  activeOption: string;
}) {
  return (
    <li
      className={`places__option ${
        activeOption === item ? 'places__option--active' : ''
      }`}
      tabIndex={0}
      onClick={() => onClick(item)}
    >
      {item}
    </li>
  );
}
