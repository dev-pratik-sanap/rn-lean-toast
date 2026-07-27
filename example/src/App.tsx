import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toast, ToastHost } from 'rn-lean-toast';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* 1. Standard Success Toast (Top - Default) */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => Toast.success('Successfully saved profile!')}
        >
          <Text style={styles.text}>Show Success Toast (Top)</Text>
        </TouchableOpacity>

        {/* 2. Bottom Position Toast */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3b82f6' }]}
          onPress={() =>
            Toast.info('File download started...', {
              position: 'bottom',
              duration: 4000,
            })
          }
        >
          <Text style={styles.text}>Show Info Toast (Bottom)</Text>
        </TouchableOpacity>

        {/* 3. Custom Colors & Bottom Position */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#8b5cf6' }]}
          onPress={() =>
            Toast.success('Custom Branded Toast', {
              position: 'bottom',
              backgroundColor: '#8b5cf6',
              textColor: '#fef08a',
              duration: 4000,
            })
          }
        >
          <Text style={styles.text}>Show Custom Bottom Toast</Text>
        </TouchableOpacity>

        {/* 4. Queue Test (Fires multiple toasts sequentially) */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#f87171' }]}
          onPress={() => {
            Toast.success('Step 1 Complete', { duration: 1200 });
            Toast.info('Step 2 Processing...', {
              duration: 1200,
              position: 'bottom',
            });
            Toast.error('Step 3 Failed!', { duration: 1500 });
          }}
        >
          <Text style={styles.text}>Trigger Queue (Spam)</Text>
        </TouchableOpacity>
      </View>

      {/* ToastHost must be placed once at the root */}
      <ToastHost />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#f3f4f6',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
