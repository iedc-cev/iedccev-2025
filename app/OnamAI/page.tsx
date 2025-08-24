import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#c09f45] justify-center items-center flex flex-col px-3">
    <div className="rounded-sm overflow-hiddentransition-shadow max-h-[900px] flex flex-col justify-between items-center">
        <div className=" aspect-auto relative flex max-w-4xl h-[500px]">
            <Image
            src="/posters/onam.jpg"
            alt="rgerg"
            width={200}
            height={600}
            className="object-cover w-full rounded-lg"
            />
        </div>
        <a href="https://forms.gle/ryZ3ScEwUqAEzyxr5" className="w-full flex items-center justify-center bg-white my-5 py-3 rounded-lg ">Submit Now</a>
    </div>
    </div>
  );
}
