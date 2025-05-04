import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Map, Calendar, BookOpen, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import CurriculumFlow from './CurriculumFlow';
import Schedule from './Schedule';
import AcademicProgress from './AcademicProgress';
import ElectiveCourses from './ElectiveCourses';

const Home = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuthStore();
  const [activeSection, setActiveSection] = React.useState('curriculum');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#EDF6F9]">
      <header className="bg-[#006D77] text-white py-2 shadow-lg fixed w-full z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <GraduationCap size={32} />
            <div className="text-[10px] leading-tight sm:text-sm">
              <div className="font-bold">ÓBUDAI EGYETEM</div>
              <div>ELEKTRONIKUS ÉS DIGITÁLIS</div>
              <div>TANANYAGOK IRODA</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <Menu size={24} />
            </button>

            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleSectionChange('curriculum')}
                className={`text-white hover:text-[#83C5BE] transition-colors ${
                  activeSection === 'curriculum' ? 'text-[#83C5BE]' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Map size={20} />
                  <span>Curriculum</span>
                </div>
              </button>
              <button 
                onClick={() => handleSectionChange('schedule')}
                className={`text-white hover:text-[#83C5BE] transition-colors ${
                  activeSection === 'schedule' ? 'text-[#83C5BE]' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>Schedule</span>
                </div>
              </button>
              <button 
                onClick={() => handleSectionChange('progress')}
                className={`text-white hover:text-[#83C5BE] transition-colors ${
                  activeSection === 'progress' ? 'text-[#83C5BE]' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span>Academic Progress</span>
                </div>
              </button>
            </nav>

            <div className="flex items-center ml-8">
              <span className="text-[#FFDDD2] hidden sm:block">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white hover:text-[#FFDDD2] ml-4"
              >
                <LogOut size={20} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#005a63] mt-2">
            <div className="px-4 py-2 space-y-2">
              <button 
                onClick={() => handleSectionChange('curriculum')}
                className="w-full text-left py-2 text-white hover:text-[#83C5BE] transition-colors flex items-center gap-2"
              >
                <Map size={20} />
                <span>Curriculum</span>
              </button>
              <button 
                onClick={() => handleSectionChange('schedule')}
                className="w-full text-left py-2 text-white hover:text-[#83C5BE] transition-colors flex items-center gap-2"
              >
                <Calendar size={20} />
                <span>Schedule</span>
              </button>
              <button 
                onClick={() => handleSectionChange('progress')}
                className="w-full text-left py-2 text-white hover:text-[#83C5BE] transition-colors flex items-center gap-2"
              >
                <BookOpen size={20} />
                <span>Academic Progress</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-14">
        {activeSection === 'curriculum' && (
          <section className="min-h-screen bg-white py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center mb-4">
                <Map size={28} className="text-[#006D77] mr-3" />
                <h2 className="text-2xl font-bold text-[#006D77]">Curriculum Map</h2>
              </div>
              <CurriculumFlow />
              <ElectiveCourses />
            </div>
          </section>
        )}

        {activeSection === 'schedule' && (
          <section className="min-h-screen bg-white py-4">
            <Schedule />
          </section>
        )}

        {activeSection === 'progress' && (
          <section className="min-h-screen bg-white py-4">
            <AcademicProgress />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;