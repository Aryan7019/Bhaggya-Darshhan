import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { sendSignupNotification } from '@/services/emailService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bhaggya_currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('bhaggya_currentUser');
    }
    setIsLoading(false);
  }, []);

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('bhaggya_users') || '[]');
    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
      toast({
        title: "Error",
        description: "A user with this email already exists.",
        variant: "destructive"
      });
      return false;
    }

    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('bhaggya_users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('bhaggya_currentUser', JSON.stringify(newUser));

    sendSignupNotification(newUser);

    toast({
      title: "Success!",
      description: "You have successfully signed up and logged in."
    });
    return true;
  };

  const login = (credentials) => {
    const users = JSON.parse(localStorage.getItem('bhaggya_users') || '[]');
    const foundUser = users.find(u => u.email === credentials.email);

    if (foundUser && foundUser.password === credentials.password) {
      setUser(foundUser);
      localStorage.setItem('bhaggya_currentUser', JSON.stringify(foundUser));
      toast({
        title: "Success!",
        description: "You have been successfully logged in."
      });
      return true;
    }

    toast({
      title: "Error",
      description: "Invalid email or password.",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bhaggya_currentUser');
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
    });
  };

  const value = {
    user,
    signup,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};