export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  gender: string | null;
  branch: string | null;
  year: string | null;
  bio: string | null;
  skills: string | string[] | null;
  interests: string | string[] | null;
  experience: string | null;
  achievements: string | null;
  github: string | null;
  linkedin: string | null;
  avatar_url: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
