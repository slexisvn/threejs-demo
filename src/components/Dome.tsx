import { Html } from "@react-three/drei";
import { useFrame, Vector3 } from "@react-three/fiber";
import { FC } from "react";
import * as THREE from "three";

interface DomeProps {
  link: number;
  position: Vector3;
  texture: any;
  onClick: React.MouseEventHandler<HTMLElement>;
  fov: number;
}

const Dome: FC<DomeProps> = ({ link, position, texture, onClick, fov }) => {
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
};

export default Dome;
