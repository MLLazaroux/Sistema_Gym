import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Category = {
    categoria_id: number
    nombre: string
}

type Props = {
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
    selectedCategory: string | number
    setSelectedCategory: Dispatch<SetStateAction<string | number>>
    sortBy: string
    setSortBy: Dispatch<SetStateAction<string>>
    totalProducts: number
    visibleProducts: number
}

const FiltrosProductos = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts,
    visibleProducts
}: Props) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categoria")
                if (!res.ok) throw new Error("Error al cargar categorías")
                const data = await res.json()
                setCategories(data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    const sortOptions = [
        { value: "destacados", label: "Destacados" },
        { value: "precio-asc", label: "Precio: Menor a Mayor" },
        { value: "precio-desc", label: "Precio: Mayor a Menor" },
        { value: "nombre", label: "Nombre A-Z" },
    ]

    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-4">
                    <Select value={String(selectedCategory)} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.categoria_id} value={category.categoria_id.toString()}>
                                    {category.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">Error: {error}</p>}
            {loading && <p className="text-muted-foreground text-sm">Cargando categorías...</p>}

            <div className="text-sm text-muted-foreground">
                Mostrando {visibleProducts} de {totalProducts} productos
            </div>
        </div>
    )
}

export default FiltrosProductos
