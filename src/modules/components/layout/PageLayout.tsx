import DockSidebar from '../DockSidebar';
import { DOCK_POSITIONING, LAYOUT_CLASSES } from './LayoutConstants';

interface PageLayoutProps {
  children: React.ReactNode;
  dockPosition?: 'standard' | 'calendar';
}

export default function PageLayout({ children, dockPosition = 'standard' }: PageLayoutProps) {
  return (
    <div className={LAYOUT_CLASSES.FULL_SCREEN}>
      <div className={LAYOUT_CLASSES.FULL_SCREEN_RELATIVE}>
        {children}
        
        {/* Dock positioning */}
        <div className={dockPosition === 'standard' ? DOCK_POSITIONING.STANDARD : DOCK_POSITIONING.CALENDAR}>
          <DockSidebar />
        </div>
      </div>
    </div>
  );
}