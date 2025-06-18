import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side Supabase client (for auth and client operations)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  poster_url: string
  is_live: boolean
  registration_link?: string
  aftermovie_link?: string
  created_at: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  photo_url: string
  instagram?: string
  linkedin?: string
  github?: string
  created_at: string
}

export interface MediaItem {
  id: string
  title: string
  description: string
  thumbnail_url: string
  video_url: string
  series: string
  duration?: string
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  image_url: string
  event_name?: string
  created_at: string
}

export interface User {
  id: string
  name: string
  email: string
  department: string
  semester: number
  contact_no: string
  member_id: string
  created_at: string
}
