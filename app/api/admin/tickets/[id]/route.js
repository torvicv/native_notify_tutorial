import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    
    const {id} = await params;
  
    console.log(id);
    const ticket = await prisma.ticket.findUnique({
        where: { id: Number(id) },
        include: {
            cliente: true,
            detalles: {
                include: {
                    articulo: true,
                    servicio: true
                }
            }
        }
    });
    return NextResponse.json(ticket, { status: 200});
}

export async function PUT(req, {params}) {
    const { id } = await params;
    const { clienteId, detalles } = await req.json();
    if (!clienteId) {
        return NextResponse.status(400).json({ error: "Faltan datos requeridos" });
    }
    await prisma.ticket.update({
        where: { id: Number(id) },
        data: { 
            clienteId: clienteId,
            detalles: {
                upsert: detalles.map(detalle => ({
                    where: { 
                        id: Number(detalle.id)
                    },
                    create: {
                        cantidad: detalle.cantidad,
                        articuloId: detalle.articuloId,
                        servicioId: detalle.servicioId,
                        bonoId: detalle.bonoId,
                    },
                    update: {
                        cantidad: detalle.cantidad,
                        articuloId: detalle.articuloId,
                        servicioId: detalle.servicioId,
                        bonoId: detalle.bonoId,
                    }
                }))
            },
        },
    });
    return NextResponse.json({message: 'Bono actualizado'});
}

export async function DELETE(req, res) {
    const { id } = req.query;
    await prisma.bonos.delete({
        where: { id: Number(id) },
    });
    return NextResponse.json({message: 'Bono eliminado'});
}