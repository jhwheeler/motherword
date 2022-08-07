<script>
  export let searchResult

</script>

<div class="result">
  <a href={searchResult.url} target="_blank">
    <img src="/images/wikipedia.png" alt="wikipedia-logo" />
  </a>
  <p class="text">{searchResult.title}</p>
</div>

<style>
  .result {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    border-radius: 0.25rem;
    user-select: none;
    padding: 0 0.5rem;
  }

  a {
    text-decoration: none;
    height: 1.5rem;
    width: 1.5rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .result .text {
    font-size: 1.5rem;
    flex: 1;
    padding-left: 0.5rem;
  }
</style>
