
import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  email: string | null;
  role: "管理者" | "律師" | "助理";
  status: "啟用" | "停用";
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
