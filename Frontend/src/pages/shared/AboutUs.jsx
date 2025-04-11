import Carousel from "../../components/shared/Carousel";
import HomeNav from "../../components/shared/HomeNav";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Header/Navigation */}
      <HomeNav />

      {/* Carousel */}
      <Carousel />

      <div className="divider divider-primary"></div>

      <div className="bg-gray-200 p-6 rounded-md">
        {/* General Administrator */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary w-40 h-52 rounded-md flex flex-col items-center p-2">
            <div className="bg-base-100 w-24 h-24 rounded-full mb-2"></div>
            <p className="text-base-100 text-center text-sm mt-2">
              General Administrator of Thinking Flares School
            </p>
          </div>

          {/* Department Managers */}
          <div className="flex gap-56 mt-5">
            {/* Department Manager 1 */}
            <div className="bg-primary w-40 h-52 rounded-md flex flex-col items-center p-2">
              <div className="bg-base-100 w-24 h-24 rounded-full mb-2"></div>
              <p className="text-base-100 text-center text-sm mt-2">
                Department Manager of Thinking Flares School
              </p>
            </div>

            {/* Department Manager 2 */}
            <div className="bg-primary w-40 h-52 rounded-md flex flex-col items-center p-2">
              <div className="bg-base-100 w-24 h-24 rounded-full mb-2"></div>
              <p className="text-base-100 text-center text-sm mt-2">
                Department Manager of Thinking Flares School
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider divider-primary"></div>

      {/* About Section */}
      <div className="bg-primary p-6 rounded-md">
        <div className="flex flex-col items-center">
          {/* Right column */}
          <div className="w-2/3 bg-base-100 h-72 rounded-md mt-4 md:mt-0">
            {/* This is where an image would go */}
          </div>

          {/* Left column - text content */}
          <div className="md:w-full p-2 mt-5">
            <h3 className="text-base-100 font-bold mb-2">
              About Thinking Flares School
            </h3>
            <p className="text-base-100 text-sm">
              Located in the UNESCO Cultural City of As-Salt, Thinking Flares
              School (Torches of Thinking School) is a pioneering educational
              institution dedicated to nurturing inquisitive minds and ethical
              leaders. Catering to students from kindergarten to elementary
              levels, our school merges Jordan's national curriculum with
              globally inspired pedagogies, emphasizing critical thinking,
              innovation, and cultural pride. Classrooms are dynamic spaces for
              hands-on, interactive learning, where students explore robotics,
              environmental science, and digital arts alongside Jordanian
              heritage projects. With a low student-to-teacher ratio,
              state-of-the-art labs, and partnerships with local innovators, we
              empower learners to solve real-world challenges while fostering
              values of community service and sustainability. Rooted in
              As-Salt's historic legacy, Thinking Flares School lights the path
              to a future where tradition and progress thrive together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
