<script>
  import { languagePickerVisible } from '../stores'

  export let language

  const showLanguagePicker = () => languagePickerVisible.set(true)

</script>

<button on:click={showLanguagePicker}>
  <div class="language-choice">
    <div class="code">{language.code}</div>
    <div class="name">{language.name}</div>
  </div>
  <div class="search"></div>
</button>


<style>
  .language-choice {
    display: flex;
    flex: 1;
    align-items: center;
    height: 2rem;
    line-height: 3rem;
    padding: 0.25rem 0.5rem;
  }
</style>
