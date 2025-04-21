import { MenuItemPrisma } from "@/app/models/Model";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient

export async function GET() {
  try {
    const result = await prisma.contactUs.findMany()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }

}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    if (!data.name || !data.email || !data.subject || !data.description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    const result = await prisma.contactUs.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        description: data.description,
        created_at: new Date(), 
      },
    })
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }

}