
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
import { Database, Shield } from 'lucide-react';

export const SystemStatsCard = ({ isAdmin }: { isAdmin: boolean }) => (
  <Card className="bg-card/90 backdrop-blur-sm border-primary/20 animate-fade-in-up animate-delay-500">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-card-foreground">
          {isAdmin ? "System Management" : "System Coverage"}
        </h3>
      </div>
      <div className="space-y-3 text-sm">
        {isAdmin ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Users:</span>
              <span className="text-primary font-semibold">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Machines Online:</span>
              <span className="text-primary font-semibold">12/14</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Admin Level:</span>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-red-500" />
                <span className="text-red-500 font-semibold">Full Access</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Backup:</span>
              <span className="text-green-600 font-semibold">2h ago</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">CNC Machines:</span>
              <span className="text-primary font-semibold">6+ Makes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Programs Stored:</span>
              <span className="text-primary font-semibold">2,400+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">System Uptime:</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-semibold">99.8%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Security Level:</span>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-primary font-semibold">Enterprise</span>
              </div>
            </div>
          </>
        )}
      </div>
    </CardContent>
  </Card>
);