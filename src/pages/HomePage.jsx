import React, { useState, useEffect } from 'react';
import Hero from '../components/landing/Hero';
import DishCard from '../components/menu/DishCard';
import ReviewsSection from '../components/reviews/ReviewsSection';
import DishDetailModal from '../components/menu/DishDetailModal';
import { platoService } from '../services/mockApiService';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChefHat } from 'lucide-react';

export default function HomePage({ onOpenReservation, onOpenCreateReview }) {
  const [platosFavoritos, setPlatosFavoritos] = useState([]);
  const [selectedPlato, setSelectedPlato] = useState(null);

  useEffect(() => {
    async function load() {
      const all = await platoService.getAll();
      // Pick first 6 as favorites
      setPlatosFavoritos(all.slice(0, 6));
    }
    load();
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero onOpenReservation={onOpenReservation} />

      {/* 2. Popular Favorites Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-semibold mb-2">
              <ChefHat className="w-3.5 h-3.5 text-red-700" />
              <span>Nuestros Favoritos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Especialidades de la Casa
            </h2>
            <p className="text-sm text-stone-500 mt-1 max-w-xl">
              Platos preparados con recetas ancestrales de Roma y Nápoles, masa madre viva y quesos con denominación de origen protegida.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 group"
          >
            <span>Ver menú completo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {platosFavoritos.map(plato => (
            <DishCard
              key={plato.id}
              plato={plato}
              onSelectDetail={setSelectedPlato}
            />
          ))}
        </div>
      </section>

      {/* 3. Social Proof & Reviews */}
      <ReviewsSection onOpenCreateReview={onOpenCreateReview} />

      {/* Dish Detail Modal if open */}
      <DishDetailModal
        plato={selectedPlato}
        onClose={() => setSelectedPlato(null)}
      />
    </div>
  );
}

