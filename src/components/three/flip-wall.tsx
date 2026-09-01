"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-browser";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Signature technique for this site: a wall of instanced tiles, each carrying a
 * slice of the current photograph on its front face and the next photograph on
 * its back. Scroll flips them in a diagonal wave, so one car turns into the
 * next the way a split-flap board changes.
 */

const vertex = /* glsl */ `
  attribute vec2 aTile;
  attribute vec2 aUvOffset;
  varying vec2 vUvFront;
  varying vec2 vUvBack;
  varying float vFacing;
  uniform vec2 uGrid;
  uniform vec2 uCoverFront;
  uniform vec2 uCoverBack;
  uniform float uProgress;

  void main() {
    // Each tile samples only its own slice of the photograph, so the wall
    // reassembles one image rather than repeating it per tile.
    vec2 g = aUvOffset + uv / uGrid;

    // A tile flips about its own horizontal axis, which turns the back face
    // upside down. Mirroring v for the back keeps the next photo upright.
    vec2 gBack = aUvOffset + vec2(uv.x, 1.0 - uv.y) / uGrid;

    // Cover-fit each photograph into the wall's aspect instead of stretching it.
    vUvFront = (g - 0.5) * uCoverFront + 0.5;
    vUvBack = (gBack - 0.5) * uCoverBack + 0.5;

    // Each tile flips on its own delay, staggered along the diagonal.
    float delay = (aTile.x / uGrid.x) * 0.45 + (aTile.y / uGrid.y) * 0.35;
    float local = clamp((uProgress - delay) / 0.4, 0.0, 1.0);
    float angle = local * 3.14159265;

    float c = cos(angle);
    float s = sin(angle);
    vec3 p = position;
    vec3 rotated = vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);

    vFacing = c;

    vec4 mv = instanceMatrix * vec4(rotated, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uFront;
  uniform sampler2D uBack;
  varying vec2 vUvFront;
  varying vec2 vUvBack;
  varying float vFacing;

  void main() {
    vec4 color = vFacing >= 0.0
      ? texture2D(uFront, vUvFront)
      : texture2D(uBack, vUvBack);

    // Their showroom is shot very dark; a gentle gamma lift keeps the cars
    // readable at wall scale without washing out the black paintwork.
    vec3 lifted = pow(color.rgb, vec3(0.9)) * 1.06;

    // Shade the edge-on moment, and warm it slightly, so the wave reads as
    // physical rotation catching the showroom's brass light.
    float edge = abs(vFacing);
    float shade = mix(0.28, 1.0, edge);
    vec3 warm = mix(vec3(0.78, 0.63, 0.35), vec3(1.0), edge);
    gl_FragColor = vec4(lifted * shade * warm, 1.0);
  }
`;

const COLS = 9;
const ROWS = 6;

function Wall({
  urls,
  progressRef,
}: {
  urls: string[];
  progressRef: React.RefObject<number>;
}) {
  const textures = useLoader(THREE.TextureLoader, urls);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Size the wall from the visible frustum so it always reaches the edges —
  // a fixed tile size leaves bands of empty background on wide screens.
  const wallW = viewport.width * 1.04;
  const wallH = viewport.height * 1.04;
  const tileW = wallW / COLS;
  const tileH = wallH / ROWS;

  const { matrices, tiles, uvOffsets } = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const tiles: number[] = [];
    const uvOffsets: number[] = [];
    const m = new THREE.Matrix4();
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        m.makeTranslation(
          (x - (COLS - 1) / 2) * tileW,
          ((ROWS - 1) / 2 - y) * tileH,
          0
        );
        matrices.push(m.clone());
        tiles.push(x, y);
        uvOffsets.push(x / COLS, 1 - (y + 1) / ROWS);
      }
    }
    return { matrices, tiles, uvOffsets };
  }, [tileW, tileH]);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
    });
  }, [textures]);

  useEffect(() => {
    const im = mesh.current;
    if (!im) return;
    matrices.forEach((mat4, i) => im.setMatrixAt(i, mat4));
    im.instanceMatrix.needsUpdate = true;

    im.geometry.setAttribute(
      "aTile",
      new THREE.InstancedBufferAttribute(new Float32Array(tiles), 2)
    );
    im.geometry.setAttribute(
      "aUvOffset",
      new THREE.InstancedBufferAttribute(new Float32Array(uvOffsets), 2)
    );
  }, [matrices, tiles, uvOffsets]);

  /** Scale factors that crop a photo to the wall's aspect rather than stretch it. */
  const coverFor = useMemo(() => {
    const wallAspect = wallW / wallH;
    return (tex: THREE.Texture) => {
      const img = tex.image as { width?: number; height?: number } | undefined;
      const a = img?.width && img?.height ? img.width / img.height : wallAspect;
      return wallAspect > a
        ? new THREE.Vector2(1, a / wallAspect)
        : new THREE.Vector2(wallAspect / a, 1);
    };
  }, [wallW, wallH]);

  useFrame(() => {
    const m = mat.current;
    if (!m) return;
    const p = (progressRef.current ?? 0) * (textures.length - 1);
    const i = Math.min(Math.floor(p), textures.length - 2);
    const front = textures[i];
    const back = textures[i + 1];
    m.uniforms.uFront.value = front;
    m.uniforms.uBack.value = back;
    m.uniforms.uCoverFront.value.copy(coverFor(front));
    m.uniforms.uCoverBack.value.copy(coverFor(back));
    m.uniforms.uProgress.value = p - i;
  });

  const uniforms = useMemo(
    () => ({
      uFront: { value: textures[0] },
      uBack: { value: textures[1] ?? textures[0] },
      uProgress: { value: 0 },
      uGrid: { value: new THREE.Vector2(COLS, ROWS) },
      uCoverFront: { value: new THREE.Vector2(1, 1) },
      uCoverBack: { value: new THREE.Vector2(1, 1) },
    }),
    [textures]
  );

  return (
    <instancedMesh
      ref={mesh}
      // Remounts when tile size changes so the geometry matches the matrices.
      key={`${tileW.toFixed(3)}x${tileH.toFixed(3)}`}
      args={[undefined, undefined, COLS * ROWS]}
    >
      {/* A hairline of background between tiles reads as the gap in a real board. */}
      <planeGeometry args={[tileW * 0.985, tileH * 0.985]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

export function FlipWall({
  urls,
  progressRef,
  className,
  onLost,
}: {
  urls: string[];
  progressRef: React.RefObject<number>;
  className?: string;
  onLost?: (lost: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const { lost, bind } = useWebglHealth();

  useEffect(() => {
    onLost?.(lost);
  }, [lost, onLost]);

  if (reduced || lost) return null;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Suspense fallback={null}>
          <Wall urls={urls} progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
