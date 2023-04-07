import Header from "../components/Header.jsx";
import { styFrmStr } from "../assets/styleToObject.js";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    
      <main>
        {/* 1 */}
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light mains">
          <div className="col-md-6 p-xl-5 mx-auto my-5 heading intro">
            <h1 className="display-4 fw-normal">Healthcare App</h1>
            <p className="lead fw-normal">
              A project to make your life easier.
            </p>
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>

        {/* 2 */}
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
              <h2 className="display-5">Today's Data</h2>
              <p className="lead">
                Discussing about the data collected today to prepare you for
                tomorrow.
              </p>
            </div>
            <div
              className="bg-light shadow-sm mx-auto"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
              <Link to={"/today"}>
              <button
                type="button"
                className="center p-3 p-lg-3  btn btn-outline-dark"
                
                >
                Check status here
              </button>
                </Link>
            </div>
          </div>
          <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5" id="insert">
                Insert Data
              </h2>
              <p className="lead">Insert data to help others.</p>
            </div>
            <div
              className="bg-dark shadow-sm mx-auto"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
              <Link to={"/insert"}>

              <button
                type="button"
                className="center p-3 p-lg-3  btn btn-outline-light"
              >
                Check status here
              </button>
              </Link>

            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
          <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden heatmap">
            <div className="my-3 p-3  text-light">
              <h2 className="display-5">Heat-Map</h2>
              <p className="lead">
                Graphical representation of diseases over the year.
              </p>
            </div>
            <div
              className="bg-dark shadow-sm mx-auto"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
               <Link to={"/three"}>

              <button
                type="button"
                className="center p-3 p-lg-3  btn btn-outline-light"
                >
                Check status here
              </button>
                </Link>
            </div>
          </div>
          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
              <h2 className="display-5" id="docs">
                Documentation
              </h2>
              <p className="lead">Read more about us here.</p>
            </div>
            <div
              className="bg-light shadow-sm mx-auto"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
              <button
                type="button"
                className="center p-3 p-lg-3 btn btn-outline-dark"
              >
                Check status here
              </button>
            </div>
          </div>
        </div>
        {/* 4 */}

        <div className="col-12 bg-dark p-md-5" id="team">
          <div className="row p-lg-5">
            <div className="member m1 col-4">
              <img src="images/boy.png" alt="mem-1" />
              <h4 className="text-light">Fezaan Hussain</h4>
            </div>
            <div className="member m1 col-4">
              <img src="images/boy (1).png" alt="mem-1" />
              <h4 className="text-light">Tanmay Kachroo</h4>
            </div>
            <div className="member m1 col-4">
              <img src="images/boy (2).png" alt="mem-1" />
              <h4 className="text-light">Shubham Mishra</h4>
            </div>
          </div>
          <div className="row p-lg-5">
            <div className="col-2"></div>
            <div className="member m1 col-4">
              <img src="images/boy (3).png" alt="mem-1" />
              <h4 className="text-light">Shashwat Chouhan</h4>
            </div>
            <div className="member m1 col-4">
              <img src="images/boy (4).png" alt="mem-1" />
              <h4 className="text-light">xyx</h4>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row p-lg-5">
            <div className="member m1 col-4">
              <img src="images/boy (5).png" alt="mem-1" />
              <h4 className="text-light">xxx</h4>
            </div>
            <div className="member m1 col-4">
              <img src="images/boy (6).png" alt="mem-1" />
              <h4 className="text-light">xxx</h4>
            </div>
            <div className="member m1 col-4">
              <img src="images/boy (7).png" alt="mem-1" />
              <h4 className="text-light">xxx</h4>
            </div>
          </div>
        </div>
        {/* 5 */}
      </main>

      <footer className="container py-5">
        <div className="row">
          <div className="col-12 col-md">
            <i className="fa-solid fa-laptop-medical fa-3x"></i>
            <div className="d-block mb-3 text-muted">
              &copy; 2023
              <br /> HealthCare App
            </div>
          </div>

          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-div">
              <li>
                <a className="link-secondary" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="link-secondary" href="#docs">
                  Documentation
                </a>
              </li>
              <li>
                <a className="link-secondary" href="#insert">
                  Insert
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-div">
              <li>
                <a className="link-secondary" href="#team">
                  Team
                </a>
              </li>
              <li>
                <a className="link-secondary" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
