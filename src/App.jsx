import { Router } from "./router.jsx";
import { Provider } from "react-redux";
import store from "./services/store.js";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
