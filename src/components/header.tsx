import { Routes } from '@/app';
import { useUser } from '@/providers/user-provider';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({
  authenticated = true,
  navItems = [],
}: {
  authenticated?: boolean;
  navItems?: React.ReactNode[];
}) {
  const { user, updateUser } = useUser();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={Routes.MAIN}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {authenticated ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={Routes.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {user?.email || 'Oliver.conner@gmail.com'}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={Routes.LOGIN}
                    onClick={() => updateUser(undefined)}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            navItems.length !== 0 && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {navItems.map((item) => item)}
                </ul>
              </nav>
            )
          )}
        </div>
      </div>
    </header>
  );
}
