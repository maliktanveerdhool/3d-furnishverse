
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Environment, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Box, Rotate3D } from "lucide-react";
import * as THREE from "three";

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
  
  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 1.5]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} />
    </mesh>
  );
}

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
            <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 3] }}>
              <color attach="background" args={["#f8f9fa"]} />
              <Suspense fallback={null}>
                <ambientLight intensity={1.0} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <PresentationControls
                  global
                  zoom={0.8}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}>
                  <ImageModel productImage={productImage} />
                </PresentationControls>
                <Environment preset="city" />
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
