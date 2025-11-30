//default home page
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
   <div className="flex justify-center items-center flex-col">
    <h1  className=" font-pixelify-sans pt-6 text-center text-2xl">Welcome to the Home Page</h1>
    <span> this page is the home page</span>

    <Button className="m-4 bg-primary font-inter">Click Me</Button>
   </div>
  );
}
