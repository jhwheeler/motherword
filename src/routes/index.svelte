<script>
  import Translate from '../components/Translate.svelte'
  import LanguagePicker from '../components/LanguagePicker.svelte'
  import { languagePickerVisible } from '../stores'
  import '../app.css'

</script>

<header>
  <h1>MotherWord</h1>
</header>

{#if $languagePickerVisible}
  <LanguagePicker />
{:else}
  <Translate />
{/if}



<style>
  header {
    background-color: #3E7ED6;
    text-align: center;
    padding: 1rem 0;
  }

  h1 {
    color: #F2FFFB;
    margin: 0;
  }
</style>
