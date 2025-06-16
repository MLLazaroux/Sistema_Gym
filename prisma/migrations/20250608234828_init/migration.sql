-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('Administrador', 'Recepcionista', 'Cliente', 'Entrenador');

-- CreateEnum
CREATE TYPE "categoriasType" AS ENUM ('Suplementos', 'Ropa', 'Accesorios');

-- CreateTable
CREATE TABLE "rol" (
    "rol_id" SERIAL NOT NULL,
    "nombre" "RoleType" NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usuario_id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "cliente_id" SERIAL NOT NULL,
    "dni" VARCHAR(10) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "inventario" (
    "inventario_id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "lote" VARCHAR(20) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_movimiento" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("inventario_id")
);

-- CreateTable
CREATE TABLE "producto" (
    "producto_id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "categoria_producto" (
    "categoria_id" SERIAL NOT NULL,
    "nombre" "categoriasType" NOT NULL,

    CONSTRAINT "categoria_producto_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "venta" (
    "venta_id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "fecha_venta" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("venta_id")
);

-- CreateTable
CREATE TABLE "detalle_venta" (
    "detalle_venta_id" SERIAL NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_venta_pkey" PRIMARY KEY ("detalle_venta_id")
);

-- CreateTable
CREATE TABLE "membresia" (
    "membresia_id" SERIAL NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "membresia_pkey" PRIMARY KEY ("membresia_id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "perfil_id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("perfil_id")
);

-- CreateTable
CREATE TABLE "pago" (
    "pago_id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "metodo_pago" TEXT NOT NULL,
    "numero_pago" TEXT NOT NULL,
    "fecha_pago" TIMESTAMP(3) NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pago_pkey" PRIMARY KEY ("pago_id")
);

-- CreateTable
CREATE TABLE "factura" (
    "factura_id" SERIAL NOT NULL,
    "tipo_comprobante" TEXT NOT NULL,
    "numero_comprobante" TEXT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "factura_pkey" PRIMARY KEY ("factura_id")
);

-- CreateTable
CREATE TABLE "asistencia" (
    "asistencia_id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL,
    "hora_salida" TIMESTAMP(3) NOT NULL,
    "metodo_ingreso" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "asistencia_pkey" PRIMARY KEY ("asistencia_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_producto_nombre_key" ON "categoria_producto"("nombre");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria_producto"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "venta"("venta_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresia" ADD CONSTRAINT "membresia_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("perfil_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresia" ADD CONSTRAINT "membresia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "pago_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "pago_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "membresia"("membresia_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "venta"("venta_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;
