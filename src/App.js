import Home from "./Pages/Home";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./providers/redux/store";
import toast, { ToastBar, Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/invite/:id" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
