import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany();    
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error fetching bonos:", error);
    return NextResponse.json(
      { error: "Error fetching bonos" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {    
    const { clienteId, detalles } = await req.json();
    let idsToIntInBono = null;
    await prisma.$transaction(async(tx) => {
     
      const lastTicket = await tx.ticket.findFirst({
        orderBy: {
          id: "desc",
        },
        select: {
          identificador: true, // Debe especificarse `true` para seleccionar el campo
        },
      });
      const lastTicketSplit = lastTicket ? lastTicket?.identificador?.split('-') : null;
      let nextIdentificador = 'T-1';
      if (lastTicketSplit && lastTicketSplit[1])
        nextIdentificador = lastTicketSplit[1] ? 'T-'+(Number(lastTicketSplit[1]) + 1) : 'T-'+1;
      // check if cliente exist
    const ticketExists = await tx.ticket.findFirst({ 
      where: 
      { 
        identificador: 
        {
          equals: nextIdentificador
        }
      }
    });
    const ticket = await tx.ticket.create({
      data: {
        fecha: new Date(),
        identificador: nextIdentificador,
        clienteId: clienteId,
        detalles: {
          create: detalles.map(detalle => ({
            cantidad: detalle.cantidad,
            articuloId: detalle.articuloId,
            servicioId: detalle.servicioId,
            bonoId: detalle.bonoId,
          })),
        },
      }
    });
    if (ticketExists) {
      throw new Error('Ya existe un ticket con ese identificador.')
    }  

  
  idsToIntInBono = {
    id: Number(ticket.id),
    identificador: ticket.identificador,
  }
  
});
// mensaje de usuario creado
const message = 'Ticket creado correctamente!'    
  // 5. Redirect servicio
  return NextResponse.json({
    message: message,
    servicio: idsToIntInBono,
    status: 200 }, {status: 200});
  } catch (error) {
    console.error("Error creating bono:", error);
    return NextResponse.json(
      { error: "Error creating bono "+error.message },
      { status: 500 }
    );
  }
}
