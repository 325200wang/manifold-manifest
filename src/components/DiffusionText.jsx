import { useState, useEffect, useRef, useCallback } from 'react'

const NOISE_CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function DiffusionText({ text, className = '', delay = 0, speed = 60, as: Tag = 'span' }) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('noise') // 'noise' | 'denoising' | 'converged'
  const [noiseLevel, setNoiseLevel] = useState(1.0)
  const intervalRef = useRef(null)

  const getNoiseChar = useCallback(() => {
    return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
  }, [])

  useEffect(() => {
    const chars = text.split('')
    let current = chars.map(() => getNoiseChar())
    setDisplayed(current.join(''))
    setPhase('noise')
    setNoiseLevel(1.0)

    const startTimeout = setTimeout(() => {
      setPhase('denoising')
      let step = 0
      const totalSteps = chars.length * 4 // More steps for smoother denoising

      intervalRef.current = setInterval(() => {
        step++
        const progress = step / totalSteps
        const currentNoiseLevel = Math.max(0, 1.0 - Math.pow(progress, 0.7)) // Slower at start, faster at end
        setNoiseLevel(currentNoiseLevel)

        // DDPM-style denoising: each character has a probability of being correct
        // based on current timestep. Earlier = more noise, later = less noise.
        current = chars.map((char, i) => {
          if (char === ' ') return ' '
          // Per-character randomness creates organic feel
          const charThreshold = Math.sin(i * 0.7 + progress * 5.0) * 0.3 + progress
          if (Math.random() > currentNoiseLevel * (0.5 + Math.sin(i * 1.3) * 0.3)) {
            return char
          }
          return getNoiseChar()
        })

        setDisplayed(current.join(''))

        if (step >= totalSteps) {
          clearInterval(intervalRef.current)
          setDisplayed(text)
          setPhase('converged')
          setNoiseLevel(0)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, delay, speed, getNoiseChar])

  // Residual noise shimmer after convergence
  const [shimmerChars, setShimmerChars] = useState(new Set())

  useEffect(() => {
    if (phase !== 'converged') return

    const shimmerInterval = setInterval(() => {
      const chars = text.split('')
      const newShimmer = new Set()
      // Randomly pick 1-2 characters to shimmer
      const count = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * chars.length)
        if (chars[idx] !== ' ') newShimmer.add(idx)
      }
      setShimmerChars(newShimmer)

      // Clear shimmer quickly
      setTimeout(() => setShimmerChars(new Set()), 150)
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(shimmerInterval)
  }, [phase, text])

  return (
    <Tag className={`diffusion-text ${className}`}>
      {displayed.split('').map((char, i) => {
        const isShimmering = shimmerChars.has(i)
        const isSpace = char === ' '

        return (
          <span
            key={i}
            className={`inline-block transition-all duration-100 ${
              isShimmering && !isSpace ? 'opacity-40 scale-95' : 'opacity-100'
            }`}
            style={{
              transform: isShimmering && !isSpace ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            {char}
          </span>
        )
      })}
    </Tag>
  )
}
