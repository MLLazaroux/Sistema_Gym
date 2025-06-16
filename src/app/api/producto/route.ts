import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const productos = await prisma.producto.findMany();

        return NextResponse.json(productos, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener los productos', details: (error as Error).message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const body = await request.json()
        const { descripcion, nombre, precio, stock, categoriaId, estado, imagen } = body

        if (!descripcion || !nombre || !precio || !stock || !categoriaId || !estado || !imagen) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            )
        }
        const newProducto = await prisma.producto.create({
            data: {
                descripcion,
                nombre,
                precio,
                stock,
                categoriaId,
                estado,
                imagen
            }
        }
        )
        return NextResponse.json(newProducto, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear el producto', details: (error as Error).message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
}

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { error: "ID del producto no proporcionado" },
                { status: 400 }
            )
        }

        const deleted = await prisma.producto.delete({
            where: { producto_id: Number(id) }
        })

        return NextResponse.json(deleted, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: "Error al eliminar el producto", details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
