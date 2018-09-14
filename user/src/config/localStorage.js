import { setupCache } from 'axios-cache-adapter';

export const loadState = () => {
	try {
		const serializedState = sessionStorage.getItem('brono-state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		sessionStorage.setItem('brono-state', serializedState);
	} catch (err) {

	}
};

class CacheStore {
	constructor () {
		this.storeName
		this.store = localStorage;
	}

	getItem (key) {
		return Promise.resolve(JSON.parse(this.store.getItem(key)) || null)
	}

	setItem (key, value) {
		this.store.setItem(key, JSON.stringify(value));
		return Promise.resolve(value)
	}

	removeItem (key) {
		this.store.removeItem(key);
		return Promise.resolve()
	}

	clear () {
		this.store = {}
		return Promise.resolve()
	}

	length () {
		return Promise.resolve(size(this.store))
	}

	iterate (fn) {
		return Promise.all(
			map(this.store, (value, key) => fn(value, key))
		)
	}
}

export const bronoCache = setupCache({
	maxAge: 30 * 24 * 60 * 60 * 1000,  // 30days
	store: new CacheStore(),
	key: (req) => {
		return req.url + JSON.stringify(req.params);
	}
});
