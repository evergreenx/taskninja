import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import { Auth } from 'aws-amplify';

import { Redirect } from 'expo-router';

export default function index() {
    if (Auth.currentAuthenticatedUser()) {
        return <Redirect href="/(tabs)/home" />;
      }

  return (
    <View>
      <Text>index Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolor assumenda possimus blanditiis quibusdam aut, officia architecto praesentium unde ad consequatur a excepturi error delectus vero earum quo numquam illum?

    <Link href="/(tabs)/home">
        <Text>Onboarding</Text>
    </Link>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})