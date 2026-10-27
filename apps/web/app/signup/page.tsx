import { AuthFrame } from '../../components/auth/AuthFrame';
import { SignupForm } from '../../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthFrame mode="signup">
      <SignupForm />
    </AuthFrame>
  );
}
