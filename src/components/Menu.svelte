<script>
  import LanguageSelectButton from './LanguageSelectButton.svelte'
  import { sourceLang, targetLang } from '../stores'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let query

  function switchLanguage() {
    const newSource = $targetLang
    const newTarget = $sourceLang

    sourceLang.set(newSource)
    targetLang.set(newTarget)
  }

</script>

<div class="bottom-menu">
  <form on:submit|preventDefault={() => dispatch('search', query)} class="input-wrapper">
    <input
      type="text"
      bind:value={query}
      placeholder="Translate a word..."
      class="search"
    >
    <button type="submit" class="button">
      <img src="/images/search.svg" alt="search icon" />
    </button>
  </form>

  <div class="language-select">
    <LanguageSelectButton language={$sourceLang} />

    <div class="switch button" on:click={switchLanguage}>
      <img src="/images/flip.svg" alt="switch language" />
    </div>

    <LanguageSelectButton language={$targetLang} />
  </div>
</div>

<style>
  .bottom-menu {
    position: fixed;
    padding: 0 0.5rem;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .language-select .button {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
    justify-content: space-between;
    display: flex;
    height: 2rem;
    padding: 0.25rem 0.5rem;
  }

  .switch {
    width: 2rem;
    height: 2rem;
    background-size: 2rem;
    padding: 0;
  }

  .input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .input-wrapper .search {
    flex: 1;
    background-color: #CCC;
    height: 1.5rem;
    font-size: 2rem;
    padding: 1rem 1.25rem;
    border: 0;
  }

  .input-wrapper .enter {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
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
