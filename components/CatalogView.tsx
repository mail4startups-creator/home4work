import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  ExternalLink, 
  Check, 
  X, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/contentData';
import { ProductItem } from '../types';
import { buildPartnerUrl, getLegalDisclosure } from '../utils/affiliate';
import { handleImageError } from '../utils/imageFallback';

export const CatalogView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filtered = PRODUCTS_CATALOG.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceRub - b.priceRub;
    if (sortBy === 'price-desc') return b.priceRub - a.priceRub;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="text-xs uppercase tracking-wider font-semibold text-blue-800 mb-2 flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5" />
          Рекомендованное оборудование
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
          Каталог проверенной эргономики для дома
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Каждая позиция прошла проверку на соответствие ГОСТам, наличие гарантийных сервисов в РФ 
          и реальные отзывы пользователей без заказного маркетинга.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Categories Segmented buttons (Functional buttons allowed per design skill) */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'Все товары' },
            { id: 'desk', label: 'Столы' },
            { id: 'chair', label: 'Кресла' },
            { id: 'lighting', label: 'Свет' },
            { id: 'audio', label: 'Микрофоны' },
            { id: 'organization', label: 'Органайзеры' },
            { id: 'accessory', label: 'Аксессуары' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-stone-900 text-white shadow-xs' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-100 rounded-lg border border-transparent focus:border-stone-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-600 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-100 text-stone-800 py-1.5 px-2 rounded-lg border-none outline-none font-medium"
            >
              <option value="rating">По рейтингу</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div 
            key={prod.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img 
                  src={prod.imageUrl} 
                  alt={prod.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold text-stone-800 border border-stone-200">
                  {prod.brand}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{prod.rating}</span>
                    <span className="text-stone-700 font-normal">({prod.reviewsCount})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-stone-900 font-mono">
                      от {prod.priceRub.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-[10px] text-stone-700">в магазинах</div>
                  </div>
                </div>

                <h3 className="font-bold text-base text-stone-900 leading-snug mb-2 line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                  {prod.shortDesc}
                </p>

                {/* Specs Pill preview */}
                <div className="space-y-1 text-[11px] text-stone-500 pt-3 border-t border-stone-100 mb-2">
                  {Object.entries(prod.specs).slice(0, 2).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-stone-700">{key}:</span>
                      <span className="font-medium text-stone-800 truncate max-w-[140px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions with ERID */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-stone-150 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 py-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  Подробнее
                </button>

                <div className="flex items-center gap-1.5">
                  <a 
                    href={buildPartnerUrl(prod, 'yandex')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white transition-colors inline-flex items-center gap-1"
                  >
                    Я.Маркет
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>

                  <a 
                    href={buildPartnerUrl(prod, 'ozon')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors inline-flex items-center gap-1"
                  >
                    Ozon
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="mt-2 text-[10px] text-stone-700 font-mono text-center">
                {getLegalDisclosure(prod)}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/9 rounded-xl overflow-hidden mb-4 bg-stone-100">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{selectedProduct.brand}</span>
              <div className="text-xl font-bold font-mono text-stone-900">
                {selectedProduct.priceRub.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 mb-3">{selectedProduct.name}</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
              {selectedProduct.fullDesc}
            </p>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <div className="font-bold text-emerald-950 mb-2">Плюсы:</div>
                <div className="space-y-1 text-emerald-900">
                  {selectedProduct.pros.map((p, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200">
                <div className="font-bold text-rose-950 mb-2">Минусы:</div>
                <div className="space-y-1 text-rose-900">
                  {selectedProduct.cons.map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs Table */}
            <div className="mb-6">
              <h4 className="font-bold text-xs uppercase text-stone-500 tracking-wider mb-2">Характеристики:</h4>
              <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-150 text-xs">
                {Object.entries(selectedProduct.specs).map(([key, val]) => (
                  <div key={key} className="p-2.5 flex justify-between bg-stone-50/50">
                    <span className="text-stone-500">{key}</span>
                    <span className="font-semibold text-stone-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <div className="text-[10px] text-stone-700 font-mono">
                {getLegalDisclosure(selectedProduct)}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={buildPartnerUrl(selectedProduct, 'yandex')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white transition-colors text-center inline-flex items-center justify-center gap-1.5"
                >
                  Яндекс Маркет
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
                <a
                  href={buildPartnerUrl(selectedProduct, 'ozon')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors text-center inline-flex items-center justify-center gap-1.5"
                >
                  Ozon
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
