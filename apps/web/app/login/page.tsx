import { AuthFrame } from '../../components/auth/AuthFrame';
import { LoginForm } from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthFrame mode="login">
      <LoginForm />
    </AuthFrame>
  );
}
