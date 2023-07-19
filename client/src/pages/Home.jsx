import Header from "../components/Header.jsx";
import { styFrmStr } from "../assets/styleToObject.js";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    
      <main>
        {/* 1 */}
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light mains firstDiv">
          <div className="col-md-6 p-xl-5 mx-auto my-5 heading intro">
            <div className="siteName">
            <h1 className="display-4 fw-normal">Prevention Pro</h1>
            <p style={{ opacity: 1 }}>
              A project to Safe-Guard you against possible Viral outbreaks.
            </p>
            </div>
          </div>
         
        </div>

        {/* 2 */}
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3 ">
          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden today">
            <div className="Spy-3">
              <h2 className="display-5">Today's Data</h2>
              <p className="lead">
               Know today to prepare for
                tomorrow.
              </p>
            </div>
            <div
              className="shadow-sm mx-auto chkBlock"
              style={styFrmStr(
                "width: 70%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
              <Link to={"/today"}>
              <button
                type="button"
                className="center p-lg-3  btn btn-dark"
                >
                Check status here
              </button>
                </Link>
            </div>
          </div>
          <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden insert">
            <div className="Spy-4">
              <h2 className="display-5" id="insert">
                Insert Data
              </h2>
              <p className="lead">Insert data to help others.</p>
            </div>
            <div
              className="chkBlock"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
              <Link to={"/insert"}>

              <button
                type="button"
                className=" p-lg-3  btn btn-dark chkBlock-btn"
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
            <div className="my-3 p-3  text-light ">
              <h2 className="display-5">Heat-Map</h2>
              <p className="lead">
                Graphical representation of diseases over the year.
              </p>
            </div>
            <div
              className="chkBlock shadow-sm mx-auto"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
               <Link to={"/three"}>

              <button
                type="button"
                className=" p-lg-3  btn btn-dark "
                >
                Check here
              </button>
                </Link>
            </div>
          </div>
          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden prediction">
            <div className="my-3 py-3">
              <h2 className="display-5" id="docs">
                Predictions
              </h2>
              <p className="lead">Get upcoming months predicted viral diseases</p>
            </div>
            <div
              className="chkBlock shadow-sm mx-auto"
              style={styFrmStr(
                "width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
              )}
            >
              <button
                type="button"
                className=" p-lg-3 btn btn-dark"
              >
                Check  here
              </button>
            </div>
          </div>
        </div>
        {/* 4 */}

       
        {/* 5 */}
      </main>

      <footer className="container py-5">
        <div className="row">
          <div className="col-12 col-md">
            <i className="fa-solid fa-laptop-medical fa-3x"></i>
            <div className="d-block mb-3 text-muted">
              &copy; 2023
              <br /> Presvention Pro
            </div>
          </div>

          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-div">
              <li>
                <a className="link-secondary" href="https://github.com/mshubham0403/PreventionPro/tree/0ed47f528fd105e761bdd1a803086a6c9ff028ef">
                <i className="fab fa-github"></i> Code Repository
                </a>
              </li>
              <li>
                <a className="link-secondary" href="https://www.who.int/news-room/fact-sheets">
                <i class="fa-solid fa-notes-medical"></i>More Information
                </a>
              </li>
             
            </ul>
          </div>
          <div className="col-6 col-md">
      <h5>About</h5>
      <ul className="list-unstyled text-div">
        <li>
          <a className="link-secondary" href="https://www.linkedin.com/mshubham0403">
          <i className="fab fa-linkedin"></i> mshubham0403
          </a>
        </li>
        <li>
          <a className="link-secondary" href="https://www.instagram.com/shubham_mish.ra">
          <i className="fab fa-instagram"></i> shubham_mish.ra
          </a>
        </li>
      <li>
          <a className="link-secondary" href="https://www.github.com/mshubham0403">
          <i className="fab fa-github"></i> mshubham0403
          </a>
        </li>
        </ul>
    </div>
        </div>
      </footer>
    </>
  );
}
