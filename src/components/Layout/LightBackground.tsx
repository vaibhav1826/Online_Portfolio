import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Edges } from '@react-three/drei'
import * as THREE from 'three'

const AbstractGeometry = () => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime()
            meshRef.current.rotation.x = time * 0.05
            meshRef.current.rotation.y = time * 0.08
        }
    })

    return (
        <group position={[0, 0, -2]}>
            <Icosahedron ref={meshRef} args={[3, 1]}>
                <meshBasicMaterial color="#708238" transparent opacity={0.12} wireframe={false} />
                {/* Crisp olive-toned edges */}
                <Edges scale={1.05} threshold={15} color="#96aa38" />
            </Icosahedron>
        </group>
    )
}

const LightBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #0f1205 0%, #1e220f 40%, #32381a 70%, #0f1205 100%)' }}>
            {/* Rich olive atmospheric gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(112,130,56,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(99,107,47,0.15) 0%, transparent 55%)',
                }}
            />

            {/* 3D rotating wireframe */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <fog attach="fog" args={['#1e220f', 5, 15]} />
                    <ambientLight intensity={0.8} />
                    <AbstractGeometry />
                </Canvas>
            </div>

            {/* Subtle dark vignette to keep text readable */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(15,18,5,0.55)_100%)]" />

            {/* Fine grain texture overlay for premium feel */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px',
                }}
            />
        </div>
    )
}

export default LightBackground
