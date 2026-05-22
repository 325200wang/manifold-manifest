import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  manifoldVertexShader,
  manifoldFragmentShader,
  particleVertexShader,
  particleFragmentShader,
} from '../shaders/manifold'

function ManifoldSurface({ theme }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0, influence: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseInfluence: { value: 0 },
      uColorDeep: { value: new THREE.Color(theme === 'dark' ? '#060a14' : '#e0dcd6') },
      uColorSurface: { value: new THREE.Color(theme === 'dark' ? '#141c30' : '#c8d0d8') },
      uColorHighlight: { value: new THREE.Color(theme === 'dark' ? '#8090a8' : '#607080') },
      uPulseSpeed: { value: 1.2 },
    }),
    [theme]
  )

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(24, 24, 128, 128)
    return geo
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.x = x * 12
      mouseRef.current.y = y * 12
      mouseRef.current.influence = 1
    }
    const handleMouseLeave = () => {
      mouseRef.current.influence = 0
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        0.05
      )
      materialRef.current.uniforms.uMouseInfluence.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouseInfluence.value,
        mouseRef.current.influence,
        0.03
      )
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3, -2]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={manifoldVertexShader}
        fragmentShader={manifoldFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function FeatureParticles({ theme }) {
  const pointsRef = useRef()

  const { positions, scales, velocities, phases, motionAngles } = useMemo(() => {
    const count = 60
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const velocities = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    const motionAngles = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4

      scales[i] = 0.8 + Math.random() * 1.2

      // Flow primarily along x (river direction) with slight y meander
      const baseSpeed = 0.8 + Math.random() * 0.6
      const yDrift = (Math.random() - 0.5) * 0.3
      velocities[i * 3] = baseSpeed
      velocities[i * 3 + 1] = yDrift
      velocities[i * 3 + 2] = 0

      phases[i] = Math.random() * Math.PI * 2
      motionAngles[i] = Math.atan2(yDrift, baseSpeed)
    }

    return { positions, scales, velocities, phases, motionAngles }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4.0 },
      uColor: { value: new THREE.Color(theme === 'dark' ? '#a0b0c8' : '#90a0b0') },
    }),
    [theme]
  )

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <points ref={pointsRef} position={[0, -2, -1]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aVelocity"
          count={velocities.length / 3}
          array={velocities}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aMotionAngle"
          count={motionAngles.length}
          array={motionAngles}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraController() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 4, 10)
    camera.lookAt(0, 0, 0)
  }, [camera])
  return null
}

export default function LatentSpace({ theme }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <CameraController />
        <ambientLight intensity={0.3} />
        <ManifoldSurface theme={theme} />
        <FeatureParticles theme={theme} />
      </Canvas>
    </div>
  )
}
