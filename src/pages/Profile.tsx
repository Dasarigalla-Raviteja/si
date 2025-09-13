import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  Phone, 
  MapPin, 
  Calendar,
  TrendingUp,
  Package,
  Trophy,
  Eye,
  ShoppingCart,
  Cloud,
  Activity,
  Star,
  Users,
  Leaf,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Crown,
  ShoppingBag,
  Wallet,
  ChevronRight,
  Share2,
  BadgeCheck,
  MessageCircle,
  Shield,
  Gift
} from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Ravi Kumar',
    location: 'Chengalpattu, Tamil Nadu',
    phone: '+91 98765 43210',
    joinedDate: '2023-06-15',
    farmSize: '5.2 acres',
    primaryCrops: ['Rice', 'Wheat', 'Sugarcane']
  });

  const [stats, setStats] = useState({
    totalEarnings: 125000,
    activeListings: 8,
    successfulSales: 23,
    totalViews: 1250,
    avgRating: 4.8,
    diagnosisCount: 15,
    advisorySaved: 12,
    level: 'Expert Farmer'
  });

  const [achievements] = useState([
    { id: 1, title: 'First Sale', icon: Trophy, completed: true },
    { id: 2, title: 'Top Seller', icon: Crown, completed: true },
    { id: 3, title: 'Plant Expert', icon: Leaf, completed: true },
    { id: 4, title: 'Super Star', icon: Star, completed: false }
  ]);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const StatCard = ({ title, value, icon: Icon, color = "bg-blue-500" }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </div>
    </div>
  );

  const MenuItem = ({ icon: Icon, title, subtitle, onClick, rightElement }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="text-left">
          <div className="font-medium text-gray-900">{title}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      {rightElement || <ChevronRight className="w-5 h-5 text-gray-400" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                {userData.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <BadgeCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{userData.phone}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">4.8</span>
                  <span className="text-gray-500"> rating</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{stats.successfulSales}</span>
                  <span className="text-gray-500"> sales</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">2Y</span>
                  <span className="text-gray-500"> member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            title="Total Earnings" 
            value={`₹${(stats.totalEarnings/1000).toFixed(0)}K`} 
            icon={Wallet}
            color="bg-green-500"
          />
          <StatCard 
            title="Active Listings" 
            value={stats.activeListings} 
            icon={Package}
            color="bg-blue-500"
          />
          <StatCard 
            title="Plant Diagnosis" 
            value={stats.diagnosisCount} 
            icon={Activity}
            color="bg-orange-500"
          />
          <StatCard 
            title="Total Views" 
            value={(stats.totalViews/1000).toFixed(1) + "K"} 
            icon={Eye}
            color="bg-purple-500"
          />
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
            <div className="text-sm text-gray-500">
              {achievements.filter(a => a.completed).length}/{achievements.length} unlocked
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <div className={`w-12 h-12 ${achievement.completed ? 'bg-yellow-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <achievement.icon className={`w-6 h-6 ${achievement.completed ? 'text-yellow-600' : 'text-gray-400'}`} />
                </div>
                <div className="text-xs font-medium text-gray-700">{achievement.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Sell Crops', icon: ShoppingBag, color: 'bg-green-500' },
              { title: 'Market Prices', icon: BarChart3, color: 'bg-blue-500' },
              { title: 'Weather', icon: Cloud, color: 'bg-sky-500' },
              { title: 'Diagnose Plant', icon: Activity, color: 'bg-orange-500' }
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-700">{action.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <MenuItem
            icon={ShoppingBag}
            title="My Orders"
            subtitle="View purchase history"
            onClick={() => {}}
          />
          <MenuItem
            icon={Leaf}
            title="Saved Advisory"
            subtitle={`${stats.advisorySaved} tips saved`}
            onClick={() => {}}
          />
          <MenuItem
            icon={Trophy}
            title="Sales Report"
            subtitle="Track your performance"
            onClick={() => {}}
          />
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Notifications</div>
                <div className="text-sm text-gray-500">Push notifications</div>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <MenuItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get assistance"
            onClick={() => {}}
          />
          <MenuItem
            icon={Shield}
            title="Privacy & Security"
            subtitle="Manage account security"
            onClick={() => {}}
          />
          <MenuItem
            icon={Settings}
            title="App Settings"
            subtitle="Preferences"
            onClick={() => {}}
          />
        </div>

        {/* Logout */}
        <button className="w-full bg-white border border-red-200 rounded-xl p-4 text-red-600 font-medium hover:bg-red-50 transition-colors">
          <div className="flex items-center justify-center space-x-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;