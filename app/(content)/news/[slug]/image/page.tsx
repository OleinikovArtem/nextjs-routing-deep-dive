import { notFound } from 'next/navigation'
import { DUMMY_NEWS } from '@/dummy-news'

export default async function ImagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsItem = DUMMY_NEWS.find(item => item.slug === slug)

  if (!newsItem) notFound()

  return (
    <div className='fullscreen-image'>
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  )
}
