import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Edges } from '@react-three/drei'
import * as THREE from 'three'

const AbstractGeometry = () => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            // Slow, professional, smooth rotation
            const time = state.clock.getElapsedTime()
            meshRef.current.rotation.x = time * 0.05
            meshRef.current.rotation.y = time * 0.08
        }
    })

    return (
        <group position={[0, 0, -2]}>
            <Icosahedron ref={meshRef} args={[3, 1]}>
                <meshBasicMaterial color="#e1ead6" transparent opacity={0.3} wireframe={false} />
                {/* Adds crisp, elegant tech-focused lines to the geometry */}
                <Edges scale={1.05} threshold={15} color="#839b67" />
            </Icosahedron>
        </group>
    )
}

const LightBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 bg-forest-50">
            {/* Soft, bright atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-50/90 via-[#f3f6f0]/80 to-[#e1ead6]/90 mix-blend-multiply" />

            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <fog attach="fog" args={['#f3f6f0', 5, 15]} />
                    <ambientLight intensity={1} />
                    <AbstractGeometry />
                </Canvas>
            </div>

            {/* Subtle vignette / center highlight to draw attention inward */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_80%)]" />
        </div>
    )
}

export default LightBackground
