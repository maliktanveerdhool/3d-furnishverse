
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls, useGLTF, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Box, Rotate3D } from "lucide-react";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  category: string;
}

function Model({ modelPath, category }: ModelProps) {
  const groupRef = useRef(null);
  
  // Based on product category, render appropriate 3D model
  const renderFurnitureModel = () => {
    switch(category.toLowerCase()) {
      case "chairs":
        return <ChairModel />;
      case "tables":
        return <TableModel />;
      case "sofas":
        return <SofaModel />;
      default:
        return <GenericFurnitureModel />;
    }
  };
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {renderFurnitureModel()}
    </group>
  );
}

// Chair Model
function ChairModel() {
  const chairRef = useRef(null);
  
  useFrame((state) => {
    if (chairRef.current) {
      chairRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={chairRef}>
      {/* Chair seat */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#d4a76a" roughness={0.7} />
      </mesh>
      
      {/* Chair back */}
      <mesh position={[0, 1.1, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#d4a76a" roughness={0.7} />
      </mesh>
      
      {/* Chair legs */}
      <mesh position={[-0.3, 0.2, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.2, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
      <mesh position={[-0.3, 0.2, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.2, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
    </group>
  );
}

// Table Model
function TableModel() {
  const tableRef = useRef(null);
  
  useFrame((state) => {
    if (tableRef.current) {
      tableRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={tableRef}>
      {/* Table top */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#d4a76a" roughness={0.6} />
      </mesh>
      
      {/* Table legs */}
      <mesh position={[-0.65, 0, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.2} />
      </mesh>
      <mesh position={[0.65, 0, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.2} />
      </mesh>
      <mesh position={[-0.65, 0, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.2} />
      </mesh>
      <mesh position={[0.65, 0, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.2} />
      </mesh>
    </group>
  );
}

// Sofa Model
function SofaModel() {
  const sofaRef = useRef(null);
  
  useFrame((state) => {
    if (sofaRef.current) {
      sofaRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={sofaRef}>
      {/* Sofa base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.6, 0.8]} />
        <meshStandardMaterial color="#5d8aa8" roughness={0.8} />
      </mesh>
      
      {/* Sofa back */}
      <mesh position={[0, 0.7, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.8, 0.1]} />
        <meshStandardMaterial color="#5d8aa8" roughness={0.8} />
      </mesh>
      
      {/* Sofa arms */}
      <mesh position={[-0.95, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.6, 0.7]} />
        <meshStandardMaterial color="#5d8aa8" roughness={0.8} />
      </mesh>
      <mesh position={[0.95, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.6, 0.7]} />
        <meshStandardMaterial color="#5d8aa8" roughness={0.8} />
      </mesh>
      
      {/* Sofa cushions */}
      <mesh position={[-0.5, 0.65, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color="#4a6f8a" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.65, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color="#4a6f8a" roughness={0.9} />
      </mesh>
      
      {/* Sofa legs */}
      <mesh position={[-0.8, 0, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#3b3b3b" metalness={0.5} />
      </mesh>
      <mesh position={[0.8, 0, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#3b3b3b" metalness={0.5} />
      </mesh>
      <mesh position={[-0.8, 0, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#3b3b3b" metalness={0.5} />
      </mesh>
      <mesh position={[0.8, 0, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#3b3b3b" metalness={0.5} />
      </mesh>
    </group>
  );
}

// Generic Furniture Model for other categories
function GenericFurnitureModel() {
  const meshRef = useRef(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#d4a76a" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#a67c52" roughness={0.7} />
      </mesh>
      <mesh position={[-0.65, -0.7, 0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
      <mesh position={[0.65, -0.7, 0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
      <mesh position={[-0.65, -0.7, -0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
      <mesh position={[0.65, -0.7, -0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" metalness={0.3} />
      </mesh>
    </group>
  );
}

interface ThreeDViewerProps {
  modelPath?: string;
  productImage: string;
  category: string;
}

const ThreeDViewer = ({ modelPath = "/models/furniture.glb", productImage, category }: ThreeDViewerProps) => {
  const [isModelView, setIsModelView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isModelView ? (
        <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Rotate3D className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 0, 5] }}>
              <color attach="background" args={["#f8f9fa"]} />
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Model modelPath={modelPath} category={category} />
                <Environment preset="city" />
                <OrbitControls 
                  autoRotate={false} 
                  enableZoom={true} 
                  enablePan={true}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
          )}
          <Button 
            className="absolute bottom-4 right-4 z-10 bg-white text-black hover:bg-gray-100"
            onClick={() => setIsModelView(false)}
          >
            Show Image
          </Button>
        </div>
      ) : (
        <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={productImage} 
            alt="Product" 
            className="w-full h-full object-cover"
          />
          <Button 
            className="absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100"
            onClick={() => setIsModelView(true)}
          >
            <Box className="mr-2 h-4 w-4" />
            View in 3D
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThreeDViewer;
