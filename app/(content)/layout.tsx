import { MainHeader } from '@/components/main-header'

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="page">
      <MainHeader/>
      {children}
    </div>
  )
}
