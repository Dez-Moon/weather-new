import { useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { applicationInitializationTC } from "./state/app-reducer";
import CitySelectionBlock from "./components/CitySelectionBlock/CitySelectionBlock";
import Main from "./Main";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";

function App() {
  const applicationIsInitialization = useSelector<AppRootStateType>(
    (state) => state.app.applicationIsInitialization
  );
  const dispatch = useDispatch();
  useEffect(() => {
    applicationInitializationTC()(dispatch);
  }, []);
  if (!applicationIsInitialization) return <div>Loading</div>;
  return (
    <div className='App'>
      <ErrorSnackbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/select' element={<CitySelectionBlock />} />
      </Routes>
    </div>
  );
}

export default App;
