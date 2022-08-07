<script>
  import LanguageSelectButton from './LanguageSelectButton.svelte'
  import { sourceLang, targetLang } from '../stores'

  function switchLanguage() {
    const newSource = $targetLang
    const newTarget = $sourceLang

    sourceLang.set(newSource)
    targetLang.set(newTarget)
  }

</script>

<div class="bottom-menu">
  <div class="input-wrapper">
    <input type="text" class="search" placeholder="Translate a word...">
    <div class="enter button"></div>
  </div>

  <div class="language-select">
    <LanguageSelectButton language={$sourceLang} />

    <div class="switch button" on:click={switchLanguage}></div>

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

  .bottom-menu .language-select .button {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
    justify-content: space-between;
    display: flex;
    height: 2rem;
    padding: 0.25rem 0.5rem;
  }

  .bottom-menu .switch {
    width: 2rem;
    height: 2rem;
    background-size: 2rem;
    padding: 0;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('../static/images/flip.svg');
  }

  .bottom-menu .input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .bottom-menu .input-wrapper .search {
    flex: 1;
    background-color: #CCC;
    height: 1.5rem;
    font-size: 2rem;
    padding: 1rem 1.25rem;
    border: 0;
  }

  .bottom-menu .input-wrapper .enter {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    background-image: url('../static/images/search.svg');
    background-size: 2rem;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .bottom-menu .language-select {
    flex: 1;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 2rem;
    gap: 0.5rem;
    display: flex;
    line-height: 2rem;
    vertical-align: middle;
  }

  .bottom-menu.language-select .language-choice {
    flex: 1;
    height: 2rem;
    line-height: 3rem;
    padding: 0.25rem 0.5rem;
  }
</style>
