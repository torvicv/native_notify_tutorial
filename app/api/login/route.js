import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";


/*export async function GET() {
  try {
    return NextResponse.status(200);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error getting log in" },
      { status: 500 }
    );
  }
}*/

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    console.log(email);
    console.log(user);
    
    // convertir los ids a integers.
    const userSerialized = {
      id: Number(user.id),
      email: user.email,
      roleId: Number(user.roleId),
      username: user.username,
    }
    if (!user) {
        return NextResponse.json(
          { error: "El correo electrónico no está registrado" },
          { status: 404 }
        );
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(
          { error: "Contraseña incorrecta" },
          { status: 401 }
        );
    }
    // mensaje de usuario creado
    const message = '¡Usuario creado correctamente!'    
     
    // 4. Create user session
    await createSession(Number(user.id))
    // 5. Redirect user
    return NextResponse.json({
      message: message,
      user: userSerialized,
      state: 201 }, {status: 200});
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json(
      { error: "Error getting users" },
      { status: 500 }
    );
  }
}