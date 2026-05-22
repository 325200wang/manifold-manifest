import { useEffect, useRef } from 'react'

export default function AttentionSpotlight({ theme }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const targetsRef = useRef([])
  const frameRef = useRef(0)
  const isDark = theme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Track mouse
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Find attention targets
    const findTargets = () => {
      const cards = document.querySelectorAll('[data-attention]')
      targetsRef.current = Array.from(cards).map((el) => {
        const rect = el.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          el,
        }
      })
    }

    // Update targets periodically
    findTargets()
    const observer = new MutationObserver(findTargets)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('scroll', findTargets, { passive: true })

    // Animation loop
    let animationId
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio
      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current
      const targets = targetsRef.current

      // Find targets within attention range
      const attentionRadius = 400
      const connectedTargets = []

      targets.forEach((target) => {
        const dx = target.x - mouse.x
        const dy = target.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < attentionRadius) {
          const weight = 1 - dist / attentionRadius
          connectedTargets.push({ ...target, dist, weight, dx, dy })
        }
      })

      // Sort by weight (closest first)
      connectedTargets.sort((a, b) => b.weight - a.weight)

      // Draw attention lines from mouse to targets
      connectedTargets.forEach((target) => {
        const weight = target.weight
        const alpha = weight * 0.8
        const lineWidth = weight * 3

        // Main attention line
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(target.x, target.y)
        ctx.strokeStyle = isDark
          ? `rgba(128, 144, 168, ${alpha})`
          : `rgba(96, 112, 128, ${alpha})`
        ctx.lineWidth = lineWidth
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])

        // Glow line
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(target.x, target.y)
        ctx.strokeStyle = isDark
          ? `rgba(160, 176, 200, ${alpha * 0.3})`
          : `rgba(128, 144, 160, ${alpha * 0.3})`
        ctx.lineWidth = lineWidth * 3
        ctx.stroke()
      })

      // Draw Query dot at mouse
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? 'rgba(160, 180, 210, 0.9)' : 'rgba(120, 140, 170, 0.9)'
      ctx.fill()

      // Query glow - much larger and brighter
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80)
      gradient.addColorStop(0, isDark ? 'rgba(140, 160, 190, 0.25)' : 'rgba(100, 120, 150, 0.25)')
      gradient.addColorStop(0.5, isDark ? 'rgba(140, 160, 190, 0.08)' : 'rgba(100, 120, 150, 0.08)')
      gradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Second outer glow ring
      const gradient2 = ctx.createRadialGradient(mouse.x, mouse.y, 20, mouse.x, mouse.y, 120)
      gradient2.addColorStop(0, isDark ? 'rgba(140, 160, 190, 0.1)' : 'rgba(100, 120, 150, 0.1)')
      gradient2.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2)
      ctx.fillStyle = gradient2
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', findTargets)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  )
}
