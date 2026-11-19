"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { ICON_LETTERS, ICON_SMILE, ICON_VIEWBOX } from "./logo-paths";

const ORANGE = 0xff5500;
const YELLOW = 0xf8a720;
const CREAM = 0xfbedc8;
const GREEN = 0x31603d;

type Floater = {
  mesh: THREE.Object3D;
  base: THREE.Vector3;
  speed: number;
  phase: number;
  spin: THREE.Vector3;
  hover: number; // 0..1 animado
  kick: number; // impulso al hacer click
  scale: number;
};

function starShape(r = 1) {
  // Estrella de 4 puntas con lados curvos (como el elemento visual del manual)
  const s = new THREE.Shape();
  s.moveTo(0, r);
  s.quadraticCurveTo(0, 0, r, 0);
  s.quadraticCurveTo(0, 0, 0, -r);
  s.quadraticCurveTo(0, 0, -r, 0);
  s.quadraticCurveTo(0, 0, 0, r);
  return s;
}

function arrowShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.15, -0.9);
  s.lineTo(0.15, -0.9);
  s.lineTo(0.15, 0.3);
  s.lineTo(0.55, 0.3);
  s.lineTo(0, 0.95);
  s.lineTo(-0.55, 0.3);
  s.lineTo(-0.15, 0.3);
  s.closePath();
  return s;
}

function buildKaIcon(material: THREE.Material, smileMat: THREE.Material) {
  const [, , w, h] = ICON_VIEWBOX.split(" ").map(Number);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ICON_VIEWBOX}">${ICON_LETTERS.map(
    (d) => `<path d="${d}"/>`,
  ).join("")}<path id="smile" d="${ICON_SMILE}"/></svg>`;
  const data = new SVGLoader().parse(svg);
  const group = new THREE.Group();
  data.paths.forEach((p, idx) => {
    const isSmile = idx === data.paths.length - 1;
    SVGLoader.createShapes(p).forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 14,
        bevelEnabled: true,
        bevelThickness: 3,
        bevelSize: 2,
        bevelSegments: 4,
        curveSegments: 18,
      });
      const m = new THREE.Mesh(geo, isSmile ? smileMat : material);
      group.add(m);
    });
  });
  // SVG tiene Y hacia abajo: invertir y centrar
  group.scale.set(1, -1, 1);
  const wrapper = new THREE.Group();
  group.position.set(-w / 2, h / 2, -7);
  wrapper.add(group);
  wrapper.scale.setScalar(2.4 / w);
  return wrapper;
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    // Luces suaves y cálidas
    scene.add(new THREE.HemisphereLight(0xfff6e5, 0xffb27a, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffc48a, 1.2);
    rim.position.set(-6, -2, -4);
    scene.add(rim);

    const mat = (color: number, extra: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.35,
        clearcoat: 0.8,
        clearcoatRoughness: 0.25,
        ...extra,
      });

    const mOrange = mat(ORANGE);
    const mYellow = mat(YELLOW);
    const mGreen = mat(GREEN);
    const mCream = mat(CREAM, { roughness: 0.5 });
    const mWhite = mat(0xffffff, { roughness: 0.2 });

    const geos = {
      ring: new THREE.TorusGeometry(0.62, 0.22, 32, 80),
      capsule: new THREE.CapsuleGeometry(0.32, 0.9, 12, 24),
      star: new THREE.ExtrudeGeometry(starShape(0.75), {
        depth: 0.28,
        bevelEnabled: true,
        bevelSize: 0.06,
        bevelThickness: 0.06,
        bevelSegments: 4,
        curveSegments: 24,
      }),
      arrow: new THREE.ExtrudeGeometry(arrowShape(), {
        depth: 0.3,
        bevelEnabled: true,
        bevelSize: 0.08,
        bevelThickness: 0.08,
        bevelSegments: 4,
      }),
      sphere: new THREE.SphereGeometry(0.45, 40, 40),
      box: new RoundedBoxGeometry(0.9, 0.9, 0.9, 5, 0.18),
      halfRing: new THREE.TorusGeometry(0.7, 0.12, 20, 60, Math.PI),
    };
    geos.star.center();
    geos.arrow.center();

    const floaters: Floater[] = [];
    const root = new THREE.Group();
    scene.add(root);

    const add = (
      obj: THREE.Object3D,
      pos: [number, number, number],
      scale = 1,
      spin: [number, number, number] = [0.2, 0.3, 0.1],
    ) => {
      obj.position.set(...pos);
      obj.scale.setScalar(scale);
      obj.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      root.add(obj);
      floaters.push({
        mesh: obj,
        base: new THREE.Vector3(...pos),
        speed: 0.5 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        spin: new THREE.Vector3(...spin),
        hover: 0,
        kick: 0,
        scale,
      });
    };

    // Ícono "ka" extruido como protagonista
    const ka = buildKaIcon(mOrange, mYellow);
    const kaHolder = new THREE.Group();
    kaHolder.add(ka);

    // Botón con sonrisa: "%" estilizado como esfera con anillo
    const percent = new THREE.Group();
    percent.add(new THREE.Mesh(geos.sphere, mOrange));
    const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.05, 12, 60), mYellow);
    pRing.rotation.x = Math.PI / 2.4;
    percent.add(pRing);

    // Caja de regalo pequeña
    const gift = new THREE.Group();
    gift.add(new THREE.Mesh(geos.box, mGreen));
    const ribbon1 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.95, 0.18), mYellow);
    const ribbon2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.95, 0.95), mYellow);
    gift.add(ribbon1, ribbon2);

    // Posiciones pensadas para un encuadre 16:9 (medio ancho visible ≈ 7.8); se reescalan en resize()
    const items: Array<[THREE.Object3D, [number, number, number], number, [number, number, number]?]> = [
      [kaHolder, [3.6, 0.1, 0.5], 1.5, [0, 0, 0]],
      [new THREE.Mesh(geos.ring, mOrange), [6.2, 2.9, -2], 1],
      [new THREE.Mesh(geos.star, mYellow), [1.6, 3.1, -1.5], 0.85, [0.1, 0.4, 0.5]],
      [new THREE.Mesh(geos.capsule, mGreen), [6.3, -2.3, -1], 0.9],
      [new THREE.Mesh(geos.arrow, mOrange), [2.2, -3.0, 0], 0.75, [0.1, 0.5, 0.05]],
      [percent, [0.4, 3.5, -3], 0.8],
      [gift, [-8.6, -4.0, -2], 0.8],
      [new THREE.Mesh(geos.star, mOrange), [-1.2, -4.4, -3], 0.6, [0.2, 0.3, 0.6]],
      [new THREE.Mesh(geos.ring, mYellow), [-2.8, 3.6, -5], 0.7],
      [new THREE.Mesh(geos.sphere, mCream), [6.9, 0.4, -4], 0.9],
      [new THREE.Mesh(geos.capsule, mOrange), [-9.5, 2.2, -6], 0.8],
      [new THREE.Mesh(geos.halfRing, mGreen), [4.2, 3.6, -4], 1],
      [new THREE.Mesh(geos.sphere, mWhite), [-11.5, -0.6, -6], 0.7],
      [new THREE.Mesh(geos.box, mOrange), [8.5, -3.5, -7], 0.7],
      [new THREE.Mesh(geos.star, mGreen), [-8.5, 3.5, -8], 0.8],
    ];
    items.forEach(([o, p, s, spin]) => add(o, p, s, spin));
    const origins = floaters.map((f) => ({ pos: f.base.clone(), scale: f.scale }));
    const kaFloater = floaters[0];
    kaFloater.mesh.rotation.set(0, -0.35, 0);

    // Confeti de partículas suaves
    const pCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const palette = [ORANGE, YELLOW, GREEN, 0xffffff].map((c) => new THREE.Color(c));
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 2] = -2 - Math.random() * 10;
      const c = palette[i % palette.length];
      pCol.set([c.r, c.g, c.b], i * 3);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const dots = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.85 }),
    );
    scene.add(dots);

    // Interacción
    const pointer = new THREE.Vector2(0, 0);
    const pointerSmooth = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let hovered: Floater | null = null;
    let scrollY = 0;

    const findFloater = (obj: THREE.Object3D | null) => {
      while (obj) {
        const f = floaters.find((fl) => fl.mesh === obj);
        if (f) return f;
        obj = obj.parent;
      }
      return null;
    };

    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const onClick = () => {
      if (hovered) {
        hovered.kick = 1;
      } else {
        floaters.forEach((f) => (f.kick = Math.max(f.kick, 0.5 + Math.random() * 0.3)));
      }
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    mount.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = 12;
      camera.updateProjectionMatrix();
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const fx = halfW / 7.8;
      const fy = halfH / 4.4;
      const s = Math.min(1, Math.max(0.55, Math.min(fx, fy) * 1.1));
      const narrow = camera.aspect < 1.15;
      floaters.forEach((f, i) => {
        const o = origins[i];
        if (f === kaFloater) {
          if (narrow) {
            // Móvil/tablet vertical: el "ka" arriba a la derecha, detrás del contenido
            f.base.set(halfW * 0.45, halfH * 0.58, -1);
            f.scale = Math.min(1.3, halfW * 0.38);
          } else {
            f.base.set(halfW * 0.5, 0.1, 0.5);
            f.scale = Math.min(1.6, halfW * 0.22) ;
          }
          return;
        }
        f.base.set(o.pos.x * fx, o.pos.y * (narrow ? fy : 1), o.pos.z);
        f.scale = o.scale * s;
      });
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      pointerSmooth.lerp(pointer, 0.06);

      // Hover con raycast
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(root.children, true)[0];
      const f = hit ? findFloater(hit.object) : null;
      if (f !== hovered) {
        hovered = f;
        mount.style.cursor = f ? "pointer" : "";
      }

      const motion = reduced ? 0.2 : 1;
      const sp = Math.min(scrollY / window.innerHeight, 1.5);

      floaters.forEach((fl, i) => {
        const target = fl === hovered ? 1 : 0;
        fl.hover += (target - fl.hover) * 0.12;
        fl.kick *= 0.94;
        const bob = Math.sin(t * fl.speed + fl.phase) * 0.25 * motion;
        const depth = 1 + fl.base.z * -0.06; // más lejos = menos parallax
        fl.mesh.position.set(
          fl.base.x + pointerSmooth.x * 0.5 / depth,
          fl.base.y + bob + pointerSmooth.y * 0.35 / depth + sp * (1.5 + (i % 3)) + fl.kick * 0.8,
          fl.base.z,
        );
        const s = fl.scale * (1 + fl.hover * 0.18 + fl.kick * 0.25);
        fl.mesh.scale.setScalar(s);

        if (fl === kaFloater) {
          // El "ka" mira hacia el cursor
          const ty = pointerSmooth.x * 0.6 - 0.25 + fl.kick * Math.PI * 2;
          const tx = -pointerSmooth.y * 0.35;
          fl.mesh.rotation.y += (ty - fl.mesh.rotation.y) * 0.08;
          fl.mesh.rotation.x += (tx - fl.mesh.rotation.x) * 0.08;
          fl.mesh.rotation.z = Math.sin(t * 0.8) * 0.05 * motion;
        } else {
          const boost = 1 + fl.hover * 4 + fl.kick * 10;
          fl.mesh.rotation.x += fl.spin.x * dt * boost * motion;
          fl.mesh.rotation.y += fl.spin.y * dt * boost * motion;
          fl.mesh.rotation.z += fl.spin.z * dt * boost * motion;
        }
      });

      dots.rotation.y = pointerSmooth.x * 0.08;
      dots.position.y = sp * 2 + Math.sin(t * 0.3) * 0.2;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      mount.removeEventListener("click", onClick);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          (Array.isArray(m) ? m : [m]).forEach((mm) => mm.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
