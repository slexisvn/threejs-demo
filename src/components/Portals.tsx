import { useLoader, Vector3 } from "@react-three/fiber";
import { FC, useState } from "react";
import { RGBELoader } from "three-stdlib";
import Dome from "./Dome";

type Store = {
  position: Vector3;
  url: string;
  link: number;
}[];

const store: Store = [
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

interface PortalsProps {
  fov: number;
}

const Portals: FC<PortalsProps> = ({ fov }) => {
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
};

export default Portals;
