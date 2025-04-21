import ContactUsForm from "@/components/ContactUsForm";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { setDoc, getFirestore, collection, doc } from 'firebase/firestore'
import userEvent from "@testing-library/user-event";

// Mock Firestore functions
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({ id: 'fake-id' }))  // Simulating DocumentReference with an id
    }))
  })),
  setDoc: vi.fn(() => Promise.resolve()),
  collection: vi.fn(),  // Mocking setDoc
  doc: vi.fn(),  // Explicitly mock `doc`
  
}));

describe('ContactUsForm Component', () => {
  it('renders name, description, email, subject', () => {
    render(<ContactUsForm />)

    const name = screen.getByRole('textbox', { name: /Name */i })
    const description = screen.getByRole('textbox', { name: /Description */i })
    const email = screen.getByRole('textbox', { name: /Email */i })
    const subject = screen.getByRole('textbox', { name: /Subject */i })
    const submit = screen.getByRole('button')

    expect(name).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(subject).toBeInTheDocument()
    expect(submit).toHaveTextContent('SUBMIT')
  })

  
});
