import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import ContactForm from "../sections/lets-talk/ContactForm";
import { LoadingContext } from "../components/Loading";

function LetsTalk() {
  const { loadingContext } = useContext(LoadingContext);


  useEffect(() => {
    setTimeout(() => {
      // All components have loaded
      console.log("All components have loaded");
      loadingContext.setIsLoading(false); // Set loading to false
    }, 500);
  }, [loadingContext]);

  return (
    <div>
      <ContactForm />
    </div>
  );
}

export default LetsTalk;
