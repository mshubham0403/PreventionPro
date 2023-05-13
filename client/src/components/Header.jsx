import { Link } from "react-router-dom";






 function Header() {

  return (
<>
<header className="site-header sticky-top py-1">
  <nav className="container d-flex flex-column flex-md-row justify-content-between">
  <Link to="/" >
    <button>
        Home
        </button>
      </Link>
      <Link to="/heatmap" >
      
      <button>
        Heatmap
        </button>
      
      </Link>
      <Link to="/insert" >
      
      <button>
        Insert
        </button>
      
      </Link>
      <Link to="/today" >
      
      <button>
        Today
        </button>
      
      </Link>
  </nav>
</header>

    

</>
  );
}
export default Header;