import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userProfile } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full covalent-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
              Covalent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentUser && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-foreground hover:text-secondary transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/manage-projects" 
                  className="text-foreground hover:text-secondary transition-colors duration-200"
                >
                  Manage Projects
                </Link>
              </>
            )}
            <Link 
              to="/find-projects" 
              className="text-foreground hover:text-secondary transition-colors duration-200"
            >
              Find Projects
            </Link>
            <Link 
              to="/post-project" 
              className="text-foreground hover:text-secondary transition-colors duration-200"
            >
              Post Project
            </Link>
            {!currentUser && (
              <>
                <Link 
                  to="/how-it-works" 
                  className="text-foreground hover:text-secondary transition-colors duration-200"
                >
                  How It Works
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-foreground hover:text-secondary transition-colors duration-200"
                >
                  Pricing
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth/User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!currentUser ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild className="covalent-gradient text-white hover:opacity-90">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <Link to="/dashboard">
                <Avatar className="w-9 h-9 border-2 border-secondary hover:opacity-80 transition">
                  {userProfile?.profileImage ? (
                    <AvatarImage src={userProfile.profileImage} alt={userProfile.fullName || 'User'} />
                  ) : (
                    <AvatarFallback>{userProfile?.fullName ? userProfile.fullName[0] : 'U'}</AvatarFallback>
                  )}
                </Avatar>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/find-projects" 
                className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Projects
              </Link>
              <Link 
                to="/post-project" 
                className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Project
              </Link>
              {currentUser && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/manage-projects" 
                    className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Projects
                  </Link>
                </>
              )}
              {!currentUser && (
                <>
                  <Link 
                    to="/how-it-works" 
                    className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-foreground hover:text-secondary transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {currentUser && (
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Avatar className="w-7 h-7 border-2 border-secondary">
                    {userProfile?.profileImage ? (
                      <AvatarImage src={userProfile.profileImage} alt={userProfile.fullName || 'User'} />
                    ) : (
                      <AvatarFallback>{userProfile?.fullName ? userProfile.fullName[0] : 'U'}</AvatarFallback>
                    )}
                  </Avatar>
                  Profile
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

