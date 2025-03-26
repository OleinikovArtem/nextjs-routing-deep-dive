import { NewsList } from '@/components/news-list'
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news'
import Link from 'next/link'
import { NewsItem } from '@/types'

export default async function FilteredNewsPage({ params }: Readonly<{ params: Promise<{ filter: string[] }> }>) {
  const { filter } = await params
  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  const availableYears = await getAvailableNewsYears()
  const availableMonths = selectedYear ?  await getAvailableNewsMonths(selectedYear) : null

  let links = availableYears
  let news: NewsItem[] = [];

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear)
    links = await getAvailableNewsMonths(selectedYear)
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth)
    links = []
  }

  let newsContent = <p>No news found for the selected period.</p>

  if (news.length) {
    newsContent = <NewsList news={news}/>
  }

  if (
    selectedYear && !availableYears.includes(+selectedYear) ||
    selectedMonth && !availableMonths?.includes(+selectedMonth)
  ) {
    throw new Error('Invalid filter, please use a valid year and month')
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      { newsContent }
    </>
  )
}
