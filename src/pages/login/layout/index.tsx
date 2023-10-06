import { LoginLeftContent } from '../LoginLeftContent';

const LoginLayout = ({ children }: any) => {
  return (
    <div className="bg-login-bg-image h-screen bg-no-repeat bg-center bg-cover">
      <div className="w-full flex items-center h-screen">
        <LoginLeftContent />
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
