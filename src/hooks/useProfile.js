import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import { getProfile } from "../services/profile";

function useProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      try {
        const data = await getProfile(user.id);
        setProfile(data);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  return {
    profile,
    loading,
  };
}

export default useProfile;
