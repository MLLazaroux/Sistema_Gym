"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  Package,
  UserCheck,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Datos de ejemplo
const stats = [
  {
    title: "Miembros Activos",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-[#D72638]",
  },
  {
    title: "Ingresos Mensuales",
    value: "S/.45,678",
    change: "+8%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Clases Programadas",
    value: "89",
    change: "+5%",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Entrenadores",
    value: "4",
    change: "+2",
    icon: UserCheck,
    color: "text-purple-600",
  },
]

const recentMembers = [
  { name: "Juan Pérez", email: "juan@email.com", plan: "Premium", status: "Activo" },
  { name: "María González", email: "maria@email.com", plan: "Básico", status: "Activo" },
  { name: "Carlos López", email: "carlos@email.com", plan: "Premium", status: "Pendiente" },
  { name: "Ana Martín", email: "ana@email.com", plan: "Estándar", status: "Activo" },
]

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Miembros",
    icon: Users,
    url: "/dashboard/members",
  },
  {
    title: "Entrenadores",
    icon: UserCheck,
    url: "/dashboard/trainers",
  },
  {
    title: "Clases",
    icon: Calendar,
    url: "/dashboard/classes",
  },
  {
    title: "Productos",
    icon: Package,
    url: "/dashboard/products",
  },
  {
    title: "Reportes",
    icon: TrendingUp,
    url: "/dashboard/reports",
  },
]

interface User {
  email: string
  name: string
  role: string
}

import AppSidebar from "@/components/layout/dashboard/AppSidebar"


const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar autenticación
    const savedUser = localStorage.getItem("powerfit_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      toast({
        title: `¡Bienvenido ${userData.name}!`,
        description: `Has accedido como ${userData.role}`,
        duration: 3000,
      })
    } else {
      // Redireccionar al login si no está autenticado
      router.push("/login")
    }
    setIsLoading(false)
  }, [router, toast])

  const handleLogout = () => {
    localStorage.removeItem("powerfit_user")
    localStorage.removeItem("powerfit_remember")
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      duration: 3000,
    })
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // El useEffect redirigirá al login
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
                  <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Bienvenido, {user.name} ({user.role})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Buscar..." className="pl-10 w-64" />
                </div>
                <ThemeToggle />
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="/placeholder.svg" />
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
            {/* Welcome Message */}
            <div className="mb-6 p-4 bg-[#D72638]/10 border border-[#D72638]/20 rounded-lg">
              <h2 className="text-lg font-semibold text-[#D72638] mb-1">¡Bienvenido al Panel de Administración!</h2>
              <p className="text-sm text-muted-foreground">
                Estás conectado como <strong>{user.role}</strong> - {user.email}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-green-600 mt-1">{stat.change} desde el mes pasado</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Members */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Miembros Recientes</CardTitle>
                    <CardDescription>Últimos miembros registrados</CardDescription>
                  </div>
                  <Button size="sm" className="bg-[#D72638] hover:bg-[#B91E2F]">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted text-foreground">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={member.status === "Activo" ? "default" : "secondary"}
                            className={
                              member.status === "Activo"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : ""
                            }
                          >
                            {member.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{member.plan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
                  <CardDescription>Tareas frecuentes del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Users className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Nuevo Miembro</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                          <Calendar className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Programar Clase</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Package className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Agregar Producto</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <BarChart3 className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Ver Reportes</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

export default DashboardPage
