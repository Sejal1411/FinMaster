import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full bg- backdrop-blur-md z-50 border-b border-white/10">
  <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
    <Link href="/">
      {/* <Image
        src={"/logo.png"}
        alt="fin logo"
        height={100}
        width={100}
        className="h-20 w-auto object-contain rounded-full"
      /> */}
    </Link>

    <div className="flex items-center space-x-4">
      <SignedIn>
        <Link
          href="/dashboard"
          className="text-white flex items-center gap-2"
        >
          <Button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-l from-purple-800 to-[#fc03ba] animate-gradient rounded-md w-full h-full">
            <span className="hidden md:inline">Dashboard</span>
          </Button>
        </Link>

        <Link href="/transaction/create">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-800 to-[#fc03ba] animate-gradient text-white">
            <span className="hidden md:inline">Add Transaction</span>
          </Button>
        </Link>
      </SignedIn>

      <SignedOut>
        <SignInButton forceRedirectUrl="/dashboard">
          <Button variant="outline" className="border-white/20 text-white hover:border-purple-400">
            Login
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton appearance={{
          elements: {
            avatarBox: "w-10 h-10",
          },
        }} />
      </SignedIn>
    </div>
  </nav>
</div>

  );
};

export default Header;