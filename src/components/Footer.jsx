import React from 'react'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10 pb-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-3xl font-bold text-primary">
            QWERT.ai
          </h2>

          <p className="text-sm/7 mt-6">
            QWERT.ai helps creators, developers, marketers and students
            generate content, images and ideas using powerful AI tools.
          </p>
        </div>

        <div className="flex flex-col lg:items-center">
          <div className="flex flex-col text-sm space-y-3">
            <h2 className="font-semibold mb-3 text-gray-800">
              Company
            </h2>

            <a href="#" className="hover:text-primary transition">
              About Us
            </a>

            <a href="#" className="hover:text-primary transition">
              Features
            </a>

            <a href="#" className="hover:text-primary transition">
              Pricing
            </a>

            <a href="#" className="hover:text-primary transition">
              Contact
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-5">
            Subscribe to Newsletter
          </h2>

          <div className="space-y-4">
            <p>
              Get AI updates, new tools and product releases directly in your inbox.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-primary"
              />

              <button className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-200 mt-10 py-6 text-center">
        © 2026 QWERT.ai. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer