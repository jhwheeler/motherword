<script>
  import wiki from 'wikipedia'

  const DEFAULT_SOURCE_LANGUAGE = 'en'
  const DEFAULT_TARGET_LANGUAGE = 'sv'

  let query = ''
  let sourceLang = DEFAULT_SOURCE_LANGUAGE
  let targetLang = DEFAULT_TARGET_LANGUAGE

  async function search () {
    const pageOptions = {
      redirect: false,
      autoSuggest: true,
    }

    wiki.setLang(sourceLang)

    const page = await wiki.page(query);

    const categories = await page.categories(pageOptions);
    const langLinks = await page.langLinks(pageOptions);
    const links = await page.links();

    console.log('page', page)
    console.log('categories', categories)

    const [result] = langLinks.filter(link => link.lang === targetLang)

    if (!result) {
      const errorMessage = `No translation found in Wikipedia for ${targetLang}`

      console.log(errorMessage)
      console.log('langLinks', langLinks)
      console.log('links', links)

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
