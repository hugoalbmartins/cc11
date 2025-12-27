import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
