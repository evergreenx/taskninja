import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";

import Onboarding from "react-native-onboarding-swiper";
import Button from "../src/components/atoms/Button/onBoardingBtn";
import CustomText from "../src/components/atoms/Text/text";
import LottieView from "lottie-react-native";

export default function OnboardingScreen(
  { setFirstLaunch}
) {
  const [isReady, setReady] = useState(false);
  const animation = useRef(null);

  const onboardingRef = useRef(null);

  useEffect(() => {
    animation.current?.play();

    // Or set a specific startFrame and endFrame with:
    animation.current?.play(0, 100);
  }, []);
  const onboardingScreens = [
    {
      backgroundColor: "#fff",
      title: (
        <CustomText
          style={styles.title}
          fontFamily={"Poppins_900Black_Italic"}
        >{`Focus on the work that matters`}</CustomText>
      ),
      subtitle: (
        <Button
          title="Continue"
          isBGDARK={true}
          onPress={() => onboardingRef.current.goNext()}
        />
      ),

      image: (
        <View
          style={{
            // height: 200,
            // width: 200,

            borderRadius: 100,
            marginHorizontal: 20,
          }}
        >
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={{
              width: 300,
              height: 300,

              //   backgroundColor: "#eee",
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            // source={
            //   "https://lottie.host/31b09e48-e7ee-41bc-b25d-2690c7f55158/M48QmdmsDe.json"
            // }

            source={require("../src/assets/3 - Schedule (2).json")}
          />
        </View>
      ),
      // image: require('../path/to/image1.png'),
    },
    {
      backgroundColor: "#fff",

      title: (
        <CustomText
          style={styles.title}
        >{`Stay organized ${"\n"}and efficient`}</CustomText>
      ),

      image: (
        <View
          style={{
            // height: 200,
            // width: 200,

            borderRadius: 100,
            marginHorizontal: 20,
          }}
        >
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={{
              width: 300,
              height: 300,

              //   backgroundColor: "#eee",
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            // source={
            //   "https://lottie.host/31b09e48-e7ee-41bc-b25d-2690c7f55158/M48QmdmsDe.json"
            // }

            source={require("../src/assets/animation_lkn3gb05.json")}
          />
        </View>
      ),
      subtitle: (
        <Button
          title="Continue"
          isBGDARK={true}
          onPress={() => onboardingRef.current.goNext()}
        />
      ),
      // image: require('../path/to/image2.png'),
    },

    {
      backgroundColor: "#000",

      title: (
        <CustomText
          style={[styles.title, { color: "#fff" }]}
        >{`Plan, manage ${"\n"}and track tasks `}</CustomText>
      ),

      image: (
        <View
          style={{
            // height: 200,
            // width: 200,

            borderRadius: 100,
            marginHorizontal: 20,
          }}
        >
          <LottieView
            autoPlay
            // duration={3000}
            loop
            ref={animation}
            style={{
              width: 300,
              height: 300,

              borderRadius: 20,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            // source={
            //   "https://lottie.host/31b09e48-e7ee-41bc-b25d-2690c7f55158/M48QmdmsDe.json"
            // }
            source={require("../src/assets/animation_lkn3gb05.json")}
          />
        </View>
      ),
      subtitle: (
        <Button
          title="Continue"
          isBGDARK={false}
          onPress={() =>

            setFirstLaunch(false)
          
          }
        />
      ),
      // image: require('../path/to/image2.png'),
    },
    // Add more onboarding screens as needed
  ];
  return (
    <Onboarding
      pages={onboardingScreens}
      onDone={() => setFirstLaunch(false)}
      transitionAnimationDuration={1000}
      showSkip={false}
      showDone={false}
      showNext={false}
      bottomBarColor="#fff"
      bottomBarHeight={0}
      bottomBarHighlight={false}
      showPagination={false}
      ref={onboardingRef}
      onSkip={() => setReady(true)}
      DotComponent={({ selected, isLight }) => (
        <Square selected={selected} isLight={isLight} />
      )}
      containerStyles={{
        flex: 1,

        // justifyContent: "flex-start",
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    marginBottom: 50,

    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },

  titleWhite: {
    color: "#fff",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "gray",
  },
  activeDot: {
    backgroundColor: "blue",
  },
});

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 30,
        borderRadius: 5,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};
