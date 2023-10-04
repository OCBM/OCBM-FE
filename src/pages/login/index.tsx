import LoginCard from './LoginCard';

export const Login = () => {
  // const [loginCard, setLoginCard] = useState({
  //   show: false,
  //   admin: false,
  //   user: false,
  // });

  // const clickHandler = (text: string) => {
  //   setLoginCard({
  //     show: true,
  //     admin: text === 'admin' && true,
  //     user: text === 'user' && true,
  //   });
  // };

  // const onBackClick = () => {
  //   setLoginCard({
  //     show: false,
  //     admin: false,
  //     user: false,
  //   });
  // };
  return (
    // <LoginPresentational loginCard={loginCard} clickHandler={clickHandler} backClick={backClick} />
    <LoginCard />
  );
};
