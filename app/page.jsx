import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData } from "@/data/landing";
import Link from "next/link";


export default function Home() {
  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-[#080b4b] via-purple-500 to-purple-100 text-white">
      
    <HeroSection />

  <section className="py-15 bg-purple-900/60 mt-15">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((statsData, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold text- mb-2">{statsData.value}</div>
            <div className="text-gray-300">{statsData.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl text-white text-center font-bold mb-16">
        Manage your finances in one place
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <Card key={index} className="p-8 bg-purple-900/60 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-purple-500 shadow-pink-500/30">
            <CardContent className="space-y-4 pt-2">
              {feature.icon}
              <h3 className="text-xl text-white font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>

  
<section className="py-12">
  <div className="max-w-screen-xl mx-auto px-4">
    <div className="flex flex-col justify-center items-center mb-12 gap-4">
      <h2 className="text-4xl font-bold text-white">
        How it works
      </h2>
      <h3 className="text-pink-100 text-lg font-semibold">
        Get started in minutes to kickstart your financial journey
      </h3>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {howItWorksData.map((step, index) => (
        <div
          key={index}
          className="bg-purple-900/50 backdrop-blur-lg text-center rounded-2xl p-6 border-2 border-purple-400 shadow-2xl shadow-pink-500/20"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-pink-400">{step.icon}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {step.title}
          </h3>
          <p className="text-gray-300 text-sm">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


  <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">
        Ready to take control of your finances?
      </h2>
      <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
        Join thousands of users already using Finmaster to manage their finances smarter.
      </p>
      <Link href="/dashboard">
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-800 to-[#fc03ba] text-white hover:from-[#fc03ba] hover:to-purple-800 rounded-full animate-bounce"
        >
          Start free trial
        </Button>
      </Link>
    </div>
  </section>
</div>
  );
}
