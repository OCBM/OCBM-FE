import Logo from '@/assets/images/logo.jpg';
import { Button, Input } from '@/components';

const ResetPassword = ({ onChange, formData, handleForgotPassword, forgotPasswordBack }: any) => {
  return (
    <div className="flex flex-col items-center">
      <div className=" h-fit w-[380px] rounded-3xl flex-col flex  items-center border bg-white">
        <div className="pt-[50px] pb-5 px-10 flex justify-center items-center flex-col w-full">
          <img src={Logo} />
          <div className="w-full">
            {formData?.reset ? (
              <>
                <div className="flex justify-center items-center">
                  <p className="text-base font-medium italic text-black mt-[60px]">Enter Your user name</p>
                </div>
                <div className="pt-10 w-full">
                  <Input
                    parentClassName="w-full"
                    name="userName"
                    value={formData?.userName}
                    onChange={onChange}
                    placeholder="User Name"
                    className="p-5 border border-grey-dark text-grey-light capitalize"
                  />
                </div>
                <div className="pt-5">
                  <Button label="Continue" className="w-full cursor-pointer" onClick={handleForgotPassword} />
                </div>
                <div className="pt-[10px]">
                  <Button
                    label="Back"
                    variant="secondary"
                    className="w-full cursor-pointer"
                    onClick={forgotPasswordBack}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <p className="text-base font-medium italic text-black mt-[60px]">Set New Password</p>
                </div>
                <div className="pt-[30px] w-full">
                  <Input
                    type="password"
                    name="newPassword"
                    value={formData?.newPassword}
                    onChange={onChange}
                    placeholder="Enter New Password"
                    className="py-5 pr-[10px] pl-7 border border-grey-dark text-grey-light"
                  />
                </div>
                <div className="pt-[18px] w-full">
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData?.confirmPassword}
                    onChange={onChange}
                    placeholder="Confirm New Password"
                    className="py-5 pr-[10px] pl-7 border border-grey-dark text-grey-light"
                  />
                </div>
                <div className="w-full pt-5">
                  <Button label="Continue" className="w-full cursor-pointer" onClick={forgotPasswordBack} />
                </div>
                <div className="pt-[10px]">
                  <Button
                    label="Back"
                    variant="secondary"
                    className="w-full cursor-pointer"
                    onClick={() => forgotPasswordBack(true)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="pt-10 text-white font-Poppins font-normal text-[10px]">All Rights Reserved. &copy; 2023</span>
    </div>
  );
};
export default ResetPassword;
