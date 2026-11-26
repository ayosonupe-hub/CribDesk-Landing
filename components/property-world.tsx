"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";
import styles from "./motion-landing.module.css";

/** A locally authored architectural model. No remote models or textures. */
export default function PropertyWorld({
  paused,
  open,
  onEnter,
}: {
  paused: boolean;
  open: boolean;
  onEnter: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const invitation = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const engaged = hovered || focused;
  const controls = useRef({ paused, open, engaged });
  const wake = useRef<(() => void) | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    controls.current = { paused, open, engaged };
    wake.current?.();
  }, [paused, open, engaged]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      // WebGL availability can only be established when the renderer mounts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
    camera.position.set(8, 8, 11);
    camera.lookAt(0, 0.5, 0);
    scene.add(new THREE.HemisphereLight(0xf6fffa, 0x558a78, 3));
    const sun = new THREE.DirectionalLight(0xfff4d9, 4);
    sun.position.set(-3, 9, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -6,
      right: 6,
      top: 6,
      bottom: -6,
    });
    sun.shadow.normalBias = 0.035;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0xbafde6, 2);
    rim.position.set(4, 4, -5);
    scene.add(rim);

    const world = new THREE.Group();
    world.rotation.y = -0.18;
    scene.add(world);
    const materials: THREE.Material[] = [];
    function mat(color: number, roughness = 0.65, metalness = 0) {
      const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
      materials.push(m);
      return m;
    }
    const chalk = mat(0xf3f3df),
      green = mat(0x0d7359),
      mint = mat(0xbbdcc7);
    const stone = mat(0xd2dccb),
      wood = mat(0xc7905f),
      dark = mat(0x143d35);
    const glass = mat(0x739a8b, 0.16, 0.55),
      brass = mat(0xc8a76d, 0.3, 0.5);
    function mesh(
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
      parent: THREE.Group = world,
    ) {
      const m = new THREE.Mesh(geometry, material);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    }
    function box(
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      material = chalk,
      parent = world,
    ) {
      return mesh(new THREE.BoxGeometry(w, h, d), material, x, y, z, parent);
    }

    // A circular miniature landscape, with stepped foundations and a garden.
    mesh(new THREE.CylinderGeometry(3.65, 3.4, 0.22, 96), mint, 0, -0.45, 0);
    mesh(new THREE.CylinderGeometry(3.42, 3.53, 0.12, 96), green, 0, -0.62, 0);
    const rimRing = mesh(
      new THREE.TorusGeometry(3.53, 0.024, 8, 128),
      brass,
      0,
      -0.3,
      0,
    );
    rimRing.rotation.x = Math.PI / 2;
    box(4.7, 0.16, 3.7, -0.1, -0.26, -0.25, stone);
    box(4.2, 0.18, 3.2, -0.1, -0.11, -0.3);
    box(4, 0.1, 3, -0.1, 0.03, -0.3, wood);
    // Back and side walls leave the front glass open to view.
    box(4, 1.9, 0.15, -0.1, 1, -1.73);
    box(0.15, 1.9, 2.85, -2.03, 1, -0.25);
    box(0.15, 1.9, 2.85, 1.83, 1, -0.25);
    box(0.12, 1.8, 1.4, 0.2, 0.95, -1.0);
    box(1.25, 1.8, 0.12, -1.35, 0.95, -0.55);
    // Front windows, framing, and a cedar entry door.
    for (const x of [-1.9, -0.75, 0.45, 1.73])
      box(0.055, 1.85, 0.065, x, 1, 1.18, dark);
    box(3.75, 0.07, 0.08, -0.1, 1.91, 1.18, dark);
    box(3.75, 0.06, 0.08, -0.1, 0.1, 1.18, dark);
    const doorMaterial = mat(0xc7905f);
    doorMaterial.emissive.set(0xffd99c);
    doorMaterial.emissiveIntensity = 0.12;
    box(0.78, 1.7, 0.09, -1.35, 0.95, 1.19, doorMaterial);
    const entryLight = new THREE.PointLight(0xffdfac, 1.2, 2.4, 2);
    entryLight.position.set(-1.35, 1.1, 1.65);
    world.add(entryLight);
    box(0.035, 0.35, 0.06, -1.07, 1, 1.27, brass);
    const glazing = new THREE.MeshPhysicalMaterial({
      color: 0xc8eee0,
      transparent: true,
      opacity: 0.16,
      roughness: 0.06,
      metalness: 0.1,
      depthWrite: false,
    });
    materials.push(glazing);
    box(2.5, 1.75, 0.025, 0.5, 1, 1.18, glazing);
    // Living room: sofa, rug, coffee table, and plants.
    box(1.45, 0.025, 0.95, 0.72, 0.12, 0.15, mint);
    box(1.2, 0.3, 0.48, 0.7, 0.36, -0.33, green);
    box(1.22, 0.5, 0.16, 0.7, 0.5, -0.57, green);
    for (const x of [0.06, 1.34]) box(0.15, 0.42, 0.57, x, 0.4, -0.33, green);
    box(0.7, 0.07, 0.38, 0.7, 0.37, 0.47, wood);
    for (const x of [0.43, 0.96]) box(0.04, 0.23, 0.04, x, 0.22, 0.47, dark);
    // Kitchen visible beneath the liftable roof.
    box(1.45, 0.72, 0.5, 0.89, 0.47, -1.35, green);
    box(1.5, 0.07, 0.57, 0.89, 0.86, -1.35, chalk);
    box(0.82, 0.68, 0.55, 0.85, 0.45, -0.55, wood);
    box(0.9, 0.07, 0.62, 0.85, 0.83, -0.55, chalk);
    // Windows and external timber fins on the left wall.
    for (let i = 0; i < 12; i++)
      box(0.045, 1.83, 0.045, -2.12, 1, -1.57 + i * 0.22, wood);
    box(0.03, 1.1, 0.8, 1.92, 1.1, -0.65, glass);
    const roof = new THREE.Group();
    world.add(roof);
    box(4.37, 0.16, 3.37, -0.1, 2.03, -0.3, chalk, roof);
    box(4.18, 0.08, 3.17, -0.1, 2.15, -0.3, green, roof);
    box(4.36, 0.065, 0.065, -0.1, 1.94, 1.35, brass, roof);
    // Raised skylight makes the roof read as a carefully designed object.
    box(1.5, 0.09, 0.95, 0.75, 2.22, -0.4, dark, roof);
    box(1.4, 0.04, 0.85, 0.75, 2.29, -0.4, glass, roof);
    for (let i = 0; i < 4; i++)
      box(0.025, 0.035, 0.86, 0.18 + i * 0.38, 2.32, -0.4, chalk, roof);

    for (let i = 0; i < 4; i++)
      box(0.85, 0.07, 0.28, -1.36, -0.25 + i * 0.04, 2.6 - i * 0.34, chalk);
    // Sculptural trees, made of rounded masses instead of stock imagery.
    function tree(x: number, z: number, scale: number) {
      mesh(
        new THREE.CylinderGeometry(
          0.06 * scale,
          0.09 * scale,
          1.15 * scale,
          10,
        ),
        wood,
        x,
        0.25 * scale,
        z,
      );
      const crown = mesh(
        new THREE.IcosahedronGeometry(0.65 * scale, 2),
        green,
        x,
        1.1 * scale,
        z,
      );
      crown.scale.set(0.85, 1.2, 0.85);
      mesh(
        new THREE.IcosahedronGeometry(0.39 * scale, 1),
        mint,
        x - 0.25 * scale,
        1.3 * scale,
        z + 0.1,
      );
      mesh(
        new THREE.CylinderGeometry(0.45 * scale, 0.42 * scale, 0.1, 32),
        stone,
        x,
        -0.25,
        z,
      );
    }
    tree(2.65, -0.5, 1.2);
    tree(-2.65, -0.9, 0.85);
    tree(2.0, 2.05, 0.7);
    for (let i = 0; i < 7; i++)
      mesh(
        new THREE.SphereGeometry(0.12, 12, 8),
        green,
        0.25 + i * 0.22,
        -0.1,
        2.35,
      );

    // Thin orbit: the context around a home, coming together around the agent.
    const orbit = new THREE.Group();
    world.add(orbit);
    const orbitLine = mesh(
      new THREE.TorusGeometry(4.05, 0.012, 6, 160),
      mint,
      0,
      0.1,
      0,
      orbit,
    );
    orbitLine.rotation.x = Math.PI / 2.4;
    const marker = mesh(
      new THREE.SphereGeometry(0.075, 16, 12),
      green,
      4.05,
      0.1,
      0,
      orbit,
    );
    marker.castShadow = false;

    let visible = true,
      frameTime = 0,
      previousTime = 0;
    const pointer = { x: 0, y: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const doorway = new THREE.Vector3(-1.35, 0.6, 1.3);
    const projectedDoorway = new THREE.Vector3();
    function positionInvitation() {
      if (!invitation.current || !element) return;
      world.updateWorldMatrix(true, false);
      projectedDoorway
        .copy(doorway)
        .applyMatrix4(world.matrixWorld)
        .project(camera);
      invitation.current.style.left = `${((projectedDoorway.x + 1) / 2) * element.clientWidth}px`;
      invitation.current.style.top = `${((-projectedDoorway.y + 1) / 2) * element.clientHeight}px`;
    }
    function resize() {
      if (!element) return;
      const width = element.clientWidth,
        height = element.clientHeight;
      const aspect = width / Math.max(height, 1);
      const span = aspect < 1 ? 5.3 / aspect : 5.1;
      camera.left = -span * aspect;
      camera.right = span * aspect;
      camera.top = span;
      camera.bottom = -span;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
      positionInvitation();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateLoop();
    });
    intersection.observe(element);
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const leave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    function frame(time: number) {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const still = controls.current.paused || reduce.matches;
      if (!still) frameTime += delta;
      const smoothing = still ? 1 : 1 - Math.exp(-delta * 5);
      world.rotation.y +=
        ((still
          ? -0.18
          : -0.18 + pointer.x * 0.4 + Math.sin(frameTime * 0.3) * 0.035) -
          world.rotation.y) *
        smoothing;
      world.rotation.x +=
        ((still ? 0 : pointer.y * 0.08) - world.rotation.x) * smoothing;
      world.position.y = still ? 0 : Math.sin(frameTime * 0.8) * 0.065;
      roof.position.y +=
        ((controls.current.open ? 1.15 : 0) - roof.position.y) * smoothing;
      orbit.rotation.y = frameTime * 0.08;
      const approach = controls.current.engaged;
      // A brief breath of warm light every seven seconds, with no camera
      // movement when motion is paused or reduced.
      const phase = frameTime % 7;
      const pulse =
        !still && phase < 1.6 ? Math.sin((phase / 1.6) * Math.PI) ** 2 : 0;
      doorMaterial.emissiveIntensity +=
        ((approach ? 0.55 : 0.12 + pulse * 0.2) -
          doorMaterial.emissiveIntensity) *
        smoothing;
      entryLight.intensity = approach ? 2.2 : 1.2 + pulse * 0.6;
      camera.zoom +=
        ((approach && !still ? 1.045 : 1) - camera.zoom) * smoothing;
      camera.updateProjectionMatrix();
      positionInvitation();
      renderer.render(scene, camera);
      if (still) renderer.setAnimationLoop(null);
    }
    function updateLoop() {
      renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
    }
    wake.current = updateLoop;
    reduce.addEventListener("change", updateLoop);
    const contextLost = (event: Event) => {
      event.preventDefault();
      setUnavailable(true);
      renderer.setAnimationLoop(null);
      wake.current = null;
      reduce.removeEventListener("change", updateLoop);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", updateLoop);
    resize();
    updateLoop();
    return () => {
      renderer.setAnimationLoop(null);
      wake.current = null;
      reduce.removeEventListener("change", updateLoop);
      document.removeEventListener("visibilitychange", updateLoop);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      observer.disconnect();
      intersection.disconnect();
      scene.traverse((item) => {
        if (item instanceof THREE.Mesh) item.geometry.dispose();
      });
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className={styles.worldCanvas}
      ref={host}
      role="button"
      tabIndex={0}
      aria-label="Step inside the home for an interactive showing"
      aria-haspopup="dialog"
      data-engaged={engaged}
      data-unavailable={unavailable}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={onEnter}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEnter();
        }
      }}
    >
      {unavailable && (
        <div className={styles.sceneFallback}>
          <span>⌂</span>
          <p>
            A home. A conversation.
            <br />
            Your next move.
          </p>
        </div>
      )}
      <span
        className={styles.entryInvitation}
        ref={invitation}
        aria-hidden="true"
      >
        <span className={styles.entryDot} />
        <span className={styles.entryLabel}>
          Step inside <ArrowUpRight size={17} />
        </span>
        <span className={styles.entryDescription}>
          Experience a showing with CribDesk.
        </span>
      </span>
    </div>
  );
}
