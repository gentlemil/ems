import Link from 'next/link';

import { Menu, MenuItem } from '@ems/common-ui';

export const Footer = () => {
  return (
    <div className="mt-auto bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <Menu>
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/about">About</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/contact">Contact</Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
