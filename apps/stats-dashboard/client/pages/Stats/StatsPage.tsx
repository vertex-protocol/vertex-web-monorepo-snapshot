import { NavBar } from 'client/components/NavBar';
import { StatsPageTabs } from './components/StatsPageTabs';

export function StatsPage() {
  return (
    <>
      <NavBar />
      <div className="p-4 lg:px-10">
        <StatsPageTabs />
      </div>
    </>
  );
}
