import { useState, useEffect, useRef } from 'react'
import { projects } from '../data/content'

const FEATURE_MAPS = {
  'gradient-activation': 'radial-gradient(circle at 30% 70%, rgba(0,229,204,0.5) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(184,41,221,0.5) 0%, transparent 50%)',
  'grid-detection': 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0,229,204,0.2) 19px, rgba(0,229,204,0.2) 20px), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,229,204,0.2) 19px, rgba(0,229,204,0.2) 20px)',
  'contour-vision': 'radial-gradient(ellipse at 30% 30%, rgba(184,41,221,0.4) 0%, transparent 40%), radial-gradient(ellipse at 70% 70%, rgba(0,229,204,0.3) 0%, transparent 50%)',
  'attention-heatmap': 'conic-gradient(from 0deg at 50% 50%, rgba(0,229,204,0.35) 0deg, rgba(184,41,221,0.35) 90deg, rgba(249,115,22,0.25) 180deg, transparent 270deg)',
  'network-graph': 'radial-gradient(circle at 20% 80%, rgba(0,229,204,0.4) 0%, transparent 35%), radial-gradient(circle at 80% 20%, rgba(184,41,221,0.4) 0%, transparent 35%), radial-gradient(circle at 50% 50%, rgba(249,115,22,0.25) 0%, transparent 50%)',
}

export default function Projects({ theme }) {
  const [selectedProject, setSelectedProject] = useState(null)
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
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className={`reveal opacity-0 translate-y-10 transition-all duration-1000 font-mono text-xs tracking-[0.3em] mb-4 ${
          isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
        }`}>
          OBSERVATION_WINDOWS
        </div>

        <h2 className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 text-4xl md:text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          项目作品
        </h2>

        <p className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 text-lg mb-16 max-w-2xl ${
          isDark ? 'text-white/50' : 'text-gray-500'
        }`}>
          每个项目都是潜在空间中的一个观测窗口，透过玻璃看到的是特征激活的图景。
        </p>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-attention="project"
              className={`reveal opacity-0 translate-y-10 transition-all duration-1000 group cursor-pointer rounded-2xl overflow-hidden relative ${
                isDark ? 'glass-dark' : 'glass-light'
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Feature map visualization */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: FEATURE_MAPS[project.featureMap] || FEATURE_MAPS['gradient-activation'],
                    animation: 'featurePulse 4s ease-in-out infinite',
                  }}
                />
                {/* Animated noise overlay */}
                <div className={`absolute inset-0 opacity-20 ${
                  isDark ? 'bg-gradient-to-br from-latent-cyan/20 via-transparent to-activation-purple/20' : 'bg-gradient-to-br from-mind-blue/20 via-transparent to-link-orange/20'
                }`}
                  style={{ animation: 'featurePulse 6s ease-in-out infinite reverse' }}
                />
                {/* Overlay pattern */}
                <div className={`absolute inset-0 opacity-50 ${
                  isDark ? 'bg-gradient-to-b from-transparent to-void/80' : 'bg-gradient-to-b from-transparent to-encoder-white/80'
                }`} />
                {/* Icon */}
                <div className="absolute top-4 left-4 text-3xl drop-shadow-lg">{project.icon}</div>
                {/* Award badge */}
                {project.award && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    isDark
                      ? 'bg-activation-purple/30 text-activation-purple border border-activation-purple/40'
                      : 'bg-link-orange/30 text-link-orange border border-link-orange/40'
                  }`}>
                    {project.award}
                  </div>
                )}
                {/* Active scan line on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${
                  isDark ? 'bg-gradient-to-b from-latent-cyan/20 via-transparent to-transparent' : 'bg-gradient-to-b from-mind-blue/20 via-transparent to-transparent'
                }`}
                  style={{
                    animation: 'scanLine 1.5s ease-in-out infinite',
                  }}
                />
                {/* Corner accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                  isDark
                    ? 'bg-gradient-to-r from-latent-cyan via-activation-purple to-transparent'
                    : 'bg-gradient-to-r from-mind-blue via-link-orange to-transparent'
                }`}
                  style={{
                    opacity: 0.6,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.5s ease',
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.shortTitle}
                </h3>
                <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded text-xs font-mono ${
                        isDark
                          ? 'bg-white/5 text-white/50 border border-white/10'
                          : 'bg-black/5 text-gray-600 border border-black/10'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-void/80' : 'bg-encoder-white/80'} backdrop-blur-xl`} />
          <div
            className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 ${
              isDark ? 'glass-dark' : 'glass-light'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-4xl mb-4">{selectedProject.icon}</div>
            <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedProject.title}
            </h3>
            {selectedProject.award && (
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${
                isDark
                  ? 'bg-activation-purple/20 text-activation-purple'
                  : 'bg-link-orange/20 text-link-orange'
              }`}>
                {selectedProject.award}
              </div>
            )}
            <p className={`text-lg mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              {selectedProject.description}
            </p>

            {/* Media */}
            <div className="space-y-4 mb-6">
              {selectedProject.media.map((media, i) => (
                <div key={i} className={`rounded-xl overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  {media.type === 'video' ? (
                    <video controls className="w-full max-h-96">
                      <source src={media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={media.src} alt={media.caption} className="w-full max-h-96 object-contain" />
                  )}
                  <p className={`p-4 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{media.caption}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 rounded-full text-sm font-mono ${
                    isDark
                      ? 'bg-latent-cyan/10 text-latent-cyan border border-latent-cyan/20'
                      : 'bg-mind-blue/10 text-mind-blue border border-mind-blue/20'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes featurePulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
