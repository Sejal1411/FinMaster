"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {

  const imageRef = useRef();

   useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;

        if(scrollPosition > scrollThreshold) {
            imageElement.classList.add("scrolled");
        } else {
            imageElement.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
   }, []);


  return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 font-sans font-semibold bg-gradient-to-r from-white via-[#fc03ba] to-pink-800 bg-clip-text text-transparent">
              Manage Your Finances <br /> with Intelligence
            </h1>
            <p className="text-xl mb-8 max-w-60px mx-auto text-white">
                An AI-powered financial management platform that helps you track,
                analyze, and optimize your spending with real-time insights.
            </p>

            <div className="flex justify-center space-x-4">
                <Link href="/dashboard">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="https://www.youtube.com/watch?v=egS6fnZAdzk&list=WL&index=5">
                  <Button size="lg" 
                   variant="outline" 
                   className="bg-gradient-to-r from-purple-800 to-[#fc03ba] text-white hover:text-white hover:from-[#fc03ba] hover:to-purple-800 border-0 shadow-lg">
                    Watch Demo
                  </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper">
                <div ref={imageRef} className="hero-image">
                    <Image 
                      src='/banner.jpg' 
                      width={1280}
                      height={500}
                      alt="Dashboard Image"
                      className="rounded-lg shadow-2xl mx-auto"
                      priority
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection;
