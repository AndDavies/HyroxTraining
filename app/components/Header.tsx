// app/components/Header.tsx
// (No "use client" because we want it rendered on the server for SEO)

export default function Header() {
    return (
      <header className="bg-black text-white shadow-md">
        {/* A container for your logo & nav items */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            {/* Replace with your actual logo/image if desired */}
            <img
              src="/logo/peak_logo_white.png"
              alt="Peak Metrix"
              className="h-6 w-auto object-contain"
            />
            <span className="font-bold text-lg tracking-tight">Hyrox Training Hub</span>
          </div>
  
          {/* Right: Nav Items */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="/about" className="hover:text-gray-300 transition">
              About Us
            </a>
            
            <a href="/contact" className="hover:text-gray-300 transition">
              Contact Us
            </a>
            {/* CTA Button */}
            <a
              href="/signup"
              className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-black transition"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>
    );
  }
  