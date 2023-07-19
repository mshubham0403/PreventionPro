import { Link } from "react-router-dom";






 function Header({log,setLog}) {
console.log(log);
function logout(){
  setLog(prev=>false);
}
  return (
<>
<header className="site-header sticky-top py-1">
  <nav className="container d-flex flex-column flex-md-row justify-content-between">
  <Link to="/" >
  <button type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off">
        Home
        </button>
      </Link>
      <Link to="/heatmap" >
      
      <button type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off">
        Heatmap
        </button>
      
      </Link>
      <Link to="/insert" >
      
      <button type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off">
        Insert
        </button>
      
      </Link>
      <Link to="/today" >
      
      <button type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off">
        Today
        </button>
      
      </Link>
      
      <Link to="/prediction">
            <button type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off">Prediction</button>
          </Link>
      {log &&
      <button type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={logout}>
        Logout
        </button>
 }
  </nav>
</header>

    

</>
  );
}
export default Header;