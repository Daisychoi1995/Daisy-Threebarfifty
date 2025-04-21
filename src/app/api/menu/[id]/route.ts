import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }
    const result = await prisma.menuItem.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!result) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    const { image_url, ...rest } = result
    const menuItem = {
      ...rest,
      imageUrl: image_url,
    }

    return NextResponse.json(menuItem)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching menu' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
