import { NewsList } from '@/components/news-list'
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news'
import Link from 'next/link'
import { NewsItem } from '@/types'

export default async function FilteredNewsPage({ params }: Readonly<{ params: Promise<{ filter: string[] }> }>) {
  const { filter } = await params
  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  const availableYears = getAvailableNewsYears()

  let links = availableYears
  let news: NewsItem[] = [];

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear)
    links = getAvailableNewsMonths(selectedYear)
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth)
    links = []
  }

  let newsContent = <p>No news found for the selected period.</p>

  if (news.length) {
    newsContent = <NewsList news={news}/>
  }

  if (
    selectedYear && !availableYears.includes(+selectedYear) ||
    selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth)
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
