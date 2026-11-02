import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/menu/CategoryFilter';
import DishCard from '../components/menu/DishCard';
import DishDetailModal from '../components/menu/DishDetailModal';
import { platoService } from '../services/mockApiService';
import { Search, Sparkles, Filter } from 'lucide-react';

export default function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlato, setSelectedPlato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlatos() {
      try {
        setLoading(true);
        const data = await platoService.getAll();
        setPlatos(data);
      } finally {
        setLoading(false);
      }
    }
    fetchPlatos();
  }, []);

  const filteredPlatos = platos.filter(p => {
    const matchesCat = selectedCategory === 'TODOS' || p.categoria.toUpperCase() === selectedCategory.toUpperCase();
    const matchesQuery = p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title & Search Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Carta Gastronómica
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mt-1 mb-3">
          Menú Bella Ciao
        </h1>
        <p className="text-sm text-stone-500">
          Selecciona tus antipasti, pastas frescas hechas a mano y pizzas artesanales al horno de piedra.
        </p>

        {/* Search Bar */}
        <div className="relative mt-6 max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar por plato, ingrediente o salsa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
          />
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="mb-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Grid of Dishes */}
      {loading ? (
        <div className="py-20 text-center text-stone-400">Cargando platos italianos...</div>
      ) : filteredPlatos.length === 0 ? (
        <div className="py-16 text-center text-stone-500 bg-white rounded-3xl border border-stone-200">
          <p className="text-base font-semibold">No se encontraron platos que coincidan con tu búsqueda.</p>
          <button
            onClick={() => { setSelectedCategory('TODOS'); setSearchQuery(''); }}
            className="mt-3 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlatos.map(plato => (
            <DishCard
              key={plato.id}
              plato={plato}
              onSelectDetail={setSelectedPlato}
            />
          ))}
        </div>
      )}

      {/* Dish Detail Modal */}
      <DishDetailModal
        plato={selectedPlato}
        onClose={() => setSelectedPlato(null)}
      />
    </div>
  );
}

