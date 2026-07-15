import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import Backdrop from './Backdrop';
import AppSidebar from './AppSidebar';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import { getBreadcrumbConfig } from '../utils/breadcrumbConfig';

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const location = useLocation();
  const breadcrumbConfig = getBreadcrumbConfig(location.pathname, location.state);

  // AppLayout hanya dipasang di bawah ProtectedOutlet (lihat AppRoutes.tsx),
  // jadi chrome dashboard selalu ditampilkan di sini.
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered
            ? 'lg:ml-[290px] lg:max-w-[calc(100%-290px)]'
            : 'lg:ml-[90px] lg:max-w-[calc(100%-90px)]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto  md:p-6 ">
          <div className="mx-4">
            {breadcrumbConfig && (
              <PageBreadcrumb
                pageTitle={breadcrumbConfig.title}
                breadcrumbs={breadcrumbConfig.breadcrumbs}
              />
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
