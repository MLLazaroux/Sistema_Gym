"use client"

import { Users, Package, Dumbbell } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"


export default function PowerFitHome() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Transforma tu cuerpo, transforma tu vida
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                MClub Gym te brinda instalaciones de calidad, entrenadores expertos y un ambiente motivador para lograr tus objetivos fitness.
                Encuentranos en Av. Los Libertadores, San Vicente de Cañete.
              </p>
                <div className="flex flex-col sm:flex-row gap-4" >
                <Button
                  asChild
                  className="bg-[#D72638] hover:bg-[#B91E2F] text-white px-8 py-3"
                >
                  <a href="/membresias">Ver Membresías</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3"
                >
                  <a href="/productos">Explorar Productos</a>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/logo.jpg"
                alt="PowerFit Gym"
                width={800}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para alcanzar tus metas fitness en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">Membresías</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Planes adaptados a tus necesidades y horarios, sin contratos largos.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">Tienda de Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Suplementos, ropa y accesorios de las mejores marcas para optimizar tu entrenamiento.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">Entrenadores Expertos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Profesionales certificados para guiarte y ayudarte a maximizar tus resultados.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
