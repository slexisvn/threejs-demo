import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, WheelEvent } from "react";
import * as THREE from "three";
import Portals from "./components/Portals";
import "./App.css";

export default function App() {
  const [fov, setFov] = useState(80);

  function onMouseWheel(e: WheelEvent<HTMLElement>) {
    const fovVal = Math.sign(e.deltaY) * 0.05 + fov + e.deltaY * 0.3;
    setFov(THREE.MathUtils.clamp(fovVal, 10, 120));
  }

  return (
    <div onWheel={onMouseWheel} style={{ height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: fov }}>
        <OrbitControls
          enableDamping
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.2}
          rotateSpeed={-0.5}
        />
        <Suspense fallback={<Html>loading..</Html>}>
          <Portals fov={fov} />
        </Suspense>
      </Canvas>
    </div>
  );
}
