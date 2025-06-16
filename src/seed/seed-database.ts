import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { RoleType, categoriasType } from "@prisma/client";

async function main() {
  console.log("🔄 Limpiando tablas...");

  // Borrar todo en orden de relaciones
  await prisma.asistencia.deleteMany();
  await prisma.factura.deleteMany();
  await prisma.detalle_venta.deleteMany();
  await prisma.venta.deleteMany();
  await prisma.pago.deleteMany();
  await prisma.membresia.deleteMany();
  await prisma.perfil.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.rol.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.inventario.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria_producto.deleteMany();

  // Reinicio de secuencias de autoincremento
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "producto_producto_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "categoria_producto_categoria_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "rol_rol_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "usuario_usuario_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "cliente_cliente_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "perfil_perfil_id_seq" RESTART WITH 1`);

  // Insertar roles
  await prisma.rol.createMany({
    data: [
      { nombre: RoleType.Administrador },
      { nombre: RoleType.Recepcionista },
      { nombre: RoleType.Cliente },
      { nombre: RoleType.Entrenador },
    ],
  });

  // Insertar usuario
  const usuario = await prisma.usuario.create({
    data: {
      nombre: "Miguel",
      apellido: "Ramírez",
      correo: "admin@mclub.com",
      contrasena: "123456", // ⚠️ Hashealo si es real
      rol_id: 1,
      fecha_registro: new Date(),
      estado: true,
    },
  });

  // Insertar cliente
  const cliente = await prisma.cliente.create({
    data: {
      dni: "12345678",
      telefono: "999999999",
      fecha_nacimiento: new Date("1995-05-10"),
      estado: true,
    },
  });

  // Insertar perfil
  const perfil = await prisma.perfil.create({
    data: {
      nombre: "GOLD",
      descripcion: "Acceso a todos los servicios premium",
    },
  });

  // Insertar membresía
  const membresia = await prisma.membresia.create({
    data: {
      perfil_id: perfil.perfil_id,
      usuario_id: usuario.usuario_id,
      fecha_inicio: new Date(),
      duracion: 6,
      estado: true,
    },
  });

  // Insertar pago
  await prisma.pago.create({
    data: {
      contrato_id: membresia.membresia_id,
      cliente_id: cliente.cliente_id,
      metodo_pago: "Efectivo",
      numero_pago: "001",
      fecha_pago: new Date(),
      monto: 150.0,
    },
  });

  // Insertar categorías y productos (los que ya tenías)
  await prisma.categoria_producto.createMany({
    data: initialData.categoria,
  });

  await prisma.producto.createMany({
    data: initialData.productos,
  });

  // Insertar venta y detalle
  const venta = await prisma.venta.create({
    data: {
      cliente_id: cliente.cliente_id,
      usuario_id: usuario.usuario_id,
      fecha_venta: new Date(),
      total: 249.9,
      detalles: {
        create: [
          {
            producto_id: 1,
            cantidad: 1,
            precio_unitario: 249.9,
            subtotal: 249.9,
          },
        ],
      },
      factura: {
        create: {
          tipo_comprobante: "Boleta",
          numero_comprobante: "B001-001",
          fecha_emision: new Date(),
          total: 249.9,
          usuario_id: usuario.usuario_id,
        },
      },
    },
  });

  // Insertar asistencia
  await prisma.asistencia.create({
    data: {
      cliente_id: cliente.cliente_id,
      fecha: new Date(),
      hora_entrada: new Date(),
      hora_salida: new Date(),
      metodo_ingreso: "QR",
      estado: true,
    },
  });

  console.log("✅ Base de datos poblada correctamente.");
}

(() => {
  main().catch((e) => {
    console.error("❌ Error al poblar la base de datos:", e);
    process.exit(1);
  });
})();
