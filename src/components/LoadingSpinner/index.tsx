import "./loadingSpinner.scss";
import BounceLoader from "react-spinners/BounceLoader";

function LoadingSpinner() {
  return (
    <div className="loading">
      <BounceLoader />
    </div>
  );
}

export default LoadingSpinner;
