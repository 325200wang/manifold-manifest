import { useState, useEffect, useRef } from 'react'
import { about } from '../data/content'

export default function Contact({ theme }) {
  const [hovered, setHovered] = useState(false)
  const sectionRef = useRef(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.3 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32"
    >
      <div className="text-center max-w-2xl">
        {/* Section label */}
        <div className={`reveal opacity-0 translate-y-10 transition-all duration-1000 font-mono text-xs tracking-[0.3em] mb-4 ${
          isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
        }`}>
          OUTPUT_LAYER
        </div>

        <h2 className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 text-4xl md:text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          建立连接
        </h2>

        <p className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 text-lg mb-12 ${
          isDark ? 'text-white/50' : 'text-gray-500'
        }`}>
          如果你对我的项目感兴趣，或者想讨论具身智能、机器人控制相关话题，欢迎建立连接。
        </p>

        {/* Main CTA - Large magnetic button */}
        <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300 mb-16">
          <a
            href={`mailto:${about.email}`}
            className={`group relative inline-flex items-center justify-center w-48 h-48 rounded-full text-lg font-medium transition-all duration-500 ${
              isDark
                ? 'bg-latent-cyan/10 text-latent-cyan border-2 border-latent-cyan/30 hover:bg-latent-cyan/20'
                : 'bg-mind-blue/10 text-mind-blue border-2 border-mind-blue/30 hover:bg-mind-blue/20'
            }`}
            style={{
              boxShadow: hovered
                ? isDark
                  ? '0 0 60px rgba(0,229,204,0.4), inset 0 0 30px rgba(0,229,204,0.1)'
                  : '0 0 60px rgba(37,99,251,0.4), inset 0 0 30px rgba(37,99,251,0.1)'
                : 'none',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>发送邮件</span>
            </span>

            {/* Orbital rings */}
            <div className={`absolute inset-0 rounded-full border ${
              isDark ? 'border-latent-cyan/20' : 'border-mind-blue/20'
            }`}
              style={{
                animation: 'orbit 8s linear infinite',
                transform: 'scale(1.3)',
              }}
            />
            <div className={`absolute inset-0 rounded-full border ${
              isDark ? 'border-activation-purple/20' : 'border-link-orange/20'
            }`}
              style={{
                animation: 'orbit 12s linear infinite reverse',
                transform: 'scale(1.5)',
              }}
            />
          </a>
        </div>

        {/* Social links */}
        <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-400 flex justify-center gap-6">
          {[
            { label: 'GitHub', href: about.github },
            { label: '知乎', href: about.zhihu },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full font-mono text-sm transition-all duration-300 ${
                isDark
                  ? 'text-white/50 border border-white/10 hover:text-latent-cyan hover:border-latent-cyan/30'
                  : 'text-gray-500 border border-gray-200 hover:text-mind-blue hover:border-mind-blue/30'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
