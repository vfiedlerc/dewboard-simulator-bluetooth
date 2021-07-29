import { useEffect } from "react";

const useOutsideClick = (ref:any, callback:() => void) => {
  const handleClick = (event:any )=> {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;