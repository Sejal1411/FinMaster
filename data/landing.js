import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
  } from "lucide-react";
  
  // Stats Data
  export const statsData = [
    {
      value: "50K+",
      label: "Active Users",
    },
    {
      value: "$2B+",
      label: "Transactions Tracked",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
    {
      value: "4.9/5",
      label: "User Rating",
    },
  ];
  
  // Features Data
  export const featuresData = [
    {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
        <BarChart3 className="h-8 w-8 text-blue-600" />
      </div>
    ),
    title: "Advanced Analytics",
    description: "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100">
        <Receipt className="h-8 w-8 text-orange-400" />
      </div>
    ),
    title: "Smart Receipt Scanner",
    description: "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
        <PieChart className="h-8 w-8 text-red-600" />
      </div>
    ),
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
        <CreditCard className="h-8 w-8 text-green-500" />
      </div>
    ),
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100">
        <Globe className="h-8 w-8 text-pink-600" />
      </div>
    ),
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
        <Zap className="h-8 w-8 text-blue-600" />
      </div>
    ),
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
  ];
  
  // How It Works Data
  export const howItWorksData = [
    {
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
          <CreditCard className="h-8 w-8 text-green-500" />
        </div>
      ),
      title: "1. Create Your Account",
      description:
        "Get started in minutes with our simple and secure sign-up process",
    },
    {
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
          <BarChart3 className="h-8 w-8 text-blue-600 " />
        </div>
    ),
      title: "2. Track Your Spending",
      description:
        "Automatically categorize and track your transactions in real-time",
    },
    {
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100">
          <PieChart className="h-8 w-8 text-red-600" />
        </div>
      ),
      title: "3. Get Insights",
      description:
        "Receive AI-powered insights and recommendations to optimize your finances",
    },
  ];
  
  // Testimonials Data
  export const testimonialsData = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      quote:
        "Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      image: "https://randomuser.me/api/portraits/women/74.jpg",
      quote:
        "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
    },
  ];