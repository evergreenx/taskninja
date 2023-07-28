import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";

import Onboarding from "react-native-onboarding-swiper";
import Button from "../../src/components/atoms/Button/onBoardingBtn";
import CustomText from "../../src/components/atoms/Text/text";
import LottieView from "lottie-react-native";

export default function OnboardingPage() {
  const [isReady, setReady] = useState(false);
  const animation = useRef(null);

  const onboardingRef = useRef(null);

  useEffect(() => {
    animation.current?.play();

    // Or set a specific startFrame and endFrame with:
    animation.current?.play(30, 120);
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

            source={require("./animation_lkn3gb05.json")}
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
        >{`Plan your day and manage your time`}</CustomText>
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

            source={require("./Animation - 1690575268670.json")}
          />
        </View>
      ),
      subtitle: (
        <Button
          title="Continue"
          onPress={() => onboardingRef.current.goNext()}
        />
      ),
      // image: require('../path/to/image2.png'),
    },

    {
      backgroundColor: "#fff",

      title: (
        <CustomText
          style={styles.title}
        >{`Track your progress and stay motivated`}</CustomText>
      ),
      subtitle: (
        <Button
          title="Continue"
          onPress={() => onboardingRef.current.goNext()}
        />
      ),
      // image: require('../path/to/image2.png'),
    },
    // Add more onboarding screens as needed
  ];
  return (
    <Onboarding
      pages={onboardingScreens}
      onDone={() => setReady(true)}
      showSkip={false}
      showNext={false}

      showPagination={false}
  
      ref={onboardingRef}
      showDone={true}
      onSkip={() => setReady(true)}
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
    letterSpacing: 0.2,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
});
