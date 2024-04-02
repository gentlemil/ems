import Link from 'next/link';
import { Menu as CUMenu, MenuItem } from '@ems/common-ui';

export const Menu = () => {
  return (
    <div className="bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <CUMenu>
            <MenuItem>
              <Link href="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/review">Reviews</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/review/add">Add review</Link>
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
