import React, { useRef, useEffect, useState } from "react";
import AxiosInstance from "../../components/axios";
import welcomeImg from "../../icons/welcome-image.png"
import secondCoverImg from "../../icons/cover-2.jpg";
// import eagle from "../../eagle.jpg";

import ParallaxComponent from "../../components/react-parallax";
import NavBar from "../../components/nav-bar";
import { Carousel } from "antd";
import UnifyComponent from "../../components/unify-component";
import Contact from "../../components/contact";
import { HomePageStyled } from "./style";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const contactRef = useRef(null);
const navigate = useNavigate();
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

  return (
    <>
      <NavBar scrollToContact={scrollToContact} />
      <HomePageStyled>
      <section style={{background:"#5783db"}}  className="d-flex align-items-center vh-100">
              <div
                className="container"
                data-aos="zoom-out"
                data-aos-delay="100"
              >
                <div className="d-lg-flex justify-content-center align-items-center">
                  <img className="mb-3 m-lg-0" style={{width:"60%",height:"60%"}} src={welcomeImg} alt="Equipay partners" />
                  <div className="col-xl-6 text-center p-0 p-lg-1 text-lg-start">
                    <h1
                    className="text-light"
                      style={{
                        textAlign: "center",
                        fontSize: "50px",
                        fontWeight: "bold",
                      
                      }}
                    >
                      YOUR PARTNERS IN ALL
                      <span className="text-light"> MATTERS</span> PAY
                    </h1>
                  
                    <div
                      className="mb-3 mt-5 d-lg-flex"
                      style={{
                        
                        textAlign: "center",
                
                        alignItems: "center",
                        justifyContent:"center",
                        gap: "8px",
                      }}
                    >
                <button   onClick={() => navigate("/landing")}  style={{color:'white',}} className="custom-button btn border btn-lg mb-3 m-lg-0">Price a Job</button>
                <button onClick={()=> navigate("/landing-executive")}  style={{color:'white'}} className="custom-button btn border btn-lg">Executive Compensation</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

      <section id="service" className="service ">
        <div className="container" data-aos="fade-up">
          <div className="content col-xl-12 d-flex align-items-stretch">
            <div className="col-12 section-title">
              <h2 style={{ width: "100%" }} className="col-12 ">
                Services We Offer
              </h2>
            </div>

            <div
              style={{
                paddingBottom: "10px",
                borderTop: "5px solid #78c5f1",
                width: "10%",
              }}
            ></div>
          </div>
          <div className="col-xl-12 d-flex align-items-stretch">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <img
                    src="	https://intersoftkk.com/img/infograph-icon/17.webp"
                    alt=""
                    style={{ width: "20%" }}
                  />
                  <h3 style={{ marginTop: "10px" }}>Training</h3>
                  <p>
                    We run monthly training sessions on everything related to
                    pay - benchmarking, incentives, and paylines
                  </p>
                </div>

                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <img
                    src="https://intersoftkk.com/img/infograph-icon/18.webp"
                    alt=""
                    style={{ width: "20%" }}
                  />
                  <h3 style={{ marginTop: "10px" }}>Advisory</h3>
                  <p>
                    We advice global organizations and startups to design best
                    in class incentives, remuneration and classification
                    framework, and benchmarking
                  </p>
                </div>
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <img
                    src="	https://intersoftkk.com/img/infograph-icon/15.webp"
                    alt=""
                    style={{ width: "20%" }}
                  />
                  <h3 style={{ marginTop: "10px" }}>Custom Salary Survey</h3>
                  <p>
                    We run regular custom salary surveys and also have
                    remuneration data for multiple geographies and roles
                  </p>
                </div>
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <img
                    src="	https://intersoftkk.com/img/infograph-icon/16.webp"
                    alt=""
                    style={{ width: "20%" }}
                  />
                  <h3 style={{ marginTop: "10px" }}>Sales Incentive</h3>
                  <p>
                    We design Sales Incentives for your success by working
                    closely with you to define clear and measurable objectives
                    for your Sales Incentive program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParallaxComponent
        img={secondCoverImg}
        content={
          <section>
            <div className="overflow-hidden">
              <div className="container content-space-t-3">
                <div className="row justify-content-lg-between align-items-md-center">
                  <div className="col-md-6 col-lg-5 mb-5 mb-lg-0">
                    <h1
                      className="display-4 mb-5"
                      data-aos="zoom-out"
                      data-aos-delay="100"
                    >
                      Start your journey with{" "}
                      <span className="text-primary">Equipay Partners</span>
                    </h1>

                    <div
                      className="border-top border-2 my-5"
                      style={{ maxWidth: "5rem" }}
                    ></div>
                  </div>

                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <div
                      className="row gx-3 me-lg-n10"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="col-3 offset-1 align-self-end mb-3">
                        <img
                          className="img-fluid"
                          src="./assets/svg/components/dots-warning.svg"
                          alt="ImageDescription"
                        />
                      </div>

                      <div className="col-8 mb-3">
                        <img
                          className="img-fluid rounded-3"
                          src="./assets/img/950x950/img4.jpg"
                          alt="ImageDescription"
                        />
                      </div>

                      <div className="col-6">
                        <img
                          className="img-fluid rounded-3"
                          src="./assets/img/950x950/img5.jpg"
                          alt="ImageDescription"
                        />
                      </div>

                      <div className="col-5">
                        <img
                          className="img-fluid"
                          src="./assets/svg/components/card-11.svg"
                          alt="ImageDescription"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      />

      <section id="testimonials" className="testimonials">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Testimonials</h2>
            <p>Following are some of our student testimonials</p>
          </div>

          <Carousel autoplay>
            <div className="testimonial-wrap">
              <div className="testimonial-item">
                <h3>John Lennox</h3>
                {/* <h4>CEO &amp; Founder, Brisbane</h4> */}
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>I
                  attended their training session on pay benchmarking, and it
                  was a game-changer for our HR team. The insights and knowledge
                  I gained have empowered us to make data-driven decisions.
                  Highly recommended!
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div className="testimonial-wrap">
              <div className="testimonial-item">
                <h3>John Lennox</h3>
                {/* <h4>CEO &amp; Founder, Brisbane</h4> */}
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>The
                  advisory services provided by this team are exceptional. They
                  helped us structure our incentive programs and remuneration
                  framework, leading to improved employee satisfaction and
                  productivity. Their expertise is unmatched.
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div className="testimonial-wrap">
              <div className="testimonial-item">
                <h3>Sara Jacobson</h3>
                {/* <h4>Entreprenuer, Sydney</h4> */}
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  We rely on their custom salary surveys for our business
                  expansion. Their comprehensive remuneration data across
                  different regions and roles has been invaluable. A must-have
                  resource for any organization
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div className="testimonial-wrap">
              <div className="testimonial-item">
                <h3>Dany Jason</h3>
                {/* <h4>Entreprenuer, Sydney</h4> */}
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                  Partnering with them to design our sales incentive program was
                  a brilliant decision. They collaborated closely with us to
                  align incentives with our goals. Our sales team's performance
                  has soared since implementing their strategies
                  <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </section>

      <section>
        <UnifyComponent />
      </section>

      <Contact />

      <a href="#l" className="back-to-top">
        <i className="icofont-simple-up"></i>
      </a>
      </HomePageStyled>
    </>
  );
};

export default HomePage;
