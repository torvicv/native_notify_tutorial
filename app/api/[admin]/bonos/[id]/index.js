import { NextResponse } from "next/server";
import { serializeBigIntToInt } from "@/components/helpers";

export async function GET(req) {
    const { id } = req.query;
    const bono = await prisma.bonos.findUnique({
        where: { id: Number(id) },
    });
    return NextResponse.json(serializeBigIntToInt(bono));
}

export async function PUT(req, res) {
    const { id } = req.query;
    const { nombre, detalles } = await req.json();
    if (!nombre) {
        return NextResponse.status(400).json({ error: "Faltan datos requeridos" });
    }
    await prisma.bonos.update({
        where: { id: Number(id) },
        data: { 
            nombre: nombre,
            detalles: {
                upsert: detalles.map(detalle => ({
                    where: { 
                        id: Number(detalle.id)
                    },
                    create: {
                        cantidad: detalle.cantidad,
                        articuloId: detalle.articuloId,
                        servicioId: detalle.servicioId
                    },
                    update: {
                        cantidad: detalle.cantidad,
                        articuloId: detalle.articuloId,
                        servicioId: detalle.servicioId
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