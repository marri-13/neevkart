import { SignUp } from "@clerk/nextjs";
import "./sign-up.css";

export default function SignUpPage() {
  return (
    <div className="clerk-container">
      <SignUp />
    </div>
  );
}
