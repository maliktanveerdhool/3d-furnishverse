
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Stage, useGLTF, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Box, Rotate3D } from "lucide-react";

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const groupRef = useRef(null);
  
  // For demonstration, we'll use a simple box model with a more furniture-like appearance
  const mesh = useRef(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#d4a76a" />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh position={[-0.65, -0.7, 0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[0.65, -0.7, 0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[-0.65, -0.7, -0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[0.65, -0.7, -0.4]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
    </group>
  );
}

interface ThreeDViewerProps {
  modelPath?: string;
  productImage: string;
}

const ThreeDViewer = ({ modelPath = "/models/furniture.glb", productImage }: ThreeDViewerProps) => {
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
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 1, 5] }}>
              <color attach="background" args={["#f8f9fa"]} />
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Model modelPath={modelPath} />
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
