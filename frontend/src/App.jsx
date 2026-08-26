import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BatchModal from './components/BatchModal';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import HumanReview from './pages/HumanReview';
import Interventions from './pages/Interventions';
import Analytics from './pages/Analytics';

export default function App() {
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(12);

  const handleBatchCompleted = () => {
    setPendingCount((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F7F8FA] text-[#111318] flex flex-col font-sans relative overflow-hidden">
        
        {/* Global Aurora Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="aurora-blob w-[700px] h-[700px] bg-indigo-300/20 -top-[300px] -right-[100px]" style={{ animationDelay: '1s' }} />
            <div className="aurora-blob w-[500px] h-[500px] bg-purple-300/10 top-[40%] -left-[200px]" style={{ animationDelay: '3s' }} />
        </div>

        {/* Header Navigation */}
        <Header
          onOpenBatchModal={() => setIsBatchOpen(true)}
          pendingApprovalsCount={pendingCount}
        />

        {/* Main Application Routes */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard onOpenBatchModal={() => setIsBatchOpen(true)} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/review" element={<HumanReview />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#E6E8EC] bg-white py-8 text-center text-xs text-[#667085] font-mono">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-[#111318]">SaveFlow AI</span>
              <span>•</span>
              <span>RocketRide Buildathon Churn Rescue Desk</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>NovaCloud Workspace</span>
              <span>•</span>
              <span className="text-[#12B76A] font-bold">10,000 Accounts Monitored</span>
            </div>
          </div>
        </footer>

        {/* Batch Processing Modal */}
        <BatchModal
          isOpen={isBatchOpen}
          onClose={() => setIsBatchOpen(false)}
          onBatchCompleted={handleBatchCompleted}
        />

      </div>
    </Router>
  );
}
