import { DUMMY_NEWS } from '@/dummy-news'
import { NewsList } from '@/components/news-list'

export default function NewsPage() {
  return (
    <main id="news">
      <h1>News Page</h1>

      <NewsList news={DUMMY_NEWS}/>
    </main>
  )
}
