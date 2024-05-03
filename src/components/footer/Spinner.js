import Spinner from "react-bootstrap/Spinner";

function LoadSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h3 className="text-danger">Loading..</h3>
      <Spinner animation="border" />;
    </div>
  );
}

export default LoadSpinner;
