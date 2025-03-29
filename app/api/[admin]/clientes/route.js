import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany();
    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {    
    const { nombre, email, password } = await req.json();
    // check if cliente exist
    const clienteExists = await prisma.cliente.findUnique({ where: { email } });
    if (clienteExists) {
      return NextResponse.json(
        { error: "El email ya está en uso" },
        { status: 400 }
      );
    }   
     
    const cliente = await prisma.cliente.create({
      data: { nombre: nombre, email: email, password: await bcrypt.hash(password, 10) },
    });

    const idsToIntInCliente = {
      id: Number(cliente.id),
      roleId: Number(cliente.roleId),
      email: cliente.email,
      nombre: cliente.nombre,
    }
    // mensaje de usuario creado
    const message = 'Cliente creado correctamente!'    
     
      // 4. Create cliente session
      await createSession(Number(cliente.id))
      // 5. Redirect cliente
    return NextResponse.json({
      message: message,
      cliente: idsToIntInCliente,
      status: 200 }, {status: 200});
  } catch (error) {
    console.error("Error creating clientes:", error);
    return NextResponse.json(
      { error: "Error creating clientes" },
      { status: 500 }
    );
  }
}
