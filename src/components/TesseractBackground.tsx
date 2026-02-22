import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ThreeLine = THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;

// Add type declarations for window.THREE
// @ts-ignore
window.THREE = THREE;

export const TesseractBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Set renderer size and append to DOM
    const updateRendererSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    updateRendererSize();
    
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '-1';
    mountRef.current.appendChild(renderer.domElement);

    // Vibrant colors for edges and vertices
    const colors = [
      0x3b82f6, // blue-500
      0x4f46e5, // indigo-600
      0x6366f1, // indigo-500
      0x818cf8, // indigo-400
      0x60a5fa, // blue-400
      0x8b5cf6, // violet-500
      0xa78bfa, // violet-400
      0xc4b5fd, // violet-300
      0x8b5cf6, // violet-500
      0x7c3aed, // violet-600
    ].map(color => new THREE.Color(color));
    
    // Create a material for the vertices (dots)
    const vertexGeometry = new THREE.SphereGeometry(0.05, 16, 16);

    // Create tesseract (4D cube) edges and vertices
    const edges: ThreeLine[] = [];
    const points: THREE.Vector3[] = [];
    const vertices: THREE.Mesh[] = [];
    const w = 1.2; // Slightly larger tesseract
    
    // Generate vertices of a tesseract and create vertex dots
    for (let i = 0; i < 16; i++) {
      const x = (i & 1 ? -1 : 1) * w;
      const y = (i & 2 ? -1 : 1) * w;
      const z = (i & 4 ? -1 : 1) * w;
      
      const vertexPos = new THREE.Vector3(x, y, z);
      points.push(vertexPos);
      
      // Create a sphere for each vertex
      const vertexMaterial = new THREE.MeshBasicMaterial({ 
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.9
      });
      const vertex = new THREE.Mesh(vertexGeometry, vertexMaterial);
      vertex.position.copy(vertexPos);
      scene.add(vertex);
      vertices.push(vertex);
    }

    // Connect the vertices
    // Create edges with gradient colors
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        // Check if the points differ by exactly one bit (connected in 4D)
        if ((i ^ j) === 1 || (i ^ j) === 2 || (i ^ j) === 4 || (i ^ j) === 8) {
          // Create a gradient material for the edge
          const edgeColor = colors[Math.floor(Math.random() * colors.length)];
          const material = new THREE.LineBasicMaterial({
            color: edgeColor,
            transparent: true,
            opacity: 0.8,
            linewidth: 1.5
          });
          
          // Create the edge line
          const geometry = new THREE.BufferGeometry().setFromPoints([
            points[i],
            points[j]
          ]);
          
          const line = new THREE.Line(geometry, material);
          edges.push(line);
          
          // Add a small sphere at the midpoint of the edge
          const midPoint = new THREE.Vector3().addVectors(points[i], points[j]).multiplyScalar(0.5);
          const midSphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.03, 8, 8),
            new THREE.MeshBasicMaterial({ 
              color: edgeColor,
              transparent: true,
              opacity: 0.9
            })
          );
          midSphere.position.copy(midPoint);
          scene.add(midSphere);
        }
      }
    }

    // Add all edges to the scene
    edges.forEach(edge => scene.add(edge));

    // Position camera
    camera.position.z = 3; // Move camera closer for larger appearance

    // Animation variables
    let angle = 0;
    const radius = 5;
    let frameId: number;
    
    // Add ambient light to make the tesseract more visible
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    
    // Add directional light for better depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate the tesseract
      angle += 0.005;
      
      // Make sure the scene is visible
      if (scene && camera && renderer) {
      // Animate edges
      edges.forEach((edge, i) => {
        edge.rotation.x = angle * 0.5;
        edge.rotation.y = angle * 0.3;
        edge.rotation.z = angle * 0.7;
        
        // Pulsing effect with color variation
        const scale = 1 + Math.sin(angle * 2 + i * 0.1) * 0.1;
        edge.scale.set(scale, scale, scale);
        
        // Slight color variation over time
        if (Math.random() > 0.95) {
          const material = edge.material as THREE.LineBasicMaterial;
          material.color.offsetHSL(0.01, 0, 0);
        }
      });
      
      // Animate vertices
      vertices.forEach((vertex, i) => {
        vertex.rotation.x = angle * 0.2;
        vertex.rotation.y = angle * 0.3;
        
        // Gentle pulsing for vertices
        const scale = 1 + Math.sin(angle * 3 + i) * 0.1;
        vertex.scale.set(scale, scale, scale);
      });

      // Move camera in a circle
      camera.position.x = Math.sin(angle * 0.3) * radius;
      camera.position.z = Math.cos(angle * 0.2) * radius + 5;
      camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Properly dispose of all objects
      edges.forEach(edge => {
        if (edge.geometry) edge.geometry.dispose();
        if (edge.material) {
          if (Array.isArray(edge.material)) {
            edge.material.forEach(m => m.dispose());
          } else {
            edge.material.dispose();
          }
        }
      });
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10" 
      style={{ 
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: 0.5
      }} 
    />
  );
};
