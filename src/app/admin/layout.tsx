import Nav from "../components/Nav"
export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav/>
      <div className="container my-6">{children}</div>
    </>
  )
}