
import { favoritos } from "@/lib/db";

export async function GET() {
    return Response.json(favoritos);
}

export async function POST(req) {

    try {

        const poke = await req.json();

        if (!poke.id || !poke.name || !poke.image) {
            return Response.json(
                { erro: "Dados do Pokémon incompletos" },
                { status: 400 }
            );
        }

        const jaExiste = favoritos.some(
            item => item.id === poke.id
        );

        if (!jaExiste) {
            favoritos.push(poke);
        }

        return Response.json(
            {
                status: "Capturado!",
                pokemon: poke,
                total: favoritos.length
            },
            { status: 201 }
        );

    } catch (error) {

        return Response.json(
            { erro: "Não foi possível salvar o Pokémon" },
            { status: 500 }
        );

    }
}
