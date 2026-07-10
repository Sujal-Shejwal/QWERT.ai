import React, { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-user-creation",
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

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="w-10 h-10 rounded-full border-4 border-[#8E37EB] border-t-transparent animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Cards */}

      <div className="flex flex-wrap gap-4">

        {/* Total Creations */}

        <div className="flex justify-between items-center w-72 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">

          <div>
            <p className="text-sm text-gray-500">
              Total Creations
            </p>

            <h2 className="text-2xl font-bold text-slate-700">
              {creations.length}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>

        </div>

        {/* Active Plan */}

        <div className="flex justify-between items-center w-72 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">

          <div>
            <p className="text-sm text-gray-500">
              Active Plan
            </p>

            <h2 className="text-2xl font-bold text-slate-700">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>

          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex items-center justify-center">
            <Gem className="text-white w-6 h-6" />
          </div>

        </div>

      </div>

      {/* Recent Creations */}

      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Recent Creations
        </h2>

        {creations.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No creations found.
          </div>
        ) : (
          <div className="space-y-3">
            {creations.map((item) => (
              <CreationItem
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;