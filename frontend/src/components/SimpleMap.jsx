import Map from "./Map";
import TopNavbar from "./TopNavbar";

function SimpleMap() {
  return (
    <div>
      <TopNavbar />
      <Map attractions={[]} />
    </div>
  );
}

export default SimpleMap;
