import { writable } from "svelte/store";
import { browser } from "$app/environment";

export function createLocalStorageStore(localStorageKey: string, defaultValue: string = "") {
  const valueFromStore = browser && localStorage.getItem(localStorageKey);

  const { subscribe, set } = writable(valueFromStore || defaultValue, (set) => {
    const updateFromLocalStorage = () => {
      if (browser) {
        const newValue = localStorage.getItem(localStorageKey);
        set(newValue || defaultValue);
      }
    };
    updateFromLocalStorage();
    const interval = setInterval(updateFromLocalStorage, 5_000);
    return () => clearInterval(interval);
  });


  const setNewValue = (newValue: string) => {
    localStorage.setItem(localStorageKey, newValue);
    set(newValue);
  };

  return {
    subscribe,
    set: setNewValue,
  };
}
