import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useTheme } from './hooks/useTheme'
import LatentSpace from './components/LatentSpace'
import Navigation from './components/Navigation'
import AttentionSpotlight from './components/AttentionSpotlight'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Three.js background - now visible! */}
      <LatentSpace theme={theme} />

      {/* Gradient overlay for text readability */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(5,5,8,0.7) 70%, rgba(5,5,8,0.95) 100%)'
            : 'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(245,243,240,0.7) 70%, rgba(245,243,240,0.95) 100%)',
          zIndex: 1,
        }}
      />

      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <AttentionSpotlight theme={theme} />

      <main className="relative" style={{ zIndex: 10 }}>
        <Hero theme={theme} />
        <About theme={theme} />
        <Projects theme={theme} />
        <Skills theme={theme} />
        <Contact theme={theme} />
      </main>

      <footer className={`relative py-8 text-center text-sm ${
        isDark ? 'text-white/30' : 'text-gray-400'
      }`} style={{ zIndex: 10 }}>
        <p> 2026 王昱程 · Manifold Manifest</p>
      </footer>
    </div>
  )
}
