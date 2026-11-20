import { useEffect, useRef, useState } from "react";

const EARTH_TEXTURE = "https://unpkg.com/three-globe/example/img/earth-day.jpg";
const START_DISTANCE = 3.35;

export default function EarthGlobe() {
  const mountRef = useRef(null);
  const [armed, setArmed] = useState(false);

  // Nothing heavy is fetched until the footer is nearly on screen.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!armed) return undefined;
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      let distance = START_DISTANCE;
      camera.position.set(0, 0, distance);

      const tilt = new THREE.Group();
      tilt.rotation.z = -0.32;
      scene.add(tilt);

      const spin = new THREE.Group();
      tilt.add(spin);

      const geometry = new THREE.SphereGeometry(1, 48, 48);
      const material = new THREE.MeshStandardMaterial({
        color: 0x2f6fa8,
        roughness: 0.8,
        metalness: 0.05,
      });
      spin.add(new THREE.Mesh(geometry, material));

      const haloGeometry = new THREE.SphereGeometry(1.1, 40, 40);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0xffe9a8,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
      });
      spin.add(new THREE.Mesh(haloGeometry, haloMaterial));

      scene.add(new THREE.AmbientLight(0xffffff, 1.25));
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(2.6, 1.6, 2.4);
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0xffd76a, 0.65);
      rimLight.position.set(-2.4, -1.2, -2.2);
      scene.add(rimLight);

      let texture = null;
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      loader.load(
        EARTH_TEXTURE,
        (map) => {
          map.colorSpace = THREE.SRGBColorSpace;
          map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
          texture = map;
          material.map = map;
          material.color.set(0xffffff);
          material.needsUpdate = true;
        },
        undefined,
        () => {}
      );

      const resize = () => {
        const width = mount.clientWidth || 1;
        const height = mount.clientHeight || 1;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(mount);

      const restSpin = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.0016;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let momentum = restSpin;

      const onPointerDown = (event) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        mount.style.cursor = "grabbing";
        try {
          mount.setPointerCapture?.(event.pointerId);
        } catch {
          // capturing the pointer is a nicety; the drag works without it
        }
      };
      const onPointerMove = (event) => {
        if (!dragging) return;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        spin.rotation.y += dx * 0.0062;
        spin.rotation.x = Math.max(-0.85, Math.min(0.85, spin.rotation.x + dy * 0.005));
        momentum = Math.max(-0.05, Math.min(0.05, dx * 0.0009));
      };
      const onPointerUp = () => {
        dragging = false;
        mount.style.cursor = "grab";
      };
      // Ctrl + scroll grows the globe inside its circle and never the page.
      const onWheel = (event) => {
        if (!event.ctrlKey) return;
        event.preventDefault();
        distance = Math.max(2, Math.min(6, distance + event.deltaY * 0.0024));
        camera.position.z = distance;
      };

      mount.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      mount.addEventListener("wheel", onWheel, { passive: false });

      const render = () => {
        frame = requestAnimationFrame(render);
        if (!dragging) {
          spin.rotation.y += momentum;
          momentum += (restSpin - momentum) * 0.02;
        }
        renderer.render(scene, camera);
      };
      render();

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        mount.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        mount.removeEventListener("wheel", onWheel);
        geometry.dispose();
        material.dispose();
        haloGeometry.dispose();
        haloMaterial.dispose();
        if (texture) texture.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [armed]);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="A 3D globe of the earth. Drag it to turn it, or hold Control and scroll to zoom."
      className="h-[176px] w-[176px] shrink-0 cursor-grab touch-none select-none overflow-hidden rounded-full border border-[hsl(var(--globe-ring))] bg-[hsl(var(--globe-ring))]/50 sm:h-[210px] sm:w-[210px]"
    />
  );
}