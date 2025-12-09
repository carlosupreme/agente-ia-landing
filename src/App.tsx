import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  MessageCircle, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Store, 
  Utensils, 
  Wrench, 
  Scissors, 
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  Clock,
  Megaphone,
  LayoutDashboard,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WaitlistModal } from "./components/WaitlistModal";

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- UI Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "cta" }>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/10",
      cta: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
      outline: "border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900",
      ghost: "hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300", className)}>
    {children}
  </div>
);

const SectionHeading = ({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) => (
  <div className={cn("text-center max-w-3xl mx-auto mb-16", className)}>
    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl mb-4 leading-tight">{title}</h2>
    {subtitle && <p className="text-lg text-zinc-500 leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Sections ---

function Hero({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-8">
            <MapPin size={14} />
            Pensado para negocios locales en Oaxaca
          </div>
          
          <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl mb-6">
            Más clientes sin complicarte <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Publicidad automática
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 sm:text-xl mb-10 leading-relaxed">
            Súbelo una vez y nuestra IA publica tus anuncios, los optimiza y te trae clientes todos los días. Olvídate de batallar con Facebook o Google.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="cta" className="h-14 px-8 text-base" onClick={() => onOpenWaitlist('Hero Principal')}>
              Comenzar ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-14 px-8 text-base" onClick={() => onOpenWaitlist('Hero Secundario')}>
              Probar gratis
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[100px]" />
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="¿Te suena familiar?" 
          subtitle="Sabemos que las PYMES pierden dinero por no anunciarse bien. Hacer publicidad sigue siendo difícil: demasiados botones, demasiadas reglas."
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Clock className="h-8 w-8 text-red-500" />,
              title: "No tienes tiempo",
              desc: "Dirigir tu negocio te consume todo el día. No puedes estar pegado a la computadora aprendiendo marketing."
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
              title: "Es complicado",
              desc: "Facebook Ads Manager parece cabina de avión. Un error y gastas presupuesto sin resultados."
            },
            {
              icon: <Megaphone className="h-8 w-8 text-yellow-600" />,
              title: "Agencias costosas",
              desc: "Contratar una agencia tradicional te cuesta más que la misma publicidad. Inviable para empezar."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100"
            >
              <div className="mb-4 bg-zinc-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-2xl font-medium text-zinc-900">
            Hicimos algo mucho más simple. <span className="text-blue-600 font-bold">Como tener una agencia por una fracción del precio.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Sube tus fotos o videos",
      desc: "Toma una foto con tu celular o sube un video de tu producto o servicio. Sin ediciones complejas.",
      icon: <LayoutDashboard className="h-6 w-6 text-white" />
    },
    {
      num: "02",
      title: "Nuestra IA publica sola",
      desc: "El sistema redacta el texto, elige dónde publicar (Facebook, Instagram, Google) y lanza la campaña.",
      icon: <Bot className="h-6 w-6 text-white" />
    },
    {
      num: "03",
      title: "Recibe clientes",
      desc: "Tu teléfono empieza a sonar. Te llegan mensajes y reportes simples: 'hoy ganaste 5 clientes'.",
      icon: <MessageCircle className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Tan fácil como enviar un mensaje" />
        
        <div className="grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-zinc-100 -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-200 border-4 border-white z-10">
                {step.icon}
              </div>
              <div className="absolute top-0 right-0 md:right-auto md:left-[60%] -mt-4 text-6xl font-black text-zinc-100 -z-20 select-none">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
              <p className="text-zinc-500 max-w-xs mx-auto leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    "Más clientes sin saber marketing",
    "Costo mensual muy accesible",
    "Todo se publica automático",
    "La IA ahorra tu presupuesto",
    "Reportes simples en español",
    "Ideal para negocios en Oaxaca"
  ];

  return (
    <section id="benefits" className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Deja que la tecnología trabaje <span className="text-blue-400">mientras tú atiendes tu negocio.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Ya no necesitas contratar a un sobrino o pagarle miles de pesos a una agencia. Tienes el poder de una inteligencia artificial experta en ventas, trabajando 24/7 para ti.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="font-medium text-zinc-200">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
               {/* Abstract dashboard visualization */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
               <div className="relative z-10 bg-zinc-800/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-700 shadow-2xl w-full max-w-xs">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                     <TrendingUp size={20} />
                   </div>
                   <div className="text-left">
                     <p className="text-xs text-zinc-400">Rendimiento Semanal</p>
                     <p className="text-xl font-bold text-white">+12 Clientes Nuevos</p>
                   </div>
                 </div>
                 <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                   <div className="h-full w-[70%] bg-green-500 rounded-full"></div>
                 </div>
               </div>
               
               <div className="relative z-10 bg-zinc-800/80 backdrop-blur-md p-4 rounded-xl border border-zinc-700 shadow-xl w-full max-w-[200px] mt-4 self-end -mr-8">
                 <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                   <p className="text-sm font-medium text-zinc-300">IA Optimizando...</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const plans = [
    {
      name: "Starter Ads",
      price: "$199",
      period: "MXN / mes",
      description: "Ideal para comenzar a anunciar sin complicaciones.",
      features: [
        "Creación automática de campañas en Meta (Facebook + Instagram)",
        "Subida automática de anuncios",
        "Creatividades generadas con IA (hasta 5 por mes)",
        "Dashboard básico con métricas esenciales",
        "Categorización básica de leads",
        "Análisis simple de rendimiento",
        "Soporte estándar (24–48h)"
      ],
      highlight: false,
      buttonText: "Comenzar Ahora"
    },
    {
      name: "Smart Ads + IA",
      price: "$499",
      period: "MXN / mes",
      description: "Automatiza tus mensajes y mejora tus resultados con inteligencia artificial.",
      features: [
        "Todo lo del Plan Starter",
        "IA contestando mensajes 24/7 (WhatsApp, Messenger, IG DM)",
        "Configuración personalizada de la IA",
        "Monitoreo automático de campañas",
        "Alertas de bajo rendimiento",
        "Análisis avanzado con IA experta en marketing",
        "Dashboard mejorado (costo por lead, embudo básico)",
        "Categorización avanzada de leads"
      ],
      highlight: true,
      badge: "Más Popular",
      buttonText: "Comenzar Ahora"
    },
    {
      name: "Performance Pro",
      price: "$999",
      period: "MXN / mes",
      description: "Tu publicidad en piloto automático en Meta + Google Ads.",
      features: [
        "Todo lo del Plan Smart Ads",
        "Optimización automática de campañas en Meta",
        "Insights avanzados y recomendaciones accionables con IA",
        "Funnels completos (descubrimiento → conversión)",
        "Integración completa con Google Ads",
        "Campañas coordinadas multi-plataforma",
        "Dashboard pro con análisis profundo por segmento",
        "Reporte semanal automático",
        "Soporte prioritario"
      ],
      highlight: false,
      buttonText: "Comenzar Ahora"
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-blue-50/50">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Planes diseñados para tu crecimiento" 
          subtitle="Elige el plan que impulse tu negocio al siguiente nivel." 
        />
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={cn(
                "relative flex flex-col h-full rounded-2xl bg-white p-8 transition-all duration-300",
                plan.highlight 
                  ? "border-2 border-blue-600 shadow-2xl scale-105 z-10" 
                  : "border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{plan.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed min-h-[40px]">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-extrabold text-zinc-900 tracking-tight">{plan.price}</span>
                  <span className="ml-2 text-sm font-medium text-zinc-500">{plan.period}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("h-5 w-5 shrink-0 mt-0.5", plan.highlight ? "text-blue-600" : "text-zinc-400")} />
                    <span className="text-sm text-zinc-700 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.highlight ? "cta" : "outline"} 
                className={cn("w-full h-12 text-base", !plan.highlight && "hover:border-blue-300 hover:text-blue-700")}
                onClick={() => onOpenWaitlist(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-500">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Cancelación en cualquier momento
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Sin contratos forzosos
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              Ideal para PYMES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { icon: <Store className="h-6 w-6 text-orange-500" />, title: "Tiendas y Ropa" },
    { icon: <Utensils className="h-6 w-6 text-red-500" />, title: "Restaurantes" },
    { icon: <Wrench className="h-6 w-6 text-zinc-500" />, title: "Talleres" },
    { icon: <Scissors className="h-6 w-6 text-purple-500" />, title: "Estéticas" },
    { icon: <ShoppingBag className="h-6 w-6 text-pink-500" />, title: "Comercio Local" },
    { icon: <Zap className="h-6 w-6 text-yellow-500" />, title: "Canchas Deportivas" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Tu negocio sí puede vender más" 
          subtitle="Solo necesita que te encuentren. Funciona para todo tipo de PYME en Oaxaca."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {cases.map((c, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-100 transition-colors">
              <div className="mb-3 p-3 bg-white rounded-xl shadow-sm">
                {c.icon}
              </div>
              <span className="font-medium text-zinc-900 text-center text-sm">{c.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <div className="border-y border-zinc-100 bg-white py-12">
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-zinc-400 font-medium text-sm md:text-base">
         <div className="flex items-center gap-2">
           <ShieldCheck className="text-green-500" />
           Cumplimos estándares Meta & Google
         </div>
         <div className="flex items-center gap-2">
           <ShieldCheck className="text-green-500" />
           Tus datos están 100% seguros
         </div>
         <div className="flex items-center gap-2">
           <ShieldCheck className="text-green-500" />
           Cancela cuando quieras
         </div>
         <div className="flex items-center gap-2">
           <ShieldCheck className="text-green-500" />
           Sin contratos forzosos
         </div>
      </div>
    </div>
  );
}

function FinalCTA({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  return (
    <section className="py-24 bg-zinc-900 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Haz crecer tu negocio hoy</h2>
          <p className="text-xl text-zinc-400 mb-10">
            Únete a los negocios en Oaxaca que ya están vendiendo más con publicidad automática.
            Inicia en menos de 2 minutos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="cta" className="h-14 px-10 text-lg bg-white text-zinc-900 hover:bg-zinc-100 shadow-none" onClick={() => onOpenWaitlist('Final CTA')}>
              Comenzar Ahora
            </Button>
            <Button variant="outline" className="h-14 px-10 text-lg bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white" onClick={() => onOpenWaitlist('Final CTA Free')}>
              Probar Gratis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-zinc-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
            <Zap size={18} fill="currentColor" />
          </div>
                      SosaPerera&Co        </div>
        <p className="text-sm text-zinc-500">
          © 2025 SosaPerera&Co Oaxaca. Hecho para PYMES.
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a href="https://www.instagram.com/sosapereraco/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const openWaitlist = (plan?: string) => {
    setSelectedPlan(plan || 'General');
    setIsWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-blue-100 selection:text-blue-900">
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
        planName={selectedPlan} 
      />
      
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            SosaPerera&Co
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">Cómo funciona</a>
            <a href="#benefits" className="hover:text-zinc-900 transition-colors">Beneficios</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Precios</a>
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => openWaitlist('Login Request')}>Entrar</Button>
             <Button className="h-9 px-4 text-xs sm:text-sm sm:h-10 sm:px-6" onClick={() => openWaitlist('Navbar CTA')}>Empezar Gratis</Button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onOpenWaitlist={openWaitlist} />
        <Trust />
        <Problem />
        <HowItWorks />
        <Benefits />
        <UseCases />
        <Pricing onOpenWaitlist={openWaitlist} />
        {/* <Testimonials /> */}
        <FinalCTA onOpenWaitlist={openWaitlist} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
