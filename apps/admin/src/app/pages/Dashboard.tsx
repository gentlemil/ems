import { Header } from '@ems/common-ui';

export const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4">
      <Header>Dashboard</Header>

      <p className="py-4 italic">
        Welcome in EMS Admin Panel. Please use the menu to navigate.
      </p>
    </div>
  );
};
