"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserButton, useUser } from "@clerk/nextjs";

const courses = [
  {
    id: 1,
    name: "HTML",
    desc: "Learn the fundamentals of HTML and build the structure of modern web pages.",
    path: "/course/1/detail",
  },
  {
    id: 2,
    name: "CSS",
    desc: "Master CSS to style and design responsive, visually appealing web layouts.",
    path: "/course/2/detail",
  },
  {
    id: 3,
    name: "React",
    desc: "Build dynamic and interactive web applications using the React JavaScript library.",
    path: "/course/3/detail",
  },
  {
    id: 4,
    name: "React Advanced",
    desc: "Deep dive into advanced React concepts including hooks, state management, performance optimization, and architectural patterns.",
    path: "/course/4/detail",
  },
  {
    id: 5,
    name: "Python",
    desc: "Learn Python programming from basics to intermediate level, covering logic building, functions, and real-world applications.",
    path: "/course/5/detail",
  },
  {
    id: 6,
    name: "Python Advanced",
    desc: "Master advanced Python concepts such as OOP, modules, APIs, data processing, and automation.",
    path: "/course/6/detail",
  },
  {
    id: 7,
    name: "Generative AI",
    desc: "Explore prompt engineering, LLMs, embeddings, image generation, and build GenAI-powered applications.",
    path: "/course/7/detail",
  },
  {
    id: 8,
    name: "Machine Learning",
    desc: "Understand ML concepts, algorithms, data preprocessing, model training, evaluation, and deployment.",
    path: "/course/8/detail",
  },
  {
    id: 9,
    name: "JavaScript",
    desc: "Learn core JavaScript concepts, asynchronous programming, DOM manipulation, and modern ES6+ features.",
    path: "/course/9/detail",
  },
];

function Header() {
    const{user}=useUser();
    console.log(user);
  return (
    <header className="relative z-50 w-full p-4 border-b backdrop-blur-sm bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <Image src="/smile.png" alt="Logo" width={50} height={50} />
          <h2 className="text-4xl font-pixelify-sans tracking-wide text-white">
            CodeSandBox
          </h2>
        </div>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {/* Courses Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white">
                View Courses
              </NavigationMenuTrigger>

              <NavigationMenuContent className="p-4">
                <ul className="grid md:grid-cols-2 gap-3 w-[520px]">
                  {courses.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={course.path}
                        className="block border p-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
                      >
                        <h3 className="font-medium">{course.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {course.desc}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Static Menu Items */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/projects" className="text-white">
                  Projects
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing" className="text-white">
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="text-white">
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Button */}
       
        {!user?<Link href="/sign-up"><Button variant="pixel" className="cursor-pointer">
          Sign Up
        </Button>
        </Link>
        :(
            <div className="flex items-center gap-6">
                <Link href="/dashboard">
                <Button variant="pixel" className="cursor-pointer">
                    Dashboard
                </Button>
                </Link>
                <UserButton />
            </div>
        )}
        
        
      </div>
    </header>
  );
}

export default Header;
