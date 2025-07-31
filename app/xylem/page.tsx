'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
        window.location.href = 'https://chat.whatsapp.com/DoDO2OmhK873N4raUZ3ocW'; // Replace this
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#fefefe] flex flex-col items-center justify-center px-4 overflow-hidden">
      Registration Closed
    </main>
  );
};

export default Page;
