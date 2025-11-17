import { useState } from "react";
import Popup from "./components/Popup";

function App() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}

export default App;
