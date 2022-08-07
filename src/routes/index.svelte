<script>
  import wiki from 'wikipedia'
  import { orderLinksByRelevancy } from '../utils/orderLinksByRelevancy'
  import Menu from '../components/Menu.svelte'
  import SearchResult from '../components/SearchResult.svelte'
  import { DISAMBIGUATION_CATEGORY } from '../constants'
  import { sourceLang, targetLang } from '../stores'
  import '../app.css'

  let query = ''
  let searchResult = null

  async function search (event) {
    const { detail: query } = event

    const pageOptions = {
      redirect: false,
      autoSuggest: true,
    }

    wiki.setLang($sourceLang.code)

    const page = await wiki.page(query)

    const categories = await page.categories(pageOptions)

    if (categories.includes(DISAMBIGUATION_CATEGORY)) {
      console.log('disambiguation page')

      const disambiguationLinks = await orderLinksByRelevancy(page, query)
      console.log('disambiguationLinks', disambiguationLinks)
      return disambiguationLinks
    }

    const langLinks = await page.langLinks(pageOptions)

    const [result] = langLinks.filter(link => link.lang === $targetLang.code)

    if (!result) {
      const errorMessage = `No translation found in Wikipedia for ${$targetLang.name}`

      console.log(errorMessage)
      console.log('langLinks', langLinks)

      searchResult = errorMessage
      return
    }

    console.log('result', result)
    searchResult = result
  }

</script>

<h1>MotherWord</h1>

{#if searchResult}
  <h2>Results</h2>

  <SearchResult {searchResult} />

{/if}

<Menu on:search={search} />
