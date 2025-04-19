import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import flyThrougState from "./state.json"

import {
    SheetProvider,
    PerspectiveCamera,
    useCurrentSheet,
} from "@theatre/r3f";
import { useEffect } from "react";

export default function App() {

    // const sheet = getProject("Fly Through").sheet("Scene");
    const sheet = getProject("Fly Through", { state: flyThrougState }).sheet("Scene");

    return (
        <Canvas gl={{ preserveDrawingBuffer: true }}>
            <ScrollControls pages={5}>
                <SheetProvider sheet={sheet}>
                    <Scene />
                </SheetProvider>
            </ScrollControls>
        </Canvas>
    );
}

function Scene() {
    useEffect(() => {
        alert("Try Scrolling down and up!")
    }, [])
    const sheet = useCurrentSheet();
    const scroll = useScroll();

    // our callback will run on every animation frame
    useFrame(() => {
        // the length of our sequence
        const sequenceLength = val(sheet.sequence.pointer.length);
        // update the "position" of the playhead in the sequence, as a fraction of its whole length
        sheet.sequence.position = scroll.offset * sequenceLength;
    });

    const bgColor = "#aaaaaa";
    const nightColor = "#0d1013";

    return (
        <>
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" color={bgColor} near={1} far={20} />
            <ambientLight intensity={0.1} />
            <directionalLight position={[-5, 5, -5]} intensity={1.5} />
            <Gltf src="/low_poly_city.glb" castShadow receiveShadow />
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 0, 0]}
                fov={90}
                near={0.1}
                far={70}
            />
        </>
    );
}