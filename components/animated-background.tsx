"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animated shapes
    interface Geometry {
      vertices: number[][]
      type: "square" | "triangle"
    }

    const geometries: Geometry[] = [
      {
        type: "square",
        vertices: [[-1, -1], [1, -1], [1, 1], [-1, 1]],
      },
      {
        type: "triangle",
        vertices: [[0, -1], [-0.866, 0.5], [0.866, 0.5]],
      },
    ]

    interface Shape {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      rotation: number
      rotationSpeed: number
      opacity: number
      geometry: Geometry
      physType: "space" | "gravity"
    }

    const shapes: Shape[] = []
    const shapeCount = 12

    const mouse = { x: -1000, y: -1000, active: false }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleMouseDown = () => {
      shapes.forEach((shape) => {
        const dx = mouse.x - shape.x
        const dy = mouse.y - shape.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 400) {
          const force = (400 - dist) / 10
          shape.vx -= (dx / dist) * force
          shape.vy -= (dy / dist) * force
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)

    const initShapes = () => {
      shapes.length = 0
      for (let i = 0; i < shapeCount; i++) {
        const physType = Math.random() > 0.5 ? "space" : "gravity"
        shapes.push({
          x: Math.random() * canvas.width,
          y: physType === "gravity" ? canvas.height + Math.random() * 100 : Math.random() * canvas.height,
          size: Math.random() * 50 + 40,
          vx: (Math.random() - 0.5) * 1.5,
          vy: physType === "gravity" ? -Math.random() * 3 : (Math.random() - 0.5) * 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          opacity: Math.random() * 0.2 + 0.1,
          geometry: geometries[Math.floor(Math.random() * geometries.length)],
          physType,
        })
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initShapes()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const focalLength = 600

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gravity = 0.12
      const friction = 0.985

      shapes.forEach((shape) => {
        // Interaction
        const dx = mouse.x - shape.x
        const dy = mouse.y - shape.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (mouse.active && dist < 220) {
          const liftForce = (220 - dist) / 500
          shape.vy -= liftForce * 2.5
          shape.vx += (dx / dist) * liftForce * 6
          shape.vy += (dy / dist) * liftForce * 6
          shape.rotation += 0.05
        } else {
          // Physics selection
          if (shape.physType === "gravity") {
            shape.vy += gravity
          } else {
            // Space behavior: subtle wandering
            shape.vx += (Math.random() - 0.5) * 0.01
            shape.vy += (Math.random() - 0.5) * 0.01
          }
        }

        // Update position
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        // Screen boundary collisions
        const margin = 20
        if (shape.y > canvas.height - margin) {
          shape.y = canvas.height - margin
          shape.vy *= -0.4 
          shape.vx *= 0.9
        }
        if (shape.y < margin) {
          shape.y = margin
          shape.vy *= -0.4
        }
        if (shape.x < margin) {
          shape.x = margin
          shape.vx *= -0.4
        }
        if (shape.x > canvas.width - margin) {
          shape.x = canvas.width - margin
          shape.vx *= -0.4
        }

        // Damping
        shape.vx *= friction
        shape.vy *= friction

        // Draw 2D Shape
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)

        const isNear = mouse.active && dist < 200
        
        // Colors
        let r, g, b
        if (isNear) {
          r = 120; g = 130; b = 200
        } else {
          r = 160; g = 165; b = 175
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${shape.opacity})`
        
        ctx.beginPath()
        shape.geometry.vertices.forEach((v, i) => {
          const vx = v[0] * shape.size
          const vy = v[1] * shape.size
          if (i === 0) ctx.moveTo(vx, vy)
          else ctx.lineTo(vx, vy)
        })
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}
