import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    
    const {id} = await params;
  
    console.log(id);
    const ticket = await prisma.ticket.findUnique({
        where: { id: Number(id) },
        include: {
            cliente: {
                include: {
                    bonosUso: {
                        include: {
                            bono: true,
                            detalles: {
                                include: {
                                    articulo: true,
                                    servicio: true
                                }
                            }
                        }
                    }
                }
            },
            detalles: {
                include: {
                    uso: {
                        include: {
                            detalles: true
                        }
                    },
                    articulo: true,
                    servicio: true
                }
            }, 
        }
    });
    return NextResponse.json(ticket, { status: 200});
}

export async function PUT(req, {params}) {
    const { id } = await params;
    const { clienteId, detalles, bonos_uso } = await req.json();
    const bonos_uso_flat = bonos_uso.flat();
    if (!clienteId) {
        return NextResponse.status(400).json({ error: "Faltan datos requeridos" });
    }
    try {
        throw new Error("Error de prueba");
        await prisma.$transaction(async (tx) => {
            await tx.ticket.update({
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
            await Promise.all(
                bonos_uso_flat.map((bono) =>
                  tx.bonosUso.update({
                    where: {
                      bonoId: bono.bonoId,
                      ticketDetalleId: bono.detalle_id,
                    },
                    data: {
                      detalles: {
                        create: {
                          cantidad: bono.cantidad,
                          articuloId: bono.articuloId,
                          fecha: new Date(),
                        },
                      },
                    },
                  })
                )
            );
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
    return NextResponse.json({message: 'Bono actualizado'});
}

export async function DELETE(req, res) {
    const { id } = req.query;
    await prisma.bonos.delete({
        where: { id: Number(id) },
    });
    return NextResponse.json({message: 'Bono eliminado'});
}