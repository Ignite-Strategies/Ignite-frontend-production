import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Route name mapping for display
const routeNames = {
  'growth-dashboard': 'Dashboard',
  'companydashboard': 'Company Dashboard',
  'proposals': 'Proposals',
  'settings': 'Settings',
  'contacts': 'Contacts',
  'attract': 'Attract',
  'engage': 'Engage',
  'nurture': 'Nurture',
  'assessment': 'Assessment',
  'company': 'Company',
  'company/create-or-choose': 'Company Setup',
  'companyprofile': 'Company Profile',
  'profilesetup': 'Profile Setup'
};

export default function Breadcrumb({ customItems }) {
  const location = useLocation();
  
  // If custom items provided, use those
  if (customItems && customItems.length > 0) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        {customItems.map((item, index) => {
          const isLast = index === customItems.length - 1;
          
          return (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              {isLast ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link 
                  to={item.path} 
                  className="hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    );
  }
  
  // Auto-generate from pathname
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Always include Dashboard as home
  const breadcrumbItems = [
    { path: '/growth-dashboard', label: 'Dashboard' }
  ];
  
  // Build breadcrumb items from path
  let currentPath = '';
  pathnames.forEach((name, index) => {
    currentPath += `/${name}`;
    const isLast = index === pathnames.length - 1;
    
    // Get display name from mapping or format the route name
    const displayName = routeNames[name] || 
      name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    breadcrumbItems.push({
      path: currentPath,
      label: displayName,
      isLast
    });
  });
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
            {isLast ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <Link 
                to={item.path} 
                className="hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

