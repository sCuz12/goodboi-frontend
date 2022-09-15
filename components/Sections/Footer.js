import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import FooterNav from "./FooterNav";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";

function Footer() {
  return (
    <footer className="text-black bg-roz">
      <div className="content-center py-12 md:px-10 xl:px-40">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/**Left section */}
          <div className="flex flex-col items-center">
            <h1 className="footer_header_titles">Goodμποι</h1>
            <div className="flex items-center content-center gap-2 text-lg text-center">
              <p className="text-center ">
                <BsFillTelephoneFill size={20} color="black" />
              </p>
              <p>+357 99931226</p>
            </div>
            <div className="flex items-center content-center gap-2 text-lg text-center">
              <p className="text-center ">
                <AiOutlineMail size={20} color="black" />
              </p>
              <p>goodboishelters@gmail.com</p>
            </div>
          </div>
          {/**Middle section */}
          <div className="flex flex-col hidden text-center lg:block">
            <h1 className=" footer_header_titles">Navigation</h1>
            <FooterNav />
          </div>
          {/**Right section */}
          <div className="flex flex-col items-center">
            <div className="content-center ">
              <h1 className="footer_header_titles">Social Media</h1>
              <div className="flex items-center justify-center text-center">
                <a
                  class="text-black"
                  target="_blank"
                  href="http://www.instagram.com"
                >
                  <BsInstagram size={30} />
                </a>

                <a
                  class="text-black"
                  target="_blank"
                  href="http://www.facebook.com"
                >
                  <FiFacebook size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
