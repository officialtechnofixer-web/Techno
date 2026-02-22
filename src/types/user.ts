export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'admin' | 'user';
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  status: 'active' | 'suspended' | 'pending';
  metadata?: {
    [key: string]: any;
  };
}

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}
