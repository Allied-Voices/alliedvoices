import { useHistory } from "react-router-dom";

const useLandingNewYorkButton = () => {
  let history = useHistory();

  const goToMap = () => {
    history.push("/map");
  };

  return { goToMap };
};

export default useLandingNewYorkButton;
