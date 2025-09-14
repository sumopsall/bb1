@@ .. @@
import React from 'react'
-import { Home, BarChart3, Heart, BookOpen, LogOut, User } from 'lucide-react'
+import { Home, BarChart3, Heart, BookOpen, LogOut, User, MessageCircle } from 'lucide-react'
 import { useAuth } from '../contexts/AuthContext'

@@ .. @@
   const menuItems = [
     { id: 'home', label: 'Home', icon: Home },
     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
     { id: 'mood', label: 'Mood Tracker', icon: Heart },
     { id: 'test', label: 'Self-Test', icon: User },
-    { id: 'resources', label: 'Resources', icon: BookOpen }
+    { id: 'resources', label: 'Resources', icon: BookOpen },
+    { id: 'chat', label: 'Chat Support', icon: MessageCircle }
   ]