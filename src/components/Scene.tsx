import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Stage } from '@react-three/drei';
import { Room } from './Room';
import { Suspense } from 'react';

export const Scene = () => {
    return (
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
            {/* Lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

            <Suspense fallback={null}>
                <Room />
                <Character />
            </Suspense>

            <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} />
            <Grid infiniteGrid fadeDistance={30} sectionColor={"#4a4a4a"} cellColor={"#2a2a2a"} />
        </Canvas>
    );
};
