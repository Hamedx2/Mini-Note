import { createClient } from "@supabase/supabase-js";

export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbG1mZWthamJnd2F3ZmtpZnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Mjc0ODYsImV4cCI6MjA2NTIwMzQ4Nn0.-FakauNOZms8f-T4g4iu8a8axtX5ev60hZfz2k80SXc";

export const SUPABASE_URL = "https://gglmfekajbgwawfkifvq.supabase.co";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
