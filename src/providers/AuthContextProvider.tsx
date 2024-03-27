import { supabase } from "@/lib/supabase";
import { Profile } from "@/utils/types";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  updateProfile: (data: Profile) => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  updateProfile: () => {},
  isAdmin: false,
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data);

        if (data) {
          setIsAdmin(data.group === "ADMIN");
        }
      }

      setLoading(false);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAdmin(false);
        setProfile(null);
      }
      fetchSession();
    });

    fetchSession();
  }, []);

  const updateProfile = (data: Profile) => {
    setProfile(data);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, updateProfile, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
