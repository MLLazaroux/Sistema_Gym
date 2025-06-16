"use client"

import { useEffect, useState } from "react"
import {
  Search,
  Plus,
  Package,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const products = [
  {
    id: 1,
    name: "Proteína Whey Premium",
    category: "Suplementos",
    price: 89.9,
    stock: 25,
    minStock: 10,
    supplier: "NutriMax",
    status: "Disponible",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Creatina Monohidrato",
    category: "Suplementos",
    price: 45.5,
    stock: 8,
    minStock: 15,
    supplier: "FitSupply",
    status: "Stock Bajo",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Botella Deportiva MClub",
    category: "Accesorios",
    price: 15.9,
    stock: 50,
    minStock: 20,
    supplier: "PromoGym",
    status: "Disponible",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Toalla de Gimnasio",
    category: "Accesorios",
    price: 12.5,
    stock: 30,
    minStock: 15,
    supplier: "TextilFit",
    status: "Disponible",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Pre-Entreno Energy",
    category: "Suplementos",
    price: 65.0,
    stock: 0,
    minStock: 10,
    supplier: "EnergyMax",
    status: "Agotado",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Guantes de Entrenamiento",
    category: "Equipamiento",
    price: 25.9,
    stock: 18,
    minStock: 10,
    supplier: "FitGear",
    status: "Disponible",
    image: "/placeholder.svg",
  },
]

function AddProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#D72638] hover:bg-[#B91E2F]">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>Completa la información del nuevo producto.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Nombre
            </Label>
            <Input id="productName" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoría
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suplementos">Suplementos</SelectItem>
                <SelectItem value="accesorios">Accesorios</SelectItem>
                <SelectItem value="equipamiento">Equipamiento</SelectItem>
                <SelectItem value="ropa">Ropa Deportiva</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input id="price" type="number" step="0.01" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input id="stock" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minStock" className="text-right">
              Stock Mínimo
            </Label>
            <Input id="minStock" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">
              Proveedor
            </Label>
            <Input id="supplier" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea id="description" className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-[#D72638] hover:bg-[#B91E2F]">Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface User {
  email: string
  name: string
  role: string
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simular usuario para demo
    const userData = {
      name: "Admin Usuario",
      email: "admin@mclub.com",
      role: "Administrador",
    }
    setUser(userData)
  }, [])

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      duration: 3000,
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const lowStockProducts = products.filter((product) => product.stock <= product.minStock && product.stock > 0)
  const outOfStockProducts = products.filter((product) => product.stock === 0)

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="h-8 w-8 bg-white rounded-full" />
          </div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar user={user} />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-foreground" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Productos</h1>
                  <p className="text-sm text-muted-foreground">Gestiona el inventario y productos del gimnasio</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Buscar..." className="pl-10 w-64" />
                </div>
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-[#D72638] text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Productos</h1>
                <p className="text-muted-foreground">Gestiona el inventario y productos del gimnasio</p>
              </div>
              <AddProductDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#D72638]">{products.length}</div>
                      <p className="text-sm text-muted-foreground">Total Productos</p>
                    </div>
                    <Package className="h-8 w-8 text-[#D72638]" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">S/.{totalValue.toFixed(2)}</div>
                      <p className="text-sm text-muted-foreground">Valor Inventario</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</div>
                      <p className="text-sm text-muted-foreground">Stock Bajo</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</div>
                      <p className="text-sm text-muted-foreground">Agotados</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Inventario de Productos</CardTitle>
                    <CardDescription>{filteredProducts.length} productos encontrados</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Buscar productos..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="suplementos">Suplementos</SelectItem>
                        <SelectItem value="accesorios">Accesorios</SelectItem>
                        <SelectItem value="equipamiento">Equipamiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>S/.{product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{product.stock}</span>
                            {product.stock <= product.minStock && product.stock > 0 && (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === "Disponible"
                                ? "default"
                                : product.status === "Stock Bajo"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              product.status === "Disponible"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : product.status === "Stock Bajo"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
