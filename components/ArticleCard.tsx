import React from 'react';
import { ArrowUpRight, Clock, Eye, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { CATEGORIES } from '../data/contentData';
import { handleImageError } from '../utils/imageFallback';

interface ArticleCardProps {
  article: Article;
  onSelect: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  const categoryLabel = CATEGORIES.find(c => c.id === article.category)?.label || 'Гайд';
  const isAi = article.isAiGenerated || article.generatedBy === 'gemini';

  return (
    <article 
      onClick={() => onSelect(article.id)}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
    >
      {/* Cover image container */}
      <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
        <img 
          src={article.heroImage} 
          alt={article.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
        {isAi && (
          <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-stone-700/50">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>ИИ-ассистент</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Zero-pill discipline (clean text with typographic separators) */}
          <div className="flex items-center gap-2 text-xs text-stone-700 font-medium mb-2.5 flex-wrap">
            <span className="text-amber-800 font-semibold">{categoryLabel}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-700" />
              {article.readTimeMin} мин
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-stone-700" />
              {article.views}
            </span>
            {isAi && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3 h-3" />
                  Сгенерировано ИИ
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info: Author & CTA */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-5 h-5 rounded-full object-cover" 
            />
            <span className="truncate max-w-[120px] sm:max-w-none">{article.author.name}</span>
          </div>

          <span className="text-stone-900 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Читать
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
          </span>
        </div>
      </div>
    </article>
  );
};
