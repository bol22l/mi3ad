import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="language-selection" />
      <Stack.Screen name="user-type-selection" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}