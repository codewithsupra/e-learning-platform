import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const image="someimagepath"; // Replace with actual image path
  return (
   <div className="flex justify-center items-center flex-col">
    <h1  className=" font-pixelify-sans pt-6 text-center text-2xl">Welcome to the Home Page</h1>

    <Button className="m-4 bg-primary font-inter">Click Me</Button>
   </div>
  );
}
