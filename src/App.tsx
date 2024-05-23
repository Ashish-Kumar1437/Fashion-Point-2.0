import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { Landing } from "./Layouts/Layouts";
import { AuthContextProvider } from "./Contexts/AuthContext";
import HttpService, {
  HttpService as HttpServiceClass,
} from "./Services/HttpService";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import { ANIMATION_CONSTANTS } from "./Constants/Assets";

function App() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/home");
      setLoading(false);
      return;
    }

    HttpService.fetchUser()
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUser(response.data);
          console.log(response.data);
          HttpServiceClass.USER_ID = response.data.id;
          setLoading(false);
          // navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => navigate("/login"));
  }, []);

  return (
    <AuthContextProvider value={{ user, setUser }}>
      {loading && (
        <div className="loader">
          <Lottie animationData={ANIMATION_CONSTANTS.LOADER} loop={true} />{" "}
        </div>
      )}
      {!loading && (
        <>
          <Toaster />
          <Routes>
            <Route path="/*" element={<Landing />}></Route>
          </Routes>
        </>
      )}
    </AuthContextProvider>
  );
}

export default App;
