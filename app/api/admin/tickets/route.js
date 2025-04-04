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
    const { clienteId, detalles, bonos_uso } = await req.json();
    let idsToIntInBono = null;
    console.log(bonos_uso);
    const bonos_uso_flat = bonos_uso.flat();

    await prisma.$transaction(async (tx) => {

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
        nextIdentificador = lastTicketSplit[1] ? 'T-' + (Number(lastTicketSplit[1]) + 1) : 'T-' + 1;
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
      if (detalles && detalles.length > 0) {

        await tx.ticket.create({
          data: {
            fecha: new Date(),
            identificador: nextIdentificador,
            clienteId: clienteId,
            create: detalles?.filter(d => ({
              detalles: {
                create: detalles?.map(detalle => ({
                  cantidad: detalle.cantidad,
                  articuloId: detalle.articuloId,
                  servicioId: detalle.servicioId,
                  bonoId: detalle.bonoId,
                  uso: {
                    create: {
                      bonoId: detalle.bonoId,
                      cantidad: 0,
                    }
                  }
                })),
              },
            }))
          }
        });
        if (ticketExists) {
          throw new Error('Ya existe un ticket con ese identificador.')
        }
      } else if (bonos_uso_flat && bonos_uso_flat.length > 0) {
        await tx.ticket.create({
          data: {
            fecha: new Date(),
            identificador: nextIdentificador,
            clienteId: clienteId,
          }
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
      }
      if (ticketExists) {
        throw new Error('Ya existe un ticket con ese identificador.')
      }
    });
    // mensaje de usuario creado
    const message = 'Ticket creado correctamente!'
    // 5. Redirect servicio
    return NextResponse.json({
      message: message,
      status: 200
    }, { status: 200 });
  } catch (error) {
    console.error("Error creating bono:", error);
    return NextResponse.json(
      { error: "Error creating bono " + error.message },
      { status: 500 }
    );
  }
}
