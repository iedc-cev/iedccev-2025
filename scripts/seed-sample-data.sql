-- Insert sample events
INSERT INTO events (title, description, date, time, venue, is_live, registration_link) VALUES
('Tech Talk 2024', 'An inspiring session on emerging technologies and their impact on society.', '2024-07-15', '2:00 PM', 'Main Auditorium', true, 'https://forms.google.com/tech-talk-2024'),
('Startup Pitch Competition', 'Students present their innovative startup ideas to industry experts.', '2024-07-20', '10:00 AM', 'Innovation Lab', true, 'https://forms.google.com/startup-pitch'),
('Workshop: AI & ML Basics', 'Hands-on workshop covering fundamentals of Artificial Intelligence and Machine Learning.', '2024-06-10', '9:00 AM', 'Computer Lab', false, null);

-- Insert sample team members
INSERT INTO team_members (name, position, photo_url, instagram, linkedin) VALUES
('Arjun Krishnan', 'Chief Executive Officer', '/placeholder.svg?height=200&width=200', 'https://instagram.com/arjun_k', 'https://linkedin.com/in/arjun-krishnan'),
('Priya Nair', 'Chief Technology Officer', '/placeholder.svg?height=200&width=200', 'https://instagram.com/priya_n', 'https://linkedin.com/in/priya-nair'),
('Rahul Menon', 'Head of Events', '/placeholder.svg?height=200&width=200', 'https://instagram.com/rahul_m', 'https://linkedin.com/in/rahul-menon'),
('Sneha Pillai', 'Media Head', '/placeholder.svg?height=200&width=200', 'https://instagram.com/sneha_p', 'https://linkedin.com/in/sneha-pillai');

-- Insert sample media items
INSERT INTO media_items (title, description, thumbnail_url, video_url, series, duration) VALUES
('Innovation in Kerala Startups', 'Exploring the startup ecosystem in Kerala and opportunities for students.', '/placeholder.svg?height=200&width=400', 'https://youtube.com/watch?v=sample1', 'PodShow', '45:30'),
('Campus Life Chronicles', 'A fun take on daily life at CE Vadakara and student experiences.', '/placeholder.svg?height=200&width=400', 'https://youtube.com/watch?v=sample2', 'Kadha Para Chill', '25:15  'https://youtube.com/watch?v=sample2', 'Kadha Para Chill', '25:15'),
('Latest Tech Trends 2024', 'Deep dive into emerging technologies and their applications.', '/placeholder.svg?height=200&width=400', 'https://youtube.com/watch?v=sample3', 'Technalogya', '35:45');

-- Insert sample gallery images
INSERT INTO gallery_images (title, image_url, event_name) VALUES
('Tech Talk Opening', '/placeholder.svg?height=400&width=600', 'Tech Talk 2024'),
('Startup Presentations', '/placeholder.svg?height=400&width=600', 'Startup Pitch Competition'),
('Workshop Session', '/placeholder.svg?height=400&width=600', 'AI & ML Workshop'),
('Team Building Activity', '/placeholder.svg?height=400&width=600', 'Town Vibes'),
('Innovation Lab Tour', '/placeholder.svg?height=400&width=600', 'Campus Events'),
('Student Networking', '/placeholder.svg?height=400&width=600', 'Town Vibes');
