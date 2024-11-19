import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  borderColor: "blue",
  position: "absolute",
  zIndex: 100,
  top: "50%",
  left: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
};
const Loader = () => {
  return (
    <FadeLoader
      color={"#000"}
      loading
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
