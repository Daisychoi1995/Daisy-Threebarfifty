import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'

// const prisma = new PrismaClient()
export async function POST(req: Request) {
  try {
    const data = await req.json()
    if (!data.name || !data.description || !data.price || !data.imageUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    const result = await prisma.menuItem.create({
      data: {
        name: data.name,
        price: data.price,
        image_url: data.imageUrl,
        description: data.description,
      },
    })
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching menu items' },
      { status: 500 }
    )
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
