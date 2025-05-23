import { MenuItemPrisma } from "@/app/models/Model";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient()

export async function GET() {
  try {
    const result = await prisma.menuItem.findMany();
    const menuItems = result.map(({ image_url, ...rest }: MenuItemPrisma) => ({
      ...rest,
      imageUrl: image_url,
    }))
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error)
    return NextResponse.json({ error: 'Error fetching menu items' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

}