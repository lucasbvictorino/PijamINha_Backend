import { prisma } from "../src/lib/prisma.js"
import { hash } from "bcryptjs"
import { env } from "../src/env/index.js"
import { PAJAMA_SIZE } from "../src/@types/prisma/index.js"

const pajamas = [
    { name: "Pijama Nuvem Azul", description: "Pijama longo azul com estampa de nuvens", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 89.90, season: "inverno", type: "adulto", gender: "feminino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Estrelas Rosa", description: "Pijama curto rosa com estrelinhas douradas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 69.90, season: "verao", type: "infantil", gender: "feminino", favorite: false, onSale: true, salePercent: 15 },
    { name: "Pijama Urso Polar", description: "Pijama longo com estampa de urso polar", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 109.90, season: "inverno", type: "adulto", gender: "masculino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Tropical", description: "Pijama curto com folhas tropicais", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 59.90, season: "verao", type: "adulto", gender: "unissex", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Xadrez Clássico", description: "Pijama longo xadrez vermelho e preto", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 99.90, season: "inverno", type: "adulto", gender: "masculino", favorite: true, onSale: true, salePercent: 20 },
    { name: "Pijama Gatinho", description: "Pijama curto com estampa de gatinhos", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 74.90, season: "verao", type: "infantil", gender: "feminino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Lua e Sol", description: "Pijama longo com lua e sol bordados", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 119.90, season: "inverno", type: "adulto", gender: "família", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Listrado Navy", description: "Pijama longo listrado azul marinho", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 94.90, season: "inverno", type: "adulto", gender: "masculino", favorite: false, onSale: true, salePercent: 10 },
    { name: "Pijama Floral Lavanda", description: "Pijama curto floral em tons de lavanda", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 64.90, season: "verao", type: "adulto", gender: "feminino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Dinossauro", description: "Pijama longo com estampa de dinossauros", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 84.90, season: "inverno", type: "infantil", gender: "masculino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Bolinhas", description: "Pijama curto branco com bolinhas coloridas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 54.90, season: "verao", type: "infantil", gender: "feminino", favorite: false, onSale: true, salePercent: 25 },
    { name: "Pijama Flanelado Cinza", description: "Pijama longo flanelado cinza mescla", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 129.90, season: "inverno", type: "adulto", gender: "unissex", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Cactos", description: "Pijama curto com estampa de cactos", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 62.90, season: "verao", type: "adulto", gender: "unissex", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Corações", description: "Pijama longo vermelho com corações brancos", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 89.90, season: "inverno", type: "adulto", gender: "feminino", favorite: false, onSale: true, salePercent: 30 },
    { name: "Pijama Astronauta", description: "Pijama longo com estampa espacial", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 104.90, season: "inverno", type: "infantil", gender: "masculino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Abacaxi", description: "Pijama curto amarelo com abacaxis", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 57.90, season: "verao", type: "adulto", gender: "unissex", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Raposa", description: "Pijama longo laranja com raposinhas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 97.90, season: "inverno", type: "infantil", gender: "feminino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Âncora", description: "Pijama curto azul com âncoras brancas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 67.90, season: "verao", type: "adulto", gender: "masculino", favorite: false, onSale: true, salePercent: 10 },
    { name: "Pijama Arco-íris", description: "Pijama curto com listras coloridas arco-íris", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 72.90, season: "verao", type: "infantil", gender: "unissex", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Koala", description: "Pijama longo cinza com estampa de koalas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 112.90, season: "inverno", type: "adulto", gender: "feminino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Café", description: "Pijama curto marrom com xícaras de café", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 59.90, season: "verao", type: "adulto", gender: "unissex", favorite: false, onSale: true, salePercent: 20 },
    { name: "Pijama Montanha", description: "Pijama longo verde com montanhas e pinheiros", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 105.90, season: "inverno", type: "adulto", gender: "masculino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Flamingo", description: "Pijama curto rosa com flamingos", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 68.90, season: "verao", type: "adulto", gender: "feminino", favorite: true, onSale: false, salePercent: null },
    { name: "Pijama Panda", description: "Pijama longo preto e branco com pandas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 114.90, season: "inverno", type: "adulto", gender: "família", favorite: true, onSale: true, salePercent: 15 },
    { name: "Pijama Melancia", description: "Pijama curto verde e vermelho com melancias", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 55.90, season: "verao", type: "infantil", gender: "feminino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Lobo", description: "Pijama longo cinza escuro com lobos", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 108.90, season: "inverno", type: "adulto", gender: "masculino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Borboleta", description: "Pijama curto lilás com borboletas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 65.90, season: "verao", type: "infantil", gender: "feminino", favorite: true, onSale: true, salePercent: 10 },
    { name: "Pijama Geométrico", description: "Pijama longo com padrões geométricos modernos", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 99.90, season: "inverno", type: "adulto", gender: "masculino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Cereja", description: "Pijama curto branco com cerejas vermelhas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 63.90, season: "verao", type: "adulto", gender: "feminino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Tie Dye", description: "Pijama curto estilo tie dye colorido", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 74.90, season: "verao", type: "adulto", gender: "família", favorite: true, onSale: true, salePercent: 20 },
    { name: "Pijama Coruja", description: "Pijama longo azul petróleo com corujas", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 102.90, season: "inverno", type: "adulto", gender: "feminino", favorite: false, onSale: false, salePercent: null },
    { name: "Pijama Minimalista", description: "Pijama longo preto liso com acabamento premium", image: "https://icons8.com/photos/photo/front-view-of-a-yawning-young-woman-in-pajamas-staying-in-bed-and-touching-face--60b0777838514600010ed321", price: 139.90, season: "inverno", type: "adulto", gender: "masculino", favorite: true, onSale: false, salePercent: null },
]

export async function seed() {
    await prisma.user.upsert({
        where: {
            email: "admin@example.com"
        },
        update: {},
        create: {
            publicId: "00000000-0000-0000-0000-000000000001",
            name: "Admin",
            username: "admin",
            email: "admin@example.com",
            passwordHash: await hash("admin123", env.HASH_SALT_ROUNDS),
            role: "ADMIN"
        }
    })

    for (let i = 0; i < pajamas.length; i++) {
        const pj = pajamas[i]
        const publicId = String(i + 1).padStart(4, "0")

        await prisma.pajama.upsert({
            where: { publicId },
            update: {},
            create: {
                publicId,
                name: pj.name,
                description: pj.description,
                image: pj.image,
                price: pj.price,
                season: pj.season,
                type: pj.type,
                gender: pj.gender,
                favorite: pj.favorite,
                onSale: pj.onSale,
                salePercent: pj.salePercent,
                sizes: {
                    create: (["PP", "P", "M", "G", "GG"] as PAJAMA_SIZE[]).map((size) => ({
                        size,
                        stockQuantity: 4
                    }))
                }
            }
        })
    }

    console.log("Database seeded successfully.")
}

seed()
    .then(() => {
        prisma.$disconnect()
        process.exit(0)
    })
    .catch((error) => {
        console.error("Error seeding database:", error)
        prisma.$disconnect()
        process.exit(1)
    })