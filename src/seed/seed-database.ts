import prisma from "../lib/prisma";
import { initialData } from "./seed";
async function main() {
    
    //Elimina registros de la base de datos
    await prisma.producto.deleteMany()
    await prisma.categoria_producto.deleteMany()

    // Reiniciar los índices de autoincremento
    await prisma.$executeRaw`ALTER SEQUENCE "producto_producto_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "categoria_producto_categoria_id_seq" RESTART WITH 1`;

    //Extrae los datos de initialData
    const { productos } = initialData
    const { categoria } = initialData

    //Inserta los datos a la base de datos
    await prisma.categoria_producto.createMany({
        data: categoria
    })

    await prisma.producto.createMany({
        data: productos
    });

    console.log('Seed ejecutado correctamente')
}

(() => {
    main()
})()