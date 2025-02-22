import { Button } from "primereact/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-blue-600 text-black p-8 flex flex-col md:flex-row justify-between items-center rounded-2xl transition-all duration-300 ease-in-out">
      <div className="bg-black text-white p-6 rounded-2xl max-w-sm text-center transition-transform transform hover:scale-105">
        <h2 className="text-blue-400 text-2xl font-bold">Enatega</h2>
        <p className="mt-2 text-sm">
          Enatega is an open-source delivery management platform for the future. We prioritize innovation,
          flexibility, and affordability, and offer a scalable, customizable solution that streamlines your delivery processes.
        </p>
      </div>
      <div className="text-center mt-6 md:mt-0">
        <h3 className="text-xl font-bold">Links</h3>
        <ul className="space-y-2 mt-2">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="font-bold hover:underline">Privacy Policy</a></li>
          <li><a href="#" className="font-bold hover:underline">Terms & Conditions</a></li>
        </ul>
        <p className="text-sm mt-4">Enatega – © 2022 All Rights Reserved</p>
      </div>
      <div className="text-center mt-6 md:mt-0">
        <h3 className="text-xl font-bold">Follow Us</h3>
        <div className="flex justify-center space-x-4 mt-2">
          <Button icon={<FaFacebookF />} className="p-button-rounded p-button-text text-black bg-white transition-transform transform hover:scale-110" />
          <Button icon={<FaTwitter />} className="p-button-rounded p-button-text text-black bg-white transition-transform transform hover:scale-110" />
          <Button icon={<FaInstagram />} className="p-button-rounded p-button-text text-black bg-white transition-transform transform hover:scale-110" />
          <Button icon={<FaLinkedinIn />} className="p-button-rounded p-button-text text-black bg-white transition-transform transform hover:scale-110" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
