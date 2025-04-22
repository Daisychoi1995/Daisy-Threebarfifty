export const dynamic = 'force-dynamic'
export const revalidate = 60 // Set revalidation time (optional, in seconds)
import { MenuItem } from '@/app/models/Model'
import MenuItemListComponent from '@/components/MenuItemListComponent'
import Link from 'next/link'

type PageProps = {
  params: { id: string }
}

async function getMenuItem(id: number): Promise<MenuItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/${id}`)
      if (!res.ok) {
        throw new Error('Failed to fetch menu items')
      }
      const data = await res.json()
      return data
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return null
  }
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params
  if (!id) return <p>Item does not exist.</p>
  
  const menuItem = await getMenuItem(+id)
  if (!menuItem) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load menu item</p>
        <Link
          href="/menu"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Return to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/menu" className="hover:text-gray-600">
          All products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">{menuItem.name}</span>
      </nav>
      <MenuItemListComponent menuItem={menuItem} id={+id} />
    </div>
  )
}

export default Page

// export async function generateStaticParams() {
//   try {
//     const res = await fetch('/api/menu', { method: "GET" })
//     if(!res.ok) return []
//     const result = res.json()
    
//   } catch (error) {
//     console.error('Error generating static params:', error)
//     return []
//   }
// }
