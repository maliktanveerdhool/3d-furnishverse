
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Modern Furniture For Modern Living</h1>
            <p className="text-lg text-gray-600 mb-6">
              Transform your space with our carefully curated collection of contemporary furniture.
            </p>
            <div className="flex space-x-4">
              <Button>Shop Now</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/placeholder.svg" 
              alt="Modern living room furniture" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
