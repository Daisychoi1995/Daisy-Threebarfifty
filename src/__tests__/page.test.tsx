import { beforeAll, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
// beforeAll(() => {
//   process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
// });

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})