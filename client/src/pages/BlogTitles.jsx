import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

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
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prompt = `
Generate 10 unique, catchy and SEO-friendly blog titles.

Keyword: ${input}
Category: ${selectedCategory}

Rules:
- Return ONLY Markdown.
- Number each title.
- Do NOT write "Here are..."
- Do NOT explain anything.
- Each title should be unique.
- Each title should be 8-15 words.
`;

      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full p-6 flex items-start gap-6 text-slate-700'>

      {/* Left */}

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
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='The future of Artificial Intelligence is...'
          className='w-full h-10 px-3 outline-none text-sm rounded-md border border-gray-300'
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
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all ${
                selectedCategory === item
                  ? 'bg-purple-50 text-purple-700 border-purple-500'
                  : 'text-gray-500 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className='w-full h-10 mt-8 flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white text-sm rounded-md disabled:opacity-60'
        >
          {loading ? (
            <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
          ) : (
            <Hash className='w-5 h-5' />
          )}

          {loading ? "Generating..." : "Generate Title"}
        </button>

      </form>

{/* Right */}

<div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[600px] flex flex-col'>

  <div className='flex items-center gap-3'>
    <Hash className='w-5 h-5 text-[#8E37EB]' />
    <h1 className='text-xl font-semibold'>Generated Titles</h1>
  </div>

  {!content ? (

    <div className='flex-1 flex justify-center items-center'>
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
        <Hash className='w-9 h-9' />
        <p>Enter a topic and click "Generate Title" to get started</p>
      </div>
    </div>

  ) : (

    <div className='mt-4 flex-1 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-5'>

      <article
        className='
          prose
          prose-sm
          max-w-none

          prose-headings:text-slate-800
          prose-headings:font-bold

          prose-h1:text-2xl
          prose-h2:text-xl
          prose-h3:text-lg

          prose-p:text-slate-700

          prose-ul:list-disc
          prose-ul:pl-6

          prose-ol:list-decimal
          prose-ol:pl-6

          prose-li:my-2

          prose-strong:text-slate-900
        '
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>

    </div>

  )}

</div>

    </div>
  );
};

export default BlogTitles;