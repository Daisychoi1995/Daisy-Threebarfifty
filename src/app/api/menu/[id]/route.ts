import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'

// const prisma = new PrismaClient()

export async function GET(
  req: NextRequest, { params } : { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
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

export async function DELETE(
  req: NextRequest, { params } : { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const result = await prisma.menuItem.delete({ where: { id: id } })
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching menu items' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
