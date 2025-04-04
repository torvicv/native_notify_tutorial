import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function GET(req, { params }) {
    const { id } = params;
    const cliente = await prisma.cliente.findUnique({
        where: { 
            id: Number(id),
        },
        include: {
            tickets: {
                    where: {
                        detalles: {
                            some: {
                                uso: {
                                    isNot: null,
                                }
                            }
                        }
                    },
                include: {
                    detalles: {
                        where: {
                            NOT: {
                                uso: null,
                            }
                        },
                        include: {
                            articulo: true,
                            servicio: true,
                            uso: {
                                include: {
                                    bono: {
                                        include: {
                                            detalles: {
                                                include: {
                                                    servicio: true,
                                                    articulo: true,
                                                }
                                            },
                                        }
                                    },
                                    detalles: true,
                                }
                            }
                        }
                    }
                }
            },
        },
    });
    return NextResponse.json(cliente);
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