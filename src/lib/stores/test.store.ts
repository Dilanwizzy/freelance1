import { get, writable } from 'svelte/store';

export let user = writable<string>();

export const setUser = (value: string) => {
  user.set(value);
};

export const getSavedUser = () => {
  return get(user);
};

export const resetSavedUser = () => {
  user = writable<string>();
};