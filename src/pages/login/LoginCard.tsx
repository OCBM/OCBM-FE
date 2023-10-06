import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/assets/images';
import { Button, Input } from '@/components';
import LoginLayout from './layout';
import ResetPassword from './ResetPassword';
import { loginUser } from '@/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';

const LoginCard = () => {
  const { user } = useAppSelector((store: RootState) => store?.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    newPassword: '',
    conformPassword: '',
  });

  useEffect(() => {
    if (user) {
      toast.success('Login successfull');
      navigate('/');
    }
  });

  const resetPasswordClick = () => {
    setShowResetPassword(!showResetPassword);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const loginSubmit = () => {
    const { username, password } = formData;
    if (!username || !password) {
      alert('provide all fields');
      return;
    }
    dispatch(loginUser({ username, password }));
  };

  return (
    <LoginLayout>
      {showResetPassword ? (
        <ResetPassword onChange={inputHandler} formData={formData} />
      ) : (
        <div className="flex flex-col items-center">
          <div className=" h-fit w-[380px] rounded-3xl border bg-white">
            <div className="pt-[50px] pb-5 px-10 flex justify-center items-center flex-col w-full">
              <div className="w-[300px]">
                <Logo className="w-full" />
                <div className="w-full">
                  <div className="flex justify-center items-center flex-col">
                    <p className="font-GothamMedium text-base font-medium italic text-[#000] pt-[50px]">Login</p>
                    <div className="pt-10 w-full">
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder="User Name*"
                        className="py-7 pl-7 border border-grey-dark text-grey-light"
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="pt-[18px] w-full">
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password*"
                        className="py-7 pl-7 border border-grey-dark text-grey-light"
                        onChange={inputHandler}
                      />
                    </div>
                    <p
                      className="py-5 font-medium text-base text-[#5F2EEA] cursor-pointer"
                      onClick={resetPasswordClick}
                    >
                      <i>Forgot Password</i>
                    </p>
                    <div className="w-full">
                      <Button
                        disabled={formData?.username.length < 6 || formData?.password.length < 6 ? true : false}
                        label="Log In"
                        className="w-full cursor-pointer"
                        onClick={loginSubmit}
                      />
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
