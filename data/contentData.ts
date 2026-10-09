import { Article, CategoryInfo, LaunchChecklistItem, ProductItem, SetupPreset } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'Все материалы', description: 'Полная база знаний по эргономике и продуктивности', count: 18 },
  { id: 'balance', label: 'Баланс и продуктивность', description: 'Work-Life Balance, защита от выгорания, ритуалы перехода и тайм-менеджмент', count: 4 },
  { id: 'organization', label: 'Планировка и порядок', description: 'Выбор комнаты, расположение у окна, кабель-менеджмент', count: 3 },
  { id: 'ergonomics', label: 'Эргономика и здоровье', description: 'Здоровая осанка, настройки стола, стула и монитора', count: 4 },
  { id: 'furniture', label: 'Столы и кресла', description: 'Тесты электростолов, ортопедических кресел и подставок', count: 4 },
  { id: 'lighting-sound', label: 'Свет и микрофоны', description: 'Скринбары, рассеянный свет, ENC-гарнитуры и петлички', count: 2 },
  { id: 'with-kids', label: 'Удаленка с детьми', description: 'Зонирование, фокус, созвоны без шума и режим дня', count: 2 },
  { id: 'other', label: 'Прочее', description: 'Удаленка в поездках, цифровой номадизм, техника в дорогу и нестандартные форматы', count: 1 },
];

export const POPULAR_TAGS: string[] = [
  'Баланс',
  'Work-Life',
  'Эргономика',
  'Осанка',
  'Кресла',
  'Столы',
  'Освещение',
  'Звук и шум',
  'С детьми',
  'Кабель-менеджмент',
  'Поездки',
  'Тайм-менеджмент',
  'Биоритмы и сон',
  'Бюджетный сетап',
  'Здоровье спины',
  'Микрофоны',
  'Планировка',
  'Компактная квартира'
];

/**
 * Returns tags for an article, falling back to smart contextual tags if undefined
 */
export function getTagsForArticle(article: { category?: string; title?: string; tags?: string[] }): string[] {
  if (article.tags && article.tags.length > 0) return article.tags;
  const t = (article.title || '').toLowerCase();
  const c = article.category || '';
  const tags: string[] = [];

  if (c === 'balance' || /баланс|выгоран|отдых|стресс|work-life|сон|ритуал|жизн/i.test(t)) {
    tags.push('Баланс', 'Work-Life', 'Биоритмы и сон');
  }
  if (c === 'with-kids' || /дет|малыш|семь/i.test(t)) {
    tags.push('С детьми', 'Зонирование');
  }
  if (c === 'furniture' || /стол|электропривод|подъемн/i.test(t)) {
    tags.push('Столы', 'Эргономика');
  }
  if (/кресл|стул|поясниц/i.test(t)) {
    tags.push('Кресла', 'Осанка');
  }
  if (c === 'lighting-sound' || /свет|скринбар|лампа/i.test(t)) {
    tags.push('Освещение');
  }
  if (/микрофон|звук|шум|акустик|гарнитур/i.test(t)) {
    tags.push('Звук и шум', 'Микрофоны');
  }
  if (c === 'organization' || /кабел|провод|порядок|зонирован/i.test(t)) {
    tags.push('Кабель-менеджмент', 'Планировка');
  }
  if (c === 'travel' || c === 'other' || /поездк|дорог|номад|отпуск/i.test(t)) {
    tags.push('Поездки', 'Автономность');
  }
  if (/бюджет|2500|недорого|с нуля/i.test(t)) {
    tags.push('Бюджетный сетап');
  }
  if (tags.length === 0) {
    tags.push('Эргономика', 'Продуктивность');
  }
  return Array.from(new Set(tags));
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'ergostol-terra',
    name: 'Ergostol Terra (электрорегулировка)',
    brand: 'Ergostol',
    category: 'desk',
    shortDesc: 'Стол с двухмоторным приводом, памятью на 4 положения и защитой от зажима',
    fullDesc: 'Один из самых надежных регулируемых столов на российском рынке. Два тихих мотора плавно поднимают до 120 кг со скоростью 38 мм/с. Столешница из березовой фанеры или ЛДСП Egger устойчива к царапинам и прогибу.',
    priceRub: 38900,
    rating: 4.9,
    reviewsCount: 312,
    pros: ['Два мотора и плавный ход без вибраций', 'Память высоты на 4 пресета', 'Гарантия 5 лет в РФ', 'Широкий диапазон 62–128 см (подходит и детям, и высоким взрослым)'],
    cons: ['Тяжелая рама (более 28 кг)', 'Сборка требует шуруповерта'],
    specs: {
      'Грузоподъемность': '120 кг',
      'Диапазон высоты': '62–128 см',
      'Скорость подъема': '38 мм/сек',
      'Уровень шума': '< 45 дБ',
      'Гарантия': '5 лет'
    },
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=стол+с+электроприводом+Ergostol+Terra',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=стол+с+электроприводом+Ergostol+Terra',
    ozonUrl: 'https://www.ozon.ru/search/?text=Стол+с+электроприводом+Ergostol+Terra&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=стол+с+электроприводом+Ergostol',
    erid: '2VtzquvX8fP',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'metta-samurai-s3',
    name: 'Metta Samurai S-3.05 (Сетка)',
    brand: 'Метта',
    category: 'chair',
    shortDesc: 'Сетчатое эргономичное кресло с раздельной синхромеханикой и поддержкой поясницы',
    fullDesc: 'Легендарное кресло уфимского завода Метта. Стальной цельнолитой каркас с 10-летней гарантией. Сетка из сверхпрочной арамидной нити не провисает годами и обеспечивает отличную вентиляцию спины даже летом.',
    priceRub: 24900,
    rating: 4.8,
    reviewsCount: 840,
    pros: ['Сверхпрочный стальной каркас', 'Дышащая сетка (спина не потеет летом)', 'Синхромеханика Multiblock со смещенной осью качания', 'Регулируемый по высоте и глубине поясничный валик'],
    cons: ['Жестковато для любителей мягких кожаных кресел', 'Подлокотники 2D (нет регулировки угла поворота в базовой версии)'],
    specs: {
      'Макс. нагрузка': '120 кг',
      'Материал обивки': 'Сетка Kevlar / Арамид',
      'Механизм': 'Multiblock со смещением оси',
      'Крестовина': 'Литой хромированный металл'
    },
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328a37db71a?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'ВсеИнструменты / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=кресло+Метта+Самурай+S-3',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=кресло+Метта+Самурай+S-3',
    ozonUrl: 'https://www.ozon.ru/search/?text=Кресло+Метта+Самурай+S-3&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Метта+Самурай+S-3',
    erid: '2VtzquwY9aK',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'sihoo-doro-c300',
    name: 'SIHOO Doro C300 Ergonomic Chair',
    brand: 'SIHOO',
    category: 'chair',
    shortDesc: 'Динамическая поясничная опора с системой автоподстройки угла наклона тела',
    fullDesc: 'Флагман среднего ценового сегмента. Поясничный блок плавно следует за естественными микродвижениями позвоночника. Подлокотники 3D с мягким полиуретаном разгружают плечи при наборе текста.',
    priceRub: 34500,
    rating: 4.9,
    reviewsCount: 420,
    pros: ['Подвижная 3D-поддержка поясницы под любой наклон', 'Мягкие 3D-подлокотники с широким диапазоном настроек', 'Широкий подголовник для расслабления шейного отдела'],
    cons: ['Пластиковая крестовина (но армированная нейлоном)', 'Цена в РФ колеблется из-за курса'],
    specs: {
      'Макс. нагрузка': '135 кг',
      'Механизм': 'Синхронный со слайдером сиденья',
      'Газлифт': 'Class 4 (TUV сертифицирован)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Алиэкспресс РФ',
    admitadUrl: 'https://market.yandex.ru/search?text=эргономичное+кресло+SIHOO+Doro+C300',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=эргономичное+кресло+SIHOO+Doro+C300',
    ozonUrl: 'https://www.ozon.ru/search/?text=SIHOO+Doro+C300&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=SIHOO+Doro+C300',
    erid: '2VtzqumN5xB',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'xiaomi-lightbar',
    name: 'Xiaomi Mi Computer Monitor Light Bar (1S)',
    brand: 'Xiaomi',
    category: 'lighting',
    shortDesc: 'Асимметричный скринбар на монитор с беспроводным пультом управления',
    fullDesc: 'Идеальное освещение рабочей зоны без бликов на экране монитора и без слепящего прямого света в глаза. Беспроводной пульт-шайба позволяет регулировать яркость и цветовую температуру (2700K–6500K) одним движением пальца.',
    priceRub: 4290,
    rating: 4.95,
    reviewsCount: 1850,
    pros: ['Асимметричная оптика (нулевые блики на матрице экрана)', 'Удобный беспроводной поворотный пульт', 'CRI > 90 (естественная передача цветов)', 'Не занимает место на столе'],
    cons: ['Питание по USB-C (нужен порт 5V/1A или блочок)', 'Крепление слабо подходит для очень толстых или изогнутых мониторов > 1500R'],
    specs: {
      'Индекс цветопередачи': 'Ra95',
      'Цветовая температура': '2700K–6500K',
      'Мощность': '5 Вт (USB Type-C)',
      'Управление': 'Беспроводная 2.4 GHz шайба'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=Xiaomi+Monitor+Light+Bar+1S+скринбар',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=Xiaomi+Monitor+Light+Bar+1S+скринбар',
    ozonUrl: 'https://www.ozon.ru/search/?text=Xiaomi+Mi+Computer+Monitor+Light+Bar&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Xiaomi+Monitor+Light+Bar',
    erid: '2VtzqukJ8vP',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'benq-screenbar-halo',
    name: 'BenQ ScreenBar Halo',
    brand: 'BenQ',
    category: 'lighting',
    shortDesc: 'Премиум скринбар с тыловой подсветкой стены для защиты зрения в темноте',
    fullDesc: 'Золотой стандарт освещения рабочего стола. Помимо мощного переднего луча с запатентованным оптическим фильтром, имеет задний светильник для равномерного освещения фоновой стены, что снижает контрастную нагрузку на сетчатку глаза на 60%.',
    priceRub: 19800,
    rating: 4.98,
    reviewsCount: 210,
    pros: ['Тыловая фоновая подсветка стены (Ambient light)', 'Интеллектуальный авто-датчик освещенности', 'Идеально садится на изогнутые мониторы', 'Сенсорный беспроводной пульт'],
    cons: ['Высокая цена', 'Требует мощного питания (USB 5V/1.5A)'],
    specs: {
      'Освещенность': '1000 люкс в центре',
      'CRI': '> 95',
      'Совместимость': 'Плоские и изогнутые экраны 1000R-1800R'
    },
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Ситилинк',
    admitadUrl: 'https://market.yandex.ru/search?text=BenQ+ScreenBar+Halo',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=BenQ+ScreenBar+Halo',
    ozonUrl: 'https://www.ozon.ru/search/?text=BenQ+ScreenBar+Halo&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=BenQ+ScreenBar',
    erid: '2VtzqurB4bY',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'jabra-evolve2-65',
    name: 'Jabra Evolve2 65 Flex (ENC микрофон)',
    brand: 'Jabra',
    category: 'audio',
    shortDesc: 'Беспроводная бизнес-гарнитура со складной штангой и шумоподавлением микрофона уровня студии',
    fullDesc: 'Спасение для созвонов в квартире с детьми. Штанга с тремя цифровыми MEMS-микрофонами отсекает плач ребенка, пылесос и шум посуды на расстоянии уже 1 метра от вас. Собеседники в Zoom или Телемосте слышат только ваш чистый голос.',
    priceRub: 23500,
    rating: 4.88,
    reviewsCount: 390,
    pros: ['Абсолютное подавление фоновых бытовых шумов', 'Индикатор занятости Busylight (ребенок видит красный огонек)', 'Складная компактная конструкция', 'До 32 часов работы от одного заряда'],
    cons: ['Накладная посадка (может давить при ношении более 4 часов подряд)', 'Пассивное шумоподавление динамиков среднее'],
    specs: {
      'Тип микрофона': '3 цифровых MEMS с чипсетом ENC',
      'Автономность': '32 часа',
      'Связь': 'Bluetooth 5.2 + USB-адаптер Jabra Link 380',
      'Индикатор занятости': 'Красный круговой LED светодиод'
    },
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ситилинк / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=Jabra+Evolve2+65+гарнитура',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=Jabra+Evolve2+65+гарнитура',
    ozonUrl: 'https://www.ozon.ru/search/?text=Jabra+Evolve2+65&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Jabra+Evolve2+65',
    erid: '2VtzqupL3kQ',
    ordAdvertiser: 'ООО «Ситилинк», ИНН 7718979307'
  },
  {
    id: 'fifine-k688',
    name: 'Fifine K688 (Динамический XLR/USB микрофон)',
    brand: 'Fifine',
    category: 'audio',
    shortDesc: 'Динамический кардиоидный микрофон: ловит только голос и игнорирует эхо комнаты',
    fullDesc: 'В отличие от конденсаторных микрофонов, которые ловят шум за три комнаты, динамический капсюль K688 захватывает звук в радиусе 10–15 см. Двойное подключение USB и XLR позволяет начать сразу с ноутбуком, а позже подключить аудиокарту.',
    priceRub: 6490,
    rating: 4.92,
    reviewsCount: 1120,
    pros: ['Динамический капсюль (не ловит эхо голой комнаты и шум соседей)', 'Сенсорная кнопка глушения Mute со светодиодом', 'Выход на наушники с прямым мониторингом без задержки', 'Металлический корпус и паук-амортизатор в комплекте'],
    cons: ['Нужно говорить близко к микрофону (до 15 см)', 'Требуется пантограф на край стола'],
    specs: {
      'Тип капсюля': 'Динамический кардиоидный',
      'Интерфейсы': 'USB Type-C + XLR',
      'Частотный диапазон': '70 Гц – 15 000 Гц',
      'Кнопка глушения': 'Сенсорная на верхней крышке'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / WB',
    admitadUrl: 'https://market.yandex.ru/search?text=Fifine+K688+микрофон',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=Fifine+K688+микрофон',
    ozonUrl: 'https://www.ozon.ru/search/?text=Fifine+K688&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Fifine+K688',
    erid: '2VtzqucD1mZ',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'onkron-g80',
    name: 'Кронштейн для монитора ONKRON G80 (газлифт)',
    brand: 'ONKRON',
    category: 'accessory',
    shortDesc: 'Надежный настольный газлифт-кронштейн для экранов 13–32 дюйма весом до 8 кг',
    fullDesc: 'Освобождает до 40% полезной площади стола. Позволяет выставить верхнюю кромку монитора строго на уровень глаз, предотвращая наклон головы вперед и снимая до 15 кг статической нагрузки с шейных позвонков.',
    priceRub: 3290,
    rating: 4.94,
    reviewsCount: 2640,
    pros: ['Мягкий газлифт для регулировки одним пальцем', 'Встроенный скрытый кабель-канал', 'Два типа крепления: струбцина к краю или через отверстие в столе', 'VESA 75x75 и 100x100'],
    cons: ['Требуется отрегулировать жесткость пружины под вес экрана'],
    specs: {
      'Диагональ экрана': '13–32 дюйма',
      'Нагрузка': '2–8 кг',
      'Стандарты VESA': '75x75, 100x100 мм',
      'Вращение (Pivot)': '360° (портретный режим)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'ВсеИнструменты / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=ONKRON+G80+кронштейн+для+монитора',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=ONKRON+G80+кронштейн+для+монитора',
    ozonUrl: 'https://www.ozon.ru/search/?text=ONKRON+G80&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=ONKRON+G80',
    erid: '2VtzquvF8tK',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'cable-management-kit',
    name: 'Подвесной лоток кабель-менеджмента под стол',
    brand: 'ErgoSteel',
    category: 'organization',
    shortDesc: 'Металлический корзинный лоток на струбцинах (без сверления столешницы)',
    fullDesc: 'Решает главную проблему висящих проводов. Струбцины надежно фиксируются за 2 минуты без повреждения мебели. Внутрь свободно помещается удлинитель на 6–8 розеток и массивные блоки питания ноутбуков и мониторов.',
    priceRub: 1850,
    rating: 4.86,
    reviewsCount: 540,
    pros: ['Установка без сверления (мягкие накладки на струбцинах)', 'Вместительный (длина 40 см, глубина 12 см)', 'Вентилируемая решетка (блоки питания не перегреваются)'],
    cons: ['Не подходит к столам с глубокой царгой толще 5 см'],
    specs: {
      'Размеры': '40 x 12 x 15 см',
      'Толщина столешницы': 'до 50 мм',
      'Материал': 'Углеродистая сталь с порошковой покраской'
    },
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Wildberries / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=кабель+канал+под+стол+сетка+органайзер',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=кабель+канал+под+стол+сетка+органайзер',
    wbUrl: 'https://www.wildberries.ru/search?query=кабель+канал+под+стол',
    ozonUrl: 'https://www.ozon.ru/search/?text=Лоток+для+кабель+менеджмента+под+стол&from_global=true',
    erid: '2VtzquwQ4zR',
    ordAdvertiser: 'ООО «Вайлдберриз», ИНН 7721546864'
  },
  {
    id: 'ugreen-gan-100w',
    name: 'GaN-зарядка Ugreen Nexode 100W (4 порта USB-C / USB-A)',
    brand: 'Ugreen',
    category: 'accessory',
    shortDesc: 'Универсальный ультракомпактный блок питания для ноутбука, смартфона и наушников в дорогу',
    fullDesc: 'Заменяет собой сразу 4 громоздких адаптера питания. Поддерживает протоколы Power Delivery 3.0 и Quick Charge 4+, позволяя одновременно быстро заряжать рабочий ноутбук на 65–100 Вт, телефон и пауэрбанк от одной розетки в отеле, поезде или аэропорту.',
    priceRub: 4890,
    rating: 4.9,
    reviewsCount: 640,
    pros: ['Выдает честные 100 Вт на один порт для мощных ноутбуков', 'Компактные размеры на основе нитрида галлия (GaN)', 'Защита от перегрева и скачков напряжения в зарубежных сетях'],
    cons: ['При подключении второго кабеля кратковременно перезагружает порты на 1 секунду'],
    specs: {
      'Мощность': 'до 100 Вт',
      'Порты': '3x USB-C + 1x USB-A',
      'Технология': 'GaN Fast',
      'Вес': '235 г'
    },
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=ugreen+nexode+100w+gan',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=ugreen+nexode+100w+gan',
    ozonUrl: 'https://www.ozon.ru/search/?text=ugreen+nexode+100w+gan&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=ugreen+100w+gan',
    erid: '2VtzquvX8fP',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'baseus-blade-powerbank',
    name: 'Тонкий пауэрбанк для ноутбука Baseus Blade 100W (20 000 мАч)',
    brand: 'Baseus',
    category: 'accessory',
    shortDesc: 'Плоский аккумулятор толщиной 18 мм для автономной работы с ноутбуком в поездках и кафе',
    fullDesc: 'Уникальный плоский форм-фактор позволяет носить пауэрбанк в одном кармане с ноутбуком. Выдает ток до 100 Вт через USB-C, продлевая время работы ноутбука на 4–6 дополнительных часов в условиях отсутствия розеток или внезапного отключения света.',
    priceRub: 6490,
    rating: 4.8,
    reviewsCount: 420,
    pros: ['Помещается в плоскую сумку для ноутбука', 'Информативный дисплей с процентом заряда и временем работы', 'Разрешен к провозу в ручной клади самолетов (74 Вт·ч)'],
    cons: ['Глянцевый дисплей может собирать микроцарапины без чехла'],
    specs: {
      'Емкость': '20 000 мАч (74 Вт·ч)',
      'Выходная мощность': 'до 100 Вт (Power Delivery)',
      'Толщина': '18 мм',
      'Быстрая зарядка': 'QC 4.0, PD 3.0'
    },
    imageUrl: 'https://images.unsplash.com/photo-1609592424368-c115712e09b5?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=baseus+blade+100w+powerbank',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=baseus+blade+100w+powerbank',
    ozonUrl: 'https://www.ozon.ru/search/?text=baseus+blade+100w+powerbank&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=baseus+blade+100w',
    erid: '2VtzquvX8fP',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'moft-laptop-stand',
    name: 'Складная невидимая подставка для ноутбука MOFT Adhesive Stand',
    brand: 'MOFT',
    category: 'accessory',
    shortDesc: 'Ультратонкая (3 мм) складная подставка на дно ноутбука с углами 15° и 25°',
    fullDesc: 'Идеальное решение для мобильной работы. Наклеивается на нижнюю крышку ноутбука, практически не добавляет веса (всего 85 г) и раскладывается одним движением пальца. Приподнимает экран на 5–8 см, спасая шейный отдел позвоночника при работе за низкими журнальными столиками в гостиницах, поездах и кафе.',
    priceRub: 2490,
    rating: 4.88,
    reviewsCount: 780,
    pros: ['Толщина всего 3 мм — ноутбук легко помещается в обычный чехол', 'Два удобных угла наклона: 15° (печать текста) и 25° (просмотр созвонов)', 'Многоразовый клеевой слой — не оставляет следов на алюминии', 'Выдерживает нагрузку до 8 кг'],
    cons: ['Не подходит к ноутбукам с вентиляционными решетками прямо по центру дна'],
    specs: {
      'Толщина': '3 мм',
      'Вес': '85 г',
      'Углы наклона': '15° и 25°',
      'Материал': 'Стекловолокно и премиальная экокожа'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=подставка+для+ноутбука+moft',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=подставка+для+ноутбука+moft',
    ozonUrl: 'https://www.ozon.ru/search/?text=moft+подставка+для+ноутбука&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=moft+подставка',
    erid: '2VtzquvX8fP',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'travel-adapter-universal',
    name: 'Универсальный дорожный адаптер с розетками всего мира + USB-C PD 35W',
    brand: 'Lencent',
    category: 'accessory',
    shortDesc: 'Сетевой адаптер с выдвижными вилками UK / US / EU / AU и портами для быстрой зарядки',
    fullDesc: 'Незаменимый гаджет для поездок по России и за рубеж. Оснащен встроенным механизмом выдвижения вилок под стандарты Великобритании, США, стран Азии и Европы. Защищен самовосстанавливающимся предохранителем на 10А от скачков напряжения в ветхих электросетях.',
    priceRub: 1990,
    rating: 4.92,
    reviewsCount: 950,
    pros: ['Работает более чем в 150 странах мира', 'Встроенный порт USB-C Power Delivery 35W для смартфона и планшета', 'Автоматический предохранитель с защитой от детей', 'Компактный кубический корпус'],
    cons: ['Не преобразует напряжение 110В в 220В (нужна поддержка техникой 100-240V)'],
    specs: {
      'Поддерживаемые типы': 'US, UK, EU, AU (Типы A, C, G, I)',
      'Максимальная мощность': 'до 2500 Вт при 250В',
      'Порты': '2x USB-C + 2x USB-A + универсальная розетка'
    },
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=универсальный+дорожный+адаптер+переходник',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=универсальный+дорожный+адаптер+переходник',
    ozonUrl: 'https://www.ozon.ru/search/?text=дорожный+адаптер+переходник&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=дорожный+адаптер+переходник',
    erid: '2VtzquvX8fP',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'chair-budget-burokrat',
    name: 'Бюрократ KB-8 (Сетка, поясничный упор)',
    brand: 'Бюрократ',
    category: 'chair',
    shortDesc: 'Бюджетное эргономичное кресло с дышащей спинкой и анатомическим поясничным валиком',
    fullDesc: 'Идеальный вариант при ограниченном бюджете до 7 000 ₽. Сетка обеспечивает циркуляцию воздуха, а регулируемый по высоте поясничный валик надежно удерживает нижний отдел спины, предотвращая сутулость. Оснащено механизмом качания с регулировкой под вес.',
    priceRub: 6890,
    rating: 4.75,
    reviewsCount: 1420,
    pros: ['Доступная цена до 7 000 ₽', 'Дышащая акриловая сетка', 'Регулируемый валик под поясницу', 'Плавный газлифт 3 класса'],
    cons: ['Пластиковая крестовина (нагрузка до 120 кг)', 'Фиксированные подлокотники без регулировки высоты'],
    specs: {
      'Макс. нагрузка': '120 кг',
      'Материал': 'Сетка + износостойкая ткань',
      'Механизм': 'Топ-ган с фиксацией в рабочем положении',
      'Высота сиденья': '46–56 см'
    },
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328a37db71a?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=кресло+Бюрократ+KB-8',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=кресло+Бюрократ+KB-8',
    ozonUrl: 'https://www.ozon.ru/search/?text=Бюрократ+KB-8&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Бюрократ+KB-8',
    erid: '2VtzquvKB8B',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'chair-chairman-795',
    name: 'Chairman 795 Ergo (Хром, синхромеханика)',
    brand: 'Chairman',
    category: 'chair',
    shortDesc: 'Оптимальный средний класс: хромированное пятилучие и синхронный механизм отклонения 1:2',
    fullDesc: 'Золотая середина для ежедневной работы по 8–10 часов. Стальное пятилучие выдерживает до 130 кг. Синхромеханика разгружает мышцы бедер при откидывании, сохраняя стопы на полу.',
    priceRub: 13900,
    rating: 4.82,
    reviewsCount: 680,
    pros: ['Синхромеханика 1:2 с фиксацией в 3 положениях', 'Хромированный цельный металл крестовины', 'Плотный формованный ППУ сиденья не просиживается'],
    cons: ['Подголовник не регулируется по вылету вперед'],
    specs: {
      'Макс. нагрузка': '130 кг',
      'Крестовина': 'Хромированная сталь',
      'Механизм': 'Синхронный со смещенной осью',
      'Гарантия': '2 года'
    },
    imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=кресло+Chairman+795',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=кресло+Chairman+795',
    ozonUrl: 'https://www.ozon.ru/search/?text=Chairman+795&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Chairman+795',
    erid: '2VtzquvCH79',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'chair-ergohuman-plus',
    name: 'Ergohuman Plus Elite (Алюминий, 5D адаптация)',
    brand: 'Comfort Workspace',
    category: 'chair',
    shortDesc: 'Премиальное ортопедическое кресло из литого алюминия с динамической поддержкой 24/7',
    fullDesc: 'Вершина современной эргономики. Цельнолитой полированный алюминиевый каркас, эластомерная сетка со сбалансированным натяжением в 7 зонах тела и синхромеханика с плавной кинематикой качания.',
    priceRub: 68500,
    rating: 4.96,
    reviewsCount: 190,
    pros: ['Полностью литой монокок из полированного алюминия', 'Автоматически адаптирующийся поясничный блок', '5D подлокотники под смартфон, клавиатуру и планшет', 'Срок службы более 12 лет'],
    cons: ['Премиальная цена', 'Вес конструкции более 30 кг'],
    specs: {
      'Макс. нагрузка': '150 кг',
      'Каркас': 'Литой авиационный алюминий',
      'Сетка': 'Matrex Elastomer USA',
      'Гарантия': '5 лет в РФ'
    },
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328a37db71a?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Салоны Эргономики',
    admitadUrl: 'https://market.yandex.ru/search?text=кресло+Ergohuman+Plus+Elite',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=кресло+Ergohuman+Plus+Elite',
    ozonUrl: 'https://www.ozon.ru/search/?text=Ergohuman+Plus+Elite&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Ergohuman+Plus',
    erid: '2VtzquvEH88',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'desk-loft-wood-budget',
    name: 'Письменный стол Hoff Loft Wood 120х60',
    brand: 'Hoff Loft',
    category: 'desk',
    shortDesc: 'Прочный базовый стол на стальном замкнутом металлокаркасе со столешницей 22 мм',
    fullDesc: 'Отличное решение для стартового домашнего офиса. Сварной профиль 40х20 мм обеспечивает монолитную устойчивость без шатания при интенсивном наборе текста. Порошковая окраска устойчива к сколам.',
    priceRub: 5990,
    rating: 4.8,
    reviewsCount: 890,
    pros: ['Жесткий металлический каркас без раскачки', 'Столешница 22 мм с антискольной кромкой 2 мм', 'Легкая сборка за 15 минут'],
    cons: ['Фиксированная стандартная высота 75 см (требуется подставка для ног при росте < 175 см)'],
    specs: {
      'Размеры': '120 x 60 x 75 см',
      'Толщина столешницы': '22 мм',
      'Каркас': 'Сталь 40х20 мм с порошковым покрытием',
      'Макс. нагрузка': '90 кг'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Hoff',
    admitadUrl: 'https://market.yandex.ru/search?text=стол+письменный+лофт+120х60',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=стол+письменный+лофт+120х60',
    ozonUrl: 'https://www.ozon.ru/search/?text=стол+письменный+лофт+120+60&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=стол+лофт+120+60',
    erid: '2VtzquvHL12',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'desk-loctek-et114',
    name: 'Подъемный стол Loctek / Eureka Basic (1 мотор, память)',
    brand: 'Loctek',
    category: 'desk',
    shortDesc: 'Доступный стол с электроподъемом, дисплеем высоты и 4 пресетами памяти',
    fullDesc: 'Самый доступный способ внедрить смену поз «сидя-стоя» в свой рабочий график. Тихий одномоторный привод поднимает до 70 кг со скоростью 25 мм/с. Пульт с индикацией миллиметров и памятью под любимые уровни.',
    priceRub: 21900,
    rating: 4.84,
    reviewsCount: 510,
    pros: ['Электроподъем по цене обычного офисного стола', 'Память на 4 кнопки (сидя, стоя, для ребенка)', 'Плавный старт и защита от перегрузки'],
    cons: ['Один мотор (скорость подъема чуть ниже двухмоторных)', 'Грузоподъемность 70 кг (достаточно для 2 мониторов и ПК)'],
    specs: {
      'Диапазон высоты': '71–119 см',
      'Грузоподъемность': '70 кг',
      'Столешница': '120 x 60 см в комплекте',
      'Уровень шума': '< 50 дБ'
    },
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=подъемный+стол+Loctek+электропривод',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=подъемный+стол+Loctek+электропривод',
    ozonUrl: 'https://www.ozon.ru/search/?text=подъемный+стол+Loctek&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=подъемный+стол+Loctek',
    erid: '2VtzquvLT14',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'lumbar-cushion-memory',
    name: 'Анатомическая подушка под поясницу с эффектом памяти (Memory Foam)',
    brand: 'ErgoSpine',
    category: 'accessory',
    shortDesc: 'Мгновенно превращает обычный жесткий стул в ортопедическое место за 1 490 ₽',
    fullDesc: 'Лучший бюджетный лайфхак против боли в пояснице. Высокоплотная пена Memory Foam заполняет анатомический прогиб (лордоз L1-L5), не позволяя тазу сползать вперед. Два эластичных ремня с защелками надежно крепят подушку к любому офисному или кухонному стулу.',
    priceRub: 1490,
    rating: 4.9,
    reviewsCount: 3890,
    pros: ['Эффективное снятие боли в пояснице всего за 1 490 ₽', 'Эффект памяти Memory Foam без усадки со временем', 'Дышащий чехол 3D-сетка на молнии (легко стирать)', 'Подходит для дома, офиса и автокресла'],
    cons: ['Первые 2 дня требует привыкания к правильному прогибу спины'],
    specs: {
      'Наполнитель': '100% пенополиуретан с эффектом памяти',
      'Чехол': 'Съемный «дышащая сетка»',
      'Крепление': '2 регулируемых ремня с фастексами',
      'Размеры': '42 x 38 x 12 см'
    },
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Wildberries / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=подушка+под+поясницу+ортопедическая+memory+foam',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=подушка+под+поясницу+ортопедическая+memory+foam',
    ozonUrl: 'https://www.ozon.ru/search/?text=подушка+под+поясницу+ортопедическая+память&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=подушка+под+поясницу+ортопедическая',
    erid: '2VtzquvMF90',
    ordAdvertiser: 'ООО «Вайлдберриз», ИНН 7721546864'
  },
  {
    id: 'ergonomic-footrest-adjustable',
    name: 'Анатомическая подставка для ног с массажной поверхностью',
    brand: 'ErgoFeet Pro',
    category: 'accessory',
    shortDesc: 'Снимает застой крови и сдавливание подколенных сосудов при стандартной высоте стола',
    fullDesc: 'Обязательный аксессуар для людей ростом до 175 см, работающих за стандартными столами 75 см. Позволяет поднять кресло на нужную высоту подлокотников, сохраняя надежную опору стоп под физиологическим углом 15–20 градусов.',
    priceRub: 1890,
    rating: 4.88,
    reviewsCount: 2150,
    pros: ['Свободная регулировка угла наклона от 0 до 30 градусов', 'Массажные ролики в центре для стимуляции кровообращения', 'Прорезиненные ножки не скользят по ламинату и плитке'],
    cons: ['Пластиковый корпус (не вставать полным весом)'],
    specs: {
      'Угол наклона': '0°–30° (плавающий механизм качания)',
      'Размер платформы': '45 x 34 см',
      'Материал': 'Ударопрочный ABS-пластик с резиновыми вставками'
    },
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=подставка+для+ног+ортопедическая+офисная',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=подставка+для+ног+ортопедическая+офисная',
    ozonUrl: 'https://www.ozon.ru/search/?text=подставка+для+ног+офисная+массажная&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=подставка+для+ног+офисная',
    erid: '2VtzquvFR89',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'laptop-stand-aluminum-folding',
    name: 'Алюминиевая складная подставка для ноутбука Ugreen / Baseus',
    brand: 'Ugreen',
    category: 'accessory',
    shortDesc: 'Поднимает дисплей ноутбука на уровень глаз (6 углов) и складывается в узкий чехол',
    fullDesc: 'Разгружает шейный отдел позвоночника, устраняя привычку «смотреть вниз в экран ноутбука». 6 уровней высоты позволяют точно совместить экран с горизонтом зрения. Открытый алюминиевый каркас работает как пассивный радиатор, охлаждая ноутбук на 8–10 градусов.',
    priceRub: 1690,
    rating: 4.93,
    reviewsCount: 4120,
    pros: ['Литой анодированный алюминий с силиконовыми накладками', '6 ступеней регулировки угла (15°–45°)', 'Складывается в узкий брусок шириной 4 см (чехол в комплекте)', 'Выдерживает тяжелые ноутбуки до 17.3 дюймов'],
    cons: ['Для комфортной печати требует внешнюю клавиатуру'],
    specs: {
      'Материал': 'Алюминиевый сплав + антискользящий силикон',
      'Совместимость': 'Ноутбуки и планшеты от 10 до 17.3 дюймов',
      'Вес': '240 г'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=подставка+для+ноутбука+алюминиевая+складная',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=подставка+для+ноутбука+алюминиевая+складная',
    ozonUrl: 'https://www.ozon.ru/search/?text=подставка+для+ноутбука+алюминиевая+складная&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=подставка+для+ноутбука+алюминиевая',
    erid: '2VtzquvLS69',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'mouse-delux-vertical',
    name: 'Вертикальная беспроводная мышь Delux M618DB',
    brand: 'Delux',
    category: 'accessory',
    shortDesc: 'Естественный хват «рукопожатие» 57° — защита кисти от туннельного синдрома запястья',
    fullDesc: 'В отличие от плоских мышек, скручивающих кости предплечья, анатомический наклон 57 градусов держит руку в физиологически расслабленном положении. Бесшумные кнопки Silent Switch не раздражают домочадцев и коллег во время звонков.',
    priceRub: 1990,
    rating: 4.86,
    reviewsCount: 1650,
    pros: ['Эргономичный угол 57° снимает напряжение сухожилий кисти', 'Тихий клик (Silent micro-switches)', 'Двойное подключение: Bluetooth 5.0 + радиоканал 2.4G', 'Встроенный аккумулятор (зарядка по Type-C)'],
    cons: ['Первые 3–4 дня требуется привыкание к боковому хвату'],
    specs: {
      'DPI': '800 / 1200 / 1600 / 2400',
      'Интерфейс': 'Bluetooth 5.0 / 2.4 GHz USB / проводной Type-C',
      'Аккумулятор': '500 мАч (до 30 дней автономности)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=вертикальная+мышь+Delux+M618DB',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=вертикальная+мышь+Delux+M618DB',
    ozonUrl: 'https://www.ozon.ru/search/?text=вертикальная+мышь+Delux+M618DB&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Delux+M618DB',
    erid: '2VtzquvVM19',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'mouse-logitech-mx-master-3s',
    name: 'Logitech MX Master 3S (Бесшумная, MagSpeed)',
    brand: 'Logitech',
    category: 'accessory',
    shortDesc: 'Флагманская мышь для профессионалов: бесшумные клики, колесо 1000 строк/сек и боковой скролл',
    fullDesc: 'Эталон эргономики для программистов, дизайнеров и аналитиков. Электромагнитное колесо MagSpeed прокручивает 1000 строк кода или таблицы за 1 секунду. Боковое колесико для горизонтального скролла в Excel и монтажных программах. Сенсор 8000 DPI работает даже на стеклянном столе.',
    priceRub: 10900,
    rating: 4.97,
    reviewsCount: 2980,
    pros: ['Сверхтихие клики Quiet Clicks (на 90% тише предшественника)', 'Электромагнитная прокрутка MagSpeed SmartShift', 'Сенсор Darkfield 8000 DPI работает на любой поверхности', 'Подключение к 3 устройствам с технологией Flow (копирование между Mac и Windows)'],
    cons: ['Рассчитана строго под правую руку', 'Вес 141 г (не для киберспорта)'],
    specs: {
      'Сенсор': 'Darkfield 8000 DPI (шаг 50 DPI)',
      'Колесо': 'MagSpeed электромагнитное',
      'Автономность': 'До 70 дней на одном заряде',
      'Зарядка': 'USB-C быстрая (1 минута дает 3 часа)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ситилинк',
    admitadUrl: 'https://market.yandex.ru/search?text=Logitech+MX+Master+3S+мышь',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=Logitech+MX+Master+3S+мышь',
    ozonUrl: 'https://www.ozon.ru/search/?text=Logitech+MX+Master+3S&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Logitech+MX+Master+3S',
    erid: '2VtzquvMX3S',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'headphones-anker-space-one',
    name: 'Anker Soundcore Space One (Активное шумоподавление ANC)',
    brand: 'Anker',
    category: 'audio',
    shortDesc: 'Беспроводные полноразмерные наушники с 2-кратным подавлением человеческого голоса',
    fullDesc: 'Спасение для работы в квартире с шумными детьми, домашними животными или соседями с перфоратором. Улучшенная система активного шумоподавления нацелена именно на средние частоты — голос и бытовой шум. Мягкие амбушюры с эффектом памяти не давят на дужки очков.',
    priceRub: 7490,
    rating: 4.89,
    reviewsCount: 1340,
    pros: ['Адаптивное активное шумоподавление (ANC)', 'До 55 часов работы (40 часов с включенным ANC)', 'Поддержка кодека высокой четкости LDAC', 'Режим прозрачности активируется прикосновением ладони'],
    cons: ['Микрофон в ветреную погоду на улице передает шумы (для дома идеален)'],
    specs: {
      'Тип': 'Полноразмерные закрытые',
      'Шумоподавление': 'Адаптивный гибридный ANC',
      'Автономность': '55 ч / 40 ч с ANC',
      'Связь': 'Bluetooth 5.3 + AUX 3.5 мм'
    },
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=Anker+Soundcore+Space+One',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=Anker+Soundcore+Space+One',
    ozonUrl: 'https://www.ozon.ru/search/?text=Anker+Soundcore+Space+One&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Anker+Space+One',
    erid: '2VtzquvAS01',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'webcam-anker-powerconf-c200',
    name: 'Веб-камера Anker PowerConf C200 2K (Физическая шторка)',
    brand: 'Anker',
    category: 'audio',
    shortDesc: '2K QHD веб-камера с физической шторкой приватности и направленными микрофонами с ИИ',
    fullDesc: 'Встроенные камеры большинства ноутбуков дают зернистую блеклую картинку 720p. Камера Anker C200 обеспечивает кристально четкое изображение 2K (2560x1440) даже при слабом освещении комнаты. Встроенная физическая механическая шторка гарантирует 100% приватность вне созвонов.',
    priceRub: 5890,
    rating: 4.91,
    reviewsCount: 820,
    pros: ['Четкое разрешение 2K QHD с естественной цветопередачей', 'Физическая сдвижная шторка объектива', 'Двойные стереомикрофоны с алгоритмом подавления эха', 'Регулируемый угол обзора: 65°, 78° или 95°'],
    cons: ['Нет автофокуса (фокус фиксированный, оптимизирован под дистанцию 40–120 см)'],
    specs: {
      'Разрешение': '2K (2560 x 1440) @ 30 fps',
      'Угол обзора': '65° / 78° / 95°',
      'Микрофоны': '2 направленных стерео с шумоподавлением',
      'Крепление': 'Универсальное на монитор + штативная резьба 1/4"'
    },
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=веб-камера+Anker+PowerConf+C200',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=веб-камера+Anker+PowerConf+C200',
    ozonUrl: 'https://www.ozon.ru/search/?text=Anker+PowerConf+C200&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=Anker+PowerConf+C200',
    erid: '2VtzquvAC20',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  },
  {
    id: 'pomodoro-timer-cube',
    name: 'Физический Pomodoro-таймер TickTime Cube',
    brand: 'TickTime',
    category: 'accessory',
    shortDesc: 'Шестигранный гравитационный таймер для спринтов глубокой концентрации без отвлечения на смартфон',
    fullDesc: 'Главная проблема телефонных таймеров — каждый раз при взгляде на экран мозг цепляется за всплывшие уведомления. Гравитационный куб TickTime переворачивается нужной гранью (5, 10, 25, 50 минут) и моментально начинает отсчет. Бесшумный виброрежим и мягкая подсветка.',
    priceRub: 2890,
    rating: 4.93,
    reviewsCount: 420,
    pros: ['Мгновенный старт переворачиванием грани', 'Исключает контакт со смартфоном во время работы', 'Бесшумный виброрежим для тихих созвонов', 'Магнитный корпус крепится к ножке стола'],
    cons: ['Фиксированные пресеты минут на гранях'],
    specs: {
      'Пресеты': '3, 5, 10, 15, 25, 30 минут',
      'Оповещение': 'Звук / Вибрация / Светодиод',
      'Зарядка': 'USB-C (до 3 месяцев от одной зарядки)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Ozon / Яндекс Маркет',
    admitadUrl: 'https://market.yandex.ru/search?text=TickTime+cube+таймер',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=TickTime+cube+таймер',
    ozonUrl: 'https://www.ozon.ru/search/?text=TickTime+cube&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=TickTime+cube',
    erid: '2VtzquvTC01',
    ordAdvertiser: 'ООО «Интернет Решения», ИНН 7704217370'
  },
  {
    id: 'acupressure-mat-pranamat',
    name: 'Игольчатый акупунктурный коврик для спины и шеи',
    brand: 'Bradex / Pranamat',
    category: 'accessory',
    shortDesc: 'Медицинский акупрессурный мат для вечернего снятия компрессии и мышечных спазмов поясницы',
    fullDesc: '15 минут лежания на игольчатом мате после 8-часового рабочего дня вызывают мощный прилив капиллярного кровообращения, выработку эндорфинов и полное расслабление глубоких паравертебральных мышц спины.',
    priceRub: 2390,
    rating: 4.88,
    reviewsCount: 1650,
    pros: ['Быстро снимает ощущение затекшей спины', 'Льняной гипоаллергенный чехол и кокосовая койра', 'Компактно сворачивается в рулон'],
    cons: ['Первые 2 минуты легкое покалывание до наступления приятного тепла'],
    specs: {
      'Размер': '72 x 42 см',
      'Наполнитель': 'Кокосовое волокно',
      'Элементы': 'Медицинский гипоаллергенный пластик HIPS'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    bestMerchant: 'Яндекс Маркет / Ozon',
    admitadUrl: 'https://market.yandex.ru/search?text=акупунктурный+коврик+для+спины',
    yandexMarketUrl: 'https://market.yandex.ru/search?text=акупунктурный+коврик+для+спины',
    ozonUrl: 'https://www.ozon.ru/search/?text=акупунктурный+коврик+для+спины&from_global=true',
    wbUrl: 'https://www.wildberries.ru/search?query=акупунктурный+коврик',
    erid: '2VtzquvAM02',
    ordAdvertiser: 'ООО «Яндекс», ИНН 7736207543'
  }
];

export const EDITORIAL_AUTHOR = {
  name: 'Редакция KabinetDoma.ru',
  role: 'Экспертная коллегия по эргономике и домашнему офису',
  avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80'
};

export const ARTICLES_DATA: Article[] = [
  {
    
    tags: ['С детьми','Зонирование','Звук и шум','Компактная квартира'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '05 октября 2026',
    updatedAt: '05 октября 2026',
    readTimeMin: 7,
    views: 4820,
    heroImage: '/images/editorial/family-remote-work.jpg',
    tableOfContents: [
      { id: 'sec-problem', label: '1. Почему удаленка в однушке ломается за 2 недели' },
      { id: 'sec-zoning', label: '2. Зонирование: акустическая ширма vs плотная штора' },
      { id: 'sec-audio', label: '3. Как сделать, чтобы коллеги не слышали детских мультиков' },
      { id: 'sec-traffic-light', label: '4. Метод «Светофор» для ребенка: визуальные правила' },
      { id: 'sec-gear', label: '5. Чек-лист покупок до 35 000 ₽' }
    ],
    sections: [
      {
        id: 'sec-problem',
        title: '1. Почему удаленка в однушке ломается за 2 недели',
        content: `Когда вы работаете за кухонным столом или на краю дивана, границы между рабочим днем и семейной жизнью мгновенно стираются. Ребенок не понимает, почему папа или мама сидят перед светящимся экраном, но с ними нельзя поиграть в конструктор.
        
Каждый звонок превращается в стресс с судорожным нажатием кнопки Mute, а спина начинает ныть уже к четвергу из-за посадки на обычном кухонном табурете.
        
Главный закон домашнего офиса в ограниченном пространстве: **физическое закрепление рабочей зоны**. Даже если это всего 1.2 квадратных метра у окна, эта территория должна считываться мозгом как отдельный кабинет.`
      },
      {
        id: 'sec-zoning',
        title: '2. Зонирование: акустическая ширма vs плотная штора Blackout',
        content: `Не пытайтесь строить глухие перегородки из гипсокартона — вы лишите комнату естественного света. Используйте мобильное зонирование:
        
1. **Войлочная или плотная тканевая ширма (высота 150–160 см)**. Она физически перекрывает прямой визуальный контакт между ребенком и родителем. Когда ребенок не видит лицо родителя каждую секунду, частота спонтанных обращений снижается в 3–4 раза.
2. **Карниз со шторой Blackout на потолке**. Плотная ткань плотностью от 280 г/м² поглощает высокочастотное эхо комнаты, улучшая акустику для микрофона.
3. **Белый шум в детской зоне**. Небольшой генератор белого шума или вентилятор, направленный от ребенка, маскирует ваш шепот или разговор с коллегами.`
      },
      {
        id: 'sec-audio',
        title: '3. Как сделать, чтобы коллеги не слышали детских мультиков',
        content: `Встроенный микрофон ноутбука Mac или Windows обладает круговой диаграммой (Omnidirectional): он одинаково усердно усиливает и ваш голос, и звук падающей башни из Lego в 3 метрах позади.
        
Решение состоит из двух рубежей:
- **Аппаратный**: Гарнитура со штангой и алгоритмом ENC (Environmental Noise Cancellation), например **Jabra Evolve2 65** или динамический узконаправленный микрофон **Fifine K688**.
- **Программный**: Фильтры на базе нейросетей (Krisp, RTX Voice или встроенное подавление шума в Zoom и Telegram).`,
        productIds: ['jabra-evolve2-65', 'fifine-k688']
      },
      {
        id: 'sec-traffic-light',
        title: '4. Метод «Светофор» для ребенка: визуальные правила',
        content: `Дети до 6–7 лет не ориентируются по часам, но прекрасно считывают цветные символы. Купите или распечатайте три цветных круга на край стола или монитора:
        
- 🔴 **Красный кружок**: Идет важный звонок или клиентская презентация. Подходить нельзя вообще, кроме ситуации пожара или травмы.
- 🟡 **Желтый кружок**: Папа пишет код или документ. Можно подойти, тихо положить руку на плечо и подождать, пока родитель закончит мысль.
- 🟢 **Зеленый кружок**: Свободная 15-минутка. Можно обняться, собрать башню или попить сок вместе.`
      },
      {
        id: 'sec-gear',
        title: '5. Готовый комплект для компактного рабочего угла',
        content: `Вот проверенный набор оборудования, который поместится в нишу 120х80 см и избавит вас от боли в спине и фонового шума.`,
        productIds: ['ergostol-terra', 'metta-samurai-s3', 'xiaomi-lightbar', 'cable-management-kit']
      }
    ],
    featuredProductIds: ['jabra-evolve2-65', 'metta-samurai-s3', 'xiaomi-lightbar', 'cable-management-kit'],
    conclusion: 'Разграничение пространства и качественный микрофон — это не роскошь, а инвестиция в спокойствие семьи и сохранение работы. Начните с перемещения стола и покупки скринбара, чтобы не будить домочадцев ярким светом по утрам.',
    faqList: [
      {
        question: 'Что делать, если ребенок все равно плачет у закрытой ширмы?',
        answer: 'Внедряйте технику плавного привыкания: начинайте с 15-минутных сессий "папа за ширмой", награждая ребенка совместной игрой сразу по окончании таймера.'
      },
      {
        question: 'Помогут ли беруши от детских криков?',
        answer: 'Для родителя эффективнее наушники с активным шумоподавлением (ANC) в режиме воспроизведения розового шума или звуков дождя, чем обычные беруши.'
      }
    ],
    seo: {
      metaTitle: 'Рабочее место в 1-комнатной квартире с ребенком: гид 2026',
      metaDescription: 'Как обустроить тихий домашний офис в однушке с малышом: зонирование, шумоизоляция микрофона, правила "Светофор" и чек-лист мебели.',
      primaryKeyword: 'рабочее место в однушке с ребенком',
      secondaryKeywords: ['домашний офис для родителей', 'зонирование квартиры под кабинет', 'микрофон с шумоподавлением для звонков'],
      yandexWordstatSearches: 4200
    }
  },
  {
    
    tags: ['Столы','Эргономика','Здоровье спины','Осанка'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '04 октября 2026',
    updatedAt: '04 октября 2026',
    readTimeMin: 8,
    views: 6190,
    heroImage: '/images/editorial/home-office-cozy.jpg',
    tableOfContents: [
      { id: 'sec-spine', label: '1. Что происходит с позвоночником после 6 часов сидения' },
      { id: 'sec-formula', label: '2. Золотое правило 40/20: как работать за подъемным столом' },
      { id: 'sec-motors', label: '3. 1 мотор или 2 мотора: критические отличия' },
      { id: 'sec-review', label: '4. Лучшие подстолья с доставкой по РФ' },
      { id: 'sec-math', label: '5. Экономика: сравнение стоимости стола и курса массажей' }
    ],
    sections: [
      {
        id: 'sec-spine',
        title: '1. Что происходит с позвоночником после 6 часов сидения',
        content: `При сидении давление на межпозвонковые диски поясничного отдела возрастает со 100% (в положении стоя) до 140–185% (если вы сутулитесь к экрану). Замедляется лимфоток в нижних конечностях, перегружается грушевидная мышца, передавливая седалищный нерв.
        
Работать весь день стоя — тоже вредно: возникает перегрузка вен и суставов коленей. Единственное научно доказанное решение — **динамическая смена положения тела каждые 40–50 минут**.`
      },
      {
        id: 'sec-formula',
        title: '2. Золотое правило 40/20: как работать за подъемным столом',
        content: `Не пытайтесь стоять по 3 часа в первый же день — заболят стопы и поясница. Используйте протокол адаптации:
        
- 40 минут — работа сидя в правильной осанке с опорой на спинку кресла.
- 20 минут — подъем столешницы на уровень согнутых под 90 градусов локтей.
- Коврик против усталости (Anti-fatigue mat) или обувь с мягкой подошвой смягчают нагрузку на пятки.`
      },
      {
        id: 'sec-motors',
        title: '3. 1 мотор или 2 мотора: критические отличия',
        content: `Дешевые столы с одним двигателем передают вращение на вторую ногу через шестигранный вал. Со временем в механизме появляется люфт, и стол начинает шататься при наборе текста.
        
Двухмоторные модели (в каждой ноге свой независимый двигатель с синхронизацией контроллером) поднимаются тише, быстрее и выдерживают установку двух тяжелых 27–34" мониторов на кронштейнах.`,
        productIds: ['ergostol-terra']
      },
      {
        id: 'sec-review',
        title: '4. Лучшие подстолья с быстрой доставкой по РФ',
        content: `Рекомендуем обратить внимание на проверенные решения с официальной гарантией и наличием запчастей в сервисных центрах Москвы и регионов.`,
        productIds: ['ergostol-terra', 'onkron-g80']
      },
      {
        id: 'sec-math',
        title: '5. Экономика: сравнение стоимости стола и курса массажей',
        content: `Средний курс качественного медицинского массажа спины в городах-миллионниках РФ стоит от 25 000 до 40 000 ₽, а эффект держится 3–4 месяца. Подъемный стол за 38 000 ₽ служит от 7 до 10 лет и устраняет саму причину защемлений.`
      }
    ],
    featuredProductIds: ['ergostol-terra', 'onkron-g80'],
    conclusion: 'Если ваш бюджет ограничен 40 000 ₽, сначала инвестируйте в регулируемый стол или газлифт-кронштейн для экрана. Это дает самый быстрый физический эффект для разгрузки шеи.',
    faqList: [
      {
        question: 'Какая высота стола нужна при росте 180 см?',
        answer: 'В положении сидя оптимальная высота столешницы составляет около 74–75 см, а в положении стоя — 109–112 см (в зависимости от высоты подошвы тапочек).'
      },
      {
        question: 'Не упадет ли монитор при резком подъеме стола?',
        answer: 'Современные столы с контроллером имеют систему плавного старта и остановки (Soft Start/Stop), а также гироскопический датчик защиты от столкновения с подоконником или тумбой.'
      }
    ],
    seo: {
      metaTitle: 'Стол с электроприводом: тест моделей и польза для спины 2026',
      metaDescription: 'Гид по выбору стола с регулировкой высоты: 1 или 2 мотора, расчет высоты под рост, честный тест Ergostol и окупаемость.',
      primaryKeyword: 'стол с электроприводом для работы стоя',
      secondaryKeywords: ['подъемный стол регулируемый', 'эргономика рабочего места стоя сидя', 'ergostol отзывы'],
      yandexWordstatSearches: 5600
    }
  },
  {
    
    tags: ['Кресла','Эргономика','Осанка','Здоровье спины'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '04 октября 2026',
    updatedAt: '04 октября 2026',
    readTimeMin: 9,
    views: 9230,
    heroImage: '/images/editorial/ergonomic-chair-desk.jpg',
    tableOfContents: [
      { id: 'sec-trap', label: '1. Ловушка "геймерских" кресел-ковшей' },
      { id: 'sec-criteria', label: '2. 4 критерия ортопедически правильного стула' },
      { id: 'sec-budget', label: '3. Бюджетный класс: Бюрократ KB-8 (6 890 ₽) и Chairman 795' },
      { id: 'sec-samurai', label: '4. Оптимум: Metta Samurai S-3.05 и SIHOO Doro C300' },
      { id: 'sec-flagship', label: '5. Премиум: Ergohuman Plus Elite и анатомическая подушка' }
    ],
    sections: [
      {
        id: 'sec-trap',
        title: '1. Ловушка "геймерских" кресел-ковшей',
        content: `Яркие кресла в гоночном стиле создавались для автоспорта, где задача — удерживать пилота в перегрузках на поворотах. Боковые крылья на сиденье и спинке заставляют плечи заворачиваться внутрь, формируя "позу креветки", а экокожа гарантирует мокрую спину уже через 40 минут созвона.`
      },
      {
        id: 'sec-criteria',
        title: '2. 4 критерия ортопедически правильного стула',
        content: `При выборе рабочего кресла для 8+ часов проверяйте:
- **Дышащую сетку (Kevlar или армированный нейлон)** — равномерное распределение давления без точек сдавливания вен под бедрами.
- **Синхромеханизм (Syncro)** — при отклонении спинки назад на 2–3 градуса сиденье приподнимается на 1 градус, сохраняя стопы на полу.
- **Регулировку глубины сиденья (Слайдер)** — между краем сиденья и подколенной впадиной должно помещаться 3–4 сложенных пальца руки.
- **3D или 4D подлокотники** — поддержка предплечий вровень со столешницей для снятия напряжения с трапециевидных мышц.`
      },
      {
        id: 'sec-budget',
        title: '3. Бюджетный класс: Бюрократ KB-8 (6 890 ₽) и Chairman 795 (13 900 ₽)',
        content: `Не у всех есть возможность сразу потратить 30 000 ₽ на кресло. В базовом сегменте есть проверенные фавориты:
- **Бюрократ KB-8 (6 890 ₽):** Доступное спасение для спины. Спинка из упругой сетки отлично дышит летом, а регулируемый валик под поясницу держит лордоз. Плавный газлифт 3 класса.
- **Chairman 795 Ergo (13 900 ₽):** Золотая середина с синхромеханикой и монолитной стальной крестовиной до 130 кг. Разгружает таз при покачивании.`,
        productIds: ['chair-budget-burokrat', 'chair-chairman-795']
      },
      {
        id: 'sec-samurai',
        title: '4. Оптимум: Metta Samurai S-3.05 (24 900 ₽) и SIHOO Doro C300 (34 500 ₽)',
        content: `Сегмент для тех, кто проводит за кодом или текстами по 8–10 часов ежедневно:
- **Metta Samurai S-3.05:** Цельнометаллический стальной каркас с гарантией 10 лет, арамидная сетка и синхромеханика Multiblock со смещенной осью.
- **SIHOO Doro C300:** Инновационный динамический поясничный блок, который сам повторяет микродвижения позвоночника при смене позы, и мягкие 3D-подлокотники.`,
        productIds: ['metta-samurai-s3', 'sihoo-doro-c300']
      },
      {
        id: 'sec-flagship',
        title: '5. Премиум: Ergohuman Plus Elite и экспресс-лайфхак с подушкой',
        content: `Для максимальных требований — **Ergohuman Plus Elite (68 500 ₽)** в литом алюминиевом корпусе с 5D-настройками.
💡 **Если покупка кресла откладывается:** Начните с ортопедической подушки **Memory Foam (1 490 ₽)** — она крепится на любой обычный стул и за 1 день снимает 80% боли в пояснице.`,
        productIds: ['chair-ergohuman-plus', 'lumbar-cushion-memory']
      }
    ],
    featuredProductIds: ['chair-budget-burokrat', 'chair-chairman-795', 'metta-samurai-s3', 'sihoo-doro-c300', 'chair-ergohuman-plus', 'lumbar-cushion-memory'],
    conclusion: 'Кресло — это инструмент сохранения здоровья позвоночника. Не экономьте на синхромеханизме: дешевые механизмы типа "топ-ган" заставляют поднимать ноги при качании, пережимая сосуды.',
    faqList: [
      {
        question: 'Что лучше: сетка или плотная ткань?',
        answer: 'Сетка гигиеничнее, не накапливает пыль и не греет тело летом. Качественная сетка не теряет натяжения до 7 лет.'
      },
      {
        question: 'Нужна ли подставка для ног?',
        answer: 'Если при правильной настройке высоты подлокотников под стол ваши пятки не стоят плотно на полу, подставка под ноги обязательна.'
      }
    ],
    seo: {
      metaTitle: '5 лучших эргономичных кресел до 35000 рублей: рейтинг 2026',
      metaDescription: 'Честный рейтинг ортопедических кресел для работы дома: Metta Samurai, SIHOO Doro, тест сетки и синхромеханизмов.',
      primaryKeyword: 'эргономичное кресло для работы за компьютером',
      secondaryKeywords: ['лучшие кресла для спины до 35000', 'metta samurai s3 отзывы', 'sihoo doro c300'],
      yandexWordstatSearches: 7800
    }
  },
  {
    
    tags: ['Освещение','Зрение','Биоритмы и сон','Эргономика'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '03 октября 2026',
    updatedAt: '03 октября 2026',
    readTimeMin: 6,
    views: 5410,
    heroImage: '/images/editorial/screenbar-evening-light.jpg',
    tableOfContents: [
      { id: 'sec-eyes', label: '1. Почему к вечеру сохнут глаза (синдром сухого глаза)' },
      { id: 'sec-how', label: '2. Физика скринбара: срез светового конуса' },
      { id: 'sec-comparison', label: '3. Xiaomi Mi Light Bar vs BenQ ScreenBar Halo' },
      { id: 'sec-lux', label: '4. Сколько люксов и какая цветовая температура нужны для работы' }
    ],
    sections: [
      {
        id: 'sec-eyes',
        title: '1. Почему к вечеру сохнут глаза (синдром сухого глаза)',
        content: `Когда в комнате выключен общий свет, а перед глазами светится яркий монитор, зрачок вынужден постоянно адаптироваться к чудовищному контрасту между матрицей экрана и черной стеной за ним. Это приводит к спазму аккомодации, головной боли и рези в глазах к 18:00.`
      },
      {
        id: 'sec-how',
        title: '2. Физика скринбара: срез светового конуса',
        content: `Скринбар использует асимметричную линзу. Световой поток срезан ровно по плоскости матрицы: ни один луч не касается стекла монитора, поэтому на экране нет бликов. Весь свет направлен строго вниз на рабочую поверхность стола.`,
        productIds: ['xiaomi-lightbar', 'benq-screenbar-halo']
      },
      {
        id: 'sec-comparison',
        title: '3. Xiaomi Mi Light Bar vs BenQ ScreenBar Halo',
        content: `**Xiaomi (около 4 300 ₽)** — абсолютный народный фаворит. Металлический корпус, магнитное крепление и беспроводная шайба-крутилка на батарейках. Отличное качество света Ra95.
        
**BenQ ScreenBar Halo (около 19 800 ₽)** — выбор для профессионалов и работы в полной темноте. Имеет дополнительный задний светодиод для подсветки стены позади монитора, что полностью исключает контраст.`,
        productIds: ['xiaomi-lightbar', 'benq-screenbar-halo']
      },
      {
        id: 'sec-lux',
        title: '4. Сколько люксов и какая температура нужны для работы',
        content: `Для дневной концентрации выставляйте холодный свет (4500K–5000K, 500 люкс). После 19:00 обязательно переводите свет в теплый спектр (2700K–3000K), чтобы не подавлять выработку мелатонина и спокойно уснуть.`
      }
    ],
    featuredProductIds: ['xiaomi-lightbar', 'benq-screenbar-halo'],
    conclusion: 'Скринбар окупается в первую же неделю: глаза перестают слезиться, а стол освобождается от громоздкой подставки настольной лампы.',
    faqList: [
      {
        question: 'Подойдет ли скринбар для изогнутого монитора?',
        answer: 'Для изогнутых экранов (1500R–1800R) лучше подходят модели с изогнутым профилем или BenQ Halo со специальной проставкой для крепления.'
      }
    ],
    seo: {
      metaTitle: 'Скринбар на монитор: как выбрать лампу для защиты глаз 2026',
      metaDescription: 'Зачем нужен скринбар на монитор: сравнение Xiaomi Mi Light Bar и BenQ, защита глаз, температура света и тесты.',
      primaryKeyword: 'скринбар на монитор xiaomi',
      secondaryKeywords: ['лампа на монитор от усталости глаз', 'benq screenbar отзывы', 'освещение рабочего места дома'],
      yandexWordstatSearches: 4900
    }
  },
  {
    
    tags: ['Звук и шум','Микрофоны','Созвоны','Фокус'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '03 октября 2026',
    updatedAt: '03 октября 2026',
    readTimeMin: 7,
    views: 4120,
    heroImage: '/images/editorial/audio-podcasting-desk.jpg',
    tableOfContents: [
      { id: 'sec-capsule', label: '1. Динамический vs Конденсаторный: фатальная ошибка новичков' },
      { id: 'sec-jabra', label: '2. Jabra Evolve2: корпоративный стандарт подавления шума' },
      { id: 'sec-fifine', label: '3. Fifine K688: студийный тембр за вменяемые деньги' },
      { id: 'sec-software', label: '4. Программные фильтры Krisp и RTX Voice' }
    ],
    sections: [
      {
        id: 'sec-capsule',
        title: '1. Динамический vs Конденсаторный: фатальная ошибка новичков',
        content: `90% людей покупают популярные конденсаторные микрофоны вроде Blue Yeti или HyperX Quadcast. Но в обычной жилой комнате без звукопоглощающего поролона они улавливают щелчки мыши соседа снизу и звуки смыва воды.
        
Динамический микрофон требует говорить прямо в него (расстояние 5–10 см). Все, что находится дальше метра, капсюль просто не слышит физически.`
      },
      {
        id: 'sec-jabra',
        title: '2. Jabra Evolve2 65: мобильность и чистый голос',
        content: `Штанга микрофона точно выверена по геометрии рта. Алгоритм вычитает фоновые звуки за счет фазового инвертирования внешних микрофонов. На наушнике есть индикатор Busylight (загорается красным при разговоре).`,
        productIds: ['jabra-evolve2-65']
      },
      {
        id: 'sec-fifine',
        title: '3. Fifine K688: бархатный голос и USB подключение',
        content: `Подключается по простому кабелю Type-C напрямую в ноутбук. Имеет металлическую сенсорную кнопку Mute на верхней крышке — можно заглушить микрофон без щелчка в эфире за долю секунды.`,
        productIds: ['fifine-k688']
      },
      {
        id: 'sec-software',
        title: '4. Программные фильтры Krisp и DeepFilter',
        content: `Если вы пока не готовы покупать новый микрофон, установите DeepFilterNet или включите «Высокий уровень шумоподавления» в настройках Zoom / Яндекс Телемоста.`
      }
    ],
    featuredProductIds: ['jabra-evolve2-65', 'fifine-k688'],
    conclusion: 'Качественный звук формирует впечатление профессионализма у клиентов и руководства сильнее, чем 4K-вебкамера.',
    faqList: [
      {
        question: 'Нужен ли аудиоинтерфейс для Fifine K688?',
        answer: 'Нет, микрофон отлично работает по стандартному USB-C кабелю. XLR разъем оставлен как задел на будущее.'
      }
    ],
    seo: {
      metaTitle: 'Микрофон с шумоподавлением для звонков дома: рейтинг 2026',
      metaDescription: 'Как убрать шум детей и быта на созвонах: тест гарнитуры Jabra Evolve2 и динамического микрофона Fifine K688.',
      primaryKeyword: 'микрофон с шумоподавлением для удаленной работы',
      secondaryKeywords: ['гарнитура для созвонов с ребенком', 'jabra evolve2 65 отзывы', 'fifine k688'],
      yandexWordstatSearches: 3800
    }
  },
  {
    
    tags: ['Кабель-менеджмент','Порядок','Бюджетный сетап','Планировка'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '02 октября 2026',
    updatedAt: '02 октября 2026',
    readTimeMin: 5,
    views: 8940,
    heroImage: '/images/editorial/realistic-workspace-scandinavian.jpg',
    tableOfContents: [
      { id: 'sec-steps', label: '1. Список материалов на 2 500 рублей' },
      { id: 'sec-rule-one', label: '2. Главное правило: сетевой фильтр живет на столе или под ним' },
      { id: 'sec-drill', label: '3. Монтаж без сверления столешницы' }
    ],
    sections: [
      {
        id: 'sec-steps',
        title: '1. Список материалов на 2 500 рублей',
        content: `Вам понадобятся:
- Подвесной металлический лоток на струбцинах (1 600–1 800 ₽).
- Рулон многоразовой ленты-липучки Velcro шириной 15 мм (350 ₽ за 5 метров).
- Набор силиконовых кабельных зажимов на скотче 3M для проводов мыши/зарядки (300 ₽).
- Сетевой фильтр на 6 розеток с кабелем 2–3 метра.`
      },
      {
        id: 'sec-rule-one',
        title: '2. Главное правило: сетевой фильтр крепится под стол',
        content: `Никогда не кладите сетевой фильтр на пол! Разместите его внутри подвесного корзинного лотка под столешницей. Все блоки питания мониторов, ноутбука, скринбара и колонок втыкаются туда. 
        
От стола к розетке в стене идет **всего один черный провод**, спрятанный в оплетку-змейку. Робот-пылесос спокойно убирает под столом, а ползующий ребенок не доберется до опасных розеток 220V.`,
        productIds: ['cable-management-kit']
      },
      {
        id: 'sec-drill',
        title: '3. Монтаж без повреждения дорогой столешницы',
        content: `Используйте струбцины с прорезиненными подпятниками. Лоток монтируется за 90 секунд и легко снимается при переезде или замене стола.`
      }
    ],
    featuredProductIds: ['cable-management-kit'],
    conclusion: 'Чистота под ногами разгружает рабочую память и избавляет от визуального шума. После наведения порядка за столом хочется работать.',
    faqList: [
      {
        question: 'Не перегреются ли блоки питания в лотке?',
        answer: 'Металлическая сетка лотка обеспечивает постоянную свободную конвекцию воздуха, поэтому блоки остывают лучше, чем на ковре под столом.'
      }
    ],
    seo: {
      metaTitle: 'Кабель-менеджмент под столом своими руками: гайд 2026',
      metaDescription: 'Как спрятать провода под компьютерным столом за 1 час: подбор лотков, липучек и сетевых фильтров.',
      primaryKeyword: 'кабель менеджмент под столом',
      secondaryKeywords: ['органайзер для проводов под стол', 'как спрятать провода от компьютера', 'лоток для проводов под столешницу'],
      yandexWordstatSearches: 6200
    }
  },
  {
    
    tags: ['Эргономика','Осанка','Здоровье спины','Аксессуары'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '02 октября 2026',
    updatedAt: '02 октября 2026',
    readTimeMin: 6,
    views: 5720,
    heroImage: '/images/editorial/ergonomic-chair-desk.jpg',
    tableOfContents: [
      { id: 'sec-head-weight', label: '1. Вес головы: почему 5 см ниже уровня глаз вызывают спазм трапеций' },
      { id: 'sec-onkron', label: '2. Кронштейн с газлифтом ONKRON G80: настройка в 3 осях' },
      { id: 'sec-footrest', label: '3. Подставка для ног с массажной поверхностью' }
    ],
    sections: [
      {
        id: 'sec-head-weight',
        title: '1. Вес головы: почему 5 см ниже уровня глаз вызывают спазм',
        content: `Голова взрослого человека весит около 5 кг при ровном положении позвоночника. Но при наклоне вперед всего на 15 градусов нагрузка на шейный отдел возрастает до 12 кг, а при наклоне на 45 градусов — до внушительных 22 кг!
        
Стандартная пластиковая ножка монитора почти всегда слишком низкая. Верхняя треть дисплея должна находиться строго на высоте ваших зрачков при прямой спине.`,
        productIds: ['onkron-g80']
      },
      {
        id: 'sec-onkron',
        title: '2. Кронштейн с газлифтом ONKRON G80',
        content: `Газлифт-кронштейн позволяет поднять экран на нужную высоту, выдвинуть его ближе или повернуть вертикально для чтения кода и логов. Стол под монитором остается полностью свободным.`,
        productIds: ['onkron-g80']
      },
      {
        id: 'sec-footrest',
        title: '3. Зачем нужна подставка под ноги',
        content: `Если вы настроили высоту кресла так, чтобы локти лежали ровно на столе, но ваши стопы висят в воздухе или едва касаются пола носочками — кровообращение в бедрах пережимается. Эргономичная подставка возвращает угол в коленях к 90 градусам.`
      }
    ],
    featuredProductIds: ['onkron-g80'],
    conclusion: 'Кронштейн для монитора — самая дешевая модификация рабочего места с мгновенным облегчением для шейного отдела.',
    faqList: [
      {
        question: 'Выдержит ли столешница из ДСП крепление кронштейна?',
        answer: 'Столешницы толщиной от 16 мм отлично держат струбцину. Для столешниц из сотового картона (типа Ikea Linnmon) рекомендуется использовать металлическую усилительную пластину-распределитель.'
      }
    ],
    seo: {
      metaTitle: 'Кронштейн для монитора и эргономика шеи: выбор кронштейна 2026',
      metaDescription: 'Почему болит шея за компьютером: правильная высота экрана, обзор кронштейна Onkron G80 и эргономика.',
      primaryKeyword: 'кронштейн для монитора на стол',
      secondaryKeywords: ['onkron g80 обзор', 'правильная высота монитора', 'подставка для ног в офис'],
      yandexWordstatSearches: 5100
    }
  },
  {
    
    tags: ['С детьми','Тайм-менеджмент','Фокус','Психология'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '01 октября 2026',
    updatedAt: '01 октября 2026',
    readTimeMin: 6,
    views: 6710,
    heroImage: '/images/editorial/family-remote-work.jpg',
    tableOfContents: [
      { id: 'sec-child-psych', label: '1. Детская психология: почему слова "я работаю" не действуют' },
      { id: 'sec-signals', label: '2. Визуальные маркеры: наушники, флажки и свет' },
      { id: 'sec-deep-work', label: '3. Техника 25/5 с предсказуемым возвращением родителя' },
      { id: 'sec-closing', label: '4. Ритуал выключения компьютера в 18:30' }
    ],
    sections: [
      {
        id: 'sec-child-psych',
        title: '1. Детская психология: почему слова "я работаю" не действуют',
        content: `Для ребенка дошкольного возраста понятие "работа за ноутбуком" абстрактно. Он видит маму или папу дома, в метре от себя, и делает простой вывод: "Родитель рядом, значит, он доступен для игр". Раздражение возникает, когда вы обещаете "поиграть через 5 минут", но залипаете в чате на полчаса.`
      },
      {
        id: 'sec-signals',
        title: '2. Визуальные маркеры: наушники, флажки и свет',
        content: `Замените слова физическими предметами:
- **Большие наушники на голове** = папу не трогать.
- **Красный светодиодный фонарик или стикер** = тишина на звонке.
- Ребенок должен знать точное правило: если горит красный свет, подходить нельзя. Но как только свет станет зеленым, родитель сам придет и обнимет на 5 минут.`
      },
      {
        id: 'sec-deep-work',
        title: '3. Техника 25/5 с предсказуемым возвращением',
        content: `Купите ребенку механический кухонный таймер в виде помидора или совы. Заводите его вместе на 25 минут: "Пока тикает сова, ты строишь гараж, а я печатаю. Когда сова зазвенит — идем пить какао". Это учит ребенка понятию интервала времени.`
      },
      {
        id: 'sec-closing',
        title: '4. Ритуал выключения компьютера в 18:30',
        content: `Закройте крышку ноутбука, накиньте чехол на рабочее кресло или выключите скринбар. Этот физический ритуал сигнализирует и вашей психике, и детям: "Рабочий день окончен, теперь я на 100% с вами".`
      }
    ],
    featuredProductIds: ['jabra-evolve2-65', 'xiaomi-lightbar'],
    conclusion: 'Границы работают только тогда, когда вы сами держите обещание и отдаете ребенку полное, неразделенное внимание в положенные перерывы.',
    faqList: [
      {
        question: 'С какого возраста работает метод светофора?',
        answer: 'Метод отлично работает с 3–3.5 лет, когда ребенок уже различает цвета и базовые правила причинно-следственной связи.'
      }
    ],
    seo: {
      metaTitle: 'Метод светофор: удаленка с детьми без стресса и ссор 2026',
      metaDescription: 'Как работать дома с детьми: метод визуального светофора, тайм-блоки и советы психологов.',
      primaryKeyword: 'как работать на удаленке с ребенком',
      secondaryKeywords: ['тайм менеджмент для родителей на удаленке', 'метод светофор удаленка', 'дети не дают работать дома'],
      yandexWordstatSearches: 4700
    }
  },
  {
    
    tags: ['Планировка','Компактная квартира','Зонирование','Work-Life'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '01 октября 2026',
    updatedAt: '01 октября 2026',
    readTimeMin: 9,
    views: 3120,
    heroImage: '/images/editorial/compact-apartment-nook.jpg',
    tableOfContents: [
      { id: 'sec-dual-layouts', label: '1. Три схемы расстановки столов: плюсы и минусы' },
      { id: 'sec-dual-sound', label: '2. Как победить перехват голоса микрофоном партнера' },
      { id: 'sec-dual-schedule', label: '3. Календарный этикет и безмолвные сигналы' },
      { id: 'sec-dual-budget', label: '4. Оптимальный набор мебели для двоих' }
    ],
    sections: [
      {
        id: 'sec-dual-layouts',
        title: '1. Три схемы расстановки столов: плюсы и минусы',
        content: `Худшая расстановка — сидеть лицом к лицу без перегородки. Взгляды постоянно пересекаются, вызывая непроизвольное отвлечение, а микрофоны ловят звук партнера по прямой траектории.
        
Лучшие конфигурации:
1. **Спина к спине (расстояние от 1.5 м)** — микрофоны смотрят в противоположные стороны, а веб-камеры не захватывают экран партнера.
2. **В одну линию вдоль стены с тумбой-разделителем** — минимальная занимаемая площадь, удобно прятать провода.
3. **Г-образно по разным углам комнаты** — максимальная психологическая дистанция.`
      },
      {
        id: 'sec-dual-sound',
        title: '2. Как победить перехват голоса микрофоном партнера',
        content: `Обычные петлички или микрофоны ноутбуков будут создавать эхо. Для пары обязательны:
- Гарнитуры со штангой у самого рта (направленный кардиоидный капсюль).
- Программное шумоподавление Krisp или встроенное в Teams/Zoom с максимальным уровнем фильтрации.
- Акустическая войлочная перегородка между столами толщиной от 18 мм.`,
        productIds: ['jabra-evolve2-65', 'fifine-k688']
      },
      {
        id: 'sec-dual-schedule',
        title: '3. Календарный этикет и безмолвные сигналы',
        content: `Общий семейный календарь звонков решает 80% конфликтов. Если у обоих важная презентация в 15:00 — один из партнеров заранее бронирует кухню или надевает гарнитуру с активным шумоподавлением.`
      },
      {
        id: 'sec-dual-budget',
        title: '4. Оптимальный набор мебели для двоих',
        content: `Два независимых стола шириной по 120 см предпочтительнее одного длинного стола на 240 см: вибрация от печати одного человека не передается на монитор второго.`
      }
    ],
    featuredProductIds: ['jabra-evolve2-65', 'metta-samurai-s3'],
    conclusion: 'Разделение звуковых потоков и уважение к чужому календарю превращают общую комнату из поля боя в уютный коворкинг.',
    faqList: [
      {
        question: 'Помогает ли войлочная перегородка на столе?',
        answer: 'Да, настольный экран высотой 40–50 см гасит до 35% прямой звуковой волны в диапазоне человеческой речи.'
      }
    ],
    seo: {
      metaTitle: 'Рабочее место для двоих в одной комнате: расстановка и тишина 2026',
      metaDescription: 'Гайд по организации кабинета для пары на удаленке: схемы столов, гарнитуры без эха и правила звонков.',
      primaryKeyword: 'рабочее место для двоих в комнате',
      secondaryKeywords: ['кабинет для двоих удаленка', 'два рабочих стола в одной комнате', 'созвоны пары дома'],
      yandexWordstatSearches: 3800
    }
  },
  {
    
    tags: ['Эргономика','Осанка','Подставки для ног','Здоровье спины'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '30 сентября 2026',
    updatedAt: '30 сентября 2026',
    readTimeMin: 6,
    views: 2890,
    heroImage: '/images/editorial/standing-desk-health.jpg',
    tableOfContents: [
      { id: 'sec-foot-problem', label: '1. Анатомический конфликт: стол 75 см против роста ниже 175 см' },
      { id: 'sec-foot-types', label: '2. Виды подставок: наклонные, массажные и качающиеся' },
      { id: 'sec-foot-standing', label: '3. Балансировочные доски для работы стоя' }
    ],
    sections: [
      {
        id: 'sec-foot-problem',
        title: '1. Анатомический конфликт: стандартный стол 75 см против роста ниже 175 см',
        content: `Стандартные офисные столы в РФ производятся высотой 75 см. Для человека ростом 165–170 см такая высота требует поднять кресло вверх, из-за чего стопы либо висят в воздухе, либо касаются пола только носками.
        
Передний край сиденья сдавливает бедренные вены, замедляя венозный отток крови к сердцу. К вечеру это оборачивается тяжестью в ногах, отеками и риском варикозного расширения вен. Подставка возвращает угол 90–100° в коленях.`
      },
      {
        id: 'sec-foot-types',
        title: '2. Виды подставок: наклонные, массажные и качающиеся',
        content: `- **Наклонная с фиксацией угла**: обеспечивает стабильную базу, снимает напряжение с ахиллова сухожилия.
- **Динамическая (качели)**: позволяет стопам плавно покачиваться вперед-назад, активируя икроножные мышцы («мышечный насос»), которые проталкивают кровь вверх.
- **Массажная рельефная**: стимулирует рецепторы стопы при работе босиком или в носках.`
      },
      {
        id: 'sec-foot-standing',
        title: '3. Балансировочные доски для работы стоя',
        content: `Если у вас стол с электроприводом, стоять неподвижно на твердом ламинате вредно для пяток и коленных суставов. Используйте полиуретановый антиусталостный коврик или балансировочную деревянную платформу (Wobble board), которая стимулирует микрокоррекции равновесия.`
      }
    ],
    featuredProductIds: ['ergostol-terra', 'metta-samurai-s3'],
    conclusion: 'Опора под ногами — завершающий элемент эргономического треугольника «стол-стул-монитор».',
    faqList: [
      {
        question: 'Какая оптимальная высота подставки для ног?',
        answer: 'Обычно от 8 до 14 см с регулируемым углом наклона от 0 до 20 градусов.'
      }
    ],
    seo: {
      metaTitle: 'Подставка для ног под стол: эргономика и здоровье вен 2026',
      metaDescription: 'Зачем нужна эргономичная подставка для ног: снятие отеков, правильный угол в тазобедренном суставе.',
      primaryKeyword: 'подставка для ног под рабочий стол',
      secondaryKeywords: ['эргономическая подставка для ног офисная', 'отекают ноги от сидячей работы', 'балансировочная доска под стол'],
      yandexWordstatSearches: 4100
    }
  },
  {
    
    tags: ['Кронштейны','Эргономика','Осанка','Столы'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '29 сентября 2026',
    updatedAt: '29 сентября 2026',
    readTimeMin: 8,
    views: 3450,
    heroImage: '/images/editorial/ergonomic-chair-desk.jpg',
    tableOfContents: [
      { id: 'sec-arm-why', label: '1. Зачем менять заводскую подставку монитора' },
      { id: 'sec-arm-gaslift', label: '2. Газлифт или механическая опора: в чем разница' },
      { id: 'sec-arm-mounts', label: '3. Струбцина vs люверс (сквозное отверстие)' },
      { id: 'sec-arm-vesa', label: '4. Стандарты VESA и вес монитора' }
    ],
    sections: [
      {
        id: 'sec-arm-why',
        title: '1. Зачем менять заводскую подставку монитора',
        content: `Штатные подставки даже у мониторов за 50 000 ₽ имеют два критических минуса:
1. Занимают от 20×25 см на столе прямо под глазами, мешая придвинуть клавиатуру.
2. Не поднимают центр экрана на рекомендованную офтальмологами высоту (верхняя треть матрицы на уровне зрачков).
Кронштейн на струбцине парит над столом, возвращая полезную площадь для блокнота или подставки для чашки.`
      },
      {
        id: 'sec-arm-gaslift',
        title: '2. Газлифт или механическая опора: в чем разница',
        content: `- **Механический на шарнирах**: фиксируется винтами раз и навсегда. Надежен, не проседает со временем, но регулировать высоту каждый день неудобно.
- **Газовый лифт (Gas Spring)**: позволяет перемещать монитор одним пальцем вверх-вниз, приближать к лицу или разворачивать на 90° в портретный режим (удобно для программистов и чтения длинных документов).`,
        productIds: ['onkron-g80']
      },
      {
        id: 'sec-arm-mounts',
        title: '3. Струбцина vs люверс (сквозное отверстие)',
        content: `Струбцина (C-clamp) обжимает край столешницы за 3 минуты без сверления. Главное — проверить, чтобы под столом не было ребра жесткости (царги), мешающей закрутить прижимной винт. Для столов с полыми сотовыми столешницами (IKEA Linnmon) рекомендуется использовать металлическую усиливающую пластину.`
      },
      {
        id: 'sec-arm-vesa',
        title: '4. Стандарты VESA и вес монитора',
        content: `Перед покупкой проверьте квадрат отверстий на задней панели монитора: 75×75 мм или 100×100 мм. Вес монитора без штатной подставки должен укладываться в диапазон кронштейна с запасом минимум в 1.5 кг.`
      }
    ],
    featuredProductIds: ['onkron-g80', 'ergostol-terra'],
    conclusion: 'Качественный кронштейн — это инвестиция на 10 лет, которая переживет не один монитор.',
    faqList: [
      {
        question: 'Выдержит ли столешница из ЛДСП 16 мм тяжелый монитор?',
        answer: 'Для мониторов от 32 дюймов (от 7 кг) лучше использовать столешницу от 22 мм или подложить стальную пластину-распределитель нагрузки.'
      }
    ],
    seo: {
      metaTitle: 'Кронштейн для монитора на стол: как выбрать газлифт 2026',
      metaDescription: 'Сравнение кронштейнов для монитора: газлифт против механики, стандарты VESA, тест ONKRON G80.',
      primaryKeyword: 'кронштейн для монитора на стол',
      secondaryKeywords: ['кронштейн газлифт для монитора vesa', 'крепление монитора к столу струбцина', 'onkron кронштейн обзор'],
      yandexWordstatSearches: 5200
    }
  },
  {
    
    tags: ['Звук и шум','Акустика','Микрофоны','Зонирование'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '28 сентября 2026',
    updatedAt: '28 сентября 2026',
    readTimeMin: 8,
    views: 2640,
    heroImage: '/images/editorial/audio-podcasting-desk.jpg',
    tableOfContents: [
      { id: 'sec-echo-nature', label: '1. Почему ваш голос звучит как «из бочки»' },
      { id: 'sec-felt-vs-foam', label: '2. Дизайнерский акустический войлок vs поролон' },
      { id: 'sec-diy-treatment', label: '3. Бесплатные бытовые методы снижения реверберации' }
    ],
    sections: [
      {
        id: 'sec-echo-nature',
        title: '1. Почему ваш голос звучит как «из бочки»',
        content: `Звуковая волна вашего голоса ударяется о монитор, стену позади него, отскакивает в потолок и возвращается в микрофон с микросекундной задержкой. Это явление называется флаттер-эхом (порхающее эхо).
        
Даже микрофон студийного уровня Shure SM7B или Rode не спасет от эффекта бочки, если комната акустически «голая». Секрет чистого голоса на 70% зависит от подготовки помещения.`
      },
      {
        id: 'sec-felt-vs-foam',
        title: '2. Дизайнерский акустический войлок (PET-панели) vs поролон',
        content: `Черный поролон «пирамидка» выглядит депрессивно и собирает бытовую пыль.
        
Современная альтернатива для жилой квартиры — **панели из прессованного полиэстера (PET-войлок)**:
- Доступны в пастельных скандинавских оттенках (бежевый, терракотовый, графит).
- Имеют коэффициент звукопоглощения NRC до 0.85 в речевом диапазоне.
- Крепятся на стену за монитором на двухсторонний скотч или жидкие гвозди без повреждения ремонта.`
      },
      {
        id: 'sec-diy-treatment',
        title: '3. Бесплатные бытовые методы снижения реверберации',
        content: `Если бюджет ограничен:
1. Постелите плотный ворсистый ковер под рабочий стол и кресло.
2. Повесьте плотные шторы из рогожки или бархата на оконный проем.
3. Разместите книжный стеллаж с неровно расставленными книгами напротив стола — это идеальный природный диффузор (рассеиватель) звука.`
      }
    ],
    featuredProductIds: ['fifine-k688', 'jabra-evolve2-65'],
    conclusion: 'Звукопоглощение за монитором и под ногами делает ваш голос бархатным и авторитетным на любых переговорах.',
    faqList: [
      {
        question: 'Защитят ли акустические панели от криков соседей?',
        answer: 'Нет, мягкие панели убирают эхо ВНУТРИ комнаты. Для защиты от внешнего шума требуется тяжелая многослойная шумоизоляция (масса и герметичность).'
      }
    ],
    seo: {
      metaTitle: 'Акустические панели для домашнего кабинета: убираем эхо 2026',
      metaDescription: 'Как сделать чистый звук на созвонах: панели из полиэстера, ковры, расстановка микрофона.',
      primaryKeyword: 'акустические панели для комнаты от эха',
      secondaryKeywords: ['убрать эхо на созвоне в комнате', 'звукопоглощающие панели для дома', 'акустический войлок на стену'],
      yandexWordstatSearches: 3200
    }
  },
  {
    
    tags: ['Планировка','Компактная квартира','Освещение','Зонирование'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '05 октября 2026',
    updatedAt: '05 октября 2026',
    readTimeMin: 7,
    views: 3840,
    heroImage: '/images/editorial/compact-apartment-nook.jpg',
    tableOfContents: [
      { id: 'sec-kitchen', label: '1. Кухня: почему это худшее место для 8-часового рабочего дня' },
      { id: 'sec-bedroom', label: '2. Спальня: психологический капкан и тишина' },
      { id: 'sec-living-room', label: '3. Гостиная: зонирование и компромиссы с семьей' },
      { id: 'sec-balcony', label: '4. Утепленная лоджия: идеальный изолированный мини-кабинет' },
      { id: 'sec-decision-matrix', label: '5. Итоговая матрица выбора: чек-лист' }
    ],
    sections: [
      {
        id: 'sec-kitchen',
        title: '1. Кухня: почему это худшее место для 8-часового рабочего дня',
        content: `Более 40% начинающих удаленщиков начинают работать за обеденным кухонным столом. Это главная ошибка:
- **Высота стола**: обеденные столы (76–78 см) выше компьютерных и не имеют выреза под локти. Плечи постоянно приподняты, вызывая спазм трапециевидных мышц к 14:00.
- **Кухонный табурет или стулья**: лишены поясничного упора и амортизации копчика.
- **Психологический триггер еды**: мозг связывает кухню с приемом пищи, провоцируя бесконечные импульсивные чаепития и срывая глубокий фокус (Deep Work).`
      },
      {
        id: 'sec-bedroom',
        title: '2. Спальня: психологический капкан и тишина',
        content: `Спальня — самая тихая комната в квартире, особенно если в гостиной играют дети.
- **Плюс**: закрытая межкомнатная дверь дает отличную изоляцию для рабочих звонков.
- **Главный минус**: мозг перестает воспринимать кровать как место исключительно ночного сна, что провоцирует бессонницу (компьютер и экран светят прямо в зону отдыха).
- **Решение**: размещайте стол спиной к кровати и закрывайте рабочий монитор чехлом или ширмой после 19:00.`
      },
      {
        id: 'sec-living-room',
        title: '3. Гостиная: зонирование и компромиссы с семьей',
        content: `В гостиной больше всего дневного света и воздуха (объем кислорода критичен для работы мозга).
Чтобы не мешать домочадцам:
1. Используйте стеллаж типа «лесенка» или войлочную перегородку для физического отделения зоны стола от дивана.
2. Приобретите закрытую гарнитуру с хорошим шумоподавлением микрофона (**Jabra Evolve2 65**), чтобы не слышать звук телевизора.`,
        productIds: ['jabra-evolve2-65']
      },
      {
        id: 'sec-balcony',
        title: '4. Утепленная лоджия: идеальный изолированный мини-кабинет',
        content: `Если балкон утеплен (двойной стеклопакет, теплый пол или конвектор) — это золотой стандарт удаленки:
- Панорамный естественный дневной свет без слепящего прямого солнца.
- Физическая дверь, которую можно закрыть на замок во время ответственного созвона.
- Ширина лоджии 100–120 см идеально подходит под столешницу с кронштейном для экрана.`,
        productIds: ['onkron-g80', 'cable-management-kit']
      },
      {
        id: 'sec-decision-matrix',
        title: '5. Итоговая матрица выбора: чек-лист',
        content: `- Живете один/вдвоем: гостиная у окна.
- В доме маленький ребенок: спальня с плотной дверью или утепленная лоджия.
- Однокомнатная квартира-студия: угол гостиной, отделенный шторой Blackout на потолочном карнизе.`
      }
    ],
    featuredProductIds: ['jabra-evolve2-65', 'onkron-g80', 'cable-management-kit'],
    conclusion: 'Главное правило эргономики жилья: никогда не работайте в постели и избегайте кухонного стола. Даже 1 квадратный метр выделенной зоны сохранит спину и психику.',
    faqList: [
      {
        question: 'Холодно ли работать на балконе зимой?',
        answer: 'Без теплого пола или настенного электрического конвектора сидеть неподвижно 8 часов зимой нельзя: ноги быстро замерзают. Обязателен подогрев пола или толстый ковер под стопы.'
      }
    ],
    seo: {
      metaTitle: 'В какой комнате лучше работать на удаленке: спальня, кухня или балкон 2026',
      metaDescription: 'Где обустроить рабочий кабинет в квартире: сравнение спальни, кухни, лоджии и гостиной, влияние на сон и спину.',
      primaryKeyword: 'в какой комнате лучше сделать рабочее место',
      secondaryKeywords: ['кабинет на балконе удаленка', 'рабочее место в спальне плюсы и минусы', 'почему нельзя работать на кухне'],
      yandexWordstatSearches: 4900
    }
  },
  {
    
    tags: ['Освещение','Планировка','Зрение','Эргономика'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '04 октября 2026',
    updatedAt: '04 октября 2026',
    readTimeMin: 8,
    views: 4210,
    heroImage: '/images/editorial/realistic-workspace-scandinavian.jpg',
    tableOfContents: [
      { id: 'sec-window-angle', label: '1. Окно: боковой свет — единственно правильное решение' },
      { id: 'sec-radiator-danger', label: '2. Батарея отопления: перегрев коленей и рассыхание мебели' },
      { id: 'sec-artificial-light', label: '3. Люстра и вечерний свет: как убрать слепые зоны' },
      { id: 'sec-socket-map', label: '4. Карта розеток: 1 провод до стены' }
    ],
    sections: [
      {
        id: 'sec-window-angle',
        title: '1. Окно: боковой свет — единственно правильное решение',
        content: `Почему нельзя сидеть лицом или спиной к окну:
- **Лицом к окну**: небо и солнце в десятки раз ярче матрицы монитора. Зрачок сужается от уличного света, и монитор кажется темным пятном. Глазные мышцы перенапрягаются за 30 минут, вызывая резь и слезотечение.
- **Спиной к окну**: дневной свет отражается от глянцевого или матового стекла монитора, создавая белый блеклый туман и блики.
- **Идеальное положение**: стол ставится перпендикулярно окну (свет падает слева для правшей, справа — для левшей) на расстоянии 0.8–1.5 м от оконного проема. На окна обязательны рулонные шторы (День-Ночь или полупрозрачный лен).`
      },
      {
        id: 'sec-radiator-danger',
        title: '2. Батарея отопления: перегрев коленей и рассыхание мебели',
        content: `В большинстве квартир в РФ радиатор стоит прямо под подоконником.
Если придвинуть рабочий стол вплотную:
1. Восходящий поток сухого горячего воздуха обжигает колени и голени, замедляя кровообращение в ногах.
2. Столешницы из массива или ЛДСП от сухого тепла деформируются и трескаются по кромке за 1–2 отопительных сезона.
3. Оставляйте зазор минимум 15–20 см между краем стола и батареей либо используйте защитный теплоотражающий экран.`
      },
      {
        id: 'sec-artificial-light',
        title: '3. Люстра и вечерний свет: как убрать слепые зоны',
        content: `Одинокая люстра в центре потолка светит вам в затылок, отбрасывая тень от вашего тела прямо на клавиатуру и блокнот.
Решение:
- Скринбар на верхнюю кромку монитора (**Xiaomi Light Bar** или **BenQ ScreenBar**) направляет поток света асимметрично строго на стол, не создавая бликов на стекле матрицы.`,
        productIds: ['xiaomi-lightbar', 'benq-screenbar-halo']
      },
      {
        id: 'sec-socket-map',
        title: '4. Карта розеток: принцип «1 провод до стены»',
        content: `Не тяните 5 проводов от ноутбука, монитора, лампы и зарядки телефона в розетку на стене.
Установите под столешницу подвесной корзинный лоток (**ErgoSteel**), положите туда сетевой фильтр на 6 розеток. Все блоки питания спрячутся под столом, а к стене пойдет всего один аккуратный кабель в тканевой оплетке.`,
        productIds: ['cable-management-kit']
      }
    ],
    featuredProductIds: ['xiaomi-lightbar', 'cable-management-kit', 'onkron-g80'],
    conclusion: 'Боковой дневной свет из окна и отсутствие жара от батареи — базовый фундамент, который сохранит зрение и терморегуляцию тела.',
    faqList: [
      {
        question: 'Что делать, если в комнате окно выходит на юг и солнце слепит весь день?',
        answer: 'Повесьте кассетные рулонные шторы со светопропусканием 30-50%: они уберут слепящий солнечный диск, но оставят мягкий рассеянный дневной свет.'
      }
    ],
    seo: {
      metaTitle: 'Куда поставить рабочий стол: свет из окна, батарея и розетки 2026',
      metaDescription: 'Где расположить стол в комнате: почему нельзя сидеть лицом к окну, защита от батареи и схема кабель-менеджмента.',
      primaryKeyword: 'куда поставить рабочий стол в комнате',
      secondaryKeywords: ['расположение рабочего стола относительно окна', 'стол возле батареи отопления', 'как падает свет на монитор'],
      yandexWordstatSearches: 5600
    }
  },
  {
    
    tags: ['Бюджетный сетап','Столы','Кресла','Эргономика'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '03 октября 2026',
    updatedAt: '03 октября 2026',
    readTimeMin: 9,
    views: 5120,
    heroImage: '/images/editorial/budget-clean-desk.jpg',
    tableOfContents: [
      { id: 'sec-priority-one', label: '1. Приоритет №1: выбор кресла под любой бюджет (от 1 500 до 25 000 ₽)' },
      { id: 'sec-diy-hacks', label: '2. Бесплатные лайфхаки: книги, плед и коробка из-под обуви' },
      { id: 'sec-phased-plan', label: '3. Поэтапный план апгрейда на 3 месяца' },
      { id: 'sec-starter-basket', label: '4. Три готовые корзины под разный кошелек' }
    ],
    sections: [
      {
        id: 'sec-priority-one',
        title: '1. Приоритет №1: выбор кресла под любой бюджет (от 1 500 до 25 000 ₽)',
        content: `Главная ошибка новичков — думать, что комфортная спина доступна только тем, у кого есть лишние 30 000 ₽ на кресло. Реальность проще: важно не наличие дорогого бренда, а поддержка естественного прогиба поясницы (лордоза) и отсутствие сдавливания сосудов под коленями.

#### 3 сценария решения проблемы под ваш кошелек:
1. **Ультрабюджет (до 5 000 ₽ на весь апгрейд):** Если покупка нового кресла сейчас не по карману, не сидите на жестком кухонном стуле просто так. Возьмите **анатомическую подушку под поясницу с эффектом памяти (Memory Foam, 1 490 ₽)** и **подставку для ног ErgoFeet (1 890 ₽)**. Подушка заполнит прогиб спины и не позволит тазу сползать, а подставка снимет застой крови в ногах. Это спасает от 80% визитов к неврологам всего за 3 380 ₽!
2. **Бюджетное кресло с сеткой (до 7 000 ₽):** Модель **Бюрократ KB-8 (6 890 ₽)** — бестселлер российского рынка. Упругая сетка на спинке не дает телу преть летом, а регулируемый валик надежно держит нижний отдел позвоночника.
3. **Оптимальный класс (13 900 – 24 900 ₽):** Если бюджет позволяет сделать покупку на 5–10 лет вперед — выбирайте **Chairman 795 Ergo (13 900 ₽)** на стальном хромированном пятилучии с синхромеханикой или легендарное кресло из арамидной нити **Metta Samurai S-3.05 (24 900 ₽)** с 10-летней гарантией на стальной каркас.`,
        productIds: ['lumbar-cushion-memory', 'chair-budget-burokrat', 'chair-chairman-795', 'metta-samurai-s3']
      },
      {
        id: 'sec-diy-hacks',
        title: '2. Бесплатные лайфхаки: книги, плед и коробка из-под обуви',
        content: `Чем заменить дорогие аксессуары на старте:
- **Вместо дорогой подставки под ноутбук (2 500 ₽)**: две толстые книги в твердом переплете (энциклопедии или тома классики). Они поднимут экран ноутбука на уровень глаз. Либо возьмите ультралегкую складную алюминиевую подставку **Ugreen / Baseus всего за 1 690 ₽**.
- **Вместо подставки для ног (2 000 ₽)**: плотная коробка из-под зимней обуви, наполненная старыми журналами для веса, или жесткая диванная подушка.
- **Вместо подвесного кабель-канала (1 800 ₽)**: пластиковые строительные стяжки или зажимы для бумаг (биндеры), прикрепленные к краю стола.`
      },
      {
        id: 'sec-phased-plan',
        title: '3. Поэтапный план апгрейда на 3 месяца',
        content: `- **Месяц 1 (Бюджет до 10 000 ₽)**: бюджетное кресло **Бюрократ KB-8** или подушка Memory Foam + подъем экрана ноутбука на подставке + отдельная клавиатура и мышь.
- **Месяц 2 (Бюджет 4 000–7 000 ₽)**: скринбар на монитор для работы вечерами (**Xiaomi Light Bar**) + кронштейн **ONKRON G80** для освобождения стола.
- **Месяц 3 (по желанию, от 21 900 ₽)**: доступный стол с электроприводом **Loctek / Eureka Basic** для чередования работы стоя и сидя.`,
        productIds: ['chair-budget-burokrat', 'xiaomi-lightbar', 'onkron-g80', 'desk-loctek-et114']
      },
      {
        id: 'sec-starter-basket',
        title: '4. Три готовые корзины под разный кошелек',
        content: `Выберите конфигурацию, соответствующую вашему текущему бюджету:
- 🟢 **Корзина «Студенческая / Эконом» (до 9 500 ₽):** Прочный письменный стол Hoff Loft (5 990 ₽) + анатомическая подушка Memory Foam (1 490 ₽) + алюминиевая подставка под ноутбук (1 690 ₽).
- 🟡 **Корзина «Оптимальный баланс» (до 19 000 ₽):** Кресло Бюрократ KB-8 (6 890 ₽) + стол Hoff Loft (5 990 ₽) + скринбар Xiaomi (4 290 ₽) + лоток кабель-менеджмента (1 850 ₽).
- 🔵 **Корзина «Максимум долговечности» (до 50 000 ₽):** Кресло Metta Samurai S-3 (24 900 ₽) + электроподъемный стол Loctek (21 900 ₽) + кронштейн ONKRON G80 (3 290 ₽).`,
        productIds: ['chair-budget-burokrat', 'lumbar-cushion-memory', 'desk-loft-wood-budget', 'metta-samurai-s3', 'xiaomi-lightbar']
      }
    ],
    featuredProductIds: ['chair-budget-burokrat', 'lumbar-cushion-memory', 'desk-loft-wood-budget', 'chair-chairman-795', 'metta-samurai-s3', 'laptop-stand-aluminum-folding'],
    conclusion: 'Главный секрет продуктивности — не ценник стола, а правильная геометрия углов: 90 градусов в локтях и коленях, верх монитора на уровне глаз.',
    faqList: [
      {
        question: 'Можно ли работать весь день за ноутбуком без отдельной клавиатуры?',
        answer: 'Категорически нет: либо экран опущен слишком низко (нагрузка на шею до 27 кг), либо клавиатура задрана слишком высоко (залом в запястье и туннельный синдром). Отдельная клавиатура обязательна.'
      }
    ],
    seo: {
      metaTitle: 'Домашний офис с нуля недорого: что купить в первую очередь 2026',
      metaDescription: 'Как обустроить рабочее место недорого: приоритеты покупок, бесплатные лайфхаки из подручных средств и план на 3 месяца.',
      primaryKeyword: 'обустроить рабочее место дома с нуля',
      secondaryKeywords: ['бюджетное рабочее место дома', 'на чем сэкономить в домашнем офисе', 'подставка под ноутбук своими руками'],
      yandexWordstatSearches: 6100
    }
  },
  {
    
    tags: ['Поездки','Техника в дорогу','Автономность','Work-Life'],
    author: EDITORIAL_AUTHOR,
    publishedAt: '06 октября 2026',
    updatedAt: '06 октября 2026',
    readTimeMin: 9,
    views: 3120,
    heroImage: '/images/editorial/remote-travel-work.jpg',
    tableOfContents: [
      { id: 'sec-agreements', label: '1. Договоренности с командой и шефом: прозрачность и асинхрон' },
      { id: 'sec-hardware', label: '2. Железо и аксессуары: что взять в дорогу' },
      { id: 'sec-cybersecurity', label: '3. Подготовка ноутбука и кибербезопасность' },
      { id: 'sec-connectivity', label: '4. Связь, риски и минимизация форс-мажоров' },
      { id: 'sec-vacation-defense', label: '5. Психологическая граница: как не испортить отпуск себе и семье' }
    ],
    sections: [
      {
        id: 'sec-agreements',
        title: '1. Договоренности с командой и шефом: прозрачность и асинхрон',
        content: `Главная ошибка при попытке совместить отпуск и удаленку — создавать у команды иллюзию, что вы находитесь в обычном рабочем режиме. Любой неожиданный обрыв связи, фоновый шум аэропорта или задержка с ответом вызовут раздражение руководства и подорвут доверие.

#### Алгоритм экологичных договоренностей перед отъездом:
- **Фиксированные «окна связи» (Focus Windows):** Заранее согласуйте с руководителем четкий интервал присутствия. Например: *«Я на связи в рабочих чатах строго с 08:30 до 10:30 по московскому времени. В это время разбираю входящие тикеты, провожу 1 обязательный синк и отвечаю на вопросы»*. Вне этого окна вы официально офлайн.
- **Принцип Async-First (асинхронная коммуникация):** Предупредите коллег, что на несрочные письма и задачи вы отвечаете один раз в сутки во время утреннего спринта. Никаких «быстрых пингов» в течение дня.
- **Публичный статус в мессенджерах:** Поставьте в Slack/Telegram информативный статус: *«В поездке / На связи 08:30–10:30 МСК. По критическим авариям звонить @дежурный_инженер»*.
- **Делегирование прав и дежурств:** Передайте коллеге доступ к админ-панелям, паролям и серверным сертификатам. Команда должна уметь решать инциденты без вашего экстренного вмешательства на пляже.
- **Вежливое, но твердое «Нет» спонтанным созвонам:** Если вас просят «подключиться на 5 минут в 15:00», отвечайте шаблонной формулировкой: *«Сейчас в дороге без стабильного интернета. Напишите суть текстом или голосом — разберу завтра в утреннем окне связи»*.`
      },
      {
        id: 'sec-hardware',
        title: '2. Железо и аксессуары: ультракомпактный набор мобильного удаленщика',
        content: `В дороге каждый лишний провод и 100 граммов веса в рюкзаке превращаются в постоянную обузу. Забудьте о массивных заводских блоках питания — современный сетап для поездок строится на принципах унификации и сверхкомпактности.

#### Чек-лист проверенного мобильного сетапа:
1. **Универсальная GaN-зарядка на 65–100 Вт:** Один компактный блок на базе нитрида галлия (например, *Ugreen Nexode 100W*) с 3–4 разъемами заменяет отдельную зарядку для ноутбука, адаптер для смартфона, часов и наушников. Занимает минимум места и не греется.
2. **Пауэрбанк с Power Delivery 65W/100W:** Выбирайте плоский аккумулятор емкостью 20 000 мАч (до 74–99 Вт·ч, например *Baseus Blade 100W*). 
   ⚠️ **Авиационное правило:** Аккумуляторы до 100 Вт·ч разрешено брать **только в ручную кладь** (в багаж сдавать запрещено!). Это дает вам честные 4–5 часов автономности в поезде, на теплоходе или в зале ожидания.
3. **Складная невидимая подставка под ноутбук (*MOFT Adhesive*):** Наклеивается на нижнюю крышку ноутбука (толщина всего 3 мм, вес 85 г) и раскладывается за 1 секунду. Приподнимает экран на 5–8 см, предотвращая изгиб шейных позвонков за низкими столиками в кафе и отелях.
4. **Универсальный дорожный переходник под розетки:** Пригодится в любых отелях с нестандартными или расшатанными розетками, а при выезде за рубеж (ОАЭ, Турция, Азия, Европа) — убережет от поиска адаптера втридорога в аэропорту.
5. **Компактная гарнитура со штангой ENC или TWS с активным шумоподавлением (ANC):** Позволяет комфортно провести 15-минутный созвон прямо из шумного гостиничного лобби или кофейни — собеседники не услышат шума кофемашины и чужих разговоров.`,
        productIds: ['ugreen-gan-100w', 'baseus-blade-powerbank']
      },
      {
        id: 'sec-cybersecurity',
        title: '3. Подготовка ноутбука и кибербезопасность перед поездкой',
        content: `Потеря или кража ноутбука в поездке неприятна сама по себе, но утечка корпоративных баз данных или клиентских данных компании — это катастрофа с риском многомиллионных штрафов и увольнения.

#### Обязательные технические шаги перед выходом из дома:
- **Полнодисковое шифрование данных:** Обязательно активируйте **BitLocker** (на Windows Pro) или **FileVault** (на macOS). Даже если злоумышленник извлечет SSD-накопитель из украденного ноутбука, расшифровать ваши файлы без мастер-ключа невозможно.
- **Двухфакторная аутентификация (2FA) ТОЛЬКО через генераторы кодов:** Переключите подтверждение входа в почту, GitHub, Telegram и корпоративные сервисы с российских SMS на приложения-аутентификаторы (*Google Authenticator, Яндекс Ключ, 2FAS, 1Password*). 
  💡 **Почему это критично:** В международном роуминге или при установке местной сим-карты SMS от российских операторов часто задерживаются на часы или вовсе не доходят! Без офлайн-генератора кодов вы рискуете оказаться заблокированным в чужой стране.
- **Полный бэкап системы в облако и на внешний накопитель:** Перед выездом сделайте свежий снимок рабочей директории. Если ноутбук зальют кофе в кафе или разобьют при транспортировке, вы сможете продолжить работу с любого резервного устройства.
- **Тестирование корпоративного VPN / VDI до вылета:** Проверьте работу рабочих доступов через мобильную сеть смартфона в авиарежиме с включенным Wi-Fi. Убедитесь, что корпоративные протоколы (WireGuard, OpenVPN, Shadowsocks) соединяются стабильно.`
      },
      {
        id: 'sec-connectivity',
        title: '4. Связь, риски и минимизация форс-мажоров',
        content: `Никогда не рассчитывайте исключительно на отельный Wi-Fi. В 80% курортных гостиниц сигнал в дальних номерах нестабилен, а скорость вечерами падает до неприличных значений из-за наплыва постояльцев, смотрящих стриминг.

#### Стратегия гарантированной связи:
- **Туристическая eSIM или местная SIM-карта:** Если телефон поддерживает технологию eSIM, установите профиль виртуального оператора (Airalo, Yesim, Drimsim) еще до вылета. По прилету вы мгновенно получаете мобильный интернет без очередей в аэропорту. Для поездок по России подключите опцию раздачи трафика у вашего домашнего оператора.
- **Смартфон как резервная точка доступа (Hotspot):** Настройте режим модема заранее, проверьте пароль и держите под рукой длинный зарядный кабель (раздача интернета по Wi-Fi разряжает телефон за 2–3 часа).
- **Офлайн-синхронизация ключевых документов:** Включите офлайн-доступ к нужным файлам в Google Docs, Notion, Figma или Яндекс Диске. Вы сможете редактировать тексты, писать код и делать расчеты прямо в самолете или поезде без интернета.
- **Разведка коворкингов на картах:** Перед заселением найдите на картах Яндекс или Google 1–2 коворкинга или сетевых кофеен с надежным оптоволоконным интернетом в радиусе 15 минут от отеля на случай локальной аварии электросети.`
      },
      {
        id: 'sec-vacation-defense',
        title: '5. Психологическая граница: как не испортить отпуск себе и семье',
        content: `Самый печальный исход «удаленки в поездке» — превратиться в раздраженного зомби, который сидит на пляже под зонтом, щурится в экран ноутбука, шипит на детей и вздрагивает от каждого звука уведомлений в Telegram.

#### 5 золотых правил здорового совмещения отпуска и работы:
1. **Правило «Утреннего спринта»:** Работайте строго ранним утром — например, с 07:30 до 09:30, пока семья спит или собирается на завтрак. За эти 2 часа тишины вы сделаете больше, чем за 6 часов прерывистых попыток поработать днем.
2. **Ноутбук с глаз долой:** Как только на часах пробило согласованное время окончания спринта, закройте крышку ноутбука и **уберите его в сейф номера или в глубину рюкзака**. Если ноутбук лежит открытым на столе, мозг находится в режиме ожидания работы и не может восстановиться.
3. **Режим «Не беспокоить» на смартфоне:** Переведите рабочий профиль Telegram/Slack в беззвучный режим на все оставшееся время дня.
4. **Никакой работы на пляже и в ресторанах:** Яркое солнце бликует на экране, песок забивает клавиатуру и вентиляцию, а вы выглядите нелепо и вызываете обиду у спутников. Работайте только за столом в номере или коворкинге.
5. **Честность перед собой:** Если проект горит и требует 8 часов непрерывного погружения в день — это не поездка с «парой часов работы», а полноценная рабочая командировка. В таком случае честно оформите отгулы или перенесите дату поездки.`
      }
    ],
    featuredProductIds: ['ugreen-gan-100w', 'baseus-blade-powerbank', 'moft-laptop-stand', 'jabra-evolve2-65'],
    conclusion: 'Успешная удаленка в поездке держится на двух китах: автономном ультракомпактном оборудовании и железной дисциплине тайм-боксинга. Два часа утренней сфокусированной работы закрывают ключевые задачи бизнеса и дарят вам полноценный день для ярких впечатлений без чувства вины.',
    faqList: [
      {
        question: 'Сколько ватт-часов (Wh) пауэрбанка разрешено провозить в самолете в 2026 году?',
        answer: 'По международным нормам IATA и правилам российских авиакомпаний, пауэрбанки емкостью до 100 Вт·ч (Wh) разрешено провозить в ручной клади без специального согласования (это как раз стандартные аккумуляторы емкостью 20 000 – 27 000 мАч). Сдавать пауэрбанки в регистрируемый багаж строго запрещено.'
      },
      {
        question: 'Что делать, если в роуминге не приходят SMS от российских банков и сервисов?',
        answer: 'Заранее переключите все подтверждения входа на приложения-аутентификаторы (Google Authenticator, Яндекс Ключ, 2FAS). Если SMS все же необходимо для банка, оставьте российскую сим-карту во втором слоте телефона с включенным роумингом данных только для входящих сообщений.'
      },
      {
        question: 'Как охладить ноутбук, если в гостиничном номере жарко?',
        answer: 'Не ставьте ноутбук на кровать, плед или колени — мягкая ткань мгновенно блокирует воздухозаборники. Используйте складную подставку (например, MOFT), чтобы обеспечить свободный приток воздуха снизу, и не оставляйте технику под прямыми солнечными лучами.'
      }
    ],
    seo: {
      metaTitle: 'Удаленная работа в поездке и отпуске: чек-лист техники и правил 2026',
      metaDescription: 'Полный гид: что взять из техники в поездку, как договориться с шефом об асинхроне, шифрование ноутбука, GaN-зарядки и как не испортить отпуск.',
      primaryKeyword: 'удаленная работа в поездке',
      secondaryKeywords: ['удаленка в отпуске', 'что взять удаленщику в дорогу', 'подготовка ноутбука к поездке', 'gan зарядка для ноутбука'],
      yandexWordstatSearches: 4300
    }
  }
];

export const SETUP_PRESETS: SetupPreset[] = [
  {
    id: 'preset-parent-focus',
    title: 'Удаленный родитель (Тишина и фокус)',
    targetAudience: 'Специалисты с детьми в 1-2 комнатной квартире',
    budgetRub: 53980,
    description: 'Комплект с упором на отсечение детских криков микрофоном, эргономичное кресло и скринбар для работы ранним утром или поздним вечером.',
    includedProductIds: ['metta-samurai-s3', 'xiaomi-lightbar', 'jabra-evolve2-65', 'cable-management-kit'],
    keyBenefit: 'Коллеги не слышат плача и мультиков, спина не затекает, ребенок видит индикатор звонка'
  },
  {
    id: 'preset-sit-stand-pro',
    title: 'Здоровая спина 360° (Sit-Stand Pro)',
    targetAudience: 'Разработчики, аналитики и дизайнеры (8+ часов у экрана)',
    budgetRub: 81580,
    description: 'Двухмоторный подъемный стол, адаптивное ортопедическое кресло и газлифт-кронштейн для экрана. Идеальная профилактика грыж.',
    includedProductIds: ['ergostol-terra', 'sihoo-doro-c300', 'onkron-g80', 'cable-management-kit'],
    keyBenefit: 'Чередование работы стоя и сидя каждые 45 минут + освобождение 100% поверхности стола'
  },
  {
    id: 'preset-budget-starter',
    title: 'Умный старт до 35 000 ₽',
    targetAudience: 'Быстрый апгрейд базового рабочего стола с минимальными вложениями',
    budgetRub: 34330,
    description: 'Надежное российское кресло с 10-летней гарантией, свет без бликов на экран и наведение идеального порядка под ногами.',
    includedProductIds: ['metta-samurai-s3', 'xiaomi-lightbar', 'onkron-g80', 'cable-management-kit'],
    keyBenefit: 'Максимальный КПД на каждый вложенный рубль без переплат за премиум бренды'
  }
];

export const LAUNCH_CHECKLIST_DATA: LaunchChecklistItem[] = [
  {
    id: 'step-google',
    title: '1. Единый рабочий аккаунт под проект',
    service: 'Google / Яндекс ID',
    status: 'completed',
    priority: 'must_have',
    directLink: 'https://accounts.google.com',
    whyNeeded: 'Центр управления: привязка Яндекс Вебмастера, Google Search Console, счетчиков Яндекс Метрики и регистрация в партнерских кабинетах.',
    actionGuide: 'Аккаунт готов. Используйте его для входа во все сервисы.'
  },
  {
    id: 'step-yandex-distrib',
    title: '2. Яндекс Дистрибуция (Главная партнерка для Яндекс Маркета)',
    service: 'Яндекс Дистрибуция (distribution.yandex.ru)',
    status: 'in_progress',
    priority: 'must_have',
    directLink: 'https://distribution.yandex.ru',
    whyNeeded: '№1 в РФ по доступности и конверсии! Доступна без VPN, без ограничений по числу подписчиков (принимает сайты от 0 визитов со своим доменом). Автоматическая маркировка ОРД Яндекса, выплаты на карты РФ/самозанятому.',
    actionGuide: 'Войдите под Яндекс ID. Подайте заявку на оффер «Яндекс Маркет». В поле адреса площадки укажите ваш зарегистрированный домен https://kabinetdoma.ru.'
  },
  {
    id: 'step-advcake',
    title: '3. AdvCake (Главная e-commerce сеть: Мегамаркет, Hoff, Restore)',
    service: 'AdvCake.com',
    status: 'pending',
    priority: 'must_have',
    directLink: 'https://advcake.com',
    whyNeeded: 'Лидер российского e-commerce! Именно здесь сидят все крупнейшие ритейлеры мебели и техники: Мегамаркет (Сбер), Hoff, Restore, М.Видео, Эльдорадо, Орматек, Askona, ВсеИнструменты. Отличные комиссии на мебель и электронику.',
    actionGuide: 'Зарегистрируйтесь как Вебмастер (Webmaster). В качестве площадки укажите https://kabinetdoma.ru (тип: контентный сайт/обзоры). Модерация проходит быстро.'
  },
  {
    id: 'step-gdeslon',
    title: '4. ГдеСлон (gdeslon.ru) — мебель, кресла и техника для дома',
    service: 'GdeSlon.ru',
    status: 'pending',
    priority: 'must_have',
    directLink: 'https://www.gdeslon.ru',
    whyNeeded: 'Старейшая специализированная товарная CPA-сеть в РФ. Сотни интернет-магазинов мебели, электроники и товаров для дома. Идеально под наши статьи про столы, кресла и аксессуары.',
    actionGuide: 'Зарегистрируйтесь вебмастером на gdeslon.ru. Добавьте площадку kabinetdoma.ru и подключайте офферы мебельных фабрик в 1 клик.'
  },
  {
    id: 'step-wb-partners',
    title: '5. Wildberries Partners (Официальная партнерка WB)',
    service: 'WB Partners (partners.wb.ru / guru)',
    status: 'pending',
    priority: 'recommended',
    directLink: 'https://partners.wb.ru',
    whyNeeded: 'Прямая партнерская программа Wildberries. Огромный ассортимент кронштейнов, скринбаров, органайзеров проводов и мелочей для дома с быстрой доставкой в ПВЗ.',
    actionGuide: 'Авторизуйтесь по номеру телефона в кабинете WB Partners. Создавайте диплинки на любые товары из каталога WB.'
  },
  {
    id: 'step-ozon',
    title: '6. Ozon (Партнерские диплинки и CPA)',
    service: 'Ozon / CPA Агрегаторы',
    status: 'pending',
    priority: 'recommended',
    directLink: 'https://ozon.ru',
    whyNeeded: 'Ozon подключен к CPA-сетям (AdvCake, ГдеСлон, CityAds). Также можно использовать реферальные ссылки с персональным кодом или диплинками.',
    actionGuide: 'Подключайте оффер Ozon через кабинет AdvCake или ГдеСлон, либо используйте прямые диплинк-ссылки.'
  },
  {
    id: 'step-github',
    title: '7. Размещение на GitHub Pages + домен kabinetdoma.ru',
    service: 'GitHub Pages & DNS',
    status: 'in_progress',
    priority: 'must_have',
    directLink: 'https://github.com',
    whyNeeded: 'Бесплатный, вечный и надежный хостинг с привязкой домена kabinetdoma.ru без абонентской платы.',
    actionGuide: 'В репозитории GitHub во вкладке Settings -> Pages укажите Custom domain: kabinetdoma.ru. A-записи уже прописаны на nic.ru!'
  },
  {
    id: 'step-self-employed',
    title: '8. Статус самозанятого и автоматическая маркировка ОРД',
    service: 'Мой Налог / ОРД',
    status: 'completed',
    priority: 'must_have',
    directLink: 'https://npd.nalog.ru',
    whyNeeded: 'Легальный вывод комиссионных на любую карту российского банка с уплатой 4–6% налога. При работе через Яндекс Дистрибуцию и AdvCake маркировка ЕРИР идет автоматически.',
    actionGuide: 'Все плашки и ERID-маркировка уже интегрированы в карточки товаров сайта.'
  }
];

export const SEO_KEYWORDS_MATRIX = [
  { keyword: 'стол с электроприводом для работы стоя', cluster: 'Электростолы', volumeYandex: 5600, comp: 'Средняя', intent: 'Транзакционный', targetArticleId: 'guide-2-standing-desk' },
  { keyword: 'эргономичное кресло для работы за компьютером', cluster: 'Кресла', volumeYandex: 7800, comp: 'Высокая', intent: 'Коммерческий', targetArticleId: 'guide-3-chairs-review' },
  { keyword: 'рабочее место в однушке с ребенком', cluster: 'Удаленка и дети', volumeYandex: 4200, comp: 'Низкая', intent: 'Информационный / Value', targetArticleId: 'guide-1-kids-flat' },
  { keyword: 'скринбар на монитор xiaomi', cluster: 'Освещение', volumeYandex: 4900, comp: 'Средняя', intent: 'Транзакционный', targetArticleId: 'guide-4-monitor-lightbar' },
  { keyword: 'кабель менеджмент под столом', cluster: 'Организация', volumeYandex: 6200, comp: 'Низкая', intent: 'Информационный / DIY', targetArticleId: 'guide-6-cable-management' },
  { keyword: 'микрофон с шумоподавлением для удаленной работы', cluster: 'Звук', volumeYandex: 3800, comp: 'Средняя', intent: 'Коммерческий', targetArticleId: 'guide-5-noise-cancelling-audio' },
  { keyword: 'кронштейн для монитора на стол', cluster: 'Аксессуары', volumeYandex: 5100, comp: 'Средняя', intent: 'Коммерческий', targetArticleId: 'guide-7-ergonomic-accessories' },
  { keyword: 'как работать на удаленке с ребенком', cluster: 'Тайм-менеджмент', volumeYandex: 4700, comp: 'Низкая', intent: 'Информационный / Value', targetArticleId: 'guide-8-traffic-light-method' }
];
