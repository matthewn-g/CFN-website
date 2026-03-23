"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMemberAvatarProps {
  id:   string;
  name: string;
}

export default function TeamMemberAvatar({ id, name }: TeamMemberAvatarProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-16 h-16 rounded-full bg-cfn-navy flex items-center justify-center text-cfn-cream font-black font-serif text-2xl mb-4">
        {name[0]}
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 relative flex-shrink-0">
      <Image
        src={`/images/cfn-team/${id}.jpeg`}
        alt={name}
        fill
        className="object-cover object-top"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
