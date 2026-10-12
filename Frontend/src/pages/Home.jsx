
import React from "react";


import HeroAndWhyChoose from "./HeroAndWhyChoose";
import AboutSection from "./AboutSection";
import HeadmasterMessage from "./HeadmasterMessage";
import NewsEventsMemories from "./NewsEventsMemories";

import AchievementSection from "./AchievementSection";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-white">

      {/* Website Navbar */}
  

      {/* Homepage Hero Section */}
      <HeroAndWhyChoose />
      <AboutSection/>
      <HeadmasterMessage/>
      <NewsEventsMemories/>
      <AchievementSection/>

    </div>
  );
};

export default Home;