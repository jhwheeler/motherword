<script>
  import { languagePickerVisible, sourceLang, targetLang } from '../stores'
  import languages from '../languages.json'
  import LanguageSelectButton from './LanguageSelectButton.svelte'
  import { LANGUAGE_TYPE } from '../constants';

  let query

  function setLanguage (language) {
    $languagePickerVisible === LANGUAGE_TYPE.SOURCE 
      ? sourceLang.set(language) 
      : targetLang.set(language)
    
    // close language picker
    languagePickerVisible.set(null)
  }

  function filterLanguages(text) {
    if (!text) return languages

    return languages.filter(language => {
      const searchableTerms = Object.values(language).map(v => v.toLocaleLowerCase()).join('|')
      return searchableTerms.includes(text)
    })
  }

  $: filteredLanguages = filterLanguages(query)

</script>

<div id="language-picker">
  <h2>Choose a {$languagePickerVisible} language:</h2>

  <input
    type="text"
    bind:value={query}
    placeholder="Search"
    class="search"
  >

  <div class="language-list">
    <ul>
      {#each filteredLanguages as language}
        <li>
          <LanguageSelectButton 
            {language} 
            showAutonym
            on:click={() => setLanguage(language)}
          />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  #language-picker {
    padding: 0.5rem;
  }

.language-list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0;
}

ul {
    padding: 0;
    list-style-type: none;
}

li {
    padding: 0.25rem 0.5rem;
}

</style>
