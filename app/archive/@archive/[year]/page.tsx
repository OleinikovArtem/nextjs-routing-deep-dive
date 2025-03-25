
import { NewsList } from '@/components/news-list'
import { getNewsForYear } from '@/lib/news'

export default async function FilteredByYearNewsPage ({ params }: Readonly<{ params: Promise<{ year: string }> }>) {
  const { year } = await params
  const news = getNewsForYear(Number(year))
  return <NewsList news={news} />
}
