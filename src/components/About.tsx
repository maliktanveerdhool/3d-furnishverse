
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
              alt="About Mint Furniture" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-4">About Mint Furniture</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2010, Mint Furniture has been bringing stylish, sustainable, and 
              affordable furniture to homes across the country. Our design philosophy 
              centers around simplicity, functionality, and quality craftsmanship.
            </p>
            <p className="text-gray-600 mb-6">
              Every piece in our collection is thoughtfully designed and built to last. 
              We work with skilled artisans who share our passion for beautiful, 
              well-made furniture.
            </p>
            <Button>Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
