import Navbar from "./components/navbar/page";
import SearchPlaces from "./components/SearchPlaces/page";
import UserLocationButton from "./components/userLocation/page";
import NearbyRestaurants from "./components/NearbyResturants/page";
import Footer from "./components/Footer/footer";
import GoogleMapWrapper from "./components/GoogleMapWrapper/GoogleMapWrapper";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <SearchPlaces/>
      <GoogleMapWrapper/>
      <UserLocationButton/>
      <NearbyRestaurants/>
      <Footer/>
    </div>
  );
}



