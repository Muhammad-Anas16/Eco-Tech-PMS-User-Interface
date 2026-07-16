// import { Button } from "@/components/ui/button";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const HomePage = () => {
  return (
    <div>
      {/* <h1 className="bg-primary text-primary-foreground">Hello world</h1> */}
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default HomePage;
