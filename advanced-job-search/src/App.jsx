import { useState } from "react";
import Platforms from "./components/Platforms";
import Popup from "./components/Popup";
import Navbar from "./components/Navbar";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handlePlatformClick = (platform) => {
    if (platform !== "LinkedIn") {
      setShowPopup(true);
    } else {
      window.open("https://www.linkedin.com", "_blank");
    }
  };

  return (
    <>
      <Navbar/>
      <Platforms onPlatformClick={handlePlatformClick} />

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default App;
