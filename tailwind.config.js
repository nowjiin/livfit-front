/* global module */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mini: "450px",
        tablet: "600px",
      },
      fontFamily: {
        English: ["ErasBoldITC"],
        GameNumber: ["crimsondestroyersemital"],
        Score: ["Bugfast"],
      },
      colors: {
        text50: "#FFFFFF",
        text75: "#F0F2F4",
        text80: "#D5D5D5",
        text90: "#F6F6F6",
        text100: "#D9D9D9",
        text125: "#EAEAEA",
        text150: "#BAB6B7",
        text200: "#797979",
        text300: "#023047",
        text400: "#4E4E4E",
        text500: "#000000",
        brown: "#8A2900",
        red: "#FF2E00",
        red2: "#EC0000",
        orange: "#FF9534",
        orange2: "#FB8500",
        orange3: "#FFB703",
        yellow: "#FFB703",
        ivory: "#FFF3B1",
        ivory2: "#FFF7B4",
        turtle: "#FFE487",
        badge_color: "#FFCA68",
        apricot: "#FFDFC1",
        lime: "#B3DF5A",
        lightblue: "#71A7C0",
        lightblue2: "#8ECAE6",
        good: "#40E783",
        great: "#7747FF",
        perfect: "#FF477E",
      },
      backgroundImage: {
        error: "url('./assets/images/404.jpeg')",
        main: "url('./assets/images/homeBackgroundImage.png')",
        badge: "url('./assets/images/badgeBackgroundImage.png')",
        challenge: "url('./assets/images/challenge/challengeBgImage.png')",
        break_effect: "url('./assets/images/ending/break-effect.png')",
        no_break_effect: "url('./assets/images/ending/no-break-effect.png')",
        turtle_effect: "url('./assets/images/turtle-effect.png')",
        badge_effect: "url('./assets/images/badge/badge-effect.png')",
        squat: "url('./assets/images/exercise/squat.png')",
        lunge: "url('./assets/images/exercise/lunge.png')",
        pushup: "url('./assets/images/exercise/pushup.png')",
        squat_detail: "url('./assets/images/exercise/squat-detail.png')",
        lunge_detail: "url('./assets/images/exercise/lunge-detail.png')",
        pushup_detail: "url('./assets/images/exercise/pushup-detail.png')",
        ending_blur_table:
          "url('./assets/images/ending/ending-blur-table.png')",
        dummy: "url('./assets/images/challenge/dummy.png')",
        turtle: "url('./assets/images/turtle/turtle-background.png')",
        turtle_ranking: "url('./assets/images/turtle/turtle-ranking.png')",
        store: "url('./assets/images/store/store-background.png')",
        blur_banner: "url('./assets/images/blur-banner.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".bg-blur": {
          filter: "blur(2px)",
        },
      });
    },
  ],
};
