<script>
  import wiki from 'wikipedia'
  import { orderLinksByRelevancy } from '../utils/orderLinksByRelevancy'

  const DEFAULT_SOURCE_LANGUAGE = 'en'
  const DEFAULT_TARGET_LANGUAGE = 'sv'
  const DISAMBIGUATION_CATEGORY = 'Category:All disambiguation pages'

  let query = ''
  let sourceLang = DEFAULT_SOURCE_LANGUAGE
  let targetLang = DEFAULT_TARGET_LANGUAGE

  async function search () {
    const pageOptions = {
      redirect: false,
      autoSuggest: true,
    }

    wiki.setLang(sourceLang)

    const page = await wiki.page(query)

    const categories = await page.categories(pageOptions)

    if (categories.includes(DISAMBIGUATION_CATEGORY)) {
      console.log('disambiguation page!')

      const disambiguationLinks = await orderLinksByRelevancy(page, query)
      console.log('disambiguationLinks', disambiguationLinks)
      return disambiguationLinks
    }

    const langLinks = await page.langLinks(pageOptions)

    const [result] = langLinks.filter(link => link.lang === targetLang)

    if (!result) {
      const errorMessage = `No translation found in Wikipedia for ${targetLang}`

      console.log(errorMessage)
      console.log('langLinks', langLinks)

      return errorMessage
    }

    console.log('result', result)
    return result
  }

</script>

<h1>MotherWord</h1>

<form on:submit|preventDefault={search}>
  <input bind:value={query}>
  <button type="submit">
    Search
  </button>
</form>

<p>Word: {query}</p>
