import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//  imageUrl: "https://res.cloudinary.com/da40xszl3/image/upload/<optional_transformation>/Main-Cake_leby0z"
async function main() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Brûlée basque cheesecake',
        description:
          'Brûlée Basque cheesecake made with Philadelphia cream cheese as the base. You can experience rich flavor and texture with the perfect harmony of creamy center and well-cooked outer part. Enjoy our cheesecake with a brûléed side for an even richer flavor and texture! Allergens: Wheat, Gluten, Eggs, Dairy. May contain traces of nuts',
        price: 13,
        image_url:
          'https://res.cloudinary.com/da40xszl3/image/upload/Main-Cake_leby0z',
      },
    ],
  })
  await prisma.contactUs.createMany({
    data: [
      {
        name: "Daisy Choi",
        description: "How much is each cookie?",
        email: "chj15937@gmail.com",
        subject: "Cookie Price",
        created_at: new Date(),
      }
    ]
  })
  console.log('✅ Seeded projects successfully!')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export { PrismaClient }
