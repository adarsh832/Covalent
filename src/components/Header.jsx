import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 align-middle">
            <img src="/logo.png" alt="Covalent Logo" className="w-12 h-12 rounded-full object-cover" />
            <span className="text-2xl font-bold text-primary flex items-center" style={{ fontFamily: 'Playfair Display, serif' }}>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-9 h-9 border-2 border-secondary hover:opacity-80 transition cursor-pointer">
                    {userProfile?.profileImage ? (
                      <AvatarImage src={userProfile.profileImage} alt={userProfile.fullName || 'User'} />
                    ) : (
                      <AvatarFallback>{userProfile?.fullName ? userProfile.fullName[0] : 'U'}</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/manage-projects" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Manage Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-foreground hover:text-secondary transition-colors duration-200 py-2 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

