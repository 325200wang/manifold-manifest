import { useEffect, useRef } from 'react'
import { about } from '../data/content'

export default function About({ theme }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

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
      { threshold: 0.2 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const isDark = theme === 'dark'

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 py-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section label */}
        <div className={`reveal opacity-0 translate-y-10 transition-all duration-1000 font-mono text-xs tracking-[0.3em] mb-4 ${
          isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
        }`}>
          FEATURE_EXTRACTION
        </div>

        <h2 className={`reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 text-4xl md:text-6xl font-bold mb-16 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          关于我
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Text content */}
          <div ref={textRef} className="space-y-6">
            {about.description.map((para, i) => (
              <p
                key={i}
                className={`reveal opacity-0 translate-y-10 transition-all duration-1000 text-lg leading-relaxed ${
                  isDark ? 'text-white/70' : 'text-gray-600'
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            {[
              { label: 'EDUCATION', value: about.school, sub: about.major },
              { label: 'GPA', value: about.gpa, sub: 'Weighted Average' },
              { label: 'IELTS', value: about.ielts, sub: 'L8 R7.5 W6 S6' },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`reveal opacity-0 translate-y-10 transition-all duration-1000 p-6 rounded-2xl ${
                  isDark ? 'glass-dark' : 'glass-light'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className={`font-mono text-xs tracking-wider mb-2 ${
                  isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
                }`}>
                  {item.label}
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.value}
                </div>
                <div className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                  {item.sub}
                </div>
              </div>
            ))}

            {/* Key courses */}
            <div className={`reveal opacity-0 translate-y-10 transition-all duration-1000 p-6 rounded-2xl ${
              isDark ? 'glass-dark' : 'glass-light'
            }`} style={{ transitionDelay: '600ms' }}>
              <div className={`font-mono text-xs tracking-wider mb-3 ${
                isDark ? 'text-latent-cyan/60' : 'text-mind-blue/60'
              }`}>
                KEY_COURSES
              </div>
              <div className="flex flex-wrap gap-2">
                {['计算机 99', 'Python 95', '大数据 95', '云计算 91', '控制理论 90', '机器人 89'].map((course) => (
                  <span
                    key={course}
                    className={`px-3 py-1 rounded-full text-sm font-mono ${
                      isDark
                        ? 'bg-latent-cyan/10 text-latent-cyan/80 border border-latent-cyan/20'
                        : 'bg-mind-blue/10 text-mind-blue/80 border border-mind-blue/20'
                    }`}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
