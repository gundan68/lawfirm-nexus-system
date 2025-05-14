
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthState, UserProfile } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<{
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  authState: initialState,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const cleanupAuthState = () => {
      // Remove all Supabase auth keys from localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
    };

    const setupAuth = async () => {
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            setAuthState((prev) => ({
              ...prev,
              user: session?.user || null,
              isLoading: !!session, // Keep loading if we have a session (until profile loads)
            }));

            // Defer profile fetching to prevent deadlocks
            if (session?.user) {
              setTimeout(() => {
                fetchProfile(session.user);
              }, 0);
            }
          } else if (event === 'SIGNED_OUT') {
            setAuthState({
              user: null,
              profile: null,
              isLoading: false,
              error: null,
            });
          }
        }
      );

      // THEN check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setAuthState((prev) => ({
          ...prev,
          user: session.user,
          isLoading: true,
        }));
        await fetchProfile(session.user);
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }

      return () => {
        subscription.unsubscribe();
      };
    };

    const unsubscribe = setupAuth();

    return () => {
      // Cleanup function
      unsubscribe.then((unsubFn) => unsubFn && unsubFn());
      cleanupAuthState();
    };
  }, []);

  const fetchProfile = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      setAuthState((prev) => ({
        ...prev,
        profile: data as UserProfile,
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      setAuthState((prev) => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Clean up existing state first
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });

      // Try global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("登入成功");
      navigate('/');
    } catch (error: any) {
      console.error("Login error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
      toast.error(`登入失敗: ${error.message}`);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Clean up existing state first
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast.success("註冊成功！請驗證您的電子郵件後登入。");
      navigate('/auth');
    } catch (error: any) {
      console.error("Signup error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
      toast.error(`註冊失敗: ${error.message}`);
    }
  };

  const signOut = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      
      // Clean up auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      setAuthState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });
      
      toast.success("您已成功登出");
      navigate('/auth');
    } catch (error: any) {
      console.error("Signout error:", error);
      toast.error(`登出失敗: ${error.message}`);
      setAuthState((prev) => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
