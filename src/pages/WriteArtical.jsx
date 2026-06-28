import React, { useState } from 'react'
import { Edit, Sparkles } from 'lucide-react'

const WriteArticle = () => {

  const articlelength = [
    { length: 800, text: 'Short (500–800 words)' },
    { length: 1200, text: 'Medium (800–1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ]

  const [selectedlength, setSelectedlength] = useState(articlelength[0])
  const [input, setInput] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className='h-full p-6 flex items-start gap-6 text-slate-700'>

      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className='bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-[390px] flex flex-col'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>

        <p className='mt-7 mb-2 text-sm font-medium'>
          Article Topic
        </p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className='w-full h-10 px-3 outline-none text-sm rounded-md border border-gray-300'
          placeholder='The future of Artificial Intelligence is...'
          required
        />

        <p className='mt-6 mb-2 text-sm font-medium'>
          Article Length
        </p>

        <div className='flex gap-2 flex-wrap'>
          {articlelength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedlength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedlength.text === item.text
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          className='w-full h-10 mt-8 flex justify-center items-center gap-2
          bg-gradient-to-r from-[#226BFF] to-[#65ADFF]
          text-white text-sm rounded-md cursor-pointer'
        >
          <Edit className='w-5' />
          Generate Article
        </button>

      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[600px] flex flex-col'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Generated Article</h1>

        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Edit className='w-9 h-9 '/>
            <p>Enter a topic and click "Generate Article" to get started</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default WriteArticle