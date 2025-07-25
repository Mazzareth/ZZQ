"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Clock, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";

// Sample sales data showing upward trend for motivation
const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 18000 },
  { month: "Apr", sales: 22000 },
  { month: "May", sales: 28000 },
  { month: "Jun", sales: 35000 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(142, 76%, 36%)", // Green color for positive growth
  },
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome Back! {user.displayName || user.email?.split('@')[0] || "User"}
        </h1>
        <p className="text-xl text-muted-foreground">
          How can ZZQ Help today?
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$847,230</div>
            <p className="text-xs text-green-600">
              +23% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending Earnings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,580</div>
            <p className="text-xs text-blue-600">
              Expected this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Sales Growth
            </CardTitle>
            <CardDescription>
              Your sales are consistently growing! Keep up the great work.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(142, 76%, 36%)"
                  fill="url(#salesGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              What ZZQ has changed recently!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                 <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                 <div className="flex-1 space-y-1">
                   <p className="text-sm font-medium">ZZQ crafted a brilliant client outreach strategy</p>
                   <p className="text-xs text-muted-foreground">2 hours ago</p>
                 </div>
               </div>
               <div className="flex items-start space-x-4">
                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                 <div className="flex-1 space-y-1">
                   <p className="text-sm font-medium">ZZQ updated 15 client profiles with fresh insights</p>
                   <p className="text-xs text-muted-foreground">4 hours ago</p>
                 </div>
               </div>
               <div className="flex items-start space-x-4">
                 <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                 <div className="flex-1 space-y-1">
                   <p className="text-sm font-medium">ZZQ whipped up personalized follow-up recommendations</p>
                   <p className="text-xs text-muted-foreground">6 hours ago</p>
                 </div>
               </div>
               <div className="flex items-start space-x-4">
                 <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                 <div className="flex-1 space-y-1">
                   <p className="text-sm font-medium">ZZQ spotted 8 promising leads worth pursuing</p>
                   <p className="text-xs text-muted-foreground">8 hours ago</p>
                 </div>
               </div>
               <div className="flex items-start space-x-4">
                 <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                 <div className="flex-1 space-y-1">
                   <p className="text-sm font-medium">ZZQ deployed client satisfaction surveys like a pro</p>
                   <p className="text-xs text-muted-foreground">12 hours ago</p>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}