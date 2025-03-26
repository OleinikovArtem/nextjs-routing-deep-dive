import { notFound } from 'next/navigation'
import { DUMMY_NEWS } from '@/dummy-news'
import { ModalBackdrop } from '@/components/modal-backdrop'

export default async function InterceptedImagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsItem = DUMMY_NEWS.find(item => item.slug === slug)

  if (!newsItem) notFound()

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
        </div>
      </dialog>
    </>
  )
}
