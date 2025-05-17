import React, { useState, useEffect } from "react";
import HomeNav from "../../components/shared/HomeNav";
import {
  Book,
  Users,
  Building,
  Award,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Carousel from "../../components/shared/Carousel";

const Navbar = () => (
  <nav className='sticky top-0 z-[100] bg-white shadow-sm'>
    <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <img
          src='/logo.png'
          alt='Thinking Flares Logo'
          className='h-12 w-12 mr-3'
        />
        <span className='text-2xl font-bold text-[#8A0E31]'>
          Thinking Flares
        </span>
      </div>

      <div className='hidden md:flex items-center space-x-8'>
        <a href='#about' className='text-[#8A0E31] hover:text-[#5D0921]'>
          About
        </a>
        <a href='#team' className='text-[#8A0E31] hover:text-[#5D0921]'>
          Team
        </a>
        <a href='#values' className='text-[#8A0E31] hover:text-[#5D0921]'>
          Values
        </a>
        <button className='bg-[#8A0E31] text-white px-6 py-2 rounded-lg hover:bg-[#5D0921]'>
          Contact
        </button>
      </div>
    </div>
  </nav>
);

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (direction) => {
    setCurrentIndex(
      (prev) => (prev + direction + images.length) % images.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => handleNavigation(1), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-xl'>
      <div className='absolute inset-0'>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className='w-full h-full object-cover object-center'
        />
        {images[currentIndex].caption && (
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6'>
            <p className='text-white text-lg md:text-xl font-medium'>
              {images[currentIndex].caption}
            </p>
          </div>
        )}
      </div>

      <div className='absolute top-1/2 w-full flex justify-between px-4'>
        <button
          onClick={() => handleNavigation(-1)}
          className='bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm'>
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleNavigation(1)}
          className='bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm'>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className='relative bg-gradient-to-r from-[#8A0E31] to-[#8A0E31] text-white py-16 md:py-24'>
    <div className='container mx-auto text-center max-w-3xl px-4'>
      <h1 className='text-4xl md:text-5xl font-bold mb-6'>
        About <span className='text-[#FAC67A]'>Thinking Flares</span>
      </h1>
      <p className='text-lg md:text-xl opacity-90 mb-8'>
        Igniting curious minds in the heart of As-Salt
      </p>
    </div>
  </section>
);

const StaffCard = ({ name, role, imageUrl }) => (
  <div className='relative overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-64 h-80'>
    <div className='absolute -right-4 -top-4 w-16 h-16 bg-[#FAC67A] rounded-full opacity-50' />
    <div className='h-full flex flex-col items-center p-6'>
      <div className='w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg'>
        <img src={imageUrl} alt={name} className='w-full h-full object-cover' />
      </div>
      <h3 className='text-xl font-bold text-[#8A0E31] mb-1'>{name}</h3>
      <div className='w-12 h-1 bg-[#8A0E31] mb-3' />
      <p className='text-gray-600 text-center'>{role}</p>
    </div>
  </div>
);

const TeamSection = ({ staff }) => (
  <section id='team' className='py-16 bg-white'>
    <div className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center text-[#8A0E31] mb-12'>
        Leadership Team
      </h2>
      <div className='flex flex-wrap justify-center gap-8'>
        {staff.map((member, i) => (
          <StaffCard key={i} {...member} />
        ))}
      </div>
    </div>
  </section>
);

const ValueCard = ({ icon, title, description }) => (
  <div className='bg-gradient-to-br from-white to-[#F8F4F5] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg'>
    <div className='flex items-center mb-4'>
      <div className='p-3 bg-[#8A0E31] rounded-full text-white mr-4'>
        {icon}
      </div>
      <h3 className='text-xl font-bold text-[#8A0E31]'>{title}</h3>
    </div>
    <p className='text-gray-600'>{description}</p>
  </div>
);

const ValuesSection = () => (
  <section id='values' className='py-16 bg-[#F8F4F5]'>
    <div className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center text-[#8A0E31] mb-12'>
        Our Core Values
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <ValueCard
          icon={<Book size={24} />}
          title='Academic Excellence'
          description='Commitment to highest educational standards and lifelong learning'
        />
        <ValueCard
          icon={<Users size={24} />}
          title='Community Focus'
          description='Building strong relationships with students, parents, and community'
        />
        <ValueCard
          icon={<Globe size={24} />}
          title='Global Citizenship'
          description='Developing responsible citizens for a interconnected world'
        />
      </div>
    </div>
  </section>
);

function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Bushra Al-Matari",
      role: "General Administrator",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
    {
      name: "Motaz Abudraiea",
      role: "Academic Director",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      name: "Renad Abudraiea",
      role: "Academic Director",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      name: "Mohamad Abudraiea",
      role: "Academic Director",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      name: "Rahaf Abudraiea",
      role: "Academic Director",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
  ];

  const carouselImages = [
    {
      src: "TFS.jpg",
      alt: "State-of-the-art Facilities",
      caption: "State-of-the-art Facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      alt: "Interactive Learning Environment",
      caption: "Interactive Learning Environment"
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <HomeNav />
      <HeroSection />

      {/* Carousel Section */}
      <section className="w-full max-w-screen-2xl mx-auto py-12 px-4">
        <ImageCarousel images={carouselImages} />
      </section>

      <TeamSection staff={teamMembers} />
      <ValuesSection />
    </div>
  );
}

export default AboutUs;