
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Favoritos() {

    const [lista, setLista] = useState([]);

    useEffect(() => {

        function carregarFavoritos() {

            const dados = localStorage.getItem("favoritos");

            setLista(dados ? JSON.parse(dados) : []);

        }

        carregarFavoritos();

        window.addEventListener(
            "favoritosAtualizados",
            carregarFavoritos
        );

        return () => {
            window.removeEventListener(
                "favoritosAtualizados",
                carregarFavoritos
            );
        };

    }, []);

    return (

        <main style={{
            padding: 30,
            minHeight: "100vh",
            backgroundColor: "#f8f5ff"
        }}>

            <Link href="/" style={{
                color: "#7653aa",
                textDecoration: "none"
            }}>
                ← Voltar
            </Link>

            <h1 style={{ color: "#54378a" }}>
                Minha Pokédex ({lista.length})
            </h1>

            <div style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap"
            }}>

                {lista.map(p => (

                    <div key={p.id} style={{
                        border: "2px solid #e5d9f5",
                        borderRadius: 20,
                        padding: 15,
                        textAlign: "center",
                        backgroundColor: "white",
                        width: 150
                    }}>

                        <img
                            src={p.image}
                            alt={p.name}
                            width={110}
                            height={110}
                            style={{ objectFit: "contain" }}
                        />

                        <h3 style={{
                            color: "#54378a",
                            textTransform: "capitalize"
                        }}>
                            {p.name}
                        </h3>

                        <p>Nº {p.id}</p>

                    </div>

                ))}

            </div>

            {lista.length === 0 && (
                <p>Nenhum Pokémon capturado ainda.</p>
            )}

        </main>

    );

}
