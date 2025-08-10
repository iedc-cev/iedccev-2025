'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { staticEvents } from "@/components/staticEvents"
import Image from 'next/image'

const departments = ['CSE', 'IT', 'CIVIL', 'ECE', 'EEE','MCA','DIPLOMA'];
const semester = ['S3', 'S5', 'S7'];

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    semester: '',
    mobileNo: '',
    textMessage:''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async () => {
    const { name, email, department, semester, mobileNo, textMessage } = formData;
    if (!name || !email || !department || !semester || !mobileNo  || !textMessage) {
      setStatus('Please fill in all the fields.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      setStatus('Submission successful!');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventForm = {
    head:"PROJECT CALL",
    title:"IdeaForge",
    tagline:"Where Raw Ideas Are Crafted Into Reality",
    form_active:true
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#c47f3b] p-2 flow-hidden">
      {eventForm?.form_active?
      <motion.form
      initial={{ opacity: 0}}     // start hidden & moved down
      animate={{ opacity: 1}}      // fade in & move to original position
      transition={{ duration: 1, ease: 'easeInOut' }}

      className="w-full max-w-2xl px-4 py-10 space-y-3 mx-auto flex flex-col justify-between rounded-3xl border border-[#fefefe] bg-gradient-to-b from-[#c47f3b] to-[#d4a77a] ">
        <div className=' text-[#fefefe] space-y-1'>
            <p className='text-5xl font-[Poppins]'>{eventForm.head}</p>
            <p className='text-4xl'>{eventForm.title}</p>
            <p className='font-medium text-lg text-[#514e4e]'>{eventForm.tagline}</p>
            {/* <div className='text-start mt-3'>
              <p>Time : {eventForm.time}</p>
                <p>Date : {eventForm.date}</p>
                <p>Venue : {eventForm.venue}</p>
            </div> */}
        </div>
        <div className='space-y-3'>
        <div>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border text-black focus:outline-none"
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border text-black focus:outline-none"
          />
        </div>

        <div>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border text-black focus:outline-none"
          >
            <option value="">Select Department</option>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border text-black focus:outline-none"
          >
            <option value="">Select Semester</option>
            {semester.map((sem, idx) => (
              <option key={idx} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            name="mobileNo"
            type="tel"
            placeholder="Mobile Number"
            pattern="[0-9]{10}"
            maxLength={10}
            value={formData.mobileNo}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border text-black focus:outline-none"/>
        </div>
        <div>
          <textarea
            name="textMessage"
            placeholder="Describe Idea"
            value={formData.textMessage}
            onChange={handleChange}
            required
            className="w-full p-3 h-[100px] rounded border text-black focus:outline-none"></textarea>
        </div>

        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={isSubmitting}
          className={`bg-[#676666] text-white w-full py-3 rounded hover:bg-[#6e6d6d] self-center ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Details'}
        </button>
        </div>

        {status && <p className="text-md font-semibold text-black text-center">{status}</p>}
      </motion.form>:
      <p>Registration Closed</p>
        }
    </main>
  );
};

export default Page;

