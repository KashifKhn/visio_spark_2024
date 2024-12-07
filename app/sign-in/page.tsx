import { SignedOut, SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div>
      <SignedOut>
        <div className="flex justify-center items-center h-screen">
          <SignIn signUpUrl="/sign-up" />
        </div>
      </SignedOut>
    </div>
  );
};

export default SignInPage;
