import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-published-creations",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="w-10 h-10 rounded-full border-4 border-[#8E37EB] border-t-transparent animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">
        Community Creations
      </h1>

      <div className="bg-white rounded-xl p-4 overflow-y-auto h-full">

        {creations.length === 0 ? (

          <div className="flex items-center justify-center h-full text-gray-500">
            No published creations found.
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {creations.map((creation) => (

              <div
                key={creation.id}
                className="relative rounded-xl overflow-hidden shadow-md group"
              >

                <img
                  src={creation.content}
                  alt={creation.prompt}
                  className="w-full h-72 object-cover"
                />

                <div
                  className="
                  absolute inset-0
                  bg-gradient-to-t from-black/80 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition duration-300
                  flex flex-col justify-end
                  p-4 text-white"
                >

                  <p className="text-sm mb-3 line-clamp-3">
                    {creation.prompt}
                  </p>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Heart
                        onClick={() => imageLikeToggle(creation.id)}
                        className={`w-6 h-6 cursor-pointer transition duration-200 ${
                          creation.likes?.includes(user?.id)
                            ? "fill-red-500 text-red-500"
                            : "text-white hover:text-red-400"
                        }`}
                      />

                      <span>
                        {creation.likes?.length || 0}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default Community;