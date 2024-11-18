import connectMongoDB from "@/app/libs/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { title, description, image } = await request.json();
    await connectMongoDB();
    await Item.create({ title, description, image});
    return NextResponse.json({ message: "Item added successfully"}, {status: 201})
}

export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({items});
}