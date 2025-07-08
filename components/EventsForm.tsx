'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ import useRouter
import Link from 'next/link';

const departments = ['MCA', 'DIPLOMA', 'CSE', 'ECE', 'EEE', 'CE', 'IT'];

const EventsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    mobileNo: '',
  });

  const [status, setStatus] = useState('');
  const router = useRouter(); // ✅ initialize router

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwZtGjC_Z_tA4D4fIXZcqWKq6MYeklehF1emMi_NDS50BwtjkJpiBTJINPe-WAJE36ySA/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      setStatus('Form submitted successfully!');
      setFormData({ name: '', email: '', department: '', mobileNo: '' });

      const whatsappLink = 'https://chat.whatsapp.com/BPwIeWpDT1Y42Op7j1Tcul';
      router.push(whatsappLink);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('Submission failed. Try again.');
    }
  };

  return (
    <main className="min-h-screen w-full text-white">
      <div className="mx-auto min-h-screen w-full md:w-1/2 flex items-center justify-center p-6 text-gray-900 bg-[#fefefe]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[650px] p-8 space-y-6"
        >
          <h1 className="text-3xl font-bold mb-2 text-[#2a64c8]">Join IEDC</h1>
          <p className="text-gray-500">
            Become part of the Innovation & Entrepreneurship Development Cell and start your journey of innovation!
          </p>

          <div>
            <label htmlFor="name" className="block mb-1 text-[#2451a0]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2 rounded text-black border hover:border-[#2453a0] shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-[#2451a0]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full p-2 rounded text-black border hover:border-[#2453a0] shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="department" className="block mb-1 text-[#2451a0]">
              Department
            </label>
            <select
              name="department"
              id="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 rounded text-black border hover:border-[#2453a0] shadow-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mobileNo" className="block mb-1 text-[#2451a0]">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNo"
              id="mobileNo"
              required
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="98430XXXXX"
              className="w-full p-2 rounded text-black border hover:border-[#2453a0] shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-[#2451a0] text-[#fefefe] px-6 py-2 rounded hover:bg-[#1d8ce1] transition font-medium"
          >
            Join Now
          </button>

          {status && <p className="text-sm text-[#1c2c81]">{status}</p>}
        </form>
      </div>
    </main>
  );
};

export default EventsForm;
