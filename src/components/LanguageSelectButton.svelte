<script>
  export let language

</script>

<div class="button flex1">
  <div class="language-choice">
    <div class="code">{language.code}</div>
    <div class="name">{language.name}</div>
  </div>
  <div class="search"></div>
</div>


<style>
  .language-choice {
    flex: 1;
    height: 2rem;
    line-height: 3rem;
    padding: 0.25rem 0.5rem;
  }
</style>
