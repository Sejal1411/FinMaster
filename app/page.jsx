import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData } from "@/data/landing";
import Link from "next/link";


export default function Home() {
  return (
    <div className="mt-15 min-h-screen bg-gradient-to-br from-[#080b4b] via-purple-500 to-purple-100 text-white">
  <HeroSection />

  <section className="py-20 bg-purple-900/60">
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
        Everything you need to manage your finances in one place
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <Card key={index} className="p-10 bg-purple-900/60 backdrop-blur-lg rounded-xl shadow-2xl shadow-pink-500/30">
            <CardContent className="space-y-4 pt-2">
              {feature.icon}
              <h3 className="text-xl text-white font-semibold">{feature.title}</h3>
              <p className="text-purple-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>

  <section className="py-10">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {howItWorksData.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
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
