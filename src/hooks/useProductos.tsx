"use client"

import { useState, useEffect } from "react"
import { Producto } from "@/types/productos"
import { useToast } from "@/hooks/use-toast"

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/producto")
                if (!res.ok) throw new Error("Error al obtener productos")
                const data = await res.json()
                setProductos(data)
            } catch (err) {
                const message = (err as Error).message
                setError(message)
                toast({
                    title: "Error al cargar productos",
                    description: message,
                    variant: "destructive"
                })
            } finally {
                setLoading(false)
            }
        }

        fetchProductos()
    }, [])

    return { productos, loading, error }
}
