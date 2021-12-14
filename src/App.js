
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import store from "./providers/redux/store";
import toast, { ToastBar, Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
    <Toaster  position="top-right"/>
      <Home />
    </Provider>
  );
}

export default App;
