import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (object.trim().split(/\s+/).length > 1) {
        toast.error("Please enter only one object name.");
        return;
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Object removed successfully.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
          <h1 className="text-xl font-semibold">Object Remover</h1>
        </div>

        <p className="mt-7 mb-2 text-sm font-medium">
          Upload Image
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full h-10 px-3 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="mt-6 mb-2 text-sm font-medium">
          Describe object name to remove
        </p>

        <textarea
          rows={4}
          value={object}
          onChange={(e) => setObject(e.target.value)}
          placeholder="e.g. watch or spoon (only one object)"
          className="w-full px-3 py-2 outline-none text-sm rounded-md border border-gray-300 resize-none"
          required
        />

        <button
          disabled={loading}
          className="w-full h-10 mt-8 flex justify-center items-center gap-2
          bg-gradient-to-r from-[#417DF6] to-[#8E37EB]
          text-white text-sm rounded-md disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5 h-5" />
          )}

          {loading ? "Processing..." : "Remove Object"}
        </button>
      </form>

      {/* Right */}

      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[600px] flex flex-col">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center mt-4">
            <img
              src={content}
              alt="Processed"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;