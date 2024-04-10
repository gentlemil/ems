import Image from 'next/image';

import { Header } from '@ems/common-ui';

export default function Index() {
  return (
    <div>
      <Header>Home</Header>
      <Image
        className="absolute bottom-14 left-0"
        src="/michael-scott.png"
        alt="michael-scott"
        width={200}
        height={200}
      />
    </div>
  );
}
