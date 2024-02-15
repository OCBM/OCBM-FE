import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import Logo from '@/assets/images/logo.jpg';
import { Button, Input } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/redux/store';
import { SITEMAP } from '@/utils/sitemap';
import { loginUser } from '@/redux/slices/authSlice';
import LoginLayout from './layout';
import ResetPassword from './ResetPassword';
import { LOGIN_CONSTANTS } from '@/utils/constants';
import { PasswordNotVisible, PasswordVisible } from '@/assets/icons';

const LoginCard = () => {
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState('password');

  const [formData, setFormData] = useState({
    userName: '',
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
      navigate(SITEMAP.plant.index, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const loginSubmit = () => {
    const { userName, password } = formData;
    if (!userName || !password) {
      toast.warn('Provide All Fields');
      return;
    }
    dispatch(loginUser({ userName, password }));
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
  const disablingLoginButton = () => {
    return formData.userName && formData.password ? false : true;
  };
  const loginBtnClass = classNames(`w-full
  ${formData?.userName.length < 6 || formData?.password.length < 8 ? 'cursor-not-allowed' : 'cursor-pointer'}`);

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
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
                <img src={Logo} className="w-full" />
                <div className="w-full">
                  <div className="flex justify-center items-center flex-col">
                    <p className="text-base font-medium italic text-black pt-[50px]">Login</p>
                    <div className="pt-10 w-full">
                      <Input
                        parentClassName="w-full"
                        name="userName"
                        value={formData.userName}
                        placeholder="User Name*"
                        className="h-[54px] px-2 border text-[#444444] border-grey-dark"
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="pt-[18px] w-full">
                      <Input
                        parentClassName="w-full"
                        type={passwordType}
                        name="password"
                        value={formData.password}
                        placeholder="Password*"
                        className="h-[54px] px-2 border  text-[#444444] border-grey-dark"
                        onChange={inputHandler}
                        rightIcon={
                          <>
                            {formData.password.trim() !== '' ? (
                              <div onClick={togglePassword} className="cursor-pointer">
                                {passwordType === 'password' ? (
                                  <PasswordNotVisible className="h-[16px]" />
                                ) : (
                                  <PasswordVisible className="h-[16px]" />
                                )}
                              </div>
                            ) : null}
                          </>
                        }
                      />
                    </div>
                    <p
                      className=" opacity-50 cursor-not-allowed py-5 font-medium text-base text-textThemeColor "
                      // onClick={() => handleForgotPassword(true)}
                    >
                      <i>Forgot Password</i>
                    </p>
                    <div className="w-full">
                      <Button
                        disabled={disablingLoginButton()}
                        label="Log In"
                        className={loginBtnClass}
                        onClick={loginSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="pt-10 text-white font-Poppins font-normal text-[10px]">{LOGIN_CONSTANTS.copyrights}</span>
        </div>
      )}
    </LoginLayout>
  );
};

export default LoginCard;
