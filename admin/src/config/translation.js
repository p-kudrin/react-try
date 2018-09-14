import React from 'react';
import counterpart from 'counterpart';
import {setLocale} from 'reducers/locale';
import Translate from 'react-translate-component';

const translations = {
  en: require('lang/en.json'),
  ru: require('lang/ru.json')
};

const locales = Object.keys(translations);

let currentLocale;
let savedLocale = localStorage.getItem('locale') || 'en';
const registerLocales = (store) => {
  locales.forEach(key => {
    counterpart.registerTranslations(key, translations[key]);
  });
  store.subscribe(() => {
    let previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      localStorage.setItem('locale', currentLocale);
      counterpart.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
  return savedLocale;
};

const monthLabels = [
    <Translate content="picker.label.jan" />,
	<Translate content="picker.label.feb" />,
	<Translate content="picker.label.mar" />,
	<Translate content="picker.label.apr" />,
	<Translate content="picker.label.may" />,
	<Translate content="picker.label.jun" />,
	<Translate content="picker.label.jul" />,
	<Translate content="picker.label.aug" />,
	<Translate content="picker.label.sep" />,
	<Translate content="picker.label.oct" />,
	<Translate content="picker.label.nov" />,
	<Translate content="picker.label.dec" />];

const dayLabels = [
	<Translate content="picker.label.sun" />,
   	<Translate content="picker.label.mon" />,
	<Translate content="picker.label.tue" />,
	<Translate content="picker.label.wed" />,
	<Translate content="picker.label.thu" />,
	<Translate content="picker.label.fri" />,
	<Translate content="picker.label.sat" />];

export {
  monthLabels,
  dayLabels,
  locales,
  registerLocales
}
