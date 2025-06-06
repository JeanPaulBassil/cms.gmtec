'use client';

import type { AvatarProps } from '@heroui/react';
import { Avatar, cn } from '@heroui/react';
import React from 'react';

const TeamAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      {...props}
      ref={ref}
      classNames={{
        ...classNames,
        base: cn('bg-transparent border border-divider', classNames?.base, className),
        name: cn('text-default-500 text-[0.6rem] font-semibold', classNames?.name),
      }}
      getInitials={(name) =>
        (name[0] || '') + (name[name.lastIndexOf(' ') + 1] || '').toUpperCase()
      }
      name={name}
      radius="md"
      size="sm"
    />
  )
);

TeamAvatar.displayName = 'TeamAvatar';

export default TeamAvatar;
