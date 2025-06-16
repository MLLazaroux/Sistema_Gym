import { categoriasType } from "@prisma/client";

interface SeedProductos {
    descripcion: string,
    nombre: string,
    precio: number,
    categoriaId: number,
    stock: number,
    estado: boolean,
    imagen: string
}

interface SeedCategorias {
    nombre: categoriasType,
}

interface SeedData {
    productos: SeedProductos[]
    categoria: SeedCategorias[]
}

export const initialData: SeedData = {
    categoria: [
        {
            nombre: categoriasType.Accesorios //1
        },
        {
            nombre: categoriasType.Ropa //2 
        },
        {
            nombre: categoriasType.Suplementos //3
        }
    ],
    productos: [
        {
            descripcion: "Proteína Whey Gold Standard de Optimum Nutrition con 24g de proteína por porción, bajo en carbohidratos y de rápida absorción. Ideal para ganancia muscular y recuperación.",
            nombre: "Optimum Whey Gold Standard",
            precio: 249.9,
            categoriaId: 3,
            stock: 50,
            estado: true,
            imagen: "/images/OptimumWheyGoldStandard.jpg"
        },
        {
            descripcion: "Creatina Monohidrato Micronizada 100% pura, mejora el rendimiento físico en ejercicios de alta intensidad. Apoya la fuerza y la recuperación.",
            nombre: "Creatina Monohidrato Micronizada",
            precio: 159.9,
            categoriaId: 3,
            stock: 50,
            estado: true,
            imagen: "/images/CreatinaMonohidratoMicronizada.jpg"
        },
        {
            descripcion: "Banda elástica ideal para entrenamiento de fuerza y flexibilidad, con distintos niveles de resistencia.",
            nombre: "Banda de Resistencia",
            precio: 29.9,
            categoriaId: 1,
            stock: 50,
            estado: true,
            imagen: "/images/BandasDeResistenciaFitPack.jpg" 
        },
        {
            descripcion: "Pre-entreno C4 con 150mg de cafeína, beta-alanina y creatina. Aumenta energía, enfoque y resistencia antes del entrenamiento.",
            nombre: "C4 Pre-Entreno",
            precio: 149.9,
            categoriaId: 3,
            stock: 20,
            estado: true,
            imagen: "/images/C4Pre-WorkoutExplosive.jpg"
        },
        {
            descripcion: "Camiseta deportiva Dry Fit de secado rápido, ideal para entrenamientos intensos. Tejido transpirable y ajuste cómodo.",
            nombre: "Camiseta Dry Fit",
            precio: 89.9,
            categoriaId: 2,
            stock: 60,
            estado: true,
            imagen: "/images/CamisetaDry-FitGymwear.jpg"
        },
        {
            descripcion: "Guantes Gym Grip Pro con agarre antideslizante, protección para las palmas y muñequera ajustable. Ideales para levantamiento de pesas.",
            nombre: "Guantes Gym Grip Pro",
            precio: 69.9,
            categoriaId: 1,
            stock: 45,
            estado: true,
            imagen: "/images/GuantesGymGripPro.jpg"
        }, 
        {
            descripcion: "Hoodie oversize unisex de algodón suave con interior afelpado. Diseño moderno, ideal para uso casual o post-entreno.",
            nombre: "Hoodie oversize",
            precio: 129.9,
            categoriaId: 2,
            stock: 35,
            estado: true,
            imagen: "/images/HoodieOversizeGymBeast.jpg"
        },
        {
            descripcion: "Shaker Blender de 600ml con tapa segura y bola mezcladora de acero inoxidable. Perfecto para batidos de proteína y suplementos.",
            nombre: "Shaker Blender 600ml",
            precio: 39.9,
            categoriaId: 1,
            stock: 80,
            estado: true,
            imagen: "/images/ShakerBlenderBottle600ml.jpg"
        },
        {
            descripcion: "Short Flex deportivo de secado rápido y tejido elástico. Ideal para entrenamientos de alta intensidad y comodidad total.",
            nombre: "Short Flex",
            precio: 74.9,
            categoriaId: 2,
            stock: 55,
            estado: true,
            imagen: "/images/ShortsFlexProGym.jpg"
        },
        {
            descripcion: "Toalla de microfibra ligera, de secado rápido y ultra absorbente. Ideal para gimnasio, viajes o actividades al aire libre.",
            nombre: "Toalla Microfibra",
            precio: 44.9,
            categoriaId: 1,
            stock: 70,
            estado: true,
            imagen: "/images/ToallaMicrofibraUltrafit.png"
        },
        {
            descripcion: "Suplemento XTEND Sport con 7g de BCAA por porción, ideal para recuperación muscular e hidratación. Sabor Blue Raspberry Ice.",
            nombre: "XTEND Sport BCAA",
            precio: 139.9,
            categoriaId: 3,
            stock: 25,
            estado: true,
            imagen: "/images/XTENDBCAA+Electrolytes.jpg"
        }
    ]
}