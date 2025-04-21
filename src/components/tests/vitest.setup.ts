// vitest.setup.ts
import { vi } from 'vitest'

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({
      currentUser: { uid: 'test-user-id' },
      signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: { uid: 'test-user-id' } })),
      signOut: vi.fn(),
    })),
  }
})

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({ id: 'fake-id' })),  // Simulating DocumentReference with an id
    })),
  })),
  setDoc: vi.fn(() => Promise.resolve()),
  collection: vi.fn(),  // Mocking `collection` correctly
  doc: vi.fn(),  // Explicitly mock `doc`
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })), // Mocking getDocs with empty docs
}));

vi.mock('firebase/storage', () => {
  return {
    getStorage: vi.fn(() => ({})),
    ref: vi.fn(() => ({})),
    uploadBytes: vi.fn(() => Promise.resolve()),
  }
})

vi.mock('firebase/app', () => {
  return {
    initializeApp: vi.fn(() => ({})),
  }
})
