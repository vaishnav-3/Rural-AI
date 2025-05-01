'use client'

import React, { useState, useEffect } from 'react'
import { Home, Info, Award, Briefcase, Users } from 'lucide-react'
import { cn } from "../lib/utils"
import { Link } from 'react-scroll'  // Import Link from react-scroll
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
// import CustomSignInButton from './ui/custombutton'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const navItems = [
    { name: 'Home', icon: Home, href: 'Home' },
    { name: 'About Us', icon: Info, href: 'about' },
    { name: 'Why Us', icon: Award, href: 'why-us' },
    { name: 'Government Schemes', icon: Users, href: 'schemes' }
    // { name: 'Register', icon: Briefcase, href: 'readinessform' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <nav className={cn(
      "fixed w-full bg-gray-900 text-white shadow-lg transition-all duration-300 z-50",
      visible ? "top-0" : "-top-20"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center ">
            <img 
              src="/logo.png" 
              alt="Tech Star Logo" 
              className="h-26 w-40 mr-3"
            />
            {/* <span className="font-extrabold text-3xl bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 text-transparent bg-clip-text">Rural-AI</span> */}

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}  // Use 'to' from react-scroll instead of href
                smooth={true}    // Enable smooth scroll
                duration={500}   // Set scroll duration
                className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out group"
              >
                <item.icon className="mr-2" size={18} />
                <span className="relative">
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </span>
              </Link>
            ))}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
            <SignInButton mode="modal" asChild>
              <button className="flex items-center px-3 py-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition duration-300 ease-in-out group">
              <Briefcase className="mr-2" size={18} />
                Register
              </button>
            </SignInButton>
              {/* <CustomSignInButton/> */}
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}  // Use 'to' from react-scroll
                  smooth={true}    // Enable smooth scroll
                  duration={500}   // Set scroll duration
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <item.icon className="mr-2" size={18} />
                  {item.name}
                </Link>
              ))}
              <SignedIn>
                <div className="flex items-center px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex items-center text-bold px-3 py-2">
                  {/* <CustomSignInButton/> */}
                  <SignInButton mode="modal" />
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
