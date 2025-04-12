import Carousel from "../../components/shared/Carousel";
import HomeNavbar from "../../components/shared/HomeNav";

function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-base-200 pb-5">
      {/* Header/Navigation */}
      <HomeNavbar />

      {/* Carousel */}
      <Carousel />
      <div className="divider divider-primary"></div>

      <section className="bg-primary text-base-100 p-8 md:p-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About us</h2>
            <p className="text-lg md:text-xl leading-relaxed font-semibold">
              At Masha’el Al-Tafkeer School in the historic city of As-Salt,
              <br />
              we ignite the spark of lifelong learning and critical thinking in
              every student.
              <br />
              Rooted in Jordan’s rich cultural heritage and UNESCO-recognized
              legacy,
              <br />
              our school is a beacon of innovation, empowering young minds to
              thrive in a rapidly evolving world.
            </p>
          </div>

          {/* Logo Image */}
          <div className="flex-shrink-0">
            <img
              src="/Logo-without-bg.png"
              alt="School Logo"
              className="w-48 md:w-60"
            />
          </div>
        </div>
      </section>

      <div className="divider divider-primary"></div>

      <section className="bg-primary text-base-100 py-12">
        <div className="flex flex-col items-center gap-12 max-w-6xl mx-auto px-4">
          {/* General Administrator */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold text-center">
              General Administrator of Masha’el Al-Tafkeer
            </h3>
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          </div>

          {/* Administrators */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold">Administrators</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
              <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
              <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
              <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Department Managers */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold">Department Managers</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
