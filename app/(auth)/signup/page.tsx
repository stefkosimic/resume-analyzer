import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us to start analyzing resumes and getting valuable insights"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
