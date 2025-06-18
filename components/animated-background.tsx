"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animated shapes
    const shapes: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      opacity: number
    }> = []

    // Create shapes
    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.1 + 0.05,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.speedX
        shape.y += shape.speedY
        shape.rotation += shape.rotationSpeed

        // Bounce off edges
        if (shape.x < 0 || shape.x > canvas.width) shape.speedX *= -1
        if (shape.y < 0 || shape.y > canvas.height) shape.speedY *= -1

        // Draw shape
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.fillStyle = `rgba(26, 76, 150, ${shape.opacity})`
        ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}
