import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logo from "./media/logo 1.png";

const Footer = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="px-8 py-4 border-t-2 border-[#cf35f5]">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center lg:w-1/2 mb-8 lg:mb-0">
            <div className=" p-4 rounded-full shadow-md">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=800"
                alt="Terra List"
                className="w-16 h-auto"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 text-center text-gray-800">
              <FontAwesomeIcon
                className="text-[#cf35f5] mr-2"
                icon="location-pin"
              />
              Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
            </div>
            <div className="flex flex-col lg:flex-row justify-center text-gray-800">
              <div className="flex flex-col lg:w-1/2 mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon
                    className="text-[#cf35f5] mr-2"
                    icon="phone"
                  />
                  (123) 456-7890
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon className="text-[#cf35f5] mr-2" icon="fax" />
                  (123) 456-7890
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </a>
              <a
                href="https://plus.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "google-plus"]} />
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cf35f5] hover:text-[#d43f0b] transition-colors"
              >
                <FontAwesomeIcon icon={["fab", "pinterest"]} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 bg-gray-200">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto">
          <div className="text-center mb-4 lg:mb-0">
            <p className="text-gray-800 text-sm">
              <a
                href="/about"
                className="hover:text-[#cf35f5] transition-colors mr-4"
              >
                ABOUT US
              </a>
              <a
                href="/contact"
                className="hover:text-[#cf35f5] transition-colors mr-4"
              >
                CONTACT US
              </a>
              <a
                href="/help"
                className="hover:text-[#cf35f5] transition-colors mr-4"
              >
                HELP
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-[#cf35f5] transition-colors mr-4"
              >
                PRIVACY POLICY
              </a>
              <a
                href="/disclaimer"
                className="hover:text-[#cf35f5] transition-colors"
              >
                DISCLAIMER
              </a>
            </p>
          </div>
          <div className="text-center text-gray-600 text-xs">
            Copyright &copy; 2020 Minimumlivingcost. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
