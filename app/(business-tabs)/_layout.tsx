import React from 'react';
import { Tabs } from 'expo-router';
import { useI18n } from '@/context/I18nContext';
import { ChartBar as BarChart3, Calendar, Plus, Ticket, User, QrCode } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRef, useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';

export default function BusinessTabLayout() {
  const { t } = useI18n();
  
  const translateY = useSharedValue(0);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  // Create animated style for tab bar
  const animatedTabBarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // Function to handle scroll events from child components
  const handleScroll = (scrollY: number) => {
    const currentScrollY = scrollY;
    const diff = currentScrollY - lastScrollY.current;
    
    // Only react to significant scroll changes and when scrolled past threshold
    if (Math.abs(diff) > 10 && currentScrollY > 50) {
      if (diff > 0 && !isHidden.current) {
        // Scrolling down - hide tab bar
        isHidden.current = true;
        translateY.value = withTiming(100, { duration: 300 });
      } else if (diff < 0 && isHidden.current) {
        // Scrolling up - show tab bar
        isHidden.current = false;
        translateY.value = withTiming(0, { duration: 300 });
      }
    } else if (currentScrollY <= 50 && isHidden.current) {
      // Show tab bar when near top
      isHidden.current = false;
      translateY.value = withTiming(0, { duration: 300 });
    }
    
    lastScrollY.current = currentScrollY;
  };

  // Make scroll handler available globally
  useEffect(() => {
    global.tabBarScrollHandler = handleScroll;
    
    return () => {
      delete global.tabBarScrollHandler;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none', // COMPLETELY HIDE the default tab bar
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'لوحة التحكم',
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'فعالياتي',
          }}
        />
        <Tabs.Screen
          name="create-event"
          options={{
            title: 'إنشاء فعالية',
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'التحليلات',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'الملف الشخصي',
          }}
        />
      </Tabs>

      {/* Custom Animated Tab Bar */}
      <Animated.View style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          zIndex: 1000,
        },
        animatedTabBarStyle
      ]}>
        <TabBarButton 
          name="index" 
          title="لوحة التحكم" 
          icon={<BarChart3 size={24} />}
        />
        <TabBarButton 
          name="events" 
          title="فعالياتي" 
          icon={<Calendar size={24} />}
        />
        <TabBarButton 
          name="create-event" 
          title="إنشاء فعالية" 
          icon={<Plus size={24} />}
          isSpecial
        />
        <TabBarButton 
          name="analytics" 
          title="التحليلات" 
          icon={<BarChart3 size={24} />}
        />
        <TabBarButton 
          name="profile" 
          title="الملف الشخصي" 
          icon={<User size={24} />}
        />
      </Animated.View>

      {/* Floating Scanner Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#7C3AED',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#7C3AED',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          zIndex: 1001,
        }}
        onPress={() => require('expo-router').router.push('/scanner')}
      >
        <QrCode size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Custom Tab Bar Button Component
function TabBarButton({ 
  name, 
  title, 
  icon, 
  isSpecial = false 
}: { 
  name: string; 
  title: string; 
  icon: React.ReactElement; 
  isSpecial?: boolean;
}) {
  const handlePress = () => {
    // Use expo-router navigation
    if (name === 'index') {
      require('expo-router').router.push('/(business-tabs)/');
    } else {
      require('expo-router').router.push(`/(business-tabs)/${name}`);
    }
  };

  // Get current route to determine if active
  const segments = require('expo-router').useSegments();
  const isActive = segments[segments.length - 1] === name || 
                  (name === 'index' && segments[segments.length - 1] === '(business-tabs)');

  const color = isActive ? '#7C3AED' : '#6B7280';

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
      }}
    >
      {isSpecial ? (
        <View style={{
          backgroundColor: color === '#7C3AED' ? '#7C3AED' : '#F3F4F6',
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 4,
        }}>
          {React.cloneElement(icon, { 
            color: color === '#7C3AED' ? 'white' : '#6B7280',
            size: 20
          })}
        </View>
      ) : (
        <View style={{ marginBottom: 4 }}>
          {React.cloneElement(icon, { color, size: 24 })}
        </View>
      )}
      <Text style={{
        color,
        fontSize: 12,
        fontFamily: 'Cairo-SemiBold',
        textAlign: 'center',
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}