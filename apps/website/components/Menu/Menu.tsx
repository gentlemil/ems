'use client';

import Link from 'next/link';
import { Menu as CUMenu, MenuItem, classMerge } from '@ems/common-ui';
import { usePathname } from 'next/navigation';

export const Menu = () => {
  const pathName = usePathname();
  console.log(pathName);

  const buildClassName = (path: string) => {
    return classMerge('text-lg', {
      'text-ems-yellow-light': path === pathName,
    });
  };

  return (
    <div className="bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <CUMenu>
            <MenuItem>
              <Link href="/" className={buildClassName('/')}>
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="about/" className={buildClassName('/about')}>
                About
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/review" className={buildClassName('/review')}>
                Reviews
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/review/add"
                className={buildClassName('/review/add')}
              >
                Add review
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/contact" className={buildClassName('/contact')}>
                Contact
              </Link>
            </MenuItem>
          </CUMenu>

          <div className="flex items-center">
            {/* signIn/signOut | userProfile */}
          </div>
        </div>
      </div>
    </div>
  );
};
