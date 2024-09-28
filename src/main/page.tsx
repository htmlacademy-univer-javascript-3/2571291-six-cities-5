// Я знаю что делаю и я знаю что это плохо
// TODO убрать отключение правила
/* eslint-disable react/jsx-key */

import React from 'react';
import Card from './Card';
import Header from '../components/Header';
import { SortingForm } from './SortingForm';

export default function Main() {
  const cards = [
    <Card
      price={120}
      title="Beautiful & luxurious apartment at great location"
      type="Apartment"
      mark
      imageSrc="img/apartment-01.jpg"
    />,
    <Card
      price={80}
      title="Wood and stone place"
      type="Room"
      imageSrc="img/room.jpg"
    />,
    <Card
      price={132}
      title="Canal View Prinsengracht"
      type="Apartment"
      imageSrc="img/apartment-02.jpg"
    />,
    <Card
      price={180}
      title="Nice, cozy, warm big bed apartment"
      type="Apartment"
      mark
      imageSrc="img/apartment-03.jpg"
    />,
    <Card
      price={80}
      title="Wood and stone place"
      type="Room"
      imageSrc="img/room.jpg"
    />,
  ];

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <SortingForm />
              <div className="cities__places-list places__list tabs__content">
                {Array.from({ length: 312 }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={`place-card-${i}`}>
                    {cards[i % cards.length]}
                  </React.Fragment>
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
