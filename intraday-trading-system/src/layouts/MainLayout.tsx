import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminLoginModal from '../components/AdminLoginModal';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-page-bg">
      {/* Fixed Sidebar */}
      <Sidebar onLoginClick={() => setIsLoginModalOpen(true)} />

      {/* Fixed Main Content - NO SCROLLING */}
      <div className="flex-1 h-screen no-scroll">
        <main className="h-full overflow-hidden p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export { MainLayout };