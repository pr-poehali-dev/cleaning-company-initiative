import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeSection, setActiveSection] = useState('home');
  
  const [cleaningType, setCleaningType] = useState('standard');
  const [roomType, setRoomType] = useState('apartment');
  const [area, setArea] = useState([50]);
  const [extras, setExtras] = useState<string[]>([]);

  const services = [
    {
      icon: 'Home',
      title: 'Уборка квартир',
      description: 'Комплексная уборка жилых помещений с профессиональными средствами',
      price: 'от 2500₽'
    },
    {
      icon: 'Building2',
      title: 'Уборка офисов',
      description: 'Поддержание чистоты в офисных помещениях любого масштаба',
      price: 'от 3500₽'
    },
    {
      icon: 'Sparkles',
      title: 'Генеральная уборка',
      description: 'Глубокая чистка всех поверхностей и труднодоступных мест',
      price: 'от 4500₽'
    },
    {
      icon: 'Droplets',
      title: 'Мытьё окон',
      description: 'Профессиональное мытьё окон с обеих сторон',
      price: 'от 1500₽'
    },
    {
      icon: 'Sofa',
      title: 'Химчистка мебели',
      description: 'Глубокая чистка мягкой мебели и ковров',
      price: 'от 2000₽'
    },
    {
      icon: 'Hammer',
      title: 'Уборка после ремонта',
      description: 'Удаление строительной пыли и приведение в порядок',
      price: 'от 5000₽'
    }
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      text: 'Отличная работа! Квартира сияет чистотой. Приехали точно вовремя, работали быстро и качественно.',
      rating: 5
    },
    {
      name: 'Дмитрий Иванов',
      text: 'Заказываю уборку офиса регулярно. Всегда довольны результатом. Команда профессионалов!',
      rating: 5
    },
    {
      name: 'Мария Сидорова',
      text: 'После ремонта не знали, с чего начать. Ребята справились за один день, результат превзошел ожидания!',
      rating: 5
    }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculatePrice = () => {
    const basePrices: Record<string, number> = {
      standard: 30,
      deep: 45,
      afterRepair: 60
    };
    
    const roomMultipliers: Record<string, number> = {
      apartment: 1,
      office: 1.3,
      house: 1.5
    };
    
    const extraPrices: Record<string, number> = {
      windows: 1500,
      furniture: 2000,
      balcony: 800
    };
    
    const basePrice = basePrices[cleaningType] * area[0] * roomMultipliers[roomType];
    const extrasTotal = extras.reduce((sum, extra) => sum + extraPrices[extra], 0);
    
    return Math.round(basePrice + extrasTotal);
  };

  const toggleExtra = (extra: string) => {
    setExtras(prev => 
      prev.includes(extra) 
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-muted/20 to-primary/5">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            СияниеДом
          </h1>
          <div className="hidden md:flex gap-6">
            {['home', 'services', 'calculator', 'portfolio', 'about', 'reviews', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`transition-all duration-300 hover:text-primary ${
                  activeSection === section ? 'text-primary font-semibold' : 'text-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'services' && 'Услуги'}
                {section === 'calculator' && 'Калькулятор'}
                {section === 'portfolio' && 'Портфолио'}
                {section === 'about' && 'О нас'}
                {section === 'reviews' && 'Отзывы'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            Заказать уборку
          </Button>
        </div>
      </nav>

      <section
        id="home"
        className="pt-32 pb-20 px-4 min-h-screen flex items-center animate-fade-in"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-6xl font-bold leading-tight">
              Профессиональная
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                уборка помещений
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Превращаем любое пространство в идеально чистое за считанные часы. Работаем с любовью к деталям.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8"
                onClick={() => scrollToSection('contacts')}
              >
                Оставить заявку
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                Наши услуги
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary">7 лет</div>
                <div className="text-sm text-muted-foreground">На рынке</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Работаем</div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img
              src="https://cdn.poehali.dev/projects/60c874a3-e5db-45b4-839f-a14836a4385a/files/bf53ff3f-d94a-44a6-a575-ec92561e5f1b.jpg"
              alt="Команда клининга"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">
              Полный спектр клининговых услуг для дома и бизнеса
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name={service.icon} className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Button
                      variant="ghost"
                      className="group-hover:text-primary group-hover:translate-x-1 transition-all"
                    >
                      Заказать
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Калькулятор стоимости</h2>
            <p className="text-xl text-muted-foreground">
              Рассчитайте примерную стоимость уборки за 1 минуту
            </p>
          </div>
          <Card className="border-2 hover:border-primary/30 transition-all animate-scale-in">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Sparkles" size={18} className="text-primary" />
                      Тип уборки
                    </label>
                    <Select value={cleaningType} onValueChange={setCleaningType}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Стандартная уборка (30₽/м²)</SelectItem>
                        <SelectItem value="deep">Генеральная уборка (45₽/м²)</SelectItem>
                        <SelectItem value="afterRepair">После ремонта (60₽/м²)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Building" size={18} className="text-secondary" />
                      Тип помещения
                    </label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Квартира</SelectItem>
                        <SelectItem value="office">Офис (+30%)</SelectItem>
                        <SelectItem value="house">Дом/Коттедж (+50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Ruler" size={18} className="text-accent" />
                      Площадь: <span className="text-primary">{area[0]} м²</span>
                    </label>
                    <Slider
                      value={area}
                      onValueChange={setArea}
                      min={20}
                      max={300}
                      step={5}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>20 м²</span>
                      <span>300 м²</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Plus" size={18} className="text-primary" />
                      Дополнительные услуги
                    </label>
                    <div className="space-y-2">
                      <Button
                        variant={extras.includes('windows') ? 'default' : 'outline'}
                        className="w-full justify-between h-12"
                        onClick={() => toggleExtra('windows')}
                      >
                        <span>Мытьё окон</span>
                        <span className="text-sm">+1500₽</span>
                      </Button>
                      <Button
                        variant={extras.includes('furniture') ? 'default' : 'outline'}
                        className="w-full justify-between h-12"
                        onClick={() => toggleExtra('furniture')}
                      >
                        <span>Химчистка мебели</span>
                        <span className="text-sm">+2000₽</span>
                      </Button>
                      <Button
                        variant={extras.includes('balcony') ? 'default' : 'outline'}
                        className="w-full justify-between h-12"
                        onClick={() => toggleExtra('balcony')}
                      >
                        <span>Балкон/Лоджия</span>
                        <span className="text-sm">+800₽</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 space-y-6 border-2 border-primary/20">
                    <div className="text-center space-y-2">
                      <div className="text-sm text-muted-foreground font-medium">Итоговая стоимость</div>
                      <div className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        {calculatePrice().toLocaleString()}₽
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t-2 border-primary/20">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Базовая стоимость:</span>
                        <span className="font-semibold">
                          {cleaningType === 'standard' && '30₽/м²'}
                          {cleaningType === 'deep' && '45₽/м²'}
                          {cleaningType === 'afterRepair' && '60₽/м²'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Площадь:</span>
                        <span className="font-semibold">{area[0]} м²</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Коэффициент:</span>
                        <span className="font-semibold">
                          {roomType === 'apartment' && '×1.0'}
                          {roomType === 'office' && '×1.3'}
                          {roomType === 'house' && '×1.5'}
                        </span>
                      </div>
                      {extras.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Доп. услуги:</span>
                          <span className="font-semibold">{extras.length} шт</span>
                        </div>
                      )}
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg h-14"
                      onClick={() => scrollToSection('contacts')}
                    >
                      Заказать уборку
                      <Icon name="ArrowRight" className="ml-2" size={20} />
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      * Точная стоимость рассчитывается после осмотра объекта
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Результаты нашей работы</h2>
            <p className="text-xl text-muted-foreground">
              Посмотрите на преображение пространств до и после уборки
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in">
              <CardContent className="p-0">
                <div className="relative h-[600px] select-none">
                  <img
                    src="https://cdn.poehali.dev/projects/60c874a3-e5db-45b4-839f-a14836a4385a/files/4d1c2713-7ef7-4ba2-8f48-ba76712fd34b.jpg"
                    alt="До уборки"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src="https://cdn.poehali.dev/projects/60c874a3-e5db-45b4-839f-a14836a4385a/files/36c10a57-ff3f-43ba-90d4-8f27b65cafe8.jpg"
                      alt="После уборки"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={(e) => {
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        const rect = e.currentTarget.parentElement!.getBoundingClientRect();
                        const x = moveEvent.clientX - rect.left;
                        const percentage = (x / rect.width) * 100;
                        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
                      };
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Icon name="ChevronsLeftRight" size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                    До уборки
                  </div>
                  <div className="absolute bottom-8 right-8 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                    После уборки
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
            <h2 className="text-5xl font-bold">О компании</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              СияниеДом — это команда профессионалов с 7-летним опытом работы в сфере клининговых услуг.
              Мы используем только сертифицированные средства и современное оборудование, чтобы гарантировать
              безупречный результат каждому клиенту.
            </p>
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Award" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Качество</h3>
                <p className="text-muted-foreground">
                  Гарантируем высокое качество работ и возвращаемся для исправлений бесплатно
                </p>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
                  <Icon name="Clock" size={32} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Пунктуальность</h3>
                <p className="text-muted-foreground">
                  Приезжаем точно в назначенное время и укладываемся в сроки
                </p>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Shield" size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Безопасность</h3>
                <p className="text-muted-foreground">
                  Все сотрудники проверены, застрахованы и обучены работе с профессиональным оборудованием
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">
              Что говорят о нас наши довольные клиенты
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((review, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-muted-foreground">Клиент</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку, и мы перезвоним в течение 15 минут
            </p>
          </div>
          <Card className="animate-scale-in">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Телефон</label>
                    <Input placeholder="+7 (999) 123-45-67" className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип уборки</label>
                  <Input placeholder="Например: уборка квартиры" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Комментарий</label>
                  <Textarea
                    placeholder="Расскажите подробнее о ваших пожеланиях..."
                    className="min-h-32"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg h-14"
                >
                  Отправить заявку
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Icon name="Phone" className="mx-auto text-primary" size={32} />
                  <div className="font-semibold">+7 (999) 123-45-67</div>
                  <div className="text-sm text-muted-foreground">Звоните с 8:00 до 22:00</div>
                </div>
                <div className="space-y-2">
                  <Icon name="Mail" className="mx-auto text-secondary" size={32} />
                  <div className="font-semibold">info@siyaniedom.ru</div>
                  <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                </div>
                <div className="space-y-2">
                  <Icon name="MapPin" className="mx-auto text-accent" size={32} />
                  <div className="font-semibold">Москва, ул. Примерная, 1</div>
                  <div className="text-sm text-muted-foreground">Работаем по всему городу</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-12 px-4">
        <div className="container mx-auto text-center space-y-4">
          <h3 className="text-3xl font-bold">СияниеДом</h3>
          <p className="text-white/80">Профессиональная уборка помещений с 2017 года</p>
          <div className="flex justify-center gap-6 pt-4">
            <Icon name="Instagram" size={24} className="hover:scale-110 transition-transform cursor-pointer" />
            <Icon name="Facebook" size={24} className="hover:scale-110 transition-transform cursor-pointer" />
            <Icon name="Twitter" size={24} className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
          <div className="pt-8 border-t border-white/20 text-white/60 text-sm">
            © 2024 СияниеДом. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;