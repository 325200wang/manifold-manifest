import { useState, useEffect, useRef } from 'react'
import { skills } from '../data/content'

export default function Skills({ theme }) {
  const [activeSkill, setActiveSkill] = useState(null)
  const [progressValues, setProgressValues] = useState({})
  const sectionRef = useRef(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')

            // Animate progress bars
            const progressBars = entry.target.querySelectorAll('[data-progress]')
            progressBars.forEach((bar) => {
              const value = parseFloat(bar.dataset.progress)
              setTimeout(() => {
                setProgressValues((prev) => ({ ...prev, [bar.dataset.key]: value }))
              }, 500 + Math.random() * 500)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className={`reveal opacity-0 translate-y-10 transition-all duration-1000 font-mono text-xs tracking-[0.3em] mb-4 ${
          isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
        }`}>
          WEIGHT_MATRIX
        </div>

        <h2 className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 text-4xl md:text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          技能专长
        </h2>

        <p className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 text-lg mb-16 max-w-2xl ${
          isDark ? 'text-white/50' : 'text-gray-500'
        }`}>
          知识网络中的权重分布，激活一个节点会沿着连接传播。
        </p>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((category, catIndex) => (
            <div
              key={category.category}
              className={`reveal opacity-0 translate-y-10 transition-all duration-1000 rounded-2xl p-8 ${
                isDark ? 'glass-dark' : 'glass-light'
              }`}
              style={{ transitionDelay: `${300 + catIndex * 100}ms` }}
            >
              {/* Category header */}
              <div className={`font-mono text-xs tracking-wider mb-6 ${
                isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
              }`}>
                {category.category.toUpperCase().replace(/\s/g, '_')}
              </div>

              {/* Skills list */}
              <div className="space-y-5">
                {category.items.map((skill) => {
                  const key = `${category.category}-${skill.name}`
                  const isActive = activeSkill === key
                  const progress = progressValues[key] || 0

                  return (
                    <div
                      key={skill.name}
                      className="group cursor-pointer"
                      onMouseEnter={() => setActiveSkill(key)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-white/80' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`font-mono text-xs ${
                          isActive
                            ? isDark ? 'text-latent-cyan' : 'text-mind-blue'
                            : isDark ? 'text-white/30' : 'text-gray-400'
                        }`}>
                          {Math.round(progress * 100)}%
                        </span>
                      </div>

                      {/* Progress bar with neural activation effect */}
                      <div className={`h-2 rounded-full overflow-hidden ${
                        isDark ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        <div
                          data-progress={skill.level}
                          data-key={key}
                          className="h-full rounded-full transition-all duration-1000 ease-out relative"
                          style={{
                            width: `${progress * 100}%`,
                            background: isDark
                              ? 'linear-gradient(90deg, #00e5cc, #b829dd)'
                              : 'linear-gradient(90deg, #2563fb, #f97316)',
                            boxShadow: isActive
                              ? isDark
                                ? '0 0 20px rgba(0,229,204,0.5)'
                                : '0 0 20px rgba(37,99,251,0.5)'
                              : 'none',
                          }}
                        >
                          {/* Pulse dot at the tip */}
                          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                            isDark ? 'bg-latent-cyan' : 'bg-mind-blue'
                          }`}
                            style={{
                              opacity: progress > 0.1 ? 1 : 0,
                              boxShadow: isDark
                                ? '0 0 10px rgba(0,229,204,0.8)'
                                : '0 0 10px rgba(37,99,251,0.8)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Connection visualization hint */}
        <div className={`mt-16 text-center font-mono text-xs ${
          isDark ? 'text-white/20' : 'text-gray-400'
        }`}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span>Python</span>
            <span className={isDark ? 'text-latent-cyan/30' : 'text-mind-blue/30'}>───</span>
            <span>PyTorch</span>
            <span className={isDark ? 'text-activation-purple/30' : 'text-link-orange/30'}>───</span>
            <span>VLA</span>
            <span className={isDark ? 'text-latent-cyan/30' : 'text-mind-blue/30'}>───</span>
            <span>ROS</span>
            <span className={isDark ? 'text-activation-purple/30' : 'text-link-orange/30'}>───</span>
            <span>STM32</span>
          </div>
          <p className="mt-2">FORWARD_PROPAGATION_PATH</p>
        </div>
      </div>
    </section>
  )
}
