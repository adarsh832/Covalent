import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full covalent-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Covalent
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Connecting businesses across industries to foster collaboration, innovation, and mutual growth. Stronger together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-projects" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Find Projects
                </Link>
              </li>
              <li>
                <Link to="/post-project" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Post Project
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Covalent. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/60">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

