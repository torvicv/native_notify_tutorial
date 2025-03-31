import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serializeBigIntToInt } from "@/components/helpers";

export async function GET() {
  try {
    const articulos = await prisma.articulo.findMany();    
    return NextResponse.json(articulos, { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Error fetching articles" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {    
    const { nombre } = await req.json();
    // check if cliente exist
    const articuloExists = await prisma.articulo.findFirst({ where: 
      { nombre: nombre }
    });
    if (articuloExists) {
      return NextResponse.json(
        { error: "Ya existe un artículo con ese nombre" },
        { status: 400 }
      );
    }   
     
      // 4. Create user session
    const articulo = await prisma.articulo.create({
      data: { nombre: nombre },
    });

    const idsToIntInArticulo = {
      id: Number(articulo.id),
      nombre: articulo.nombre,
    }
    // mensaje de usuario creado
    const message = 'Artículo creado correctamente!'    
     
    // 5. Redirect articulo
    return NextResponse.json({
      message: message,
      articulo: idsToIntInArticulo,
      status: 200 }, {status: 200});
  } catch (error) {
    console.error("Error creating artículo:", error);
    return NextResponse.json(
      { error: "Error creating artículo" },
      { status: 500 }
    );
  }
}
