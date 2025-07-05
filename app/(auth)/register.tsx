import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/context/I18nContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Lock, Mail, Phone, ArrowRight, ArrowLeft, Building2, MapPin } from 'lucide-react-native';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    // Personal fields
    firstName: '',
    lastName: '',
    // Business fields
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { registerPersonal, registerBusiness, userType } = useAuth();
  const { t, isRTL } = useI18n();

  const handleRegister = async () => {
    const { username, password, confirmPassword, email, phone } = formData;

    if (!username || !password || !confirmPassword || !email || !phone) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 6) {
      Alert.alert('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (!userType) {
      Alert.alert('خطأ', 'يرجى اختيار نوع الحساب أولاً');
      router.push('/(auth)/user-type-selection');
      return;
    }

    // Validate specific fields based on user type
    if (userType === 'personal') {
      if (!formData.firstName || !formData.lastName) {
        Alert.alert('خطأ', 'يرجى إدخال الاسم الأول والأخير');
        return;
      }
    } else {
      if (!formData.businessName || !formData.businessType || !formData.businessAddress || !formData.businessPhone || !formData.businessEmail) {
        Alert.alert('خطأ', 'يرجى ملء جميع بيانات الشركة');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (userType === 'personal') {
        await registerPersonal({
          username,
          password,
          email,
          phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      } else {
        await registerBusiness({
          username,
          password,
          email,
          phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessAddress: formData.businessAddress,
          businessPhone: formData.businessPhone,
          businessEmail: formData.businessEmail,
        });
      }
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('خطأ', 'فشل في إنشاء الحساب');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#A855F7', '#3B82F6']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.content}>
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
                {userType === 'business' ? 'حساب تجاري جديد' : 'حساب شخصي جديد'}
              </Text>
            </View>
            
            <Text style={styles.title}>إنشاء حساب جديد</Text>
            <Text style={styles.subtitle}>
              {userType === 'business' 
                ? 'ابدأ في إنشاء وإدارة فعالياتك' 
                : 'انضم إلى مجتمعنا واكتشف الفعاليات'
              }
            </Text>
          </View>

          <View style={styles.form}>
            {/* Common Fields */}
            <View style={styles.inputContainer}>
              <User size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="اسم المستخدم"
                value={formData.username}
                onChangeText={(value) => updateFormData('username', value)}
                autoCapitalize="none"
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            <View style={styles.inputContainer}>
              <Mail size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            <View style={styles.inputContainer}>
              <Phone size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            {/* Personal User Fields */}
            {userType === 'personal' && (
              <>
                <View style={styles.inputContainer}>
                  <User size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="الاسم الأول"
                    value={formData.firstName}
                    onChangeText={(value) => updateFormData('firstName', value)}
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <User size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="الاسم الأخير"
                    value={formData.lastName}
                    onChangeText={(value) => updateFormData('lastName', value)}
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>
              </>
            )}

            {/* Business User Fields */}
            {userType === 'business' && (
              <>
                <View style={styles.inputContainer}>
                  <Building2 size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="اسم الشركة/المؤسسة"
                    value={formData.businessName}
                    onChangeText={(value) => updateFormData('businessName', value)}
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Building2 size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="نوع النشاط التجاري"
                    value={formData.businessType}
                    onChangeText={(value) => updateFormData('businessType', value)}
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="عنوان الشركة"
                    value={formData.businessAddress}
                    onChangeText={(value) => updateFormData('businessAddress', value)}
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Phone size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="هاتف الشركة"
                    value={formData.businessPhone}
                    onChangeText={(value) => updateFormData('businessPhone', value)}
                    keyboardType="phone-pad"
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Mail size={20} color="#6B7280" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, isRTL && styles.inputRTL]}
                    placeholder="البريد الإلكتروني للشركة"
                    value={formData.businessEmail}
                    onChangeText={(value) => updateFormData('businessEmail', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textAlign={isRTL ? 'right' : 'left'}
                  />
                </View>
              </>
            )}

            {/* Password Fields */}
            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="كلمة المرور"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, isRTL && styles.inputRTL]}
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: userType === 'business' ? '#7C3AED' : '#10B981' }]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </Text>
              <ArrowIcon size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>لديك حساب بالفعل؟</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.footerLink}>تسجيل الدخول</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.changeUserTypeButton}
            onPress={() => router.push('/(auth)/user-type-selection')}
          >
            <Text style={styles.changeUserTypeText}>تغيير نوع الحساب</Text>
          </TouchableOpacity>
        </ScrollView>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 160,
    height: 100,
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
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
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
  registerButton: {
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
  registerButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
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
    marginTop: 12,
  },
  changeUserTypeText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'underline',
  },
});