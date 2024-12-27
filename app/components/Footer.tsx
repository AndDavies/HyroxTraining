// app/components/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-yellow-400 text-black py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left: Logo + Rights */}
          <div className="mb-6 md:mb-0 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <img
                src="/logo/peak_logo_black.png"
                alt="Peak Metrix"
                className="h-6 w-auto object-contain"
              />
              <span className="font-bold text-lg tracking-tight">Hyrox Training Hub</span>
            </div>
            <p className="text-sm">
              © 2024 Peak Metrix. All rights reserved.
            </p>
          </div>
  
          {/* Middle: Quick Links */}
          <div className="flex space-x-10 md:mr-10">
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-1">
                <li>
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="space-y-1">
                <li>
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:underline">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Right: Socials / CTA */}
          <div className="flex flex-col space-y-3 md:items-end md:space-y-2">
            <h4 className="font-semibold">Follow us</h4>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="hover:underline">
                Facebook
              </a>
              <a href="https://x.com" className="hover:underline">
                X
              </a>
              <a href="https://linkedin.com" className="hover:underline">
                LinkedIn
              </a>
            </div>
            <hr className="w-full border-black/20 my-2 md:hidden" />
            <a
              href="/signup"
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-black/80 transition self-start md:self-end"
            >
              Sign Up
            </a>
          </div>
        </div>
      </footer>
    );
  }
  