// Extending Svelte's writable store with persistent indexedDB storage

import { browser } from '$app/env'
import { clear, del, get, set } from 'idb-keyval'
import { get as getStore, writable } from 'svelte/store'

const isIndexedDBAvailable = () => browser && 'indexedDB' in window

const setValue = (key, value) => isIndexedDBAvailable() && set(key, value)

const getValue = async key => (isIndexedDBAvailable() ? get(key) : undefined)

// Clears database
export const clearStorage = clear

// Use as a replacement for writable store -- but provide a unique key
export function storable(key, initialValue) {
  const store = writable(initialValue)

  const setStore = value => {
    setValue(key, value)
    return store.set(value)
  }

  // Get initial value from database
  getValue(key).then(val => {
    store.set(val || initialValue)
  })

  return {
    clear: () => del(key),
    set: setStore,
    subscribe: store.subscribe,
    update: fn => setStore(fn(getStore(store))),
  }
}
