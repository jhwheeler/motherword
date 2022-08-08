import { writable } from 'svelte/store'
import { storable } from './utils/storable.js'
import { DEFAULT_SOURCE_LANGUAGE, DEFAULT_TARGET_LANGUAGE } from './constants.js'

export const sourceLang = storable('motherword-sourceLang', DEFAULT_SOURCE_LANGUAGE)
export const targetLang = storable('motherword-targetLang', DEFAULT_TARGET_LANGUAGE)

export const languagePickerVisible = writable(null)
