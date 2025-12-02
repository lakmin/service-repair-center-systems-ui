import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CustomerIntake from './components/CustomerIntake';
import VehicleInspection from './components/VehicleInspection';
import CustomerApproval from './components/CustomerApproval';
import JobCard from './components/JobCard';
import ServiceWorkflow from './components/ServiceWorkflow';
import DetailingWorkflow from './components/DetailingWorkflow';
import QCScreen from './components/QCScreen';
import Billing from './components/Billing';
import VehicleHistory from './components/VehicleHistory';

type View = 
  | 'login' 
  | 'dashboard' 
  | 'customer-intake' 
  | 'inspection' 
  | 'approval' 
  | 'job-card' 
  | 'service-workflow' 
  | 'detailing-workflow' 
  | 'qc' 
  | 'billing' 
  | 'history';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleNavigation = (view: View) => {
    setCurrentView(view);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' && (
        <Dashboard onNavigate={handleNavigation} />
      )}
      {currentView === 'customer-intake' && (
        <CustomerIntake onNavigate={handleNavigation} />
      )}
      {currentView === 'inspection' && (
        <VehicleInspection onNavigate={handleNavigation} />
      )}
      {currentView === 'approval' && (
        <CustomerApproval onNavigate={handleNavigation} />
      )}
      {currentView === 'job-card' && (
        <JobCard onNavigate={handleNavigation} />
      )}
      {currentView === 'service-workflow' && (
        <ServiceWorkflow onNavigate={handleNavigation} />
      )}
      {currentView === 'detailing-workflow' && (
        <DetailingWorkflow onNavigate={handleNavigation} />
      )}
      {currentView === 'qc' && (
        <QCScreen onNavigate={handleNavigation} />
      )}
      {currentView === 'billing' && (
        <Billing onNavigate={handleNavigation} />
      )}
      {currentView === 'history' && (
        <VehicleHistory onNavigate={handleNavigation} />
      )}
    </div>
  );
}