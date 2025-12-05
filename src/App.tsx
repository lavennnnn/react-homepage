import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechCards from './components/TechCards';
import Features from './components/Features';
import Footer from './components/Footer';
import MarkdownPage from './pages/MarkdownPage';

// Home page layout component
const HomeLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-slate-300">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home route with full layout */}
        <Route element={<HomeLayout />}>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <TechCards />
                <Features />
              </>
            } 
          />
        </Route>
        
        {/* Markdown file routes - these use a different layout */}
        <Route path="/post/:filename" element={<MarkdownPage />} />
      </Routes>
    </Router>
  );
};

export default App;