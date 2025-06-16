'use client'

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"

const trainers = [
    {
        id: 1,
        name: "Miguel Lázaro",
        specialty: "Entrenamiento Funcional",
        experience: "2 años",
        price: 150,
        image: "/placeholder.svg?height=200&width=200",
        description: "Especialista en entrenamiento funcional y acondicionamiento físico.",
    },
    {
        id: 2,
        name: "Milagros Justo",
        specialty: "Yoga y Pilates",
        experience: "8 años",
        price: 120,
        image: "/placeholder.svg?height=200&width=200",
        description: "Instructora certificada en yoga y pilates para todos los niveles.",
    },
    {
        id: 3,
        name: "Miguel Torres",
        specialty: "Musculación",
        experience: "10 años",
        price: 180,
        image: "/placeholder.svg?height=200&width=200",
        description: "Experto en musculación y desarrollo de masa muscular.",
    },
    {
        id: 4,
        name: "Laura Rodríguez",
        specialty: "Cardio y Pérdida de Peso",
        experience: "6 años",
        price: 140,
        image: "/placeholder.svg?height=200&width=200",
        description: "Especialista en programas de cardio y pérdida de peso efectiva.",
    },
]

export default function EntrenadoresPage() {
    const [cart, setCart] = useState<number[]>([])

    const addToCart = (trainerId: number) => {
        setCart([...cart, trainerId])
    }

    return (

        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="py-16 bg-card min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Entrenadores</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Profesionales certificados listos para ayudarte a alcanzar tus objetivos fitness
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trainers.map((trainer) => (
                            <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="text-center">
                                    <Image
                                        src="/logo.jpg"
                                        alt={trainer.name}
                                        width={200}
                                        height={200}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                    />
                                    <CardTitle className="text-foreground">{trainer.name}</CardTitle>
                                    <CardDescription>{trainer.specialty}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-muted-foreground mb-2">Experiencia: {trainer.experience}</p>
                                    <p className="text-sm text-muted-foreground mb-4">{trainer.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-[#D72638]">{trainer.price}PEN/mes</span>
                                        <Button
                                            onClick={() => addToCart(trainer.id)}
                                            className="bg-[#D72638] hover:bg-[#B91E2F] text-white"
                                            size="sm"
                                        >
                                            Agregar
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
