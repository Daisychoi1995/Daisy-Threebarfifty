'use client'
import useCart from '@/stores/cartStore'
import { useShallow } from 'zustand/shallow'

type CartItem = {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}
type CartState = {
  count: number
  cart: CartItem[]
  increaseItemQuantity: (item: CartItem) => void
  decreaseItemQuantity: (id: number) => void
  removeItemFromCart: (id: number) => void
  addItemToCart: (item: CartItem) => void
  clearCart: () => void
}

const CheckoutButton = () => {
  const { cart, clearCart } = useCart(useShallow((state: CartState) => ({
    cart: state.cart,
    clearCart: state.clearCart
  })))
  // const router = useRouter()
  const handleCheckout = async () => {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost' : ''
    const res = await fetch(`${baseUrl}/api/checkout-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })
    const data = await res.json()
    
    if (data.url) {
      clearCart()
      window.location.href = data.url
    } else {
      // router.push('/cancel')
      alert('could`t proceed payment')
    }
  }
  return (
    <div>
      <button
        onClick={handleCheckout}
        className="cursor-pointer border-2 border-[#009B64] bg-[#009B64] text-white py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-[#009B64] hover:border-[#007a48] transform hover:scale-105"
      >
        CHECKOUT
      </button>
    </div>
  )
}

export default CheckoutButton
