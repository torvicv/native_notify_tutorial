import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const servicios = await prisma.servicio.findMany();    
    return NextResponse.json(servicios, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Error fetching services" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {    
    const { nombre, articulos } = await req.json();
    // check if cliente exist
    const servicioExists = await prisma.servicio.findFirst({ where: 
      { nombre: nombre }
    });
    if (servicioExists) {
      return NextResponse.json(
        { error: "Ya existe un servicio con ese nombre" },
        { status: 400 }
      );
    }   
     
      // 4. Create user session
    const servicio = await prisma.servicio.create({
      data: {
        nombre: nombre,
        detalles: {
          create: articulos.map(articulo => ({
            cantidad: articulo.cantidad,
            articuloId: articulo.id,
          })),
        }
      }
    });

    const idsToIntInServicio = {
      id: Number(servicio.id),
      nombre: servicio.nombre,
    }
    // mensaje de usuario creado
    const message = 'Servicio creado correctamente!'    
     
    // 5. Redirect servicio
    return NextResponse.json({
      message: message,
      servicio: idsToIntInServicio,
      status: 200 }, {status: 200});
  } catch (error) {
    console.error("Error creating servicio:", error);
    return NextResponse.json(
      { error: "Error creating servicio" },
      { status: 500 }
    );
  }
}
