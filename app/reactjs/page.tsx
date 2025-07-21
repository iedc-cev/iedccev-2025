'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

const departments = ['CS','IT'];
const semester = ['S3','S5','S7']

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    semester: '',
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
        router.push('https://chat.whatsapp.com/FERRxLkpa7mHyn6pBjwpri');
      } catch (err) {
        console.error('Screenshot upload error:', err);
        setStatus('Failed to upload screenshot. Try again.');
      }
    };

    reader.readAsDataURL(screenshotFile);
  };

  return (
        <div className="mx-auto flex justify-center h-screen items-center text-4xl">Registration Closed</div>
  );
};

export default Page;
