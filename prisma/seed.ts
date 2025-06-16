import { PrismaClient, $Enums, categoriasType } from '@prisma/client';

// Para ejecutar e insertar datos: npx tsx prisma/seed.ts

const prisma = new PrismaClient();

async function main() {
    // Insertar roles
    const roles: $Enums.RoleType[] = [$Enums.RoleType.Administrador, $Enums.RoleType.Recepcionista, $Enums.RoleType.Cliente, $Enums.RoleType.Entrenador,];

    for (const role of roles) {
        await prisma.rol.upsert({
            where: { nombre: role },
            update: {},
            create: { nombre: role },
        });
    }

    const categorias: $Enums.categoriasType[] = [$Enums.categoriasType.Suplementos, $Enums.categoriasType.Ropa, $Enums.categoriasType.Accesorios,];

    for (const categoria of categorias) {
        await prisma.categoria_producto.upsert({
            where: { nombre: categoria },
            update: {},
            create: { nombre: categoria },
        });
    }
    console.log('Seed data inserted successfully!');
}

main()
    .catch((e) => {
        console.error('Error inserting seed data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

