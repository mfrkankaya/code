import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}

const BookPageTransition = (index, position, width, height) => {
  const sceneRange = [index - 1, index, index + 1];
  const rotateY = position.interpolate({
    inputRange: sceneRange,
    outputRange: ["90deg", "0deg", "90deg"]
  });
  translateX = position.interpolate({
    inputRange: sceneRange,
    outputRange: [2 * width, 0, 0]
  });
  opacity = position.interpolate({
    inputRange: sceneRange,
    outputRange: [0, 1, 1]
  });
  return {
    transform: [{ rotateY }, { translateX }],
    perspective: 5000,
  };
};

const NavigationConfig = () => {
  return {
    transitionSpec: {
      duration: 420,

      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const {
        position,
        scene: { index },
        layout: { initWidth: width, initHeight: height }
      } = sceneProps;
      return BookPageTransition(index, position, width, height);
    }
  };
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Settings: SettingsScreen
  },
  {
    transitionConfig: NavigationConfig,
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(AppNavigator);
