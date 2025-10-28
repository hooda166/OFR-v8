import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Points, PointMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface Connection {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  speed: number;
  opacity: number;
  color: THREE.Color;
}

const GlobeObject: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const connectionsRef = useRef<Connection[]>([]);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create points for stars
  const starPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      points.push(x, y, z);
    }
    return new Float32Array(points);
  }, []);

  // Create base globe geometry with higher detail
  const globeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(1, 96, 96);
  }, []);

  // Create materials
  const globeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x3b82f6) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity * 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Generate random point on sphere surface
  const getRandomPoint = () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Create curved path between two points with dynamic height
  const createCurvedPath = (start: THREE.Vector3, end: THREE.Vector3) => {
    const points = [];
    const segments = 64;
    const midHeight = 0.3 + Math.random() * 0.3;
    const midPoint = start.clone().add(end).multiplyScalar(0.5);
    midPoint.normalize().multiplyScalar(1 + midHeight);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = new THREE.Vector3();
      
      // Use quadratic bezier curve for smoother arcs
      const t1 = 1 - t;
      point.x = t1 * t1 * start.x + 2 * t1 * t * midPoint.x + t * t * end.x;
      point.y = t1 * t1 * start.y + 2 * t1 * t * midPoint.y + t * t * end.y;
      point.z = t1 * t1 * start.z + 2 * t1 * t * midPoint.z + t * t * end.z;
      point.normalize();
      points.push(point);
    }

    return points;
  };

  // Add new connection with random color
  const addConnection = () => {
    const colors = [
      new THREE.Color(0x60a5fa), // Blue
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xa78bfa), // Violet
      new THREE.Color(0xffffff)  // White
    ];
    
    const start = getRandomPoint();
    const end = getRandomPoint();
    const connection: Connection = {
      start,
      end,
      progress: 0,
      speed: 0.003 + Math.random() * 0.005,
      opacity: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    connectionsRef.current.push(connection);
  };

  // Animation loop
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0005;
      (globeRef.current.material as THREE.ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
    }

    // Update connections
    connectionsRef.current.forEach((connection, index) => {
      // Fade in
      if (connection.progress < 0.2) {
        connection.opacity = connection.progress * 5;
      }
      // Fade out
      else if (connection.progress > 0.8) {
        connection.opacity = (1 - connection.progress) * 5;
      }
      // Full opacity
      else {
        connection.opacity = 1;
      }

      connection.progress += connection.speed;
      if (connection.progress >= 1) {
        connectionsRef.current.splice(index, 1);
      }
    });

    // Add new connection randomly
    if (Math.random() < 0.03 && connectionsRef.current.length < 15) {
      addConnection();
    }

    // Animate stars
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  // Create stars geometry
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(starPoints, 3));
    return geometry;
  }, [starPoints]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {/* Background stars */}
      <Points ref={pointsRef} geometry={starsGeometry}>
        <PointMaterial
          transparent
          size={0.005}
          sizeAttenuation={true}
          color={0xffffff}
          opacity={0.8}
          fog={false}
        />
      </Points>

      {/* Globe */}
      <mesh ref={globeRef} geometry={globeGeometry} material={globeMaterial} />
      
      {/* Connections */}
      {connectionsRef.current.map((connection, index) => {
        const points = createCurvedPath(connection.start, connection.end);
        return (
          <Line
            key={index}
            points={points}
            color={connection.color}
            lineWidth={2}
            opacity={connection.opacity}
            transparent
            vertexColors={false}
            blending={THREE.AdditiveBlending}
          />
        );
      })}
    </>
  );
};

const Globe: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-90">
      <div className="relative w-full h-[60vh] mx-auto">
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <GlobeObject />
        </Canvas>
      </div>
    </div>
  );
};

export default Globe;