import Carousel from "../../components/shared/Carousel";
import HomeNavbar from "../../components/shared/HomeNav";

function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-base-200 relative">
      {/* Header/Navigation - Added z-[100] to ensure it stays on top */}
      <HomeNavbar />

      {/* Hero Carousel - Added pointer-events-none to overlay */}
      <div className="relative">
        <Carousel />
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"></div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-primary text-base-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                 Lightning  Minds in <span className="text-secondary">As-Salt</span>
              </h2>

<div className="relative">
  <div className="h-1 w-20 bg-secondary transition-all duration-300 hover:w-96"></div>
</div>


              <p className="text-xl leading-relaxed">
                At Thinking Flares School in the historic city of As-Salt, we 
                cultivate lifelong learning and critical thinking. Rooted in 
                Jordan's UNESCO-recognized legacy, we empower young minds to 
                thrive in our evolving world.
              </p>
            </div>

            {/* Logo Image */}
            <div className="flex-shrink-0 bg-base-100 p-6 rounded-xl shadow-xl">
              <img
                src="/Logo-without-bg.png"
                alt="School Logo"
                className="w-48 md:w-64 transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Leadership
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>

          {/* General Administrator */}
          <div className="flex flex-col items-center mb-16">
            <div className="bg-base-100 p-1 rounded-full shadow-lg mb-6">
              <div className="w-40 h-40 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg font-medium">Administrator Photo</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              General Administrator
            </h3>
            <p className="text-lg">Dr. Bushra Al-Matari</p>
          </div>

          {/* Administrators */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-8">
              Academic Directors
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div className="bg-base-100 p-1 rounded-full shadow-lg mb-4">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary">Director Photo</span>
                    </div>
                  </div>
                  <p className="font-medium">Director {item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Gradient */}
      <div className="h-16 bg-gradient-to-b from-base-200 to-primary/10"></div>
    </div>
  );
}

export default Home;