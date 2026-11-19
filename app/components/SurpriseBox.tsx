"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { CATEGORIES } from "../site";

const SURPRISES = [
  { title: "¡Algo para tu hogar!", cat: "Hogar", text: "Organizadores y deco que transforman cualquier rincón." },
  { title: "¡Un capricho de belleza!", cat: "Belleza", text: "Accesorios y maquillaje lindos a precios que no asustan." },
  { title: "¡Diversión para los peques!", cat: "Niños", text: "Juguetes que sacan sonrisas en toda la familia." },
  { title: "¡El regalo perfecto!", cat: "Regalos", text: "Detalles bonitos para sorprender a quien quieras." },
  { title: "¡Un gadget útil!", cat: "Tecnología", text: "Accesorios modernos que hacen tu día más fácil." },
  { title: "¡Magia en la cocina!", cat: "Cocina", text: "Utensilios y mini electrodomésticos prácticos." },
  { title: "¡Limpieza sin estrés!", cat: "Limpieza", text: "Soluciones prácticas para dejar todo brillando." },
];

export default function SurpriseBox({ onCatalog }: { onCatalog: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<() => void>(() => {});
  const [result, setResult] = useState<(typeof SURPRISES)[number] | null>(null);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);
    camera.lookAt(0, 0.4, 0);

    scene.add(new THREE.HemisphereLight(0xfff3e0, 0xff9a5c, 1.8));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 6, 5);
    scene.add(key);

    const mat = (c: number) =>
      new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.35, clearcoat: 0.9, clearcoatRoughness: 0.2 });
    const mBox = mat(0xff5500);
    const mRibbon = mat(0xf8a720);
    const mGreen = mat(0x31603d);

    const gift = new THREE.Group();
    scene.add(gift);

    const body = new THREE.Mesh(new RoundedBoxGeometry(2, 1.6, 2, 6, 0.14), mBox);
    body.position.y = 0;
    gift.add(body);
    const rb1 = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.62, 2.02), mRibbon);
    const rb2 = new THREE.Mesh(new THREE.BoxGeometry(2.02, 1.62, 0.36), mRibbon);
    gift.add(rb1, rb2);

    const lid = new THREE.Group();
    lid.position.y = 0.95;
    const lidMesh = new THREE.Mesh(new RoundedBoxGeometry(2.25, 0.45, 2.25, 6, 0.14), mBox);
    const lr1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.47, 2.27), mRibbon);
    const lr2 = new THREE.Mesh(new THREE.BoxGeometry(2.27, 0.47, 0.38), mRibbon);
    lid.add(lidMesh, lr1, lr2);
    // Moño
    const bowGeo = new THREE.TorusGeometry(0.35, 0.11, 16, 40);
    const bowL = new THREE.Mesh(bowGeo, mRibbon);
    bowL.position.set(-0.36, 0.5, 0);
    bowL.rotation.set(0, 0, Math.PI / 5);
    const bowR = bowL.clone();
    bowR.position.x = 0.36;
    bowR.rotation.set(0, 0, -Math.PI / 5);
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), mGreen);
    knot.position.y = 0.32;
    lid.add(bowL, bowR, knot);
    gift.add(lid);

    // Sombra suave
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 48),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12 }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.82;
    scene.add(shadow);

    // Confeti
    const N = 160;
    const confGeo = new THREE.PlaneGeometry(0.12, 0.2);
    const confMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const conf = new THREE.InstancedMesh(confGeo, confMat, N);
    const colors = [0xff5500, 0xf8a720, 0x31603d, 0xfbedc8, 0xffffff];
    const vel: THREE.Vector3[] = [];
    const pos: THREE.Vector3[] = [];
    const rot: THREE.Euler[] = [];
    const dummy = new THREE.Object3D();
    for (let i = 0; i < N; i++) {
      conf.setColorAt(i, new THREE.Color(colors[i % colors.length]));
      vel.push(new THREE.Vector3());
      pos.push(new THREE.Vector3(0, -50, 0));
      rot.push(new THREE.Euler());
    }
    scene.add(conf);

    let state: "idle" | "open" = "idle";
    let openT = 0;
    let shake = 0;

    const burst = () => {
      for (let i = 0; i < N; i++) {
        pos[i].set((Math.random() - 0.5) * 0.8, 1, (Math.random() - 0.5) * 0.8);
        const a = Math.random() * Math.PI * 2;
        const sp = 1.5 + Math.random() * 3;
        vel[i].set(Math.cos(a) * sp, 5 + Math.random() * 4, Math.sin(a) * sp);
        rot[i].set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      }
    };

    openRef.current = () => {
      if (state === "open") {
        // Cerrar para volver a jugar
        state = "idle";
        openT = 0;
        return;
      }
      shake = 1;
      setTimeout(() => {
        state = "open";
        openT = 0;
        burst();
      }, 450);
    };

    const pointer = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    mount.addEventListener("pointermove", onMove);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Giro suave + sigue al cursor
      gift.rotation.y += ((pointer.x * 0.6 + t * 0.25) - gift.rotation.y) * 0.05;
      gift.rotation.x += (-pointer.y * 0.15 - gift.rotation.x) * 0.05;

      if (shake > 0) {
        shake = Math.max(0, shake - dt * 2.2);
        gift.position.x = Math.sin(t * 60) * 0.06 * shake;
        gift.rotation.z = Math.sin(t * 50) * 0.08 * shake;
      } else {
        gift.position.x = 0;
        gift.rotation.z = 0;
      }

      if (state === "open") {
        openT = Math.min(1, openT + dt * 1.6);
        const e = 1 - Math.pow(1 - openT, 3);
        lid.position.y = 0.95 + e * 1.15;
        lid.position.x = e * 1.1;
        lid.rotation.z = -e * 0.9;
      } else {
        lid.position.y += (0.95 + Math.sin(t * 2) * 0.03 - lid.position.y) * 0.15;
        lid.position.x += (0 - lid.position.x) * 0.15;
        lid.rotation.z += (0 - lid.rotation.z) * 0.15;
      }
      gift.position.y = Math.sin(t * 1.5) * 0.06;

      for (let i = 0; i < N; i++) {
        if (pos[i].y < -10) continue;
        vel[i].y -= 9 * dt;
        vel[i].multiplyScalar(0.985);
        pos[i].addScaledVector(vel[i], dt);
        rot[i].x += dt * 4;
        rot[i].y += dt * 3;
        dummy.position.copy(pos[i]);
        dummy.rotation.copy(rot[i]);
        dummy.updateMatrix();
        conf.setMatrixAt(i, dummy.matrix);
      }
      conf.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const handleOpen = () => {
    if (opening) return;
    if (result) {
      setResult(null);
      openRef.current();
      return;
    }
    setOpening(true);
    openRef.current();
    setTimeout(() => {
      setResult(SURPRISES[Math.floor(Math.random() * SURPRISES.length)]);
      setOpening(false);
    }, 900);
  };

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="relative">
        <div
          ref={mountRef}
          onClick={handleOpen}
          className="relative mx-auto aspect-square w-full max-w-[460px] cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
          aria-label={result ? "Cerrar la caja sorpresa" : "Abrir la caja sorpresa"}
        />
        {!result && (
          <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--k-orange)] shadow-md animate-bounce">
            {opening ? "Abriendo…" : "¡Tócala para abrirla!"}
          </span>
        )}
      </div>
      <div aria-live="polite" className="min-h-[220px]">
        {result ? (
          <div className="surprise-card">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--k-yellow)]">Te tocó: {result.cat}</p>
            <h3 className="font-display mt-2 text-4xl font-bold text-white md:text-5xl">{result.title}</h3>
            <p className="mt-3 max-w-md text-lg text-white/85">{result.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onCatalog} className="btn btn-yellow">
                Pedir catálogo
              </button>
              <button onClick={handleOpen} className="btn btn-ghost-light">
                Abrir otra vez
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--k-yellow)]">Caja sorpresa</p>
            <h3 className="font-display mt-2 text-4xl font-bold text-white md:text-5xl">
              ¿Qué encontrarás hoy en Kawii?
            </h3>
            <p className="mt-3 max-w-md text-lg text-white/85">
              Cada visita sorprende. Abre la caja y descubre una de nuestras {CATEGORIES.length} categorías
              favoritas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
