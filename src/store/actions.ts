import type { CityLocation, OfferType } from '@/types';
import { createAction } from '@reduxjs/toolkit';

const changeCityAction = createAction<CityLocation>('city/changeCity');
const fillOffersAction = createAction<OfferType[]>('city/fillOffers');

export { changeCityAction, fillOffersAction };
