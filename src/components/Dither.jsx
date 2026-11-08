import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uWaveColor;
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform float uPixelSize;
  varying vec2 vUv;

  // Matriz Dither 4x4 padrão Bayer
  float dither4x4(vec2 position, float brightness) {
    int x = int(mod(position.x, 4.0));
    int y = int(mod(position.y, 4.0));
    int index = x + y * 4;
    float limit = 0.0;
    
    if (index == 0) limit = 0.0625;
    else if (index == 1) limit = 0.5625;
    else if (index == 2) limit = 0.1875;
    else if (index == 3) limit = 0.6875;
    else if (index == 4) limit = 0.8125;
    else if (index == 5) limit = 0.3125;
    else if (index == 6) limit = 0.9375;
    else if (index == 7) limit = 0.4375;
    else if (index == 8) limit = 0.25;
    else if (index == 9) limit = 0.75;
    else if (index == 10) limit = 0.125;
    else if (index == 11) limit = 0.625;
    else if (index == 12) limit = 1.0;
    else if (index == 13) limit = 0.5;
    else if (index == 14) limit = 0.875;
    else if (index == 15) limit = 0.375;

    return brightness < limit ? 0.0 : 1.0;
  }

  void main() {
    // Pixelização
    vec2 st = gl_FragCoord.xy / uPixelSize;
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    // Onda animada
    float time = uTime * uWaveSpeed;
    float wave = sin(uv.x * uWaveFrequency + time) * cos(uv.y * uWaveFrequency + time) * uWaveAmplitude;
    float dist = length(uv - 0.5) + wave;

    float brightness = clamp(1.0 - dist * 1.5, 0.0, 1.0);
    float dither = dither4x4(st, brightness);

    // Renderiza com alfa (transparência) em vez de fundo opaco
    vec3 color = uWaveColor * dither;
    float alpha = dither * brightness * 0.8; // Transparência suave nas bordas

    gl_FragColor = vec4(color, alpha);
  }
`;

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? new THREE.Vector3(
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    )
    : new THREE.Vector3(0.65, 0.33, 0.96); // #a855f7 fallback
};

export default function Dither({
  waveSpeed = 0.03,
  waveFrequency = 2.8,
  waveAmplitude = 0.3,
  waveColor = '#a855f7',
  pixelSize = 2,
  className = ''
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Configuração com ALPHA ativado para fundo transparente
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Fundo 100% transparente
    renderer.setClearAlpha(0);

    const canvas = renderer.domElement;
    canvas.className = 'block w-full h-full bg-transparent';
    canvas.style.backgroundColor = 'transparent';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uWaveColor: { value: hexToRgb(waveColor) },
      uWaveSpeed: { value: waveSpeed },
      uWaveFrequency: { value: waveFrequency },
      uWaveAmplitude: { value: waveAmplitude },
      uPixelSize: { value: pixelSize }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let animationFrameId;
    let startTime = performance.now();

    const render = (now) => {
      uniforms.uTime.value = (now - startTime) * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [waveSpeed, waveFrequency, waveAmplitude, waveColor, pixelSize]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full bg-transparent pointer-events-none ${className}`}
    />
  );
}