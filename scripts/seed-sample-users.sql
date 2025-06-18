-- Insert sample users for development
INSERT INTO users (name, email, department, semester, contact_no, member_id) VALUES
('Abhin C', 'abhin@iedccev.in', 'Computer Science Engineering', 6, '9876543210', 'IEDC-abhin01'),
('Amarnath P', 'amarnath@iedccev.in', 'Electronics and Communication Engineering', 4, '9876543211', 'IEDC-amarnath01'),
('Sreenandha', 'sree@iedccev.in', 'Mechanical Engineering', 2, '9876543212', 'IEDC-sree01'),
('Nihal K', 'nihal@iedccev.in', 'Computer Science Engineering', 6, '9876543213', 'IEDC-nihal01')
ON CONFLICT (email) DO NOTHING;
