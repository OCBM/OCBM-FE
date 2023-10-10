import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '@/assets/images';
import { Button, Input } from '@/components';
import LoginLayout from './layout';
import ResetPassword from './ResetPassword';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { SITEMAP } from '@/utils/sitemap';
import { loginUser } from '@/redux/slices/authSlice';

const LoginCard = () => {
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    reset: false,
  });

  const { user } = useAppSelector((store: RootState) => store?.auth) || {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(SITEMAP.base.index, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const loginSubmit = () => {
    const { username, password } = formData;
    if (!username || !password) {
      toast.warn('Provide All Fields');
      return;
    }
    dispatch(loginUser({ username, password }));
  };

  const handleForgotPassword = (val: boolean) => {
    if (!formData?.reset === val) {
      setShowForgotPassword(!showForgotPassword);
      setFormData((prevState) => ({ ...prevState, reset: true }));
    } else {
      setFormData((prevState) => ({ ...prevState, reset: false }));
    }
  };

  const forgotPasswordBack = (val: boolean) => {
    if (!formData?.reset === val) {
      setFormData((prevState) => ({ ...prevState, reset: true }));
    } else {
      setShowForgotPassword(!showForgotPassword);
    }
  };

  const loginBtnClass = classNames(`w-full
  ${formData?.username.length < 6 || formData?.password.length < 8 ? 'cursor-not-allowed' : 'cursor-pointer'}`);

  return (
    <LoginLayout>
      {showForgotPassword ? (
        <ResetPassword
          onChange={inputHandler}
          formData={formData}
          handleForgotPassword={handleForgotPassword}
          forgotPasswordBack={forgotPasswordBack}
        />
      ) : (
        <div className="flex flex-col items-center">
          <div className=" h-fit w-[380px] rounded-3xl border bg-white">
            <div className="pt-[50px] pb-5 px-10 flex justify-center items-center flex-col w-full">
              <div className="w-[300px]">
                <Logo className="w-full" />
                <div className="w-full">
                  <div className="flex justify-center items-center flex-col">
                    <p className="font-GothamMedium text-base font-medium italic text-black pt-[50px]">Login</p>
                    <div className="pt-10 w-full">
                      <Input
                        name="username"
                        value={formData.username}
                        placeholder="User Name*"
                        className="p-5 border border-grey-dark text-grey-light"
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="pt-[18px] w-full">
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password*"
                        className="p-5 border border-grey-dark text-grey-light"
                        onChange={inputHandler}
                      />
                    </div>
                    <p
                      className="py-5 font-medium text-base text-textThemeColor cursor-pointer"
                      onClick={() => handleForgotPassword(true)}
                    >
                      <i>Forgot Password</i>
                    </p>
                    <div className="w-full">
                      <Button label="Log In" className={loginBtnClass} onClick={loginSubmit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="pt-10 text-white font-Poppins font-normal text-[10px]">
            All Rights Reserved. &copy; 2023
          </span>
        </div>
      )}
    </LoginLayout>
  );
};

export default LoginCard;
