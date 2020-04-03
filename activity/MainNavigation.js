import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import screen1 from './Home';
import screen2 from './Condition';
import screen3 from './Gender';
import screen4 from './Symtoms';
import screen5 from './Description';
import screen6 from './Contact';
import screen7 from './Locate';

const transitionConfig = () => {
    return {
        transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;

        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [width, 0],
            extrapolate: 'clamp'
        });

        return {
            transform: [{ translateX }]
        }
        }
    }
}
  
const root = createStackNavigator(
    {
        Home: screen1,
        Introduction: screen2,
        Gender: screen3, 
        Symptoms: screen4,
        Description: screen5,
        Contact: screen6,
        Locate: screen7,
    },
    {
        
        defaultNavigationOptions: {
            ...TransitionPresets.ScaleFromCenterAndroid,
          },
    }
);

export default createAppContainer(root);
