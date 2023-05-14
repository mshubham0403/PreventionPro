import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "../assets/loader.css";

const PredictionPage = () => {
  const [predictionData, setPredictionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { ServerUrl } = useOutletContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(ServerUrl + "/prediction/05");
      console.log(response);
      setPredictionData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
      setIsLoading(false);
    }
  };

  const diseaseLink =
    "https://www.emro.who.int/about-who/public-health-functions/health-promotion-disease-prevention.html";

  return (
    <div className="container">
      <h1 className="mt-4">Prediction</h1>

      {isLoading ? (
        <>
           <div className="cssload-dots">
           <div className="cssload-dot"></div>
           <div className="cssload-dot"></div>
           <div className="cssload-dot"></div>
           <div className="cssload-dot"></div>
           <div className="cssload-dot"></div>
       </div>
       
       <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
           <defs>
               <filter id="goo">
                   <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" ></feGaussianBlur>
                   <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7" result="goo" ></feColorMatrix>
           
               </filter>
           </defs>
       </svg>
    </>
      
      ) : (
        <div className="mt-4">
          <h4>High probability of the following diseases</h4>

          {(!isLoading&&(predictionData.length === 0)) ? (
            <div>No prediction data available.</div>
          ) : (
            <>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Disease Name</th>
                    <th scope="col">Predicted cases this month</th>
                    <th scope="col">Prevention and Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {predictionData.map((entry, eIdx) => {
                    return (
                      <tr key={eIdx}>
                        <td>{eIdx + 1}.</td>
                        <td className="text-capitalize">{entry.diseaseName}</td>
                        <td>{entry.cases}</td>
                        <td>
                          <a href={entry.diseaseLink ?? diseaseLink}>
                            {entry.diseaseLink ?? diseaseLink}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      <div className="mt-4">
        <button className="btn btn-primary" onClick={fetchData}>
          Taking too long? Fetch again
        </button>
      </div>
    </div>
  );
};

export default PredictionPage;
