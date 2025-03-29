import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { serializeBigIntToInt } from "@/components/helpers";

export async function GET(req) {
    const { id } = req.query;
    const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) },
    });
    return NextResponse.json(serializeBigIntToInt(cliente));
}

export async function PUT(req, res) {
    const { id } = req.query;
    const { nombre, email, password } = await req.json();
    if (!nombre ||!email) {
        return NextResponse.status(400).json({ error: "Faltan datos requeridos" });
    }
    if (password) {
        const hashed = await bcrypt.hash(password, 10);
        await prisma.cliente.update({
            where: { id: Number(id) },
            data: { nombre: nombre, email: email, password: hashed },
        });
    } else {
        await prisma.cliente.update({
            where: { id: Number(id) },
            data: { nombre: nombre, email: email},
        });
    }
    return NextResponse.json({message: 'Cliente actualizado'});
}

export async function DELETE(req, res) {
    const { id } = req.query;
    await prisma.cliente.delete({
        where: { id: Number(id) },
    });
    return NextResponse.json({message: 'Cliente eliminado'});
}