'use client'

import { getUsers } from "@/lib/db/users";
import { useEffect, useState } from "react";
import Header from "./components/header";
import Card from "./components/card";

export default function Home() {

  useEffect(() => {

  }, [])

  return (
    <div className="">
      <Header />
        <main className="bg-gray-50">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              Bienvenue sur HouseCamp
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Simplifiez vos réservations pour des vacances parfaites
            </p>
            <div className="mt-6">
              <a
                href="#features"
                className="px-6 py-3 bg-white text-blue-500 rounded-lg font-semibold hover:bg-blue-100"
              >
                Découvrir
              </a>
            </div>
          </header>

          {/* Features */}
          <section id="features" className="py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Pourquoi choisir HouseCamp ?
              </h2>
              <p className="mt-4 text-gray-600">
                Découvrez nos fonctionnalités exceptionnelles pour une expérience
                inoubliable.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-500">
                    Réservations Faciles
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Réservez en quelques clics avec une interface intuitive.
                  </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-500">
                    Offres Exclusives
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Accédez à des prix compétitifs pour vos séjours.
                  </p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-500">
                    Support 24/7
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Une assistance client disponible à tout moment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-16 bg-gray-100 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Ce que nos clients disent
              </h2>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <blockquote className="bg-white shadow-lg p-6 rounded-lg">
                  <p className="text-gray-600">
                    "Une expérience incroyable ! J'ai trouvé et réservé un
                    logement en moins de 5 minutes."
                  </p>
                  <footer className="mt-4 text-blue-500 font-bold">
                    — Marie Dupont
                  </footer>
                </blockquote>
                <blockquote className="bg-white shadow-lg p-6 rounded-lg">
                  <p className="text-gray-600">
                    "Le service client est exceptionnel, et les offres sont
                    fantastiques !"
                  </p>
                  <footer className="mt-4 text-blue-500 font-bold">
                    — Jean Martin
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 text-white text-center">
            <h2 className="text-3xl font-bold">
              Prêt à planifier votre prochaine aventure ?
            </h2>
            <p className="mt-4">
              Inscrivez-vous dès maintenant et commencez à explorer.
            </p>
            <div className="mt-6">
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-blue-500 rounded-lg font-semibold hover:bg-blue-100"
              >
                Rejoignez-nous
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 bg-gray-800 text-white text-center">
            <p className="text-sm">
              © 2025 HouseCamp. Tous droits réservés.
            </p>
          </footer>
        </main>
    </div>
  );
}
