
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Stage, useGLTF } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Cube } from "lucide-react";

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const groupRef = useRef(null);
  
  // We'll use a placeholder model for now since we don't have real models
  // In a real implementation, you would use the modelPath to load actual GLTF files
  const mesh = useRef(null);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={mesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f2f2f2" />
      </mesh>
    </group>
  );
}

// For actual GLTF models, you would use:
// function Model({ modelPath }: ModelProps) {
//   const { scene } = useGLTF(modelPath);
//   return <primitive object={scene} />;
// }

interface ThreeDViewerProps {
  modelPath?: string;
}

const ThreeDViewer = ({ modelPath = "/models/furniture.glb" }: ThreeDViewerProps) => {
  const [isModelView, setIsModelView] = useState(false);

  return (
    <div className="relative">
      {isModelView ? (
        <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5}>
                <Model modelPath={modelPath} />
              </Stage>
              <OrbitControls autoRotate={false} />
            </Suspense>
          </Canvas>
          <Button 
            className="absolute bottom-4 right-4 z-10"
            onClick={() => setIsModelView(false)}
          >
            Show Image
          </Button>
        </div>
      ) : (
        <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src="/placeholder.svg" 
            alt="Product" 
            className="w-full h-full object-cover"
          />
          <Button 
            className="absolute bottom-4 right-4"
            onClick={() => setIsModelView(true)}
          >
            <Cube className="mr-2 h-4 w-4" />
            View in 3D
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThreeDViewer;
