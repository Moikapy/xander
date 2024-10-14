
import { Navbar, Button } from "@material-tailwind/react";

const Navigation = () => {
  return (
    <Navbar className="py-4 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-500">
          Moikas
        </a>
        <ul className="flex space-x-4">
          <li><a href="#products" className="text-lg text-gray-600">Products</a></li>
          <li><a href="#about" className="text-lg text-gray-600">About</a></li>
          <li><a href="#contact" className="text-lg text-gray-600">Contact</a></li>
          <li><a href="#blog" className="text-lg text-gray-600">Blog</a></li>
        </ul>
        <Button className="ml-auto bg-blue-500">Get Started</Button>
      </div>
    </Navbar>
  );
};

export default Navigation;
