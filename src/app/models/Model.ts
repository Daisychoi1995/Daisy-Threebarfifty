export interface Image {
  id: number
  name: string
  imageUrl: string
}
export interface MenuItemPrisma {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}
export interface MenuItemDraft {
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface ContactUsPrisma {
  name: string
  email: string
  subject: string
  description: string
  created_at: Date
}


export interface ContactUs {
  name: string
  email: string
  subject: string
  description: string
  createdAt: Date
}

