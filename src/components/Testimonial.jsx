import React from 'react'

const Testimonial = () => {

  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Sarah Chen',
      handle: '@sarahdesign',
      date: 'June 12, 2026',
      review: 'QWERT.ai helped our team generate high-quality content in minutes instead of hours.'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Michael Ross',
      handle: '@mrossdev',
      date: 'May 28, 2026',
      review: 'The AI tools are incredibly fast and accurate. It boosted my productivity instantly.'
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Emily Watson',
      handle: '@emilywrites',
      date: 'June 05, 2026',
      review: 'Generating blog titles and articles has never been easier. Highly recommended.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'David Parker',
      handle: '@davidcreator',
      date: 'April 18, 2026',
      review: 'A beautifully designed AI platform with practical tools I use every day.'
    },
  ]

  const CreateCard = ({ card }) => (
    <div className="p-5 rounded-2xl mx-4 bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-80 shrink-0">

      <div className="flex items-center gap-3">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={card.image}
          alt={card.name}
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {card.name}
          </h3>
          <p className="text-sm text-gray-500">
            {card.handle}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mt-4 text-yellow-400">
        ★★★★★
      </div>

      <p className="text-gray-700 text-sm mt-4 leading-6">
        {card.review}
      </p>

      <div className="flex justify-between items-center mt-5 text-xs text-gray-500">
        <span>Verified User</span>
        <span>{card.date}</span>
      </div>

    </div>
  )

  return (
    <section className="py-24 overflow-hidden">

      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Loved by Creators Worldwide
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Join thousands of creators, developers, marketers and students
          who use QWERT.ai to create content faster.
        </p>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-inner:hover {
          animation-play-state: paused;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="relative overflow-hidden max-w-7xl mx-auto">

        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner flex min-w-[200%] py-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

      </div>

      <div className="relative overflow-hidden max-w-7xl mx-auto">

        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex min-w-[200%] py-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

      </div>

    </section>
  )
}

export default Testimonial