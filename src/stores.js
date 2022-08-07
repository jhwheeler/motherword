import { writable } from 'svelte/store'
import { DEFAULT_SOURCE_LANGUAGE, DEFAULT_TARGET_LANGUAGE } from './constants.js'

export const sourceLang = writable(DEFAULT_SOURCE_LANGUAGE) 
export const targetLang = writable(DEFAULT_TARGET_LANGUAGE) 
