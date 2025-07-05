import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserType = 'business' | 'personal';

interface BaseUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  userType: UserType;
  avatar?: string;
  createdAt: string;
}

interface PersonalUser extends BaseUser {
  userType: 'personal';
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    categories: string[];
  };
}

interface BusinessUser extends BaseUser {
  userType: 'business';
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  taxId?: string;
  website?: string;
  description?: string;
  isVerified: boolean;
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'trial';
    expiresAt: string;
  };
}

export type User = PersonalUser | BusinessUser;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  userType: UserType | null;
  login: (username: string, password: string, userType: UserType) => Promise<void>;
  registerPersonal: (userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  registerBusiness: (userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  switchUserType: (userType: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const savedUserType = await AsyncStorage.getItem('userType');
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (savedUserType) {
        setUserType(savedUserType as UserType);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string, selectedUserType: UserType) => {
    try {
      setIsLoading(true);
      
      // Simulate API call with mock data
      let userData: User;
      
      if (selectedUserType === 'business') {
        userData = {
          id: Date.now().toString(),
          username,
          email: `${username}@business.com`,
          phone: '+218-21-123-4567',
          userType: 'business',
          businessName: 'Libya Events Co.',
          businessType: 'Event Management',
          businessAddress: 'Tripoli, Libya',
          businessPhone: '+218-21-123-4567',
          businessEmail: `${username}@business.com`,
          description: 'Professional event management company',
          isVerified: true,
          createdAt: new Date().toISOString(),
          subscription: {
            plan: 'premium',
            status: 'active',
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          },
        } as BusinessUser;
      } else {
        userData = {
          id: Date.now().toString(),
          username,
          email: `${username}@personal.com`,
          phone: '+218-91-123-4567',
          userType: 'personal',
          firstName: 'أحمد',
          lastName: 'محمد',
          createdAt: new Date().toISOString(),
          preferences: {
            notifications: true,
            emailUpdates: true,
            categories: ['entertainment', 'occasions'],
          },
        } as PersonalUser;
      }
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('userType', selectedUserType);
      setUser(userData);
      setUserType(selectedUserType);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerPersonal = async (userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setIsLoading(true);
      
      const newUser: PersonalUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        userType: 'personal',
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          emailUpdates: false,
          categories: [],
        },
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('userType', 'personal');
      setUser(newUser);
      setUserType('personal');
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerBusiness = async (userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
  }) => {
    try {
      setIsLoading(true);
      
      const newUser: BusinessUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        userType: 'business',
        businessName: userData.businessName,
        businessType: userData.businessType,
        businessAddress: userData.businessAddress,
        businessPhone: userData.businessPhone,
        businessEmail: userData.businessEmail,
        isVerified: false,
        createdAt: new Date().toISOString(),
        subscription: {
          plan: 'basic',
          status: 'trial',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('userType', 'business');
      setUser(newUser);
      setUserType('business');
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userType');
      setUser(null);
      setUserType(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const switchUserType = (newUserType: UserType) => {
    setUserType(newUserType);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    userType,
    login,
    registerPersonal,
    registerBusiness,
    logout,
    updateProfile,
    switchUserType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}