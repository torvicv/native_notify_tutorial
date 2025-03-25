import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";

function serializeBigIntToInt(obj) {
  if (typeof obj === 'bigint') {
    // Convertir BigInt a int (número)
    return Number(obj); 
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigIntToInt);
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = serializeBigIntToInt(obj[key]);
      }
    }
    return newObj;
  }

  return obj;
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    const serializedUsers = serializeBigIntToInt(users); // Convierte BigInt a int

    return NextResponse.json(serializedUsers, { status: 200 });
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
    const { name, email, password } = await req.json();
    const user = await prisma.user.create({
      data: { username: name, roleId: 2, email: email, password: await bcrypt.hash(password, 10) },
    });

    const idsToIntInUser = {
      id: Number(user.id),
      roleId: Number(user.roleId),
      email: user.email,
      username: user.username,
      password: user.password,
    }
    // mensaje de usuario creado
    const message = '¡Usuario creado correctamente!'    
     
      // 4. Create user session
      await createSession(Number(user.id))
      // 5. Redirect user
    return NextResponse.json({
      message: message,
      user: idsToIntInUser,
      status: 200 }, {status: 200});
  } catch (error) {
    console.error("Error creating users:", error);
    return NextResponse.json(
      { error: "Error creating users" },
      { status: 500 }
    );
  }
}
