import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest, context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const result = await prisma.menuItem.findUnique({
      where: {
        id: id,
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
