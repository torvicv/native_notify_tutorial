import { NextResponse } from "next/server";
import { serializeBigIntToInt } from "@/components/helpers";

export async function GET(req) {
    const { id } = req.query;
    const servicio = await prisma.servicio.findUnique({
        where: { id: Number(id) },
    });
    return NextResponse.json(serializeBigIntToInt(servicio));
}

export async function PUT(req, res) {
    const { id } = req.query;
    const { nombre } = await req.json();
    if (!nombre) {
        return NextResponse.status(400).json({ error: "Faltan datos requeridos" });
    }
    await prisma.servicio.update({
        where: { id: Number(id) },
        data: { nombre: nombre},
    });
    return NextResponse.json({message: 'Servicio actualizado'});
}

export async function DELETE(req, res) {
    const { id } = req.query;
    await prisma.servicio.delete({
        where: { id: Number(id) },
    });
    return NextResponse.json({message: 'Servicio eliminado'});
}