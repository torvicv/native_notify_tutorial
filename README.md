# native_notify_tutorial
## 1
1. Crear 6 tablas: bonos, bonos_detalles, bonos_uso, bonos_uso_detalles, servicios, articulos
2. Los servicios pueden contener articulos o no.
3. Los bonos están relacionados pueden contener articulos y servicios. Al menos uno de los 2.

## 2 Tablas
1. bonos: precio, id, fecha_inicio, fecha_fin.
2. bonos_detalles: articulo_id(opcional), servicio_id(opcional), id, bono_id.
3. bonos_uso: bono_id, cantidad, id.
4. bonos_uso_detalles: cantidad, id, bono_uso_id, fecha.
5. servicios: id, nombre
6. servicios_detalles: id, servicio_id, articulo_id(opcional), cantidad.
7. articulos: id, nombre.
8. tickets: id, nombre, fecha, identificador(string TD-año(2cifras)-conseguir_identificador_ultimo_ticket_y_conseguir_su_numero+1), cliente_id.
9. tickets_detalles: id, servicio_id(opcional), articulo_id(opcional), bono_id(opcional), cantidad.
10. clientes: id, nombre, email, password.

## 3 Relaciones
1. tickets y tickets_detalles: 1 a muchos.
2. tickets_detalles y bonos: 1 a muchos. Un ticket_detalles puede tener un bono o ninguno, y un bono puede pertenecer a múltiples tickets_detalles.
3. tickets_detalles y articulos: 1 a muchos. Un ticket_detalles puede tener un articulo o ninguno, y un articulo puede pertenecer a múltiples tickets_detalles.
4. tickets_detalles y servicios: 1 a muchos. Un ticket_detalles puede tener un servicios o ninguno, y un servicios puede pertenecer a múltiples tickets_detalles.
5. bonos y bonos_detalles: Un bonos puede tener múltiples bonos_detalles y un bonos_detalles pertenecer a un solo bonos.
6. bonos y bonos_uso: Un bonos puede tener múltiples bonos_uso, y un bonos_uso sólo un bono_id.
7. bonos_uso_detalles: Un bonos_uso_detalles puede pertenecer a un solo bonos_uso, y un bonos_uso tener múltiples bonos_uso_detalles.
8. servicios y servicios_detalles: Un servicios puede tener múltiples servicios_detalles y un servicios_detalles pertenecer a un solo servicios.
9. clientes y tickets: Un tickets puede pertenecer a un solo clientes y un clientes puede tener múltiples tickets.
10. servicios_detalles y articulos: Un servicios_detalles puede tener un sólo articulo o ninguno.
11. bonos_detalles y servicios: Un bonos_detalles puede tener un sólo servicios o ninguno.
12. bonos_detalles y articulos: Un bonos_detalles puede tener un sólo articulos o ninguno.

