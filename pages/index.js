import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const mountRef = useRef(null);
  useEffect(() => {
    const w = 960;
    const h = 540;
    const renderer = new THREE.WebGLRenderer();
    const elm = mountRef.current;
    elm?.appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
    camera.position.set(0, 0, +1000);

    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/nyanpoko.jpg");
    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);

    scene.add(directionalLight);

    const tick = () => {
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
    return () => {
      elm?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={mountRef}></div>
    </>
  );
}
