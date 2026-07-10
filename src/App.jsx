import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Challenges from './components/Challenges.jsx';
import Community from './components/Community.jsx';
import AISection from './components/AISection.jsx';
import ESGBrands from './components/ESGBrands.jsx';
import Trust from './components/Trust.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);

  return (
    <div
      style={{
        fontFamily: "'Manrope', sans-serif",
        color: '#2F3A3D',
        background: '#F7F3E9',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Nav />
      <Hero onOpenChat={openChat} />
      <Features />
      <HowItWorks />
      <Challenges />
      <Community />
      <AISection onOpenChat={openChat} />
      <ESGBrands />
      <Trust />
      <FinalCTA />
      <Footer />
      <ChatWidget open={chatOpen} onOpen={openChat} onClose={closeChat} />
    </div>
  );
}
