import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { ErgonomicsCalculatorView } from './components/ErgonomicsCalculatorView';
import { WorkspaceBuilderView } from './components/WorkspaceBuilderView';
import { ParentChecklistView } from './components/ParentChecklistView';
import { CatalogView } from './components/CatalogView';
import { AboutView } from './components/AboutView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsView } from './components/TermsView';
import { PublisherAdminModal } from './components/PublisherAdminModal';
import { InteractiveDiagnosticView } from './components/InteractiveDiagnosticView';
import { Footer } from './components/Footer';
import { ARTICLES_DATA, CATEGORIES } from './data/contentData';
import { Article, Category, NavTab } from './types';
import { Sliders, Compass, BookOpen, Layers, Lock, KeyRound, X, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('articles');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Dynamic reactive articles state with localStorage persistence
  const [articlesList, setArticlesList] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kd_custom_articles');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure newly added default articles (like travel guide under 'other') are merged
            const existingIds = new Set(parsed.map((a: Article) => a.id));
            const missingBaseline = ARTICLES_DATA.filter(a => !existingIds.has(a.id));
            if (missingBaseline.length > 0) {
              const merged = [...parsed, ...missingBaseline];
              localStorage.setItem('kd_custom_articles', JSON.stringify(merged));
              return merged;
            }
            return parsed;
          }
        }
      } catch {}
    }
    return ARTICLES_DATA;
  });

  const handleSaveArticles = (updated: Article[]) => {
    setArticlesList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kd_custom_articles', JSON.stringify(updated));
    }
  };

  const handleResetArticles = () => {
    setArticlesList(ARTICLES_DATA);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kd_custom_articles');
    }
  };

  // Initialize and sync route with browser URL / redirect from 404.html
  useEffect(() => {
    const parseRoute = (rawPath: string): NavTab | null => {
      const cleanPath = rawPath.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (cleanPath === 'calculator') return 'calculator';
      if (cleanPath === 'builder') return 'builder';
      if (cleanPath === 'checklist') return 'checklist';
      if (cleanPath === 'catalog') return 'articles';
      if (cleanPath === 'tests' || cleanPath === 'diagnostic' || cleanPath === 'quiz') return 'tests';
      if (cleanPath === 'about') return 'about';
      if (cleanPath === 'contacts') return 'about';
      if (cleanPath === 'privacy') return 'privacy';
      if (cleanPath === 'terms') return 'terms';
      if (cleanPath === 'articles') return 'articles';
      if (cleanPath === 'kd-admin-panel-2026' || cleanPath === 'admin') {
        setTimeout(() => handleRequestAdmin(), 100);
        return null;
      }
      return null;
    };

    // Check redirect stored by 404.html for GitHub Pages SPA
    const redirected = sessionStorage.getItem('kd_redirect_path');
    if (redirected) {
      sessionStorage.removeItem('kd_redirect_path');
      const tab = parseRoute(redirected);
      if (tab) {
        setActiveTab(tab);
      }
    } else {
      const initialTab = parseRoute(window.location.pathname);
      if (initialTab) {
        setActiveTab(initialTab);
      }
    }

    // Check URL parameters ?tab= or ?article=
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as NavTab | null;
    if (tabParam && ['articles', 'calculator', 'builder', 'checklist', 'catalog', 'tests', 'about', 'privacy', 'terms'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    const articleParam = params.get('article');
    if (articleParam) {
      setSelectedArticleId(articleParam);
    }

    // Keyboard shortcut Ctrl+Shift+A or URL parameter ?admin=1
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleRequestAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (params.get('admin') === '1' || params.get('admin') === 'true' || params.get('admin') === '2026') {
      sessionStorage.setItem('kd_admin_auth', 'true');
      setIsAdminModalOpen(true);
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const tab = parseRoute(window.location.pathname);
      setActiveTab(tab || 'articles');
      const curParams = new URLSearchParams(window.location.search);
      setSelectedArticleId(curParams.get('article'));
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleRequestAdmin = () => {
    if (sessionStorage.getItem('kd_admin_auth') === 'true') {
      setIsAdminModalOpen(true);
    } else {
      setPinInput('');
      setPinError(null);
      setIsPinModalOpen(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '2026') {
      sessionStorage.setItem('kd_admin_auth', 'true');
      setIsPinModalOpen(false);
      setIsAdminModalOpen(true);
    } else {
      setPinError('Неверный код доступа');
    }
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articlesList.filter(article => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.seo.primaryKeyword.toLowerCase().includes(q) ||
        article.sections.some((s: { content: string }) => s.content.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [articlesList, selectedCategory, searchQuery]);

  const selectedArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articlesList.find(a => a.id === selectedArticleId) || null;
  }, [articlesList, selectedArticleId]);

  const handleSelectArticle = (id: string | null) => {
    setSelectedArticleId(id);
    if (id) {
      window.history.pushState({}, '', `/?article=${encodeURIComponent(id)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', activeTab === 'articles' ? '/' : `/${activeTab}`);
    }
  };

  const handleNav = (tab: NavTab) => {
    setActiveTab(tab);
    setSelectedArticleId(null);
    const targetUrl = tab === 'articles' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNav}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectArticle={handleSelectArticle}
      />

      {/* Main Body Router */}
      <main className="flex-1">
        {activeTab === 'articles' && (
          <>
            {selectedArticle ? (
              <ArticleView
                article={selectedArticle}
                onBack={() => handleSelectArticle(null)}
                onOpenCalculator={() => handleNav('calculator')}
                onOpenTests={() => handleNav('tests')}
              />
            ) : (
              <div>
                {/* Hero only shown on main feed without search query */}
                {!searchQuery && (
                  <Hero
                    onOpenCalculator={() => handleNav('calculator')}
                    onOpenBuilder={() => handleNav('builder')}
                    onOpenChecklist={() => handleNav('checklist')}
                    onOpenTests={() => handleNav('tests')}
                    articlesCount={articlesList.length}
                  />
                )}

                {/* Articles Feed */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  
                  {/* Category Filter bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                        {searchQuery ? `Результаты поиска: «${searchQuery}»` : 'Экспертные гайды и обзоры'}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-500 mt-1">
                        Без воды, с разбором эргономики, маркировкой рекламы и готовыми решениями
                      </p>
                    </div>

                    {/* Segmented Category Buttons (Functional filter buttons per frontend design constitution) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                            selectedCategory === cat.id
                              ? 'bg-stone-900 text-white shadow-xs'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Articles Grid */}
                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {filteredArticles.map(article => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onSelect={handleSelectArticle}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
                      <p className="text-stone-500 text-sm mb-3">По вашему запросу статей не найдено.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  )}

                  {/* Value-First Interactive Promos below articles */}
                  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-purple-50/70 border border-purple-200 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase font-bold text-purple-800 tracking-wider mb-2 flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-purple-600" />
                          Интерактив 2026
                        </div>
                        <h3 className="text-lg font-bold text-stone-900 mb-2">
                          Тесты и диагностика удаленки
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                          4 увлекательных теста: аудит мебели и осанки, готовность к 100% удаленке по психотипу, 
                          индекс сенсорного выгорания и калькулятор сэкономленных часов жизни.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav('tests')}
                        className="self-start px-4 py-2 text-xs font-semibold bg-purple-900 text-white rounded-xl hover:bg-purple-800 transition-colors"
                      >
                        Пройти тесты (4 шт.) →
                      </button>
                    </div>

                    <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase font-bold text-amber-800 tracking-wider mb-2 flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-amber-600" />
                          ГОСТ 13025.3
                        </div>
                        <h3 className="text-lg font-bold text-stone-900 mb-2">
                          Персональная высота стола за 10 сек
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                          Введите свой рост и толщину подошвы обуви — калькулятор моментально рассчитает высоту 
                          столешницы для работы сидя и стоя, уровень верхнего края экрана и подставку для ног.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav('calculator')}
                        className="self-start px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors"
                      >
                        Рассчитать высоту стола →
                      </button>
                    </div>

                    <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider mb-2 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-emerald-600" />
                          Setup Builder
                        </div>
                        <h3 className="text-lg font-bold text-stone-900 mb-2">
                          Соберите комплект под бюджет
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                          Готовые сбалансированные сетапы: «Удаленный родитель (Тишина и фокус)», «Здоровая спина 360°» 
                          и «Старт до 35 000 ₽» со сравнением цен и прямой покупкой на российских маркетплейсах.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav('builder')}
                        className="self-start px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors"
                      >
                        Собрать свой сетап →
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'tests' && (
          <InteractiveDiagnosticView onNav={handleNav} />
        )}

        {activeTab === 'calculator' && (
          <ErgonomicsCalculatorView
            onOpenBuilder={() => handleNav('builder')}
          />
        )}

        {activeTab === 'builder' && (
          <WorkspaceBuilderView />
        )}

        {activeTab === 'checklist' && (
          <ParentChecklistView />
        )}

        {activeTab === 'catalog' && (
          <CatalogView />
        )}

        {activeTab === 'about' && (
          <AboutView onNav={handleNav} />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPolicyView onNav={handleNav} />
        )}

        {activeTab === 'terms' && (
          <TermsView onNav={handleNav} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNav={handleNav}
      />

      {/* Publisher / Client Admin Control Center */}
      <PublisherAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        articles={articlesList}
        onSaveArticles={handleSaveArticles}
        onResetArticles={handleResetArticles}
      />

      {/* Owner PIN Verification Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4">
            
            <button
              onClick={() => setIsPinModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">Доступ владельца</h3>
                <p className="text-xs text-stone-500">Панель управления KabinetDoma.ru</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Введите PIN-код доступа:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(null);
                    }}
                    placeholder="••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-stone-900 focus:outline-hidden tracking-widest text-center font-mono font-bold text-lg"
                  />
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {pinError && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{pinError}</p>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="w-1/2 px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="w-1/2 px-3 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors shadow-xs"
                >
                  Войти
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
