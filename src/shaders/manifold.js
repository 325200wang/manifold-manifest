export const manifoldVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // 3D Simplex noise
  vec3 mod289_3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289_4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289_4(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise3(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289_3(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float getElevation(vec2 p, float t) {
    // River-like flow: long wavelengths in one direction (flow), shorter perpendicular (banks)
    vec2 flowFreq = vec2(0.12, 0.35);
    vec2 bankFreq = vec2(0.35, 0.9);

    float n1 = snoise3(vec3(p * flowFreq, t * 0.03)) * 2.0;  // main river channels
    float n2 = snoise3(vec3(p * bankFreq + vec2(50.0, 100.0), t * 0.05)) * 0.5;  // bank detail
    return n1 + n2;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uTime;
    float elev = getElevation(pos.xy, t);

    // Mouse influence - gentle ripple
    float distToMouse = distance(pos.xy, uMouse);
    float mouseEffect = smoothstep(4.0, 0.0, distToMouse) * uMouseInfluence;
    elev += mouseEffect * 0.4 * sin(t * 2.0 + distToMouse);

    pos.z += elev;
    vElevation = elev;

    // Compute normal from height field
    float eps = 0.05;
    float dx = getElevation(pos.xy + vec2(eps, 0.0), t) - getElevation(pos.xy - vec2(eps, 0.0), t);
    float dy = getElevation(pos.xy + vec2(0.0, eps), t) - getElevation(pos.xy - vec2(0.0, eps), t);
    vec3 normal = normalize(vec3(-dx / (2.0 * eps), -dy / (2.0 * eps), 1.0));
    vNormal = normalMatrix * normal;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const manifoldFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorDeep;
  uniform vec3 uColorSurface;
  uniform vec3 uColorHighlight;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // Normalize elevation
    float e = (vElevation + 2.0) * 0.25;
    e = clamp(e, 0.0, 1.0);

    // Smooth breathing
    float breath = sin(uTime * 0.8) * 0.5 + 0.5;
    breath = breath * 0.15 + 0.85;

    // Base color - liquid metal gradient
    vec3 color = mix(uColorDeep, uColorSurface, e);

    // Subtle color shift at peaks - cool silver
    color = mix(color, uColorHighlight, pow(e, 3.0) * 0.5 * breath);

    // Lighting - key to liquid metal look
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Soft ambient
    vec3 ambient = color * 0.3;

    // Main light from upper-right
    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = color * diff * 0.5;

    // Specular - the metal shine
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);
    vec3 specular = uColorHighlight * spec * 0.6 * breath;

    // Rim light - edge glow for glass feel
    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
    rim = pow(rim, 3.0);
    vec3 rimLight = uColorHighlight * rim * 0.2 * breath;

    // Combine
    color = ambient + diffuse + specular + rimLight;

    // Subtle grid - like lathe marks on metal
    vec2 grid = abs(fract(vUv * 8.0) - 0.5);
    float gridLine = smoothstep(0.015, 0.0, min(grid.x, grid.y));
    color += uColorHighlight * gridLine * 0.08 * breath;

    // Edge fade
    float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float edgeFade = smoothstep(0.0, 0.25, edgeDist);

    // Soft edge glow
    color += uColorHighlight * pow(1.0 - edgeDist, 3.0) * 0.15;

    gl_FragColor = vec4(color * edgeFade, edgeFade * 0.85);
  }
`;

export const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;

  attribute float aScale;
  attribute vec3 aVelocity;
  attribute float aPhase;
  attribute float aMotionAngle;

  varying float vAlpha;
  varying float vMotionAngle;

  void main() {
    vec3 pos = position;

    // Flow along river direction (primarily x)
    float flowSpeed = length(aVelocity.xy);
    pos.x += mod(uTime * flowSpeed * 2.0 + aPhase * 3.0, 24.0) - 12.0;
    pos.y += sin(uTime * 0.1 + aPhase) * 0.5 + aVelocity.y * uTime * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * (100.0 / -mvPosition.z);

    // Gentle twinkle - some particles brighter, creating rhythm
    vAlpha = 0.15 + 0.35 * sin(uTime * 0.2 + aPhase) * sin(uTime * 0.15 + aPhase * 2.1);
    vAlpha = clamp(vAlpha, 0.0, 1.0);
    vMotionAngle = aMotionAngle;
  }
`;

export const particleFragmentShader = `
  uniform vec3 uColor;

  varying float vAlpha;
  varying float vMotionAngle;

  void main() {
    // Stretch along motion direction to create trail-like particles
    vec2 coord = gl_PointCoord - 0.5;

    // Rotate to align with motion direction
    float c = cos(vMotionAngle);
    float s = sin(vMotionAngle);
    mat2 rot = mat2(c, -s, s, c);
    coord = rot * coord;

    // Stretch along x (motion direction)
    coord.x *= 3.0;

    float dist = length(coord);
    if (dist > 0.5) discard;

    // Soft falloff - more elongated due to stretch
    float alpha = exp(-dist * dist * 6.0) * vAlpha;

    // Subtle silver glow
    vec3 glow = uColor * (0.6 + exp(-dist * dist * 10.0) * 0.5);

    gl_FragColor = vec4(glow, alpha * 0.7);
  }
`;
