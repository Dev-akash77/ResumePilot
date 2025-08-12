import bg from "../../assets/Images/gradientBackground.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import logo from "../../assets/Images/favicon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";
import { useEffect } from "react";
import Features from "./Features";
import { useLoginStatus } from "./../../Hook/useLoginStatus";
import useLenisScroll from './../../Animation/Lenis';

const Home = () => {
    const lenisRef = useLenisScroll();

  const dispatch = useDispatch();
  const isLoginUser = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const { data, isError, isLoading } = useLoginStatus();

  useEffect(() => {
    if (data?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
    if (isError) {
      dispatch(LogoutAuth());
    }
  }, [data]);

  const company = [
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg",
  ];

  if (isLoading) {
    return <div className="h-screen w-screen cc">Loading....</div>;
  }


  return (
    <>
      {/* Landing Page */}
      <div
        className="h-[100dvh] w-screen cc"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <header className="cc h-[5rem] w-full">
          <div className="container fcb">
            <div className="w-max fc gap-1">
              <img src={logo} alt="logo" />
              <h2 className="md:text-[1.7rem] text-[1.4rem] text-blue font-semibold">
                ResumePilot
              </h2>
            </div>

            {!isLoginUser ? (
              <button
                className="bg-blue text-white rounded-full md:px-10 px-3 py-3 cursor-pointer fc gap-2"
                onClick={() => navigate("/auth")}
              >
                Get Started <FaArrowRightLong />
              </button>
            ) : (
              <div
                className="rounded-full overflow-hidden w-[2.5rem] h-[2.5rem] cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/130483894?v=4"
                  alt="user"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </header>

        {/* Hero */}
        <div className="container cc relative">
          <h1 className="md:text-[4.8rem] font-semibold md:leading-[6rem] text-[1.7rem] text-center">
            Create perfect resume <br />
            with <span className="text-blue">AI tools</span>
          </h1>
          <p className="text-gray-600 md:w-[55%] text-center mt-2">
            Create standout resumes designed to pass ATS and impress recruiters.
            Powered by AI, ResumePilot helps you craft professional,
            keyword-optimized resumes in minutes.
          </p>

          <div className="flex items-center flex-col md:flex-row justify-center gap-4 mt-[1.5rem]">
            <button className="w-[15rem] text-[1rem] py-3 rounded-md bg-blue text-white cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              Start building resume
            </button>
            <button className="w-[15rem] text-[1rem] py-3 rounded-md bg-white border-2 border-gray-300 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              Watch demo
            </button>
          </div>

          <div className="fc gap-5 mt-7">
            <img
              src="https://quickai-gs.vercel.app/assets/user_group-0QXdEEwx.png"
              alt="many user"
              className="w-[6.5rem]"
            />
            <p className="text-gray-600">Trusted by 10k+ people</p>
          </div>

          {/* Company Logos Slider */}
          <div className="absolute md:bottom-[3rem] bottom-[2rem] overflow-hidden w-full">
            <div className="logo-scroll-container">
              <div className="logo-strip">
                {[...company, ...company].map((logo, i) => (
                  <img
                    src={logo}
                    key={i}
                    className="logo-img"
                    alt="company logo"
                  />
                ))}
              </div>
            </div>
            <div className="left-gradient absolute top-0 left-0 h-full w-20 pointer-events-none z-10"></div>
            <div className="right-gradient absolute top-0 right-0 h-full w-20 pointer-events-none z-10"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Features />
    </>
  );
};

export default Home;
