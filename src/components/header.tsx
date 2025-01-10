import { Routes } from '@/app';
import { logoutAction } from '@/store/api-actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthorizationStatus } from '@/store/types';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { authorizationStatus, userData } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          {authorizationStatus === AuthorizationStatus.Authorized ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={Routes.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userData?.email}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to="#"
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(logoutAction()).then(() =>
                        navigate(Routes.LOGIN)
                      );
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user" key="header__login">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="/login"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
