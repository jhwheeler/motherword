<script>
  import { languagePickerVisible, sourceLang, targetLang } from '../stores'
  import languages from '../languages.json'
  import LanguageSelectButton from './LanguageSelectButton.svelte'
  import { LANGUAGE_TYPE } from '../constants';

  function setLanguage (language) {
    $languagePickerVisible === LANGUAGE_TYPE.SOURCE 
      ? sourceLang.set(language) 
      : targetLang.set(language)
    
    // close language picker
    languagePickerVisible.set(null)
  }

</script>

<div id="language-picker">
  <h2>Choose a {$languagePickerVisible} language:</h2>

  {#each languages as language}
    <LanguageSelectButton 
      {language} 
      showAutonym
      on:click={() => setLanguage(language)}
    />
  {/each}
</div>

<style>
  #language-picker {
    padding: 0.5rem;
  }
</style>
