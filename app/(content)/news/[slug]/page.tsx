import { DUMMY_NEWS } from '@/dummy-news'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsItem = DUMMY_NEWS.find(item => item.slug === slug)

  if (!newsItem) notFound()

  return (
    <main id="news">
      <article className="news-article">
        <header>
          <Link href={`/news/${newsItem.slug}/image`}>
            <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={112} height={112}/>
          </Link>
          <h1>{newsItem.title}</h1>
          <time dateTime={newsItem.date}>{newsItem.date}</time>
        </header>
        <p>{newsItem.content}</p>
      </article>
    </main>
  )
}
