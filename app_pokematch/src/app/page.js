
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {

    const [id, setId] = useState(1);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {

        setPokemon(null);

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(data => {

                let imagem;

                if (id === 1 || id === 2 || id === 8) {
                    imagem = `/img${id}.png`;
                } else {
                    imagem = `/img${id}.jpg`;
                }

                setPokemon({
                    id: data.id,
                    name: data.name,
                    image: imagem
                });

            })
            .catch(error => {
                console.log("Erro ao buscar Pokémon:", error);
            });

    }, [id]);

    function passar() {

        setPokemon(null);
        setId(id === 8 ? 1 : id + 1);

    }

    function capturar() {

        if (!pokemon) return;

        try {

            const favoritos = JSON.parse(
                localStorage.getItem("favoritos") || "[]"
            );

            const jaExiste = favoritos.some(
                item => item.id === pokemon.id
            );

            if (jaExiste) {

                alert("Esse Pokémon já está na sua Pokédex!");

            } else {

                favoritos.push(pokemon);

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );

                window.dispatchEvent(
                    new Event("favoritosAtualizados")
                );

                alert("Pokémon salvo na Pokédex!");

            }

            passar();

        } catch (error) {

            console.log("Erro ao salvar Pokémon:", error);

            alert("Não foi possível salvar o Pokémon.");

        }

    }

    return (

        <main style={{
            minHeight: "100vh",
            padding: 30,
            textAlign: "center",
            backgroundColor: "#f8f5ff"
        }}>

            <h1 style={{
                color: "#54378a",
                fontSize: 36
            }}>
                PokéMatch
            </h1>

            <Link
                href="/favoritos"
                style={{
                    color: "#7653aa",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}
            >
                Minha Pokédex
            </Link>

            <div style={{
                margin: "30px auto 20px",
                border: "2px solid #e5d9f5",
                borderRadius: 25,
                padding: 30,
                maxWidth: 320,
                backgroundColor: "white",
                boxShadow: "0 8px 25px rgba(80, 50, 120, 0.12)"
            }}>

                {pokemon ? (

                    <>

                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            width={200}
                            height={200}
                            style={{
                                objectFit: "contain"
                            }}
                        />

                        <h2 style={{
                            color: "#54378a",
                            textTransform: "capitalize"
                        }}>
                            {pokemon.name}
                        </h2>

                        <p>Nº {pokemon.id}</p>

                    </>

                ) : (

                    <p>Carregando Pokémon...</p>

                )}

            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 30,
                marginTop: 25
            }}>

                <button
                    onClick={passar}
                    disabled={!pokemon}
                    aria-label="Passar Pokémon"
                    style={{
                        width: 65,
                        height: 65,
                        borderRadius: "50%",
                        border: "2px solid #ff6b6b",
                        backgroundColor: "white",
                        color: "#ff6b6b",
                        fontSize: 32,
                        cursor: "pointer"
                    }}
                >
                    ✕
                </button>

                <button
                    onClick={capturar}
                    disabled={!pokemon}
                    aria-label="Capturar Pokémon"
                    style={{
                        width: 65,
                        height: 65,
                        border: "none",
                        borderRadius: "50%",
                        backgroundColor: "#e85b91",
                        color: "white",
                        fontSize: 32,
                        cursor: "pointer"
                    }}
                >
                    ♥
                </button>

            </div>

        </main>

    );

}
