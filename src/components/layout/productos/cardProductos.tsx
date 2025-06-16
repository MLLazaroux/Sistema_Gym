"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Producto } from '@/types/productos';

type Props = {
    product: Producto
    onAddToCart: (productId: number) => void
}

export default function CardProductos({ product, onAddToCart }: Props) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
                <div className="relative">
                    <Image
                        src={product.imagen}
                        alt={product.nombre}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                    {!product.stock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                            <span className="text-white font-semibold">Agotado</span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-foreground mb-2">{product.nombre}</CardTitle>
                <CardDescription className="text-sm mb-4">{product.descripcion}</CardDescription>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#D72638]">S/{product.precio}</span>
                    <Button
                        onClick={() => onAddToCart(product.id)}
                        disabled={!product.stock}
                        className="bg-[#D72638] hover:bg-[#B91E2F] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {product.stock ? "Agregar al Carrito" : "Agotado"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
