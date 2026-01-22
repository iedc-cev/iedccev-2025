'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import gsap from 'gsap';

const departments = ['MCA', 'DIPLOMA', 'CSE', 'ECE', 'EEE', 'CE', 'IT'];

const EventsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    mobileNo: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        'https://script.google.com/macros/s/AKfycbyIzu5BzVI2Ju-n0U8WQVErIhvc_2rCSZquPmXr7HoDUmZaE5uOIxRGmoLa7r39Z5I0CA/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setStatus('Redirecting you to the community...');
      
      setTimeout(() => {
        router.push('https://chat.whatsapp.com/BPwIeWpDT1Y42Op7j1Tcul');
      }, 2000);
    } 
    catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setStatus('Submission failed. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Welcome to the Hub!</h2>
          <p className="text-gray-500 text-lg">{status}</p>
          <div className="pt-4">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1A4C96]" />
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
            <span className="text-2xl font-bold tracking-tighter">IEDC<span className="opacity-60">CEV</span></span>
          </Link>
          
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tighter mb-8">
            Start<br />Something<br />Big.
          </h1>
          <p className="text-blue-100 text-lg max-w-xs leading-relaxed opacity-80">
            Join a community of innovators, builders, and dreamers shaping the future of technology.
          </p>
        </div>

        <div className="side-content relative z-10">
          <div className="flex items-center gap-4 text-sm font-medium opacity-60 uppercase tracking-[0.2em]">
            <span>InnovationHub</span>
            <div className="w-8 h-px bg-white/30" />
            <span>2025</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20">
        <div className="w-full max-w-xl">
          <div className="mb-12 space-y-4">
            <div className="form-reveal inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#1A4C96] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Join the Network
            </div>
            <h2 className="form-reveal text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Registration
            </h2>
            <p className="form-reveal text-gray-500 text-lg">
              Fill in your details below to become a member of IEDC CEV.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-reveal group">
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alan Turing"
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="form-reveal group">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
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
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-reveal group">
                <label htmlFor="department" className="block text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Department
                </label>
                <div className="relative">
                  <select
                    name="department"
                    id="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-300">Select Dept</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="text-black">{dept}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="form-reveal group">
                <label htmlFor="mobileNo" className="block text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-[#1A4C96] transition-colors mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  id="mobileNo"
                  required
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="+91 0000 000000"
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1A4C96] outline-none py-3 text-lg transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="form-reveal pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full md:w-auto inline-flex items-center justify-center px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] disabled:opacity-50"
              >
                <span className="absolute inset-0 w-full h-full bg-[#1A4C96] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center gap-3 font-bold uppercase tracking-widest text-sm">
                  {isSubmitting ? (
                    <>Submitting <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Complete Registration <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>
            </div>
            
            {status && !isSuccess && !isSubmitting && (
              <p className="form-reveal text-sm font-medium text-red-500 mt-4">{status}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default EventsForm;
