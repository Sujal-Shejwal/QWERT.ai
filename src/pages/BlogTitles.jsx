import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const BlogTitles = () => {

  const BlogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food'
  ]

  const [selectedCategory, setSelectedCategory] = useState('General')
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
          <Sparkles className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>

        <p className='mt-7 mb-2 text-sm font-medium'>
          Keyword
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
          Category
        </p>

        <div className='flex gap-2 flex-wrap'>
          {BlogCategories.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          className='w-full h-10 mt-8 flex justify-center items-center gap-2
          bg-gradient-to-r from-[#C341F6] to-[#8E37EB]
          text-white text-sm rounded-md cursor-pointer'
        >
          <Hash className='w-5' />
          Generate Title
        </button>

      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 flex flex-col'>
        <div className='flex items-center gap-3'>
          <Hash className='w-5 h-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Generated Titles</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Hash className='w-9 h-9' />
            <p>Enter a topic and click "Generate Title" to get started</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default BlogTitles