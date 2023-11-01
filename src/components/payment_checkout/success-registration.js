import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AxiosInstance from "../../components/axios";
import successTick from "../../icons/check-soft-bg.svg";
import preLoader from "../../icons/Settings.gif";
import {
  encryptAndStoreDataLocal,
  encryptAndStoreDataSession,
  retrieveAndDecryptDataLocal,
} from "../data-encryption";

const SuccessRegistration = () => {
  //eslint-disable-next-line
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const first_name = retrieveAndDecryptDataLocal("first_name")?.data;

  const last_name = retrieveAndDecryptDataLocal("last_name")?.data;
  const password = retrieveAndDecryptDataLocal("password")?.data;
  const phone = retrieveAndDecryptDataLocal("phone")?.data;
  const email = retrieveAndDecryptDataLocal("email")?.data;
  const [isProfileCreated, setProfileCreated] = useState(false);
  const [userAction, setUserAction] = useState("");

  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [sessionId]);

  useEffect(() => {
    if (isProfileCreated) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          navigate("/price-a-job");
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isProfileCreated]);

  useEffect(() => {
    async function fetchSession() {
      await AxiosInstance.get("/checkout-session?sessionId=" + sessionId).then(
        async (res) => {
          const response = await res.data;
          setSession(response);

          const UserPlan = response.metadata.plan;
          const action = response.metadata.action;
          setUserAction(action);
          if (!isProfileCreated && action === "Register") {
            CreateProfile(UserPlan);
          } else if (action === "Upgrade") {
            encryptAndStoreDataSession("upgrade_plan", UserPlan);

            navigate("/success-upgrade");
          }
        }
      );
    }
    if (sessionId) {
      fetchSession();
    }

    //eslint-disable-next-line
  }, [sessionId]);

  const clearLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("password");
    localStorage.removeItem("phone");
  };

  const CreateProfile = (plan) => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("plan", plan);

    AxiosInstance.post("/api/user/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;

        const accessToken = data.accessToken;

        if (!accessToken) {
          navigate("/login");
          clearLocalStorage();
          return;
        }

        const user_id = data.id;

        encryptAndStoreDataLocal("user_id", user_id);
        encryptAndStoreDataLocal("isLoggedIn", true);
        localStorage.setItem("accessToken", accessToken);
        encryptAndStoreDataLocal("email", data.email);

        clearLocalStorage();
        setProfileCreated(true); // Mark profile as created
      })
      .catch((err) => {
        console.log(err);
        alert("something is wrong");

        navigate("/login");
      });
  };

  return (
    <>
      {userAction === "Register" && sessionId ? (
        <div
          className="sr-root"
          style={{
            display: "grid",
            justifyItems: "center",
            height: "100vh",
            alignContent: "center",
          }}
        >
          {/* <div className="sr-section completed-view">
        <div className="sr-callout">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div> */}

          <div className="sr-content p-3 col-12 col-lg-8">
            <div>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <h1>Payment Successful!</h1>
                <img
                  style={{ marginLeft: "10px" }}
                  src={successTick}
                  alt=""
                  width={50}
                  height={50}
                />{" "}
              </div>
              {isProfileCreated ? (
                <>
                  {" "}
                  <h1>Your Account is ready </h1>{" "}
                  <p>
                    You will be redirecting automatically in {seconds} seconds
                  </p>{" "}
                  or <a href="/price-a-job">Click here</a>{" "}
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <h1>Your Account is getting ready </h1>
                  <img
                    style={{ marginLeft: "10px" }}
                    src={preLoader}
                    alt=""
                    width={50}
                    height={50}
                  />{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SuccessRegistration;