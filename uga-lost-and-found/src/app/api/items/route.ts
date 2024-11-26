import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, dateFound, locationFound, status, imageUrl } = await request.json();

    // Validate required fields
    if (!name || !dateFound || !locationFound || !status) {
      return NextResponse.json(
        { error: "Missing required fields: name, dateFound, locationFound, or status" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const newItem = await Item.create({ name, dateFound, locationFound, status, imageUrl });
    return NextResponse.json({ message: "Item added successfully", item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
