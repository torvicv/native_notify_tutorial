import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bonos = await prisma.bonos.findMany();    
    return NextResponse.json(bonos, { status: 200 });
  } catch (error) {
    console.error("Error fetching bonos:", error);
    return NextResponse.json(
      { error: "Error fetching bonos" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {    
    const { nombre, precio, descripcion, detalles } = await req.json();
    // check if cliente exist
    const bonoExists = await prisma.bonos.findFirst({ 
      where: 
      { 
        nombre: 
        {
          equals: nombre 
        }
      }
    });
    if (bonoExists) {
      return NextResponse.json(
        { error: "Ya existe un bono con ese nombre" },
        { status: 400 }
      );
    }   
     
      // 4. Create user session
    const bono = await prisma.bonos.create({
      data: {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        detalles: {
          create: detalles.map(detalle => ({
            cantidad: detalle.cantidad,
            articuloId: detalle.articuloId,
            servicioId: detalle.servicioId
          })),
        },
      }
    });

    const idsToIntInBono = {
      id: Number(bono.id),
      nombre: bono.nombre,
    }
    // mensaje de usuario creado
    const message = 'Bono creado correctamente!'    
     
    // 5. Redirect servicio
    return NextResponse.json({
      message: message,
      servicio: idsToIntInBono,
      status: 200 }, {status: 200});
  } catch (error) {
    console.error("Error creating bono:", error);
    return NextResponse.json(
      { error: "Error creating bono" },
      { status: 500 }
    );
  }
}
