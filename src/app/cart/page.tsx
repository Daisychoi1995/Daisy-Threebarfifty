'use client'
import CheckoutButton from '@/components/CheckoutButton'
import useCart from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/shallow'

const Cart = () => {
  // Use shallow to subscribe to specific parts of the store
  const {
    count,
    cart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
    clearCart,
  } = useCart(
    useShallow((state) => ({
      count: state.count,
      cart: state.cart,
      increaseItemQuantity: state.increaseItemQuantity,
      decreaseItemQuantity: state.decreaseItemQuantity,
      removeItemFromCart: state.removeItemFromCart,
      clearCart: state.clearCart,
    }))
  )
  const router = useRouter()
  const isCartEmpty = cart.length === 0

  const totalItem = count
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  return (
    <div className="px-4 md:px-16 py-6 flex flex-col lg:flex-row gap-8">
      {isCartEmpty && (
        <p className="flex flex-col w-7/10 text-[40px] text-[#009B64] items-center justify-center">Cart is empty.<br />  <Link className='text-[50px]'href='/menu'>Continue to Shopping</Link></p>
      )}
      {!isCartEmpty && (
        <div className="flex flex-col w-7/10">
          <div className="flex flex-row  place-content-between border-b-2 py-4 border-[#009B64]">
            <h1>My cart</h1>
            <p onClick={clearCart} className=' cursor-pointer'>Clear Cart</p>
            <p>
              <Link href="/menu">Continue shopping</Link>
            </p>
          </div>
          {cart.map((item) => (
            <div
              className="flex flex-row place-content-between align-middle border-b-2 py-6 border-[#009B64] items-center"
              key={item.id}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={150}
                height={150}
                onClick={() => {router.push(`/menu/${item.id}`)}}
                className=' cursor-pointer'
              />

              <div>
                <h1 onClick={() => {router.push(`/menu/${item.id}`)}} className=' cursor-pointer'>{item.name}</h1>
                <h2>${item.price}</h2>
              </div>

              <div className="flex flex-row items-center justify-between w-30 h-10 p-5 border-2 border-black text-[20px]">
                <p
                  onClick={() => decreaseItemQuantity(item.id)}
                  className="cursor-pointer"
                >
                  -
                </p>
                <h2>{item.quantity}</h2>
                <p
                  onClick={() => increaseItemQuantity(item)}
                  className="cursor-pointer"
                >
                  +
                </p>
              </div>
              <p>${item.price * item.quantity}</p>
              <button onClick={() => removeItemFromCart(item.id)} className=' cursor-pointer'>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="w-3/10 flex flex-col gap-4">
        <h1 className="border-b-2 py-4 border-[#009B64]">Order summary</h1>
        <h2>Total items: {totalItem}</h2>
        <h2>Total: ${totalPrice}</h2>
        <CheckoutButton />
      </div>
    </div>
  )
}

export default Cart
