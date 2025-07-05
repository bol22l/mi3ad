import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { user, userType, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user && userType) {
        // Route based on user type
        if (userType === 'business') {
          router.replace('/(business-tabs)');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/(auth)/language-selection');
      }
    }
  }, [user, userType, isLoading]);

  return null;
}