import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/context/I18nContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Lock, ArrowRight, ArrowLeft, Building2 } from 'lucide-react-native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, userType } = useAuth();
  const { t, isRTL } = useI18n();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('خطأ', 'يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    if (!userType) {
      Alert.alert('خطأ', 'يرجى اختيار نوع الحساب أولاً');
      router.push('/(auth)/user-type-selection');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password, userType);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('خطأ', 'اسم المستخدم أو كلمة المرور غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#A855F7', '#3B82F6']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/39325347-c946-48c0-951e-f341796fdfd4_removalai_preview.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.userTypeIndicator}>
              {userType === 'business' ? (
                <Building2 size={24} color="white" />
              ) : (
                <User size={24} color="white" />
              )}
              <Text style={styles.userTypeText}>
                {userType === 'business' ? 'حساب تجاري' : 'حساب شخصي'}
              </Text>
            </View>
            
            <Text style={styles.title}>تسجيل الدخول</Text>
            <Text style={styles.subtitle}>
              {userType === 'business' 
                ? 'ادخل إلى لوحة إدارة الفعاليات' 
                : 'ادخل إلى حسابك الشخصي'
              }
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <User size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="اسم المستخدم"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="كلمة المرور"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: userType === 'business' ? '#7C3AED' : '#10B981' }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Text>
              <ArrowIcon size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>ليس لديك حساب؟</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.footerLink}>إنشاء حساب جديد</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.changeUserTypeButton}
            onPress={() => router.push('/(auth)/user-type-selection')}
          >
            <Text style={styles.changeUserTypeText}>تغيير نوع الحساب</Text>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 180,
    height: 120,
  },
  userTypeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    gap: 8,
  },
  userTypeText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: 'white',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#1F2937',
  },
  inputRTL: {
    textAlign: 'right',
  },
  loginButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  forgotPassword: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#60A5FA',
  },
  changeUserTypeButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
  },
  changeUserTypeText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
});