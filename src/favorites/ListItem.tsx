export function ListItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{title}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">{children}</div>
    </li>
  );
}
