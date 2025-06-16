"use client"

import { useState, useMemo } from "react"
import { Car, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/layout/navbar"
import FiltrosProductos from "@/components/layout/productos/filtrosProductos"
import CardProductos from "@/components/layout/productos/cardProductos"
import { useProductos } from "@/hooks/useProductos"

export default function ProductosPage() {
  const { productos, loading } = useProductos()
  const [cart, setCart] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | number>("todos")
  const [sortBy, setSortBy] = useState("destacados")
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 6

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = productos.filter((product) => {
      const matchesSearch =
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "todos" || product.categoriaId === Number(selectedCategory)
      return matchesSearch && matchesCategory
    })

    switch (sortBy) {
      case "precio-asc":
        filtered.sort((a, b) => a.precio - b.precio)
        break
      case "precio-desc":
        filtered.sort((a, b) => b.precio - a.precio)
        break
      case "nombre":
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      default:
        break
    }

    return filtered
  }, [productos, searchTerm, selectedCategory, sortBy])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const addToCart = (productId: number) => {
    const product = productos.find((p) => p.id === productId)
    if (product) {
      setCart([...cart, productId])
      toast({
        title: "¡Producto agregado!",
        description: `${product.nombre} se agregó al carrito`,
        duration: 3000
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Nuestra Tienda</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de suplementos, ropa y accesorios para optimizar tu entrenamiento
          </p>
        </div>

        <FiltrosProductos
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalProducts={filteredAndSortedProducts.length}
          visibleProducts={paginatedProducts.length}
        />

        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map((product, index) => (
                <CardProductos key={product.id ?? index} product={product} onAddToCart={addToCart} />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground">Intenta ajustar tus filtros o términos de búsqueda</p>
              </div>
            )}
          </>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-[#D72638] hover:bg-[#B91E2F]" : ""}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}