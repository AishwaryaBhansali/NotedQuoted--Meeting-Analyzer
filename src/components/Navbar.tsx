
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, LogIn, UserPlus, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Placeholder for login functionality
    console.log("Login clicked - requires Supabase integration");
  };

  const handleSignup = () => {
    // Placeholder for signup functionality
    console.log("Signup clicked - requires Supabase integration");
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Meeting Analyzer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/transcriptions" 
              className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Transcriptions
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogin}
                className="text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                size="sm"
                onClick={handleSignup}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/transcriptions" 
                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Transcriptions
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="text-slate-300 hover:text-white hover:bg-slate-700 justify-start"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={handleSignup}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white justify-start"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
