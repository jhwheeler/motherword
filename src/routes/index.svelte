<script>
  import wiki from 'wikipedia'
  import { orderLinksByRelevancy } from '../utils/orderLinksByRelevancy'
  import Menu from '../components/Menu.svelte'
  import SearchResult from '../components/SearchResult.svelte'
  import { DISAMBIGUATION_CATEGORY } from '../constants'
  import { sourceLang, targetLang } from '../stores'
  import '../app.css'

  let searchResult
  let disambiguationLinks
  let loading = false
  let error

  function clear() {
    searchResult = null
    disambiguationLinks = null
    error = null
  }

  async function search (event) {
    clear()
    loading = true

    const { detail: query } = event

    const pageOptions = {
      redirect: false,
      autoSuggest: true,
    }

    wiki.setLang($sourceLang.code)

    const page = await wiki.page(query)

    const categories = await page.categories(pageOptions)

    if (categories.includes(DISAMBIGUATION_CATEGORY)) {
      disambiguationLinks = await orderLinksByRelevancy({ page, query, lang: $sourceLang.code })

      loading = false
      return
    }

    const langLinks = await page.langLinks(pageOptions)

    const [result] = langLinks.filter(link => link.lang === $targetLang.code)
    loading = false

    if (!result) {
      const errorMessage = `No translation found in Wikipedia for "${query}" in ${$targetLang.name}`

      error = errorMessage
      console.error(errorMessage)
      return
    }

    searchResult = result.title
  }
</script>

<header>
  <h1>MotherWord</h1>
</header>

{#if loading}
  Loading...
{/if}

{#if error}
  <p>{error}</p>
{/if}

{#if searchResult}
  <h2>Results</h2>

  <SearchResult {searchResult} lang={$targetLang.code} />
{/if}

{#if disambiguationLinks?.length}
  <p>Did you mean...?</p>

  {#each disambiguationLinks as link}
    <SearchResult
      searchResult={link}
      lang={$sourceLang.code}
      on:resetSearch={search}
      isDisambiguationLink
    />
  {/each}

{/if}

<Menu on:search={search} />

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
