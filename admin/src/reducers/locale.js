const SET_LOCALE = 'locale/SET_LOCALE';

const initialState = {		  
	currentLocale: 'en'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return {
        currentLocale: action.locale
      };
    default:
      return state;
  }
}

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale
  }
}
