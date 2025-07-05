import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { ChartBar as BarChart3, Calendar, Users, DollarSign, TrendingUp, Plus, Eye, Ticket, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSharedValue, useAnimatedScrollHandler, runOnJS } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalEvents: 12,
    totalTicketsSold: 1247,
    totalRevenue: 18650,
    activeEvents: 5,
    upcomingEvents: 3,
    completedEvents: 4,
    totalViews: 8934,
    conversionRate: 14.2,
  });
  const scrollY = useSharedValue(0);

  // Create animated scroll handler for native platforms
  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      // Call the global tab bar scroll handler if it exists
      if (global.tabBarScrollHandler) {
        runOnJS(global.tabBarScrollHandler)(event.contentOffset.y);
      }
    },
  });

  // Create a unified scroll handler that works on all platforms
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    // Call the global tab bar scroll handler if it exists
    if (global.tabBarScrollHandler) {
      global.tabBarScrollHandler(scrollY);
    }

    // For native platforms, also call the animated scroll handler if it's a function
    if (Platform.OS !== 'web' && typeof animatedScrollHandler === 'function') {
      animatedScrollHandler(event);
    }
  };

  const businessUser = user?.userType === 'business' ? user : null;

  const quickActions = [
    {
      title: 'إنشاء فعالية جديدة',
      subtitle: 'ابدأ في إنشاء فعالية جديدة',
      icon: Plus,
      color: '#10B981',
      action: () => router.push('/(business-tabs)/create-event'),
    },
    {
      title: 'عرض التحليلات',
      subtitle: 'تحليل أداء فعالياتك',
      icon: BarChart3,
      color: '#3B82F6',
      action: () => router.push('/(business-tabs)/analytics'),
    },
    {
      title: 'إدارة الفعاليات',
      subtitle: 'تعديل وإدارة فعالياتك',
      icon: Calendar,
      color: '#7C3AED',
      action: () => router.push('/(business-tabs)/events'),
    },
    {
      title: 'مسح التذاكر',
      subtitle: 'تحقق من صحة التذاكر',
      icon: Eye,
      color: '#F59E0B',
      action: () => router.push('/scanner'),
    },
  ];

  const recentActivity = [
    { type: 'ticket_sold', message: 'تم بيع 5 تذاكر لفعالية "مؤتمر التكنولوجيا"', time: '2 دقيقة' },
    { type: 'event_view', message: 'تم عرض فعالية "ورشة التصميم" 23 مرة', time: '15 دقيقة' },
    { type: 'new_registration', message: 'تسجيل جديد في فعالية "معرض الفنون"', time: '1 ساعة' },
    { type: 'payment_received', message: 'تم استلام دفعة بقيمة 450 د.ل', time: '2 ساعة' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 88, // Add padding for tab bar
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 24,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: 'hidden',
    },
    welcomeSection: {
      marginBottom: 20,
    },
    greeting: {
      fontSize: 24,
      fontFamily: 'Cairo-Bold',
      color: 'white',
      marginBottom: 4,
    },
    businessName: {
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: 'rgba(255, 255, 255, 0.9)',
    },
    subscriptionBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    subscriptionText: {
      fontSize: 12,
      fontFamily: 'Cairo-SemiBold',
      color: 'white',
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    },
    statCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      width: (width - 60) / 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    statIcon: {
      marginBottom: 12,
    },
    statValue: {
      fontSize: 24,
      fontFamily: 'Cairo-Bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    },
    actionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      width: (width - 60) / 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    actionIcon: {
      marginBottom: 12,
    },
    actionTitle: {
      fontSize: 16,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    actionSubtitle: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
      lineHeight: 16,
    },
    activityList: {
      gap: 12,
    },
    activityItem: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme.isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    activityContent: {
      flex: 1,
    },
    activityMessage: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.text,
      marginBottom: 4,
    },
    activityTime: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    viewAllButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    viewAllButtonText: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
      color: 'white',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#3B82F6']}
          style={styles.header}
        >
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>مرحباً، {businessUser?.businessName || 'الشركة'}</Text>
            <Text style={styles.businessName}>{businessUser?.businessType}</Text>
            <View style={styles.subscriptionBadge}>
              <Text style={styles.subscriptionText}>
                {businessUser?.subscription.plan === 'premium' ? 'باقة مميزة' : 'باقة أساسية'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>إحصائيات سريعة</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Calendar size={24} color="#7C3AED" style={styles.statIcon} />
                <Text style={[styles.statValue, { color: '#7C3AED' }]}>{stats.totalEvents}</Text>
                <Text style={styles.statLabel}>إجمالي الفعاليات</Text>
              </View>

              <View style={styles.statCard}>
                <Ticket size={24} color="#10B981" style={styles.statIcon} />
                <Text style={[styles.statValue, { color: '#10B981' }]}>{stats.totalTicketsSold.toLocaleString()}</Text>
                <Text style={styles.statLabel}>التذاكر المباعة</Text>
              </View>

              <View style={styles.statCard}>
                <DollarSign size={24} color="#F59E0B" style={styles.statIcon} />
                <Text style={[styles.statValue, { color: '#F59E0B' }]}>{stats.totalRevenue.toLocaleString()} د.ل</Text>
                <Text style={styles.statLabel}>إجمالي الإيرادات</Text>
              </View>

              <View style={styles.statCard}>
                <Eye size={24} color="#3B82F6" style={styles.statIcon} />
                <Text style={[styles.statValue, { color: '#3B82F6' }]}>{stats.totalViews.toLocaleString()}</Text>
                <Text style={styles.statLabel}>مشاهدات الفعاليات</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionCard}
                  onPress={action.action}
                >
                  <action.icon size={24} color={action.color} style={styles.actionIcon} />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>النشاط الأخير</Text>
            <View style={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={[
                    styles.activityIcon,
                    { backgroundColor: getActivityColor(activity.type) + '20' }
                  ]}>
                    {getActivityIcon(activity.type)}
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityMessage}>{activity.message}</Text>
                    <Text style={styles.activityTime}>منذ {activity.time}</Text>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>عرض جميع الأنشطة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function getActivityColor(type: string): string {
  switch (type) {
    case 'ticket_sold':
      return '#10B981';
    case 'event_view':
      return '#3B82F6';
    case 'new_registration':
      return '#7C3AED';
    case 'payment_received':
      return '#F59E0B';
    default:
      return '#6B7280';
  }
}

function getActivityIcon(type: string): React.ReactElement {
  const color = getActivityColor(type);
  switch (type) {
    case 'ticket_sold':
      return <Ticket size={20} color={color} />;
    case 'event_view':
      return <Eye size={20} color={color} />;
    case 'new_registration':
      return <Users size={20} color={color} />;
    case 'payment_received':
      return <DollarSign size={20} color={color} />;
    default:
      return <Clock size={20} color={color} />;
  }
}