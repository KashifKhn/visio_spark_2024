import { SignedOut, SignUp } from "@clerk/nextjs";

const SignupPage = () => {
  return (
    <div>
      <SignedOut>
        <div className="flex justify-center items-center h-screen">
          <SignUp signInUrl="/sign-in" />
        </div>
      </SignedOut>
    </div>
  );
};

export default SignupPage;
