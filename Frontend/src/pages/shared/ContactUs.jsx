import HomeNav from "../../components/shared/HomeNav";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Header/Navigation */}
      <HomeNav />

      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

          <div className="space-y-6">
            {/* Phone Number */}
            <div className="flex items-center space-x-4">
              <FaPhone className="text-primary text-2xl" />
              <div>
                <h2 className="font-bold">Phone Number</h2>
                <a
                  href="tel:0796787084"
                  className="text-blue-600 hover:underline"
                >
                  07 9678 7084
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-primary text-2xl" />
              <div>
                <h2 className="font-bold">Email</h2>
                <a
                  href="mailto:thinkingflares.school@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  thinkingflares.school@yahoo.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-primary text-2xl" />
              <div>
                <h2 className="font-bold">Location</h2>
                <a
                  href="https://www.google.com/maps?q=السلط+-+البحيرة+-+خلف+الدفاع+المدني+-+دخلة+جامع+العطيات&hl=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  As-Salt - Jordan
                </a>
              </div>
            </div>

            {/* Workdays */}
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-primary text-2xl" />
              <div>
                <h2 className="font-bold">Workdays</h2>
                <p>Saturday to Thursday from 8 AM - 3 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
