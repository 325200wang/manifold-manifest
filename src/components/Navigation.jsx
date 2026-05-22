import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-void/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-encoder-white/80 backdrop-blur-xl border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className={`font-mono text-sm font-medium tracking-wider transition-colors ${
            isDark ? 'text-white/80 hover:text-latent-cyan' : 'text-gray-800 hover:text-mind-blue'
          }`}
        >
          {'<WANG />'}
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.slice(1)
            const isActive = activeSection === sectionId

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-mono transition-all duration-300 rounded-lg ${
                  isActive
                    ? isDark
                      ? 'text-latent-cyan'
                      : 'text-mind-blue'
                    : isDark
                      ? 'text-white/50 hover:text-white/80'
                      : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      isDark ? 'bg-latent-cyan' : 'bg-mind-blue'
                    }`}
                    style={{
                      boxShadow: isDark
                        ? '0 0 8px rgba(0,229,204,0.6)'
                        : '0 0 8px rgba(37,99,251,0.6)',
                    }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDark
              ? 'hover:bg-white/10 text-latent-cyan'
              : 'hover:bg-black/5 text-mind-blue'
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
