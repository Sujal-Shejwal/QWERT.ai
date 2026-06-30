import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <section className="max-w-6xl mx-auto my-30 px-4">
      <div className="text-center mb-12">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Choose Your Plan
        </h2>

        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="mt-14">
        <PricingTable />
      </div>
    </section>
  )
}

export default Plan