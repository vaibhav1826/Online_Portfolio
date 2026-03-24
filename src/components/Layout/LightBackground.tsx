import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LightBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 150;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Check if dark mode is active to set colors
        const isDarkMode = document.documentElement.classList.contains('dark');
        const particleColor = isDarkMode ? 0x4ade80 : 0x059669; // stronger forest/emerald colors
        const lineColor = isDarkMode ? 0x94a3b8 : 0x475569; // clearer slate colors

        const particleCount = 200;
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleVelocities: THREE.Vector3[] = [];

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;
            
            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            particleVelocities.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                )
            );
        }

        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: particleColor,
            size: 2.0, // increased size for visibility
            transparent: true,
            opacity: 0.9, // stronger opacity
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        const linesMaterial = new THREE.LineBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: 0.5, // stronger line opacity
        });

        const linesGeometry = new THREE.BufferGeometry();
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesMesh);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const onDocumentMouseMove = (event: MouseEvent) => {
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;
            mouseX = (event.clientX - windowHalfX) * 0.05;
            mouseY = (event.clientY - windowHalfY) * 0.05;
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        const connectDistance = 45;

        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;

            camera.position.x += (targetX - camera.position.x) * 0.02;
            camera.position.y += (-targetY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            const positions = particleSystem.geometry.attributes.position.array as Float32Array;
            const linePositions = [];
            
            for (let i = 0; i < particleCount; i++) {
                const vector = particleVelocities[i];
                
                positions[i * 3] += vector.x;
                positions[i * 3 + 1] += vector.y;
                positions[i * 3 + 2] += vector.z;

                // Bounce off boundaries
                if (Math.abs(positions[i * 3]) > 200) vector.x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 200) vector.y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 200) vector.z *= -1;

                // Connect particles
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < connectDistance * connectDistance) {
                        linePositions.push(
                            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                        );
                    }
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
            
            linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            // Spin scene slightly
            scene.rotation.y += 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!container) return;
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Observer for dark mode changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    particleMaterial.color.setHex(isDark ? 0x4ade80 : 0x059669);
                    linesMaterial.color.setHex(isDark ? 0x94a3b8 : 0x475569);
                    linesMaterial.opacity = isDark ? 0.4 : 0.6;
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        linesMaterial.opacity = document.documentElement.classList.contains('dark') ? 0.4 : 0.6;

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            
            particles.dispose();
            particleMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 bg-white dark:bg-slate-950 overflow-hidden">
            {/* The underlying gradient lowered in opacity to make animation pop clearly */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 dark:from-slate-950/70 via-slate-50/50 dark:via-slate-900/50 to-white/70 dark:to-slate-950/70" />

            {/* Subtle glow in the background to add depth, placed BEHIND the canvas now */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200/40 dark:bg-forest-900/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/40 dark:bg-emerald-900/10 blur-[100px] rounded-full" />
            
            {/* Three.js Canvas Container - opacity to 100 to make it clearly visible, placed over glow and gradients */}
            <div ref={mountRef} className="absolute inset-0 opacity-100 mix-blend-multiply dark:mix-blend-screen" />
            
            {/* Very light vignette carefully applied so it doesn't hide the canvas entirely */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>
    );
};

export default LightBackground;
