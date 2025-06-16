"use client"

import { useEffect, useState } from "react"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Star, Calendar, Bell, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const trainers = [
  {
    id: 1,
    name: "Roberto Silva",
    email: "roberto@mclub.com",
    phone: "+51 987 111 222",
    specialties: ["Crossfit", "Funcional"],
    experience: "5 años",
    rating: 4.8,
    clients: 25,
    status: "Activo",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Carmen Vega",
    email: "carmen@mclub.com",
    phone: "+51 987 111 223",
    specialties: ["Yoga", "Pilates"],
    experience: "8 años",
    rating: 4.9,
    clients: 30,
    status: "Activo",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Miguel Torres",
    email: "miguel@mclub.com",
    phone: "+51 987 111 224",
    specialties: ["Musculación", "Powerlifting"],
    experience: "6 años",
    rating: 4.7,
    clients: 22,
    status: "Activo",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Lucía Morales",
    email: "lucia@mclub.com",
    phone: "+51 987 111 225",
    specialties: ["Zumba", "Cardio"],
    experience: "3 años",
    rating: 4.6,
    clients: 18,
    status: "Vacaciones",
    avatar: "/placeholder.svg",
  },
]

function AddTrainerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#D72638] hover:bg-[#B91E2F]">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Entrenador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Entrenador</DialogTitle>
          <DialogDescription>Completa la información del nuevo entrenador.</DialogDescription>
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
            <Label htmlFor="experience" className="text-right">
              Experiencia
            </Label>
            <Input id="experience" placeholder="ej: 5 años" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="specialties" className="text-right">
              Especialidades
            </Label>
            <Textarea id="specialties" placeholder="ej: Crossfit, Funcional" className="col-span-3" />
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

export default function TrainersPage() {
  const [searchTerm, setSearchTerm] = useState("")
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

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
                  <h1 className="text-2xl font-bold text-foreground">Entrenadores</h1>
                  <p className="text-sm text-muted-foreground">Gestiona el equipo de entrenadores</p>
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
                <h1 className="text-3xl font-bold text-foreground">Entrenadores</h1>
                <p className="text-muted-foreground">Gestiona el equipo de entrenadores</p>
              </div>
              <AddTrainerDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#D72638]">{trainers.length}</div>
                    <p className="text-sm text-muted-foreground">Total Entrenadores</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {trainers.filter((t) => t.status === "Activo").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Activos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {trainers.reduce((sum, trainer) => sum + trainer.clients, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Clientes Totales</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {(trainers.reduce((sum, trainer) => sum + trainer.rating, 0) / trainers.length).toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">Rating Promedio</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Equipo de Entrenadores</CardTitle>
                    <CardDescription>{filteredTrainers.length} entrenadores encontrados</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar entrenadores..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrainers.map((trainer) => (
                    <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={trainer.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-[#D72638] text-white">
                                {trainer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{trainer.name}</h3>
                              <p className="text-sm text-muted-foreground">{trainer.email}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Ver Horarios
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
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Estado:</span>
                            <Badge
                              variant={trainer.status === "Activo" ? "default" : "secondary"}
                              className={
                                trainer.status === "Activo"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              }
                            >
                              {trainer.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Rating:</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-medium">{trainer.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Clientes:</span>
                            <span className="text-sm font-medium">{trainer.clients}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Experiencia:</span>
                            <span className="text-sm font-medium">{trainer.experience}</span>
                          </div>

                          <div>
                            <span className="text-sm text-muted-foreground">Especialidades:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {trainer.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
