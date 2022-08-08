<script>
  import wiki from 'wikipedia'
  import Menu from '../components/Menu.svelte'
  import SearchResult from '../components/SearchResult.svelte'
  import { sourceLang, targetLang } from '../stores'
  import { orderLinksByRelevancy } from '../utils/orderLinksByRelevancy'
  import { DISAMBIGUATION_CATEGORY } from '../constants'

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

    let page

    try {
      page = await wiki.page(query)
    } catch (e) {
      const errorMessage = `No page found in Wikipedia for "${query}" in ${$sourceLang.name}. Please check your spelling, try a different word, or use a different source language.`

      error = errorMessage
      console.error(errorMessage)
      loading = false
      return
    }


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

<section id="results">
  {#if loading}
    <h2>Loading...</h2>
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
</section>

<Menu on:search={search} />

<style>
  #results {
    padding: 0.5rem;
  }
</style>
