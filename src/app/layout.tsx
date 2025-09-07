import type { Metadata } from "next";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "Kids Adventure Game",
  description: "Interactive choice-based adventure stories for kindergarteners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-home-pattern">
        <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg relative overflow-hidden">
          {/* Fun background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-2 left-4 text-2xl animate-pulse-slow">⭐</div>
            <div className="absolute top-4 right-8 text-2xl animate-pulse-slow delay-1000">🎈</div>
            <div className="absolute bottom-2 left-1/4 text-2xl animate-pulse-slow delay-500">🌟</div>
            <div className="absolute bottom-4 right-1/4 text-2xl animate-pulse-slow delay-1500">🎨</div>
          </div>
          
          <div className="max-w-6xl mx-auto flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-bounceIn">🚀</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight animate-slideUp">
                  Kids Adventure Game
                </h1>
                <p className="text-lg opacity-90 animate-slideUp delay-200">
                  Choose your own magical story! ✨
                </p>
              </div>
            </div>
            
            <NavigationMenu className="hidden sm:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/"
                    className="btn-fun text-primary-foreground hover:text-primary-foreground/80 font-bold px-6 py-3 rounded-full hover:bg-primary-foreground/10 transition-colors text-lg flex items-center gap-2"
                  >
                    <span className="text-xl">🏠</span>
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
        
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
