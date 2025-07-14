'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

const departments = ['CIVIL'];

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    mobileNo: '',
  });

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setScreenshotFile(file);
  };

  const handleFinalSubmit = async () => {
    if (!screenshotFile) {
      setStatus('Please upload a screenshot before joining.');
      return;
    }

    setStatus('Uploading screenshot...');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Screenshot = reader.result;

      const fullData = {
        ...formData,
        screenshot: base64Screenshot,
      };

      try {
        const res = await fetch(
          '/api/submit',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData),
          }
        );

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        setStatus('Submission successful! Redirecting...');
        router.push('https://chat.whatsapp.com/KHjnhPgrA34KDTcn5GakpX');
      } catch (err) {
        console.error('Screenshot upload error:', err);
        setStatus('Failed to upload screenshot. Try again.');
      }
    };

    reader.readAsDataURL(screenshotFile);
  };

  return (
    // <main className="relative min-h-screen w-full bg-[#0B1D32] flex items-center justify-center px-4 overflow-hidden">
    //   <form
    //     className={`w-full max-w-[650px] p-6 space-y-4 mx-auto text-white ${qrCode ? 'blur-sm' : ''}`}
    //   >
    //     <h1 className="text-5xl font-antonio text-center mb-12">CURIOVERSE</h1>
    //     <div className='my-4'>
    //       <p className='text-2xl'>Design strategies</p>
    //     <p className='text-lg'>Appilcations of VR in communication</p>
    //     </div>
    //     <div>
    //       <div className='border-l-8 px-2 mb-2'>
    //         <p>15th July 2025</p>
    //         <p>9am - 4pm</p>
    //       </div>
    //       <div className='border-l-8 px-2 mb-2'>
    //       <p>ASAP Room,CEV</p>
    //       <p>Exclusive for Civil Engg.Dept</p>
    //       </div>
    //     </div>
    //     <div>
    //       <label className="block mb-1 text-white">Full Name</label>
    //       <input
    //         name="name"
    //         type="text"
    //         value={formData.name}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-2 rounded text-black border hover:border-[#2453a0]"
    //       />
    //     </div>

    //     <div>
    //       <label className="block mb-1 text-white">Email</label>
    //       <input
    //         name="email"
    //         type="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-2 rounded text-black border hover:border-[#2453a0]"
    //       />
    //     </div>

    //     <div>
    //       <label className="block mb-1 text-white">Department</label>
    //       <select
    //         name="department"
    //         value={formData.department}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-2 rounded text-black border hover:border-[#2453a0]"
    //       >
    //         <option value="">Select Department</option>
    //         {departments.map((dept, idx) => (
    //           <option key={idx} value={dept}>{dept}</option>
    //         ))}
    //       </select>
    //     </div>

    //     <div>
    //       <label className="block mb-1 text-white">Mobile Number</label>
    //       <input
    //         name="mobileNo"
    //         type="tel"
    //         value={formData.mobileNo}
    //         onChange={handleChange}
    //         required
    //         className="w-full p-2 rounded text-black border hover:border-[#2453a0]"
    //       />
    //     </div>

    //     <button
    //     type="button"
    //     onClick={() => setQrCode(true)}
    //     className="bg-[#2451a0] text-white px-6 py-2 rounded hover:bg-[#1d8ce1]"
    //   >
    //     Submit Details
    //   </button>
    //   {status && <p className="text-sm text-white">{status}</p>}
    //   </form>

    //   {qrCode && (
    //     <div className="absolute w-[340px] bg-white p-4 rounded border z-10">
    //       <div className="border-b-2 p-2 flex justify-between items-center">
    //         <h1 className="font-semibold">Scan and Pay</h1>
    //         <X onClick={() => setQrCode(false)} className="cursor-pointer" />
    //       </div>

    //       <div className="flex flex-col items-center mt-4 space-y-4">
    //         <Image src="GooglePay_QR.png" alt="QR Code" width={220} height={220} />
    //         {/* <a
    //           href={process.env.NEXT_PUBLIC_UPI_LINK ?? '#'}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="bg-[#1c63b4] text-white px-4 py-2 rounded hover:bg-[#238aff]"
    //         >
    //           Pay via UPI / Gpay
    //         </a> */}
    //         <p>Gpay : +91 7559907591</p>
    //         <div
    //           className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded p-4 cursor-pointer hover:border-[#1c63b4] text-center"
    //           onDragOver={(e) => e.preventDefault()}
    //           onDrop={(e) => {
    //             e.preventDefault();
    //             const file = e.dataTransfer.files?.[0];
    //             if (file) setScreenshotFile(file);
    //           }}
    //           onClick={() => document.getElementById('fileInput')?.click()}
    //         >
    //           <p className="text-gray-700">Upload Payment Screenshot</p>
    //           <input
    //             id="fileInput"
    //             type="file"
    //             accept="image/*"
    //             onChange={handleFileUpload}
    //             className="hidden"
    //           />
    //           {screenshotFile && (
    //             <p className="mt-2 text-green-600 text-xs">{screenshotFile.name}</p>
    //           )}
    //         </div>
    //         <button
    //           onClick={handleFinalSubmit}
    //           className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    //         >
    //           Submit & Join WhatsApp
    //         </button>
    //         {status && <p className="text-sm text-[#2453a0]">{status}</p>}
    //       </div>
    //     </div>
    //   )}
    // </main>
    <div className="mx-auto">Registration Closed</div>
  );
};

export default Page;
