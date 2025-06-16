"use client"

import { useEffect, useState } from "react"
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const monthlyData = [
  { month: "Enero", members: 1150, revenue: 42500, classes: 85 },
  { month: "Febrero", members: 1180, revenue: 44200, classes: 88 },
  { month: "Marzo", members: 1200, revenue: 45800, classes: 92 },
  { month: "Abril", members: 1220, revenue: 46500, classes: 89 },
  { month: "Mayo", members: 1234, revenue: 47200, classes: 94 },
  { month: "Junio", members: 1245, revenue: 48100, classes: 96 },
]

const membershipPlans = [
  { plan: "Básico", count: 450, percentage: 36.5, revenue: 13500 },
  { plan: "Estándar", count: 520, percentage: 42.1, revenue: 20800 },
  { plan: "Premium", count: 264, percentage: 21.4, revenue: 15840 },
]

const topClasses = [
  { name: "Crossfit", attendance: 85, capacity: 100 },
  { name: "Yoga", attendance: 78, capacity: 80 },
  { name: "Zumba", attendance: 92, capacity: 100 },
  { name: "Pilates", attendance: 65, capacity: 70 },
  { name: "Musculación", attendance: 45, capacity: 50 },
]

const trainerPerformance = [
  { name: "Roberto Silva", classes: 24, rating: 4.8, clients: 25 },
  { name: "Carmen Vega", classes: 28, rating: 4.9, clients: 30 },
  { name: "Miguel Torres", classes: 22, rating: 4.7, clients: 22 },
  { name: "Lucía Morales", classes: 20, rating: 4.6, clients: 18 },
]

interface User {
  email: string
  name: string
  role: string
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
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

  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]

  const memberGrowth = (((currentMonth.members - previousMonth.members) / previousMonth.members) * 100).toFixed(1)
  const revenueGrowth = (((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100).toFixed(1)

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
                  <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
                  <p className="text-sm text-muted-foreground">Análisis y estadísticas del gimnasio</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
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
                <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
                <p className="text-muted-foreground">Análisis y estadísticas del gimnasio</p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* KPIs Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#D72638]">{currentMonth.members}</div>
                      <p className="text-sm text-muted-foreground">Miembros Activos</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+{memberGrowth}%</span>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-[#D72638]" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        S/.{currentMonth.revenue.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Ingresos Mensuales</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+{revenueGrowth}%</span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{currentMonth.classes}</div>
                      <p className="text-sm text-muted-foreground">Clases Realizadas</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+5.6%</span>
                      </div>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">87%</div>
                      <p className="text-sm text-muted-foreground">Ocupación Promedio</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+2.1%</span>
                      </div>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Resumen General</TabsTrigger>
                <TabsTrigger value="members">Miembros</TabsTrigger>
                <TabsTrigger value="classes">Clases</TabsTrigger>
                <TabsTrigger value="trainers">Entrenadores</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-[#D72638]" />
                        Evolución Mensual
                      </CardTitle>
                      <CardDescription>Crecimiento de miembros e ingresos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {monthlyData.slice(-3).map((data, index) => (
                          <div key={data.month} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">{data.month}</p>
                              <p className="text-sm text-muted-foreground">{data.members} miembros</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">S/.{data.revenue.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">{data.classes} clases</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-[#D72638]" />
                        Distribución de Planes
                      </CardTitle>
                      <CardDescription>Membresías por tipo de plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {membershipPlans.map((plan) => (
                          <div key={plan.plan} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-[#D72638] rounded-full"></div>
                              <div>
                                <p className="font-medium">{plan.plan}</p>
                                <p className="text-sm text-muted-foreground">{plan.count} miembros</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{plan.percentage}%</Badge>
                              <p className="text-sm text-muted-foreground mt-1">S/.{plan.revenue.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="members">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Crecimiento de Miembros</CardTitle>
                      <CardDescription>Evolución mensual de la membresía</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {monthlyData.map((data, index) => {
                          const growth =
                            index > 0
                              ? (
                                  ((data.members - monthlyData[index - 1].members) / monthlyData[index - 1].members) *
                                  100
                                ).toFixed(1)
                              : 0
                          return (
                            <div
                              key={data.month}
                              className="flex items-center justify-between p-2 hover:bg-muted rounded-lg"
                            >
                              <span className="font-medium">{data.month}</span>
                              <div className="flex items-center space-x-2">
                                <span>{data.members}</span>
                                {index > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{growth}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Análisis de Planes</CardTitle>
                      <CardDescription>Distribución y rendimiento por plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {membershipPlans.map((plan) => (
                          <div key={plan.plan} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{plan.plan}</h4>
                              <Badge>{plan.percentage}%</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Miembros</p>
                                <p className="font-medium">{plan.count}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Ingresos</p>
                                <p className="font-medium">S/.{plan.revenue.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="classes">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Clases Más Populares</CardTitle>
                      <CardDescription>Ranking por asistencia</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topClasses.map((cls, index) => (
                          <div key={cls.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[#D72638] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{cls.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {cls.attendance}/{cls.capacity} asistentes
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{Math.round((cls.attendance / cls.capacity) * 100)}%</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ocupación por Horario</CardTitle>
                      <CardDescription>Análisis de horarios más demandados</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2">
                          <span>06:00 - 09:00</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-4/5 h-2 bg-[#D72638] rounded-full"></div>
                            </div>
                            <span className="text-sm">80%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <span>09:00 - 12:00</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-3/5 h-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span className="text-sm">60%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <span>18:00 - 21:00</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-full h-2 bg-[#D72638] rounded-full"></div>
                            </div>
                            <span className="text-sm">95%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trainers">
                <Card>
                  <CardHeader>
                    <CardTitle>Rendimiento de Entrenadores</CardTitle>
                    <CardDescription>Estadísticas del equipo de entrenadores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trainerPerformance.map((trainer) => (
                        <div key={trainer.name} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{trainer.name}</h4>
                            <Badge variant="outline">★ {trainer.rating}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Clases</p>
                              <p className="font-medium">{trainer.classes}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Clientes</p>
                              <p className="font-medium">{trainer.clients}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
