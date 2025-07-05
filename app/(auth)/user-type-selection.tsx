import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Building2, User, ArrowRight, CheckCircle } from 'lucide-react-native';

export default function UserTypeSelection() {
  const { switchUserType } = useAuth();

  const selectUserType = (userType: 'business' | 'personal') => {
    switchUserType(userType);
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#A855F7', '#3B82F6']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/39325347-c946-48c0-951e-f341796fdfd4_removalai_preview.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>اختر نوع الحساب</Text>
            <Text style={styles.subtitle}>
              اختر النوع المناسب لك للحصول على أفضل تجربة
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {/* Personal User Option */}
            <TouchableOpacity
              style={styles.userTypeCard}
              onPress={() => selectUserType('personal')}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#10B981' }]}>
                  <User size={32} color="white" />
                </View>
                <Text style={styles.cardTitle}>مستخدم شخصي</Text>
              </View>
              
              <Text style={styles.cardDescription}>
                للأفراد الذين يريدون حضور الفعاليات والمناسبات
              </Text>
              
              <View style={styles.featuresList}>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.featureText}>تصفح جميع الفعاليات</Text>
                </View>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.featureText}>حجز التذاكر</Text>
                </View>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.featureText}>إشعارات الفعاليات الجديدة</Text>
                </View>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.featureText}>حفظ التذاكر في المحفظة</Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.selectText}>اختيار</Text>
                <ArrowRight size={20} color="#10B981" />
              </View>
            </TouchableOpacity>

            {/* Business User Option */}
            <TouchableOpacity
              style={styles.userTypeCard}
              onPress={() => selectUserType('business')}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#7C3AED' }]}>
                  <Building2 size={32} color="white" />
                </View>
                <Text style={styles.cardTitle}>حساب تجاري</Text>
              </View>
              
              <Text style={styles.cardDescription}>
                للشركات والمؤسسات التي تريد إنشاء وإدارة الفعاليات
              </Text>
              
              <View style={styles.featuresList}>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#7C3AED" />
                  <Text style={styles.featureText}>إنشاء فعاليات جديدة</Text>
                </View>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#7C3AED" />
                  <Text style={styles.featureText}>إدارة التذاكر والمبيعات</Text>
                </View>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#7C3AED" />
                  <Text style={styles.featureText}>تحليلات مفصلة</Text>
                </View>
                <View style={styles.feature}>
                  <CheckCircle size={16} color="#7C3AED" />
                  <Text style={styles.featureText}>مسح رموز QR للتذاكر</Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.selectText}>اختيار</Text>
                <ArrowRight size={20} color="#7C3AED" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>العودة لاختيار اللغة</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
    gap: 20,
  },
  userTypeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
    flex: 1,
  },
  cardDescription: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresList: {
    gap: 12,
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#374151',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  selectText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
});