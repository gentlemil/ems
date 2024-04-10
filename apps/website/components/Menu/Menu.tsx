'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu as CUMenu, MenuItem, classMerge } from '@ems/common-ui';

type Path = {
  id: number;
  name: string;
  url: string;
};

const paths: Path[] = [
  {
    id: 1,
    name: 'Home',
    url: '/',
  },
  {
    id: 2,
    name: 'About',
    url: '/about',
  },
  {
    id: 3,
    name: 'Reviews',
    url: '/review',
  },
  {
    id: 4,
    name: 'Add review',
    url: '/review/add',
  },
  {
    id: 5,
    name: 'Contact',
    url: '/contact',
  },
];

export const Menu = () => {
  const pathName = usePathname();

  const buildClassName = (path: string) => {
    return classMerge('text-lg', {
      'text-ems-yellow-light': path === pathName,
    });
  };

  return (
    <div className="w-full bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <CUMenu>
            {paths.map((path: Path) => (
              <MenuItem key={path.id}>
                <Link href={path.url} className={buildClassName(path.url)}>
                  {path.name}
                </Link>
              </MenuItem>
            ))}
          </CUMenu>

          <div className="flex items-center">
            {/* signIn/signOut | userProfile */}
          </div>
        </div>
      </div>
    </div>
  );
};
