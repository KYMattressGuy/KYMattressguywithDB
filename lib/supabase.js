import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iefgjjgoswtymucyqlzn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZmdqamdvc3d0eW11Y3lxbHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjI2NzQsImV4cCI6MjA4ODYzODY3NH0.uoNQcUyaLxgzAczx0sbn9Snabh2jKC4jcmZeYFQFnf0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
