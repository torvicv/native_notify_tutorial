import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { serializeBigIntToInt } from "@/components/helpers";

export async function GET(req) {
    const { id } = req.query;
    const articulo = await prisma.articulo.findUnique({
        where: { id: Number(id) },
    });
    return NextResponse.json(serializeBigIntToInt(articulo));
}

export async function PUT(req, res) {
    const { id } = req.query;
    const { nombre } = await req.json();
    if (!nombre) {
        return NextResponse.status(400).json({ error: "Faltan datos requeridos" });
    }
    await prisma.articulo.update({
        where: { id: Number(id) },
        data: { nombre: nombre},
    });
    return NextResponse.json({message: 'Artículo actualizado'});
}

export async function DELETE(req, res) {
    const { id } = req.query;
    await prisma.articulo.delete({
        where: { id: Number(id) },
    });
    return NextResponse.json({message: 'Artículo eliminado'});
}