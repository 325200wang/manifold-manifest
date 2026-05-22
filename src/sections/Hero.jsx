import { useState, useEffect } from 'react'
import DiffusionText from '../components/DiffusionText'

const TYPEWRITER_TEXT = '智能制造工程 · Focus on Embodied Intelligence'

export default function Hero({ theme }) {
  const [subtitle, setSubtitle] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [diffusionComplete, setDiffusionComplete] = useState(false)

  // Auto-regressive typewriter effect
  useEffect(() => {
    let index = 0
    let timeout

    const typeNext = () => {
      if (index < TYPEWRITER_TEXT.length) {
        setSubtitle(TYPEWRITER_TEXT.slice(0, index + 1))
        index++
        // Variable speed - like token sampling with uncertainty
        const delay = 50 + Math.random() * 80
        timeout = setTimeout(typeNext, delay)
      } else {
        // Start cursor blink after typing complete
        setTimeout(() => setShowCursor(false), 3000)
      }
    }

    // Start after diffusion completes
    const startDelay = setTimeout(() => {
      setDiffusionComplete(true)
      typeNext()
    }, 2500)

    return () => {
      clearTimeout(startDelay)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Latent space coordinate display - subtle */}
      <div className={`absolute top-24 left-6 font-mono text-xs tracking-wider ${
        theme === 'dark' ? 'text-white/20' : 'text-black/20'
      }`}>
        <div>LATENT_DIM: 512</div>
        <div>TEMPERATURE: 0.7</div>
        <div>SAMPLING: ancestral</div>
      </div>

      {/* Main content */}
      <div className="text-center max-w-4xl">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-8 ${
          theme === 'dark'
            ? 'bg-latent-cyan/10 text-latent-cyan border border-latent-cyan/20'
            : 'bg-mind-blue/10 text-mind-blue border border-mind-blue/20'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>EMBODIED_INTELLIGENCE.AGENT</span>
        </div>

        {/* Name - Diffusion denoising */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tighter" style={{ fontFamily: "'Inter', 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif", fontWeight: 900 }}>
          <DiffusionText
            text="王昱程"
            className={theme === 'dark'
              ? 'text-white'
              : 'text-gray-900'
            }
            delay={500}
            speed={80}
          />
        </h1>

        {/* English name */}
        <div className={`text-lg md:text-xl font-mono tracking-[0.3em] mb-8 ${
          theme === 'dark' ? 'text-white/40' : 'text-gray-500'
        }`}>
          <DiffusionText
            text="YUCHENG WANG"
            delay={1200}
            speed={60}
          />
        </div>

        {/* Subtitle - Auto-regressive */}
        <div className={`text-lg md:text-xl font-light h-8 ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          {diffusionComplete && (
            <span>
              {subtitle}
              {showCursor && (
                <span className={`inline-block w-0.5 h-5 ml-1 align-middle ${
                  theme === 'dark' ? 'bg-latent-cyan' : 'bg-mind-blue'
                } animate-pulse`} />
              )}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="#projects"
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-500 ${
              theme === 'dark'
                ? 'bg-latent-cyan/10 text-latent-cyan border border-latent-cyan/30 hover:bg-latent-cyan/20 hover:shadow-[0_0_30px_rgba(0,229,204,0.3)]'
                : 'bg-mind-blue/10 text-mind-blue border border-mind-blue/30 hover:bg-mind-blue/20 hover:shadow-[0_0_30px_rgba(37,99,251,0.3)]'
            }`}
          >
            <span>探索潜在空间</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className={`flex justify-center gap-12 md:gap-20 mt-20 pt-12 border-t ${
          theme === 'dark' ? 'border-white/10' : 'border-black/10'
        }`}>
          {[
            { value: '5+', label: '竞赛获奖' },
            { value: '5+', label: '完整项目' },
            { value: '87.44', label: '校园成绩' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-white/40' : 'text-gray-500'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${
        theme === 'dark' ? 'text-white/30' : 'text-gray-400'
      }`}>
        <span className="text-xs font-mono">SCROLL_TO_SAMPLE</span>
        <div className={`w-px h-8 ${
          theme === 'dark' ? 'bg-white/30' : 'bg-gray-400'
        }`}>
          <div className={`w-full h-1/2 ${
            theme === 'dark' ? 'bg-latent-cyan' : 'bg-mind-blue'
          } animate-bounce`} />
        </div>
      </div>
    </section>
  )
}
