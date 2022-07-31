import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { useState, Suspense, WheelEvent } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import "./App.css";

const store = [
  {
    position: [-1, 0, -15],
    url: "./rainforest_trail_4k.hdr",
    link: 1,
  },
  {
    position: [-10, 4, -10],
    url: "./pretville_street_4k.hdr",
    link: 0,
  },
];

function Dome({ link, position, texture, onClick, fov }: any) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.encoding = THREE.sRGBEncoding;

  useFrame((state: any) => {
    state.camera.fov = fov;
    state.camera.updateProjectionMatrix();
  });

  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <Html>
          <div className="button" onClick={onClick}>
            <span style={{ fontSize: 16, fontWeight: "bold" }}>
              {link ? "Pretville Street" : "Rainforest Trail"}
            </span>
            <span style={{ fontSize: 14 }}>Let's go!!</span>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function Portals({ fov }: any) {
  const [which, set] = useState(0);
  const { link, ...rest } = store[which];
  const maps: any[] = useLoader(
    RGBELoader as any,
    store.map((entry) => entry.url)
  );
  return (
    <Dome
      fov={fov}
      onClick={() => set(link)}
      texture={maps[which]}
      link={link}
      {...rest}
    />
  );
}

export default function App() {
  const [fov, setFov] = useState(80);

  function onMouseWheel(e: WheelEvent<HTMLElement>) {
    const fovVal = Math.sign(e.deltaY) * 0.05 + fov + e.deltaY * 0.3;
    setFov(THREE.MathUtils.clamp(fovVal, 10, 80));
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
