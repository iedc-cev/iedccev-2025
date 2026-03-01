'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, Loader2, Send, Info, X } from 'lucide-react';
import gsap from 'gsap';
const WHATSAPP_GROUP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_EXECOM_LINK!;

const departments = ['CSE', 'IT', 'EEE', 'ECE', 'CE', 'MCA'];
const semesters = ['S2', 'S4', 'S6'];
const positions = [
  'Student Lead',
  'Quality & Operation Lead',
  'Finance Lead',
  'Creative & Innovation Lead',
  'Branding & Marketing Lead',
  'Community Lead',
  'IPR & Research Lead',
  'Women Entrepreneurship Lead',
  'Technology Lead'
];

const positionDetails: Record<string, string> = {
  'Student Lead': 'Represent the student body and voice concerns to the IEDC.',
  'Quality & Operation Lead': 'Ensure the smooth functioning of day-to-day operations.',
  'Finance Lead': "Manage the organization's budget and financial resources.",
  'Creative & Innovation Lead': 'Drive creative initiatives and innovative projects.',
  'Branding & Marketing Lead': 'Develop and execute marketing strategies to promote the organization.',
  'Community Lead': 'Build and nurture a sense of community within the organization.',
  'IPR & Research Lead': 'Oversee intellectual property matters and research activities.',
  'Women Entrepreneurship Lead': 'Lead initiatives that empower women in innovation, entrepreneurship, and leadership.',
  'Technology Lead': 'Oversee the technological infrastructure of the organization.',
};

export default function ExecomPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    department: '',
    semester: '',
    position: '',
    experience: '',
    candidateReason: '',
    queries: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPositionInfo, setShowPositionInfo] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(".side-content", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });
    }, formRef);
    
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Processing your application...');
    
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbytenvVljvvz0l6-ND7zjizFk3nmnPCcqPjavkPg5uD6AinB-3JAeLNjxP3ih60KV2vJA/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: formData.mobileNo,
            department: formData.department,
            position: formData.position,
            volunteeringExperience: formData.experience,
            candidateReason: formData.candidateReason,
            queries: formData.queries,
          }),
        }
      );

      setIsSubmitting(false);
      setIsSuccess(true);
      setStatus('Your application has been submitted successfully!');
    } 
    catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setStatus('Submission failed. Please try again or contact the admins.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Application Received!</h2>
          <p className="text-gray-500 text-lg">{status}</p>
          <div className="pt-4">
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main ref={formRef} className="min-h-screen w-full bg-[#fafafa] flex flex-col md:flex-row">
      {/* Decorative Sidebar */}
      <div className="hidden md:flex md:w-1/3 bg-[#1A4C96] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] border-[40px] border-white rounded-full" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[200px] h-[200px] border-[20px] border-white rounded-full" />
        </div>
        
        <div className="side-content relative z-10">
          <Link href="/" className="inline-block mb-20">
            <span className="text-2xl font-semibold tracking-tighter">IEDC<span className="opacity-60">CEV</span></span>
          </Link>
          
          <h1 className="text-6xl font-semibold leading-[1.1] tracking-tighter mb-8">
            Lead<br />The<br />Future.
          </h1>
          <p className="text-blue-100 text-lg max-w-xs leading-relaxed opacity-80">
            Apply for the IEDC Execom 2026 and become a driving force in our campus innovation ecosystem.
          </p>
        </div>

        <div className="side-content relative z-10">
          <div className="flex items-center gap-4 text-sm font-medium opacity-60 uppercase tracking-[0.2em]">
            <span>Executive Committee</span>
            <div className="w-8 h-px bg-white/30" />
            <span>2026</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-2xl py-8">
          <div className="mb-12 space-y-4">
            <h2 className="form-reveal text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
             IEDC Execom 2026
            </h2>
            <p className="form-reveal text-gray-500 text-md">
              Fill in your details below to apply for the core team of IEDC CEV.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-reveal group">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300 text-gray-900"
                />
              </div>

              <div className="form-reveal group">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300 text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-reveal group">
                <label htmlFor="mobileNo" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  id="mobileNo"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300 text-gray-900"
                />
              </div>

              <div className="form-reveal group">
                <label htmlFor="department" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Department
                </label>
                <div className="relative">
                  <select
                    name="department"
                    id="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all appearance-none text-gray-900 cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">Select your department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="text-gray-900">{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-reveal group">
                <label htmlFor="semester" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Semester
                </label>
                <div className="relative">
                  <select
                    name="semester"
                    id="semester"
                    required
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all appearance-none text-gray-900 cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">Select your semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem} className="text-gray-900">{sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {showPositionInfo && (
              <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
                <div className="min-h-full p-6 md:p-12 lg:p-20 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-semibold tracking-tight text-gray-900">Position Descriptions</h3>
                    <button onClick={() => setShowPositionInfo(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {Object.entries(positionDetails).map(([title, desc]) => (
                      <div key={title} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <p className="text-base font-semibold text-[#1A4C96] mb-1">{title}</p>
                        <p className="text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-reveal group">
                <label htmlFor="position" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Position *
                  <button type="button" onClick={() => setShowPositionInfo(true)} className="text-red-400 hover:text-red-600 transition-colors" aria-label="View position details">
                    <Info className="w-5 h-5" />
                  </button>
                </label>
                <div className="relative">
                  <select
                    name="position"
                    id="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all appearance-none text-gray-900 cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">Select preferred position</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos} className="text-gray-900">{pos}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-reveal group">
              <label htmlFor="experience" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                Do you have any prior experience in volunteering? *
              </label>
              <textarea
                name="experience"
                id="experience"
                required
                rows={2}
                value={formData.experience}
                onChange={handleChange}
                placeholder="Share your volunteering history..."
                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300 text-gray-900 resize-none"
              ></textarea>
            </div>

            <div className="form-reveal group">
              <label htmlFor="candidateReason" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                What makes you a great candidate for iedc? *
              </label>
              <textarea
                name="candidateReason"
                id="candidateReason"
                required
                rows={3}
                value={formData.candidateReason}
                onChange={handleChange}
                placeholder="Briefly describe your motivation..."
                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300 text-gray-900 resize-none"
              ></textarea>
            </div>

            <div className="form-reveal group">
              <label htmlFor="queries" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                Any Queries
              </label>
              <input
                type="text"
                name="queries"
                id="queries"
                value={formData.queries}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300 text-gray-900"
              />
            </div>

            <div className="form-reveal pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <p className={`text-sm ${status.includes('failed') ? 'text-red-500' : 'text-gray-500'}`}>
                {status || "All fields are required."}
              </p>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  group relative inline-flex items-center justify-center gap-2 
                  px-8 py-4 bg-[#1A4C96] text-white rounded-full font-medium 
                  transition-all duration-300 overflow-hidden w-full sm:w-auto
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#123670] hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20'}
                `}
              >
                <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                ) : (
                  <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
