import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useGameData } from '../context/GameDataContext';
import { 
  Gamepad2, Wallet, Store, Twitter, User, Menu, X, ChevronDown,
  Shield, Award, LogOut, CircleDollarSign
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWallet();
  const { sonicPoints } = useGameData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsDropdownOpen(false);
    closeMenu();
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Shield className="w-5 h-5" /> },
    { path: '/deck-builder', label: 'Deck Builder', icon: <Award className="w-5 h-5" /> },
    { path: '/battle-arena', label: 'Battle Arena', icon: <Gamepad2 className="w-5 h-5" /> },
    { path: '/marketplace', label: 'Marketplace', icon: <Store className="w-5 h-5" /> },
    { path: '/shill-dashboard', label: 'Shill to Earn', icon: <Twitter className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-bg-dark border-b-2 border-neon-blue sticky top-0 z-50 crt-flicker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-neon-pink" />
                <span className="ml-2 text-xl font-pixel text-white retro-text hidden sm:block">
                  RetroCard Clash
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 text-sm font-pixel ${
                    location.pathname === link.path
                      ? 'text-neon-pink border-b-2 border-neon-pink'
                      : 'text-white hover:text-neon-blue'
                  }`}
                >
                  {link.icon}
                  <span className="ml-1">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Sonic Points */}
            {isConnected && (
              <div className="hidden md:flex items-center mr-4 bg-bg-card px-3 py-1 rounded border border-neon-purple">
                <CircleDollarSign className="h-4 w-4 text-neon-yellow mr-1" />
                <span className="text-xs font-pixel text-neon-yellow">{sonicPoints} Points</span>
              </div>
            )}
            
            {/* Wallet Connection */}
            {isConnected ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-3 py-2 bg-bg-card rounded-md border border-neon-blue hover:bg-bg-card-hover transition"
                >
                  <Wallet className="h-4 w-4 text-neon-blue mr-1" />
                  <span className="text-xs font-pixel text-white hidden sm:block">{truncateAddress(address || '')}</span>
                  <span className="text-xs font-pixel text-white block sm:hidden">Wallet</span>
                  <ChevronDown className="h-3 w-3 ml-1 text-neon-blue" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-bg-card border-2 border-neon-blue rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-neon-blue">
                        <p className="text-xs font-pixel text-white">{truncateAddress(address || '')}</p>
                        <p className="text-xs font-pixel text-neon-green mt-1">{parseFloat(balance).toFixed(2)} S</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-xs font-pixel text-white hover:bg-bg-card-hover"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <button 
                        onClick={handleDisconnect}
                        className="flex items-center w-full text-left px-4 py-2 text-xs font-pixel text-white hover:bg-bg-card-hover"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-3 py-2 retro-button text-xs font-pixel"
              >
                <Wallet className="h-4 w-4 inline mr-1" />
                Connect Wallet
              </button>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-neon-blue focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neon-blue bg-bg-card">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 text-sm font-pixel ${
                  location.pathname === link.path
                    ? 'text-neon-pink border-l-4 border-neon-pink bg-bg-card-hover'
                    : 'text-white hover:text-neon-blue'
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
            
            {isConnected && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-sm font-pixel text-white hover:text-neon-blue"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span className="ml-2">Profile</span>
                </Link>
                <div className="px-3 py-2 flex items-center">
                  <CircleDollarSign className="h-5 w-5 text-neon-yellow" />
                  <span className="ml-2 text-sm font-pixel text-neon-yellow">{sonicPoints} Points</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center w-full px-3 py-2 text-sm font-pixel text-white hover:text-neon-blue"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Disconnect</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;