import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import('./Home'));
const ModalWithButton = lazy(() => import('./ModalWithButton'));
const SlackLoginButton = lazy(() => import('./slack'));
const RegisterRepoDetail = lazy(() => import('./registerRepo'));
const LogInUser = lazy(() => import('./login'));
const RegisterUser = lazy(() => import('./register'));
const GitHubLogin = lazy(() => import('./gihtublogin'));
const SlackLogin = lazy(() => import('./slackLogin'));
const SlackAccountTable = lazy(() => import('./slackAccount'));

function App() {
  return (
    <Suspense fallback="<h1>Loading.....</h1>">
      <Routes>
        <Route path="/" element={<LogInUser />} />
        <Route path="/signuppage" element={<RegisterUser />} />
        <Route path="/home/:id/:token" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id/:access_token" element={<Home />} />
        <Route path="/slacklogin/:access_token/:team/:app_id" element={<SlackLogin />} />
        <Route path="/slackaccount" element={<SlackAccountTable />} />
        <Route path="/thankyou/:id" element={<ModalWithButton />} />
        <Route path="/slack/:id" element={<SlackLoginButton />} />
        <Route path="/githublogin/:oauthToken/:user_name/:git_account_id" element={<GitHubLogin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
