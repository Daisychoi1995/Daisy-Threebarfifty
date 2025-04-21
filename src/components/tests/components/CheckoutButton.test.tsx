import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutButton from '@/components/CheckoutButton'
 
describe('CheckoutButton Component', () => {
  beforeEach(() => {
    //mock fetch
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        url: 'https://checkout.stripe.com/c/pay/mockedsessionid',
      }),
    })
    ) as unknown as typeof fetch

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    })
  })
  it('render CheckoutButton', () => {
    render(<CheckoutButton />)
 
    const checkoutButton = screen.getByRole('button', { name: /CHECKOUT/i })

    expect(checkoutButton).toHaveTextContent('CHECKOUT')
})
  it('when the button is clicked, render checkout_session page', async () => {
    const user = userEvent.setup()
    render(<CheckoutButton />)
    const button = screen.getByRole('button', { name: /CHECKOUT/i })

    await user.click(button)

    expect(window.location.href).toBe('https://checkout.stripe.com/c/pay/mockedsessionid')
  })
})
