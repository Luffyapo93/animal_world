import { useState, useEffect, useCallback } from 'react'
import './index.css'

// ─── Types ────────────────────────────────────────────────────
interface DogBreed { id: string; name: string; temperament?: string; life_span?: string; bred_for?: string; weight?: { metric: string }; height?: { metric: string }; image?: { url: string } }
interface CatBreed { id: string; name: string; temperament?: string; life_span?: string; description?: string; origin?: string; weight?: { metric: string }; image?: { url: string } }
interface AnimalImage { url: string; id: string }

// ─── Nav ─────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-green-900/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
          <span className="text-3xl">🐾</span>
          <span className="text-white font-bold text-xl tracking-wide">AnimalWorld</span>
        </div>
        <div className="hidden md:flex gap-6 text-white/90 font-medium">
          {[['Inicio','hero'],['Perros','dogs'],['Gatos','cats'],['Curiosidades','facts'],['Galería','gallery']].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="hover:text-yellow-300 transition-colors duration-200 hover:scale-105">
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #14532d 70%, #1a3a1a 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-yellow-300/5 rounded-full blur-2xl animate-float delay-500" />

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🦁','🐘','🦒','🐯','🦅','🐬','🦋','🐢','🦊','🐸','🦓','🦜'].map((emoji, i) => (
          <span key={i} className="absolute text-4xl opacity-20 animate-float select-none"
            style={{ left:`${8+(i*8)}%`, top:`${10+(i%4)*20}%`, animationDelay:`${i*0.3}s`, fontSize:`${1.5+Math.random()}rem` }}>
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="text-8xl mb-6 animate-float">🌿</div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 animate-fade-in-up leading-tight">
          Descubre el <span className="text-yellow-300">Reino</span> Animal
        </h1>
        <p className="text-xl md:text-2xl text-green-100/90 mb-10 animate-fade-in-up delay-200 max-w-2xl mx-auto">
          Explora cientos de razas, datos fascinantes y fotos reales gracias a APIs gratuitas 🐾
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
          <button onClick={() => scrollTo('dogs')}
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-xl animate-pulse-glow">
            🐶 Explorar Perros
          </button>
          <button onClick={() => scrollTo('cats')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-lg border border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            🐱 Explorar Gatos
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 animate-fade-in-up delay-500">
          {[['300+','Razas de Perros'],['70+','Razas de Gatos'],['∞','Curiosidades']].map(([n,l]) => (
            <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-extrabold text-yellow-300">{n}</div>
              <div className="text-green-100 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Breed Card ────────────────────────────────────────────────
function BreedCard({ name, temperament, life_span, imageUrl, extra, emoji }:
  { name: string; temperament?: string; life_span?: string; imageUrl?: string; extra?: string; emoji: string }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200">
        {imageUrl && !imgError
          ? <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={() => setImgError(true)} />
          : <div className="w-full h-full flex items-center justify-center text-7xl">{emoji}</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow">{name}</div>
      </div>
      <div className="p-4">
        {temperament && <p className="text-sm text-gray-600 mb-2 line-clamp-2"><span className="font-semibold text-green-700">Temperamento:</span> {temperament}</p>}
        {life_span && <p className="text-sm text-gray-500"><span className="font-semibold">Vida:</span> {life_span}</p>}
        {extra && <p className="text-sm text-gray-500 mt-1"><span className="font-semibold">Origen:</span> {extra}</p>}
      </div>
    </div>
  )
}

// ─── Dogs Section ──────────────────────────────────────────────
function DogsSection() {
  const [breeds, setBreeds] = useState<DogBreed[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/breeds?limit=50')
      .then(r => r.json())
      .then(data => { setBreeds(data); setLoading(false) })
      .catch(() => { setError('No se pudo cargar la API de perros'); setLoading(false) })
  }, [])

  const filtered = breeds.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section id="dogs" className="py-24 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="text-6xl mb-4">🐶</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-amber-800 mb-3">Razas de Perros</h2>
          <p className="text-amber-700 text-lg">Datos en tiempo real desde <a href="https://thedogapi.com" className="underline font-semibold" target="_blank" rel="noreferrer">TheDogAPI</a></p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar raza de perro..."
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-amber-300 focus:border-amber-500 focus:outline-none text-lg shadow-md" />
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-6xl animate-spin-slow inline-block">🐾</div>
            <p className="text-amber-700 mt-4 text-lg">Cargando razas...</p>
          </div>
        )}
        {error && <div className="text-center py-10 text-red-500 text-lg">⚠️ {error}</div>}

        {!loading && !error && (
          <>
            <p className="text-center text-amber-600 mb-6 font-medium">{filtered.length} razas encontradas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.slice(0, 24).map(b => (
                <BreedCard key={b.id} name={b.name} temperament={b.temperament}
                  life_span={b.life_span} imageUrl={b.image?.url} extra={b.bred_for} emoji="🐶" />
              ))}
            </div>
            {filtered.length === 0 && <p className="text-center text-amber-500 text-xl py-10">No se encontró esa raza 🐾</p>}
          </>
        )}
      </div>
    </section>
  )
}

// ─── Cats Section ──────────────────────────────────────────────
function CatsSection() {
  const [breeds, setBreeds] = useState<CatBreed[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds?limit=50')
      .then(r => r.json())
      .then(async (data: CatBreed[]) => {
        // Fetch images for each breed
        const withImages = await Promise.all(
          data.slice(0, 30).map(async (breed) => {
            try {
              const r = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`)
              const imgs = await r.json()
              return { ...breed, image: imgs[0] ? { url: imgs[0].url } : undefined }
            } catch { return breed }
          })
        )
        setBreeds(withImages)
        setLoading(false)
      })
      .catch(() => { setError('No se pudo cargar la API de gatos'); setLoading(false) })
  }, [])

  const filtered = breeds.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section id="cats" className="py-24 bg-gradient-to-b from-purple-50 to-violet-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🐱</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-3">Razas de Gatos</h2>
          <p className="text-purple-700 text-lg">Datos en tiempo real desde <a href="https://thecatapi.com" className="underline font-semibold" target="_blank" rel="noreferrer">TheCatAPI</a></p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar raza de gato..."
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-lg shadow-md" />
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-6xl animate-spin-slow inline-block">🐾</div>
            <p className="text-purple-700 mt-4 text-lg">Cargando razas...</p>
          </div>
        )}
        {error && <div className="text-center py-10 text-red-500 text-lg">⚠️ {error}</div>}

        {!loading && !error && (
          <>
            <p className="text-center text-purple-600 mb-6 font-medium">{filtered.length} razas encontradas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.slice(0, 24).map(b => (
                <BreedCard key={b.id} name={b.name} temperament={b.temperament}
                  life_span={b.life_span} imageUrl={b.image?.url} extra={b.origin} emoji="🐱" />
              ))}
            </div>
            {filtered.length === 0 && <p className="text-center text-purple-500 text-xl py-10">No se encontró esa raza 🐾</p>}
          </>
        )}
      </div>
    </section>
  )
}

// ─── Fun Facts ─────────────────────────────────────────────────
const FACTS = [
  { emoji: '🐘', title: 'Elefantes', fact: 'Los elefantes son los únicos animales que no pueden saltar. ¡Pero tampoco lo necesitan!' },
  { emoji: '🦒', title: 'Jirafas', fact: 'Las jirafas duermen solo 30 minutos al día. Son el animal que menos duerme.' },
  { emoji: '🦋', title: 'Mariposas', fact: 'Las mariposas saborean con sus patas. Tienen receptores gustativos en sus pies.' },
  { emoji: '🐬', title: 'Delfines', fact: 'Los delfines tienen nombres propios. Se llaman unos a otros con silbidos únicos.' },
  { emoji: '🦅', title: 'Águilas', fact: 'Las águilas pueden ver el equivalente a 8K. Su visión es 5 veces más aguda que la humana.' },
  { emoji: '🐢', title: 'Tortugas', fact: 'Algunas tortugas pueden respirar a través de la piel. Sobreviven bajo el hielo en invierno.' },
  { emoji: '🦁', title: 'Leones', fact: 'El rugido de un león se puede escuchar a 8 km de distancia.' },
  { emoji: '🐙', title: 'Pulpos', fact: 'Los pulpos tienen tres corazones y sangre azul. ¡Son casi alienígenas!' },
  { emoji: '🦜', title: 'Loros', fact: 'Los loros pueden aprender cientos de palabras y usarlas en contexto adecuado.' },
]

function FactsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % FACTS.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="facts" className="py-24 bg-gradient-to-b from-teal-900 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Curiosidades Animales</h2>
          <p className="text-green-200 text-lg">Hechos increíbles que te van a sorprender</p>
        </div>

        {/* Featured fact */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center border border-white/20 shadow-2xl">
            <div className="text-8xl mb-6 animate-float">{FACTS[active].emoji}</div>
            <h3 className="text-3xl font-bold text-yellow-300 mb-4">{FACTS[active].title}</h3>
            <p className="text-xl text-green-100 leading-relaxed">{FACTS[active].fact}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {FACTS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === active ? 'bg-yellow-300 scale-125' : 'bg-white/40 hover:bg-white/60'}`} />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACTS.map((f, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`text-left p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${i === active ? 'bg-yellow-400/20 border-2 border-yellow-400' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h4 className="font-bold text-lg text-yellow-200 mb-2">{f.title}</h4>
              <p className="text-sm text-green-200 line-clamp-2">{f.fact}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ───────────────────────────────────────────────────
function GallerySection() {
  const [images, setImages] = useState<AnimalImage[]>([])
  const [catImages, setCatImages] = useState<AnimalImage[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'dogs'|'cats'>('dogs')

  const loadImages = useCallback(() => {
    setLoading(true)
    Promise.all([
      fetch('https://api.thedogapi.com/v1/images/search?limit=12').then(r => r.json()),
      fetch('https://api.thecatapi.com/v1/images/search?limit=12').then(r => r.json()),
    ]).then(([dogs, cats]) => {
      setImages(dogs)
      setCatImages(cats)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => { loadImages() }, [loadImages])

  const current = tab === 'dogs' ? images : catImages

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-sky-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📸</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-3">Galería Aleatoria</h2>
          <p className="text-blue-600 text-lg">Fotos reales obtenidas de las APIs — ¡cambia cada vez!</p>
        </div>

        <div className="flex gap-4 justify-center mb-10">
          {(['dogs','cats'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${tab === t ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-blue-600 border-2 border-blue-300 hover:bg-blue-50'}`}>
              {t === 'dogs' ? '🐶 Perros' : '🐱 Gatos'}
            </button>
          ))}
          <button onClick={loadImages}
            className="px-8 py-3 rounded-full font-bold text-lg bg-green-500 hover:bg-green-400 text-white transition-all duration-300 hover:scale-105 shadow-lg">
            🔄 Nuevas Fotos
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl animate-spin-slow inline-block">📸</div>
            <p className="text-blue-600 mt-4 text-lg">Cargando galería...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {current.map((img, i) => (
              <div key={img.id || i}
                className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <img src={img.url} alt="animal" className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-green-950 text-green-100 py-12 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-5xl mb-4">🐾</div>
        <h3 className="text-2xl font-bold text-white mb-2">AnimalWorld</h3>
        <p className="text-green-300 mb-6">Hecho con ❤️ y APIs gratuitas</p>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-green-400">
          <a href="https://thedogapi.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition-colors">🐶 TheDogAPI</a>
          <span>•</span>
          <a href="https://thecatapi.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition-colors">🐱 TheCatAPI</a>
          <span>•</span>
          <span>React + Tailwind CSS + Vite</span>
        </div>
        <p className="text-green-600 text-xs mt-6">© 2026 AnimalWorld — Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <DogsSection />
      <CatsSection />
      <FactsSection />
      <GallerySection />
      <Footer />
    </div>
  )
}
