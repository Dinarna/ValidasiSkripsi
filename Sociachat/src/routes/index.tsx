import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import {
  Dashboard,
  Login,
  NoPage,
  NewProject,
  KeywordCrawling,
  DetailOfTopic,
  Analyst,
  Register,
} from "@/pages";

function BaseRoute() {
  return (
    <Routes>
      <Route index element={<PrivateRoute />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="create-project" element={<NewProject />} />
        <Route
          path="create-project/keyword-crawling"
          element={<KeywordCrawling />}
        />
        <Route
          path="create-project/detail-of-topic"
          element={<DetailOfTopic />}
        />
      </Route>
      <Route path="/analysis" element={<Analyst />} />
      {/* </Route> */}
      {/* <Route element={<UnprotectedRoute />}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* </Route> */}

      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default BaseRoute;
