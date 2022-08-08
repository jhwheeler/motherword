<script>
  export let language
  export let showAutonym = false

</script>

<button on:click>
  <div class="code">{language.code}</div>
  <span class="name">{language.name}</span>

  {#if showAutonym && language.autonym}
    <span class="name">({language.autonym})</span>
  {/if}
</button>

<style>
  button {
    display: flex;
    flex: 1;
    align-items: center;
    height: fit-content;
    padding: 0.25rem 0.5rem;
    flex-direction: row;
    margin: 0;
    padding-right: 1rem;
    gap: 0.5rem;
    width: 100%;
  }

  button .code {
    width: 2rem;
    height: 2rem;
    background-color: blue;
    border-radius: 50%;
    padding: 0.25rem;
    text-align: center;
    color: white;
    font-size: 1rem;
    line-height: 2rem;
}

</style>
