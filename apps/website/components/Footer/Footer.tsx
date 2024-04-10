import Link from 'next/link';

import { Menu, MenuItem } from '@ems/common-ui';

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
    name: 'Contact',
    url: '/contact',
  },
];

export const Footer = () => {
  return (
    <div className="mt-auto bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <Menu>
          {paths.map((path: Path) => (
            <MenuItem key={path.id}>
              <Link href={path.url}>{path.name}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};
