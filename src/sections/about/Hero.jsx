import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export const CameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.zoomSpeed = 0.6;
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 0.4;
    controls.minDistance = 2; // Prevent zooming too close
    controls.maxDistance = 10; // Prevent zooming too far

    controlsRef.current = controls;
    
    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => controlsRef.current?.update());

  return null;
};

function Model({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  
  // Traverse and enhance all materials in the model
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Enhance material properties
        child.material = child.material.clone();
        child.material.envMapIntensity = 0.5;
        child.material.needsUpdate = true;
        
        // Standardize materials for consistent appearance
        if (!child.material.emissive) {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0.1;
        }
        
        // Increase specular highlights
        child.material.shininess = 30;
        child.material.roughness = 0.5;
        child.material.metalness = 0.1;
      }
    });
  }, [gltf]);


  const modelRef = useRef();
  const { mouse } = useThree();
  
  useFrame(() => {
    if (modelRef.current) {
      // Create a vector from mouse position (normalized to -1 to 1 range)
      const target = new THREE.Vector3(mouse.x *.3,mouse.y *.2,.5);
      
      // Make model look at this point
      modelRef.current.lookAt(target);
      
      // Optional: Only rotate around Y axis (left/right) if you don't want vertical movement
      // modelRef.current.rotation.x = 0;
      // modelRef.current.rotation.z = 0;
    }
  });



  return <primitive object={gltf.scene} ref={modelRef} />;
}

const Hero = () => {
  const modelPath = '/3dmodel/Digitcots_3d.gltf';
  
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 10 }}
      style={{ width: '100%', height: '100vh', background: '#171717' }}
      shadows
    >
      {/* Improved lighting setup */}
      <color attach="background" args={['#171717']} />
      
      <ambientLight intensity={1.2} color="#FFA500" />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={.8}
        color="#FFA500"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.4}
        color="#fffff"
      />
      
      <pointLight
        position={[0, 3, 0]}
        intensity={0.5}
        color="#ffffff"
        distance={10}
        decay={1}
      />
      
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
        {/* <CameraControls /> */}
      </Suspense>
    </Canvas>
  );
};

export default Hero;


