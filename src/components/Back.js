import React, { createContext, useState, useEffect } from 'react';

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = [
    "https://media.istockphoto.com/id/1300645794/photo/abstract-weather-concept-sun-in-serene-sky-with-flare-effect.jpg?s=612x612&w=0&k=20&c=b7KiuUMGvICq6FgnjfX_e0eydTWWBN2VVI9g8Jrp3Ag=",
    "https://st3.depositphotos.com/28515578/37237/i/450/depositphotos_372375478-stock-photo-heaven-epic-dramatic-storm-sky.jpg",
    "https://www.sciline.org/wp-content/uploads/2021/02/cropped-Torrential-Rain-Flooding-and-Climate-Change-2000x834.jpg",
    "https://www.weather.gov/images/lub/events/2017/20170630-storms/BH_storm_nr_ChanningTX.png",
    "https://www.lefayresorts.com/magazine/wp-content/uploads/2021/02/neve-terapia.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/e0/ce/85/sunset-beach.jpg?w=900&h=500&s=1"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % bgImages.length);
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundContext.Provider value={{ bgIndex, bgImages }}>
      {children}
    </BackgroundContext.Provider>
  );
};
