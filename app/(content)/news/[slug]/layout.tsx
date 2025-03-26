export default function NewsDetailLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
