import React, { useCallback } from "react";


const useDownloadResume = (ref) => {
  const downloadPDF = useCallback(async () => {
    const element = ref.current;
    // ! IF NO COMPONENT FOUND TO BE DOWNLOAD THEN SIMPLY RETURN
    if (!element) return;


    
    
  }, [ref]);

  return { downloadPDF };
};

export default useDownloadResume;
