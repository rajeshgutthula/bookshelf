import 'bootstrap/dist/css/bootstrap.min.css';

const Loader=()=>{
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
            <div className="spinner-border m-5 " role="status">
                <span className="sr-only"></span>
            </div>
        </div>
      );    
}

export default Loader;
