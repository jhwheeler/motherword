function determineRelevancy({ link, query }) {
	/* 3 levels of relevancy:
	 *   a) qualified match: the query itself, plus a qualifier in parentheses, i.e. of the form `{query} ({qualifier})`
	 *   b) close match: includes the query itself, but not of the form `{query} ({qualifier})`
	 *   c) other: anything else
	 *
	 * For example, for the query 'table':
	 *   a) 'Table (furniture)'
	 *   b) 'Mathematical table'
	 *   c) 'Al-Maidah'
	 */

	const relevancyLevels = {
		qualifiedMatch: new RegExp(`^${query}` + ' \(.*\)', 'i').test(link),
		closeMatch: link.includes(query),
	}

	if (relevancyLevels.qualifiedMatch) return 1
	if (relevancyLevels.closeMatch) return 0
	return -1
}

export async function orderLinksByRelevancy({ page, query, lang }) {
	const links = await page.links()

	const linksWithRelevancies = links.reduce((relevancyMap, link) => {
		const relevancy = determineRelevancy({ link, query })

		relevancyMap[link] = relevancy
		return relevancyMap
	}, {})

	return Object.keys(linksWithRelevancies)
	.sort((a, b) => -(linksWithRelevancies[a] - linksWithRelevancies[b]))
}

