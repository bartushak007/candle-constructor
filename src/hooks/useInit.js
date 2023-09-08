import React from "react";

const useInit = () => {
  const [isInit, setIsInit] = React.useState(true);

  React.useEffect(() => {
    setIsInit(false);
  }, []);

  return isInit;
};

export default useInit;
