import React, { useState, useEffect } from 'react'

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear())

  return (
    <footer section id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
        <div className="pt-8 pb-6 border-t border-sky-400">
          <div className="text-center">
            <p className="text-center mb-2">
              © {currentYear} All rights reserved. Made by PID-19 from K.K.Wagh Institute of Engineering Education and Research.
            </p>
          </div>
        </div>
    </footer>
  )
}

export default Footer