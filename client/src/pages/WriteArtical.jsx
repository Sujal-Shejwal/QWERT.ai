import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articlelength = [
    { length: 800, text: "Short (500–800 words)" },
    { length: 1200, text: "Medium (800–1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedlength, setSelectedlength] = useState(articlelength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prompt = `
You are a professional technical content writer.

Write a detailed article on:

Topic: ${input}

Requirements:

- Length: approximately ${selectedlength.length} words.
- Return ONLY Markdown.
- Start with one H1 title (# Title).
- Write a short introduction.

Then create at least 8 sections.

For EVERY section follow this format:

## Heading

- Point 1
- Point 2
- Point 3
- Point 4

Explain every point in 2-4 sentences.

Whenever appropriate include:

- Examples
- Advantages
- Disadvantages
- Best Practices
- Tips

Use:

- Bullet points
- Numbered lists
- Tables where useful
- Bold important keywords

Finish with:

## Conclusion

- Key Takeaways
- Final Thoughts

IMPORTANT:

- Do NOT write huge paragraphs.
- Every section MUST contain bullet points.
- Use proper Markdown.
- Make the article visually easy to read.
`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedlength.length,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
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
    <div className="h-full p-6 flex items-start gap-6 text-slate-700">
      {/* Left */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-[390px] flex flex-col"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>

        <p className="mt-7 mb-2 text-sm font-medium">Article Topic</p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="The future of Artificial Intelligence..."
          className="w-full h-10 px-3 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-6 mb-2 text-sm font-medium">
          Article Length
        </p>

        <div className="flex gap-2 flex-wrap">
          {articlelength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedlength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${
                selectedlength.text === item.text
                  ? "bg-blue-50 text-blue-700 border-blue-500"
                  : "text-gray-500 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full h-10 mt-8 flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-md disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-5 h-5" />
          )}

          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* Right */}

      <div className="w-full max-w-2xl p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[700px] flex flex-col">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">
            Generated Article
          </h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p>
                Enter a topic and click "Generate Article"
                to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 overflow-y-auto h-full">
            <article
              className="
                prose
                max-w-none
                prose-slate
                prose-headings:font-bold
                prose-h1:text-3xl
                prose-h2:text-2xl
                prose-h3:text-xl
                prose-p:leading-8
                prose-ul:list-disc
                prose-ol:list-decimal
                prose-li:my-2
                prose-strong:text-black
                prose-table:border
                prose-th:border
                prose-td:border
              "
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

export default WriteArticle;
