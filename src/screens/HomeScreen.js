import Banner from "../components/Banner";
import Banner2 from "../components/Banner2";
import BestSelling from "../components/BestSelling";
import ReactPlayer from "react-player/lazy";
import Banner3 from "../components/Banner3";
import Banner4 from "../components/Banner4";

const HomeScreen = () => {
  return (
    <div className="homescreen container-fluid px-0 mx-0">
      <ReactPlayer
        url="https://res.cloudinary.com/donxjonx/video/upload/v1636644326/cavalieri/202111-11-0_yt7umc.mp4"
        playing={true}
        loop={true}
        volume={0}
        muted={true}
        width="100%"
        height="70vh"
      />
      <Banner />
      <BestSelling />
      <Banner2 />
      <Banner3 />
      <Banner4 />
    </div>
  );
};

export default HomeScreen;
