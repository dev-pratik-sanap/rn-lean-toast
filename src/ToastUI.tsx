import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  PanResponder,
  type LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from './ToastController';
import type { ToastData } from './ToastController';

interface ToastUIProps {
  toast: ToastData;
  isVisible: boolean;
  onAnimationEnd: () => void;
}

const SWIPE_THRESHOLD = 20;
const ANIMATION_DURATION = 250;

export const ToastUI = ({ toast, isVisible, onAnimationEnd }: ToastUIProps) => {
  const insets = useSafeAreaInsets();
  const [toastHeight, setToastHeight] = useState(150);

  const position = toast.position || 'top';
  const isBottom = position === 'bottom';

  // Determine starting off-screen position based on orientation
  const initialTranslate = isBottom ? toastHeight + 50 : -toastHeight;
  const translateY = useRef(new Animated.Value(initialTranslate)).current;

  useEffect(() => {
    const targetTranslate = isBottom ? -(insets.bottom + 10) : insets.top + 10;
    const exitTranslate = isBottom ? toastHeight + 50 : -(toastHeight + 50);

    if (isVisible) {
      Animated.spring(translateY, {
        toValue: targetTranslate,
        useNativeDriver: true,
        bounciness: 12,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: exitTranslate,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        onAnimationEnd();
      });
    }
  }, [
    isVisible,
    insets.top,
    insets.bottom,
    translateY,
    onAnimationEnd,
    toastHeight,
    isBottom,
  ]);

  // Swipe handlers depending on top/bottom placement
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10,
      onPanResponderRelease: (_, gestureState) => {
        if (isBottom && gestureState.dy > SWIPE_THRESHOLD) {
          Toast.hide(); // Swipe down to dismiss for bottom toast
        } else if (!isBottom && gestureState.dy < -SWIPE_THRESHOLD) {
          Toast.hide(); // Swipe up to dismiss for top toast
        }
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    setToastHeight(event.nativeEvent.layout.height);
  };

  const getBackgroundColor = () => {
    if (toast.backgroundColor) return toast.backgroundColor;
    switch (toast.type) {
      case 'success':
        return '#4ade80';
      case 'error':
        return '#f87171';
      case 'info':
        return '#3b82f6';
      default:
        return '#333333';
    }
  };

  const getTextColor = () => toast.textColor || '#ffffff';

  return (
    <Animated.View
      {...panResponder.panHandlers}
      onLayout={handleLayout}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
      style={[
        styles.container,
        isBottom ? styles.bottomPosition : styles.topPosition,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, { color: getTextColor() }]}>
        {toast.message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9999,
  },
  topPosition: {
    top: 0,
  },
  bottomPosition: {
    bottom: 0,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
