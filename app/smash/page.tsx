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
    const { name, email, department, semester, mobileNo } = formData;
    if (!name || !email || !department || !semester || !mobileNo) {
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

      setStatus('Submission successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'https://chat.whatsapp.com/KWlbP3yWX8U18fE8QjMBGf'; // Replace this
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventForm = staticEvents.find((item) => item.id === 8);
  return (
    <main className="relative min-h-screen w-full bg-[#FF8A06] flex flex-col items-center justify-center px-4 overflow-hidden">
      {eventForm?.form_active?
      <motion.form
      initial={{ opacity: 0}}     // start hidden & moved down
      animate={{ opacity: 1}}      // fade in & move to original position
      transition={{ duration: 1, ease: 'easeInOut' }}

      className="w-full max-w-3xl p-6 space-y-6 mx-auto flex flex-col h-[700px] justify-between">
        <div className=' text-[#fefefe] space-y-1'>
            <Image src='SMASH.png' alt='eventname' width={250} height={150} className=''/>
            <p className='font-semibold text-xl'>{eventForm.tagline}</p>
            <div className='text-start mt-3'>
              <p>Time : {eventForm.time}</p>
                <p>Date : {eventForm.date}</p>
                <p>Venue : {eventForm.venue}</p>
            </div>
        </div>
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

        {status && <p className="text-sm text-black text-center">{status}</p>}
      </motion.form>:
      <p>Registration Closed</p>
        }
    </main>
  );
};

export default Page;
