import React from 'react';
import { Utensils, Pizza, Soup, Coffee, Wine, Sparkles } from 'lucide-react';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const categories = [
    { key: 'TODOS', label: 'Todo el Menú', icon: Sparkles },
    { key: 'PASTA', label: 'Pastas Artesanales', icon: Soup },
    { key: 'PIZZA', label: 'Pizzas a la Piedra', icon: Pizza },
    { key: 'ENTRADA', label: 'Antipasti & Entradas', icon: Utensils },
    { key: 'POSTRE', label: 'Dolci / Postres', icon: Coffee },
    { key: 'BEBIDA', label: 'Vinos & Bebidas', icon: Wine },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
      {categories.map(cat => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(cat.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20 scale-105'
                : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50/50 shadow-xs'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-700'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

