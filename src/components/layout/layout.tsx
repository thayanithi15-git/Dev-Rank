import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { useSidebarStore } from '@/store/layoutStore';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { Toast } from '@/utils/toast/toast';
import { useToastStore } from '@/utils/toast/store';

interface LayoutWrapperProps {
  children: React.ReactNode;
  headerTitle?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
  contentClassName?: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  headerTitle,
  showSidebar = true,
  showHeader = true,
  className,
  contentClassName
}) => {
  const { isOpen } = useSidebarStore();
      const { showToast, toast, hideToast } = useToastStore();

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            description={toast.description}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </AnimatePresence>
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content Area */}
      <div className={cn(
        "flex flex-col",
        showSidebar && (isOpen ? "ml-64" : "ml-16"),
        "transition-all duration-300 ease-in-out"
      )}>
        {/* Header */}
        {/* {showHeader && <Header title={headerTitle} />} */}

        {/* Main Content */}
        <main className={cn(
          "flex-1",
          showHeader ? "min-h-[calc(100vh-3.5rem)]" : "min-h-screen",
          contentClassName
        )}>
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => useSidebarStore.getState().closeSidebar()}
        />
      )}
    </div>
  );
};

export default LayoutWrapper;