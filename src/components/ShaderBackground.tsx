
import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

// Simplex Noise 2D
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1;

  i1 = (x0.x > x0.y)
    ? vec2(1.0, 0.0)
    : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );

  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159
    - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;

  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

// Multi-octave noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  mat2 rotation = mat2(
    0.8, -0.6,
    0.6, 0.8
  );

  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p);
    p = rotation * p * 2.0;
    amplitude *= 0.5;
  }

  return value;
}

void main() {

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Correction du ratio écran
  vec2 st = uv;
  st.x *= u_resolution.x / u_resolution.y;

  float time = u_time * 0.12;

  // Déformation organique
  float noise1 = fbm(st * 2.0 + vec2(time, -time * 0.5));

  float noise2 = fbm(
    st * 3.5 + vec2(-time * 0.7, time)
  );

  float pattern = noise1 * 0.7 + noise2 * 0.3;

  // Couleurs institutionnelles
  vec3 cBase = vec3(0.97, 0.98, 0.99);

  vec3 cSageSoft = vec3(0.85, 0.94, 0.88);

  vec3 cEmeraldLight = vec3(0.42, 0.84, 0.58);

  vec3 cGreenCivic = vec3(0.082, 0.502, 0.239);

  // Premier mélange
  float mask1 = smoothstep(-0.4, 0.6, pattern);

  vec3 color = mix(
    cBase,
    cSageSoft,
    mask1 * 0.65
  );

  // Crêtes des vagues
  float mask2 = smoothstep(0.1, 0.75, pattern);

  color = mix(
    color,
    cEmeraldLight,
    mask2 * 0.35
  );

  // Interaction souris
  vec2 mousePos = u_mouse;

  float mouseDist = distance(
    st,
    mousePos * vec2(u_resolution.x / u_resolution.y, 1.0)
  );

  float ripple = sin(
    mouseDist * 10.0 - u_time * 2.0
  );

  float mouseInfluence = exp(-mouseDist * 3.0);

  float wave = ripple * mouseInfluence;

  color += cEmeraldLight * wave * 0.025;

  // Aura verte institutionnelle
  float aura = smoothstep(0.35, 0.8, pattern);

  color = mix(
    color,
    cGreenCivic,
    aura * 0.08
  );

  // Vignettage subtil
  float vignette = 1.0 - 0.25 * length(uv - 0.5);

  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);

  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Erreur Shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.error("WebGL non disponible");
      return;
    }

    // Compilation des shaders
    const vertex = createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShader
    );

    const fragment = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShader
    );

    if (!vertex || !fragment) return;

    const program = gl.createProgram();

    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Erreur programme:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Géométrie plein écran
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();

    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "a_position");

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    // Uniforms
    const resolution = gl.getUniformLocation(
      program,
      "u_resolution"
    );

    const mouse = gl.getUniformLocation(
      program,
      "u_mouse"
    );

    const time = gl.getUniformLocation(
      program,
      "u_time"
    );

    let mouseX = 0.5;
    let mouseY = 0.5;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth;
      mouseY = 1.0 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Redimensionnement
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform2f(
        resolution,
        canvas.width,
        canvas.height
      );
    };

    resize();

    window.addEventListener("resize", resize);

    // Animation
    let animationFrame = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      gl.uniform1f(time, elapsed);

      gl.uniform2f(
        mouse,
        mouseX,
        mouseY
      );

      gl.drawArrays(
        gl.TRIANGLE_STRIP,
        0,
        4
      );

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}