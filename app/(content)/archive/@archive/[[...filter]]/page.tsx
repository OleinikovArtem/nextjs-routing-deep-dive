import { NewsList } from '@/components/news-list'
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news'
import Link from 'next/link'
import { NewsItem } from '@/types'
import { Suspense } from 'react'

async function FilterHeader({ year, month }: { year: string; month: string; }) {

  const availableYears = await getAvailableNewsYears()
  const availableMonths = year ?  await getAvailableNewsMonths(year) : null

  let links = availableYears

  if (year && !month) {
    links = availableMonths || []
  }

  if (year && month) {
    links = []
  }

  if (
    year && !availableYears.includes(year) ||
    month && !availableMonths?.includes(month)
  ) {
    throw new Error('Invalid filter, please use a valid year and month')
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map(link => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

async function FilteredNews({ year, month }: { year: string; month: string; }) {
  let news: NewsItem[] = []

  if (year && !month) {
    news = await getNewsForYear(year)
  }

  if (year && month) {
    news = await getNewsForYearAndMonth(year, month)
  }

  let newsContent = <p>No news found for the selected period.</p>

  if (news.length) {
    newsContent = <NewsList news={news}/>
  }

  return newsContent
}

export default async function FilteredNewsPage({ params }: Readonly<{ params: Promise<{ filter: string[] }> }>) {
  const { filter } = await params
  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  return (
    <>
      <Suspense fallback={<div>Loading Filter...</div>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<div>Suspense Loading...</div>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  )
}
