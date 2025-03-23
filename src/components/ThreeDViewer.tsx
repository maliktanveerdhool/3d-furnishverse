
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Environment, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Box, Rotate3D, MousePointer } from "lucide-react";
import * as THREE from "three";
import { toast } from "sonner";

interface ImageModelProps {
  productImage: string;
}

function ImageModel({ productImage }: ImageModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Load the image as a texture
  const texture = useTexture(productImage);
  
  useEffect(() => {
    if (texture) {
      // Adjust texture properties for better display
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
    }
  }, [texture]);
  
  // Rotate the model slightly to look more 3D
  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[3, 2.25]} /> {/* Increased size for better visibility */}
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide} 
        transparent={true} 
        metalness={0.1}
        roughness={0.5}
      />
    </mesh>
  );
}

// Create a separate component to handle drag state
function DragStateManager({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);
  const { gl } = useThree();
  
  useEffect(() => {
    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    
    const domElement = gl.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointerleave', handlePointerUp);
    
    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [gl]);
  
  return (
    <>
      {children}
      {!isDragging && (
        <Html position={[-1.3, 1.3, 0]}>
          <div className="bg-white/70 backdrop-blur-sm p-2 rounded-md flex items-center whitespace-nowrap">
            <span className="text-xs font-medium">Drag to rotate, scroll to zoom</span>
          </div>
        </Html>
      )}
    </>
  );
}

// Add Html component from drei to show overlay in 3D space
import { Html } from "@react-three/drei";

interface ThreeDViewerProps {
  productImage: string;
  category: string;
}

const ThreeDViewer = ({ productImage, category }: ThreeDViewerProps) => {
  const [isModelView, setIsModelView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [isModelView]);

  const handleModelView = () => {
    setIsModelView(true);
    setIsLoading(true);
    toast.info("3D View Enabled", {
      description: "Drag to rotate, scroll to zoom the product"
    });
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isModelView ? (
        <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
              <Rotate3D className="h-10 w-10 animate-spin text-gray-400 mb-3" />
              <p className="text-gray-500 animate-pulse">Loading 3D view...</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Canvas 
                dpr={[1, 2]} 
                camera={{ fov: 45, position: [0, 0, 4] }}
              >
                <color attach="background" args={["#f8f9fa"]} />
                <Suspense fallback={null}>
                  <ambientLight intensity={1.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <DragStateManager>
                    <PresentationControls
                      global
                      zoom={1.0}
                      rotation={[0, 0, 0]}
                      polar={[-Math.PI / 3, Math.PI / 3]}
                      azimuth={[-Math.PI / 3, Math.PI / 3]}
                      config={{ mass: 1, tension: 170, friction: 26 }}
                      snap={{ mass: 4, tension: 400, friction: 40 }}
                    >
                      <ImageModel productImage={productImage} />
                    </PresentationControls>
                  </DragStateManager>
                  <OrbitControls
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI - Math.PI / 4}
                    makeDefault
                  />
                  <Environment preset="sunset" />
                </Suspense>
              </Canvas>
            </div>
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
            className="w-full h-full object-contain" 
          />
          <Button 
            className="absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100"
            onClick={handleModelView}
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
