<script>
  import LanguageSelectButton from './LanguageSelectButton.svelte'
  import { languagePickerVisible, sourceLang, targetLang } from '../stores'
  import { LANGUAGE_TYPE } from '../constants'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let query

  function flipLanguages() {
    const newSource = $targetLang
    const newTarget = $sourceLang

    sourceLang.set(newSource)
    targetLang.set(newTarget)
  }

</script>

<div class="bottom-menu">
  <form
    on:submit|preventDefault={() => dispatch('search', query)}
    class="input-wrapper"
  >
    <input
      type="text"
      bind:value={query}
      placeholder="Translate a word..."
      class="search"
    >
  </form>

  <div class="language-select">
    <LanguageSelectButton 
      language={$sourceLang} 
      on:click={() => languagePickerVisible.set(LANGUAGE_TYPE.SOURCE)}
    />

    <button class="flip" on:click={flipLanguages}>
      <img src="/images/flip.svg" alt="switch language" />
    </button>

    <LanguageSelectButton 
      language={$targetLang} 
      on:click={() => languagePickerVisible.set(LANGUAGE_TYPE.TARGET)}
    />
  </div>
</div>

<style>
  .bottom-menu {
    background-color: #50D4BC;
    position: fixed;
    padding: 0.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .flip {
    width: 3rem;
    height: 3rem;
    background-size: 2rem;
    padding: 0;
    flex: initial;
    justify-content: center;
  }

  .input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .language-select {
    flex: 1;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 2rem;
    gap: 0.5rem;
    display: flex;
    line-height: 2rem;
    vertical-align: middle;
  }

</style>
