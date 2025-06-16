import { ShoppingCart, Dumbbell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CartButton } from "@/components/cart-button"

const Navbar = () => {
    const [cart, setCart] = useState<number[]>([])
    const pathname = usePathname()

    const addToCart = (trainerId: number) => {
        setCart([...cart, trainerId])
    }

    const navLinkClass = (href: string) =>
        pathname === href
            ? "text-[#D72638] font-medium"
            : "text-foreground hover:text-[#D72638] transition-colors"

    return (
        <header className="bg-card shadow-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Dumbbell className="h-8 w-8 text-[#D72638]" />
                        <span className="ml-2 text-xl font-bold text-foreground">M Club GYM</span>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className={navLinkClass("/")}>
                            Inicio
                        </Link>
                        <Link href="/membresias" className={navLinkClass("/membresias")}>
                            Membresías
                        </Link>
                        <Link href="/productos" className={navLinkClass("/productos")}>
                            Productos
                        </Link>
                        <Link href="/trainers" className={navLinkClass("/trainers")}>
                            Entrenadores
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <CartButton />
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                            >
                                Iniciar Sesión
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Navbar
