'use client'

import { auth } from '@/lib/firebase/config'
import { MenuItem } from '../models/Model'
import useCart from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Menu = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/menu')
      if (!res.ok) {
        throw new Error('Failed to fetch menu items')
      }
      const data = await res.json()
      return data
    } catch (err) {
      console.error('Error fetching menu items:', err)
      setError(err instanceof Error ? err.message : 'Failed to load menu items')
      return []
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItems()
      .then((data) => setMenuItems(data))
      .catch((err) => {
        console.error(err)
        setError('Failed to load menu items')
      })
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to delete')
      }
      const data = await fetchMenuItems()
      setMenuItems(data)
    } catch (error) {
      console.error('Error deleting menu item', error)
    }
  }

  const handleClick = (id: number) => {
    if (!id) {
      console.error('Item ID is missing')
      return
    }
    try {
      router.push(`/menu/${id}`)
    } catch (error) {
      console.error('Error loading menu item', error)
    }
  }

  const addItemToCart = useCart((state) => state.addItemToCart)
  return (
    <div className="p-4">
      {error && (
        <div className="text-red-500 text-center mb-4 font-semibold">
          {error}
        </div>
      )}
      {loading ? (
        <div className="text-center">Loading menu items...</div>
      ) : (
        <>
          <p className="text-[20px] text-[#009B64] font-bold">
            {menuItems.length} products
          </p>
          <p className="flex text-[20px] text-red-500 font-bold cursor-pointer justify-center">
            {user && <Link href="/menu/admin">Upload Menu</Link>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {menuItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-lg">
                <div className="relative w-full h-[300px]">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                    onClick={() => handleClick(item.id)}
                  />
                </div>
                <h2
                  className="text-lg font-semibold mt-2 cursor-pointer"
                  onClick={() => handleClick(item.id)}
                >
                  {item.name}
                </h2>
                <p className="text-[#009B64] font-bold mt-1 ">${item.price}</p>
                <div className="flex place-content-between">
                  <button
                    onClick={() =>
                      addItemToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageUrl,
                        quantity: 1,
                      })
                    }
                    className="cursor-pointer border-2 border-[#009B64] bg-[#009B64] text-white py-3 px-6 rounded-full font-semibold text-[15px] transition-all duration-300 ease-in-out hover:bg-white hover:text-[#009B64] hover:border-[#007a48] transform hover:scale-105"
                  >
                    ADD TO CART
                  </button>

                  {user && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-[20px] text-red-500 font-bold cursor-pointer"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Menu
