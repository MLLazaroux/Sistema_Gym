"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Eye, Bell, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layout/dashboard/AppSidebar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const members = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+51 987 654 321",
    plan: "Premium",
    status: "Activo",
    joinDate: "2024-01-15",
    lastVisit: "2024-12-08",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "María González",
    email: "maria@email.com",
    phone: "+51 987 654 322",
    plan: "Básico",
    status: "Activo",
    joinDate: "2024-02-20",
    lastVisit: "2024-12-07",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos@email.com",
    phone: "+51 987 654 323",
    plan: "Premium",
    status: "Pendiente",
    joinDate: "2024-03-10",
    lastVisit: "2024-12-05",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Ana Martín",
    email: "ana@email.com",
    phone: "+51 987 654 324",
    plan: "Estándar",
    status: "Activo",
    joinDate: "2024-04-05",
    lastVisit: "2024-12-09",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Luis Rodríguez",
    email: "luis@email.com",
    phone: "+51 987 654 325",
    plan: "Premium",
    status: "Inactivo",
    joinDate: "2024-01-30",
    lastVisit: "2024-11-20",
    avatar: "/placeholder.svg",
  },
]

function AddMemberDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#D72638] hover:bg-[#B91E2F]">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Miembro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Miembro</DialogTitle>
          <DialogDescription>Completa la información del nuevo miembro del gimnasio.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono
            </Label>
            <Input id="phone" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="plan" className="text-right">
              Plan
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basico">Básico</SelectItem>
                <SelectItem value="estandar">Estándar</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
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

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
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

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

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
                  <h1 className="text-2xl font-bold text-foreground">Miembros</h1>
                  <p className="text-sm text-muted-foreground">Gestiona los miembros del gimnasio</p>
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
                <h1 className="text-3xl font-bold text-foreground">Miembros</h1>
                <p className="text-muted-foreground">Gestiona los miembros del gimnasio</p>
              </div>
              <AddMemberDialog />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lista de Miembros</CardTitle>
                    <CardDescription>{filteredMembers.length} miembros encontrados</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Buscar miembros..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Miembro</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha de Ingreso</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              member.status === "Activo"
                                ? "default"
                                : member.status === "Pendiente"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              member.status === "Activo"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : member.status === "Pendiente"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>{member.lastVisit}</TableCell>
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
