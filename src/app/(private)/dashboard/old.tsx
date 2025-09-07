'use client';

import React, { useState, useEffect } from 'react';
import {
    BarChart3, TrendingUp, Users, GitBranch, Award, Target,
    Calendar, Clock, MapPin, Star, Code2, Activity,
    ArrowUpRight, ArrowDownRight, Zap, Globe,
    PieChart, LineChart, Database, Shield, Search,
    Filter, Download, RefreshCw, Bell, Settings,
    Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { ModeToggle } from '@/components/toggle-theme';
import { ProfileDropdown } from '@/components/profile-dropdown';

interface DashboardStats {
    totalDevelopers: number;
    activeToday: number;
    totalRepositories: number;
    codeReviews: number;
    avgScore: number;
    topLanguages: { name: string; percentage: number; count: number }[];
    regionStats: { region: string; developers: number; avgScore: number }[];
    recentActivity: {
        type: string;
        user: string;
        action: string;
        time: string;
        score?: number;
    }[];
    scoreDistribution: { range: string; count: number; percentage: number }[];
    trending: {
        skills: { name: string; growth: number; developers: number }[];
        repositories: { name: string; stars: number; language: string; growth: number }[];
    };
    performance: {
        dailySignups: number;
        weeklyGrowth: number;
        monthlyActive: number;
        retentionRate: number;
    };
}

const mockDashboardData: DashboardStats = {
    totalDevelopers: 48726,
    activeToday: 12847,
    totalRepositories: 847293,
    codeReviews: 2847392,
    avgScore: 76.4,
    topLanguages: [
        { name: 'JavaScript', percentage: 34.2, count: 16664 },
        { name: 'Python', percentage: 28.7, count: 13984 },
        { name: 'TypeScript', percentage: 22.1, count: 10768 },
        { name: 'Java', percentage: 18.9, count: 9209 },
        { name: 'Go', percentage: 12.3, count: 5993 },
        { name: 'Rust', percentage: 8.7, count: 4239 }
    ],
    regionStats: [
        { region: 'North America', developers: 15420, avgScore: 78.2 },
        { region: 'Europe', developers: 13890, avgScore: 77.8 },
        { region: 'Asia Pacific', developers: 16240, avgScore: 76.9 },
        { region: 'Other', developers: 3176, avgScore: 74.1 }
    ],
    recentActivity: [
        { type: 'achievement', user: 'sarah_dev', action: 'earned "AI Expert" badge', time: '2m ago', score: 95.2 },
        { type: 'milestone', user: 'alex_codes', action: 'reached 10K contributions', time: '5m ago' },
        { type: 'ranking', user: 'emily_js', action: 'moved to top 100', time: '8m ago', score: 89.7 },
        { type: 'project', user: 'mike_backend', action: 'launched new open source project', time: '12m ago' },
        { type: 'review', user: 'lisa_ml', action: 'completed 50 code reviews', time: '15m ago' },
        { type: 'achievement', user: 'john_frontend', action: 'earned "UI/UX Master" badge', time: '18m ago' }
    ],
    scoreDistribution: [
        { range: '90-100', count: 2436, percentage: 5.0 },
        { range: '80-89', count: 8793, percentage: 18.1 },
        { range: '70-79', count: 14618, percentage: 30.0 },
        { range: '60-69', count: 12674, percentage: 26.0 },
        { range: '50-59', count: 7321, percentage: 15.0 },
        { range: '<50', count: 2884, percentage: 5.9 }
    ],
    trending: {
        skills: [
            { name: 'AI/ML', growth: 45.2, developers: 8420 },
            { name: 'Web3', growth: 38.7, developers: 3240 },
            { name: 'Rust', growth: 32.1, developers: 4890 },
            { name: 'DevOps', growth: 28.4, developers: 7650 },
            { name: 'React', growth: 22.8, developers: 15670 }
        ],
        repositories: [
            { name: 'ai-code-assistant', stars: 12847, language: 'Python', growth: 67.2 },
            { name: 'web3-toolkit', stars: 8934, language: 'TypeScript', growth: 45.8 },
            { name: 'rust-performance', stars: 6742, language: 'Rust', growth: 43.1 },
            { name: 'devops-automation', stars: 5689, language: 'Go', growth: 38.9 }
        ]
    },
    performance: {
        dailySignups: 342,
        weeklyGrowth: 12.7,
        monthlyActive: 35678,
        retentionRate: 84.2
    }
};

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardStats>(mockDashboardData);
    const [activeTimeframe, setActiveTimeframe] = useState<'24h' | '7d' | '30d' | '1y'>('7d');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 theme-bg-pattern"></div>
            <div className="absolute inset-0 hero-texture"></div>

            <div className="relative z-10">
                {/* Header */}
                <Header className="w-full flex justify-between border-b">
                    <div className="flex flex-col py-3">
                        <h1 className="text-lg font-bold text-foreground ">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Real-time developer analytics & insights</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        {/* <Search /> */}
                        <div className="hidden md:flex items-center space-x-2">
                            {['24h', '7d', '30d', '1y'].map((period) => (
                                <Button
                                    key={period}
                                    onClick={() => setActiveTimeframe(period as any)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTimeframe === period
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    {period}
                                </Button>
                            ))}
                        </div>
                        <ModeToggle />
                        <ProfileDropdown />
                    </div>
                </Header>

                <main className="container mx-auto px-4 lg:px-6 py-8">
                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Developers */}
                        <div className="bg-card border border-border rounded-xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-green-600 flex items-center text-sm font-medium">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    +{data.performance.weeklyGrowth}%
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {formatNumber(data.totalDevelopers)}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Developers</div>
                            <div className="mt-3 text-xs text-muted-foreground">
                                +{data.performance.dailySignups} new today
                            </div>
                        </div>

                        {/* Active Today */}
                        <div className="bg-card border border-border rounded-xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                    <Activity className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="text-green-600 flex items-center text-sm font-medium">
                                    <Zap className="h-4 w-4 mr-1" />
                                    Live
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {formatNumber(data.activeToday)}
                            </div>
                            <div className="text-sm text-muted-foreground">Active Today</div>
                            <div className="mt-3 w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(data.activeToday / data.totalDevelopers) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Code Reviews */}
                        <div className="bg-card border border-border rounded-xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <Code2 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="text-blue-600 flex items-center text-sm font-medium">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    +15.2%
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {formatNumber(data.codeReviews)}
                            </div>
                            <div className="text-sm text-muted-foreground">Code Reviews</div>
                            <div className="mt-3 text-xs text-muted-foreground">
                                {Math.floor(data.codeReviews / data.totalDevelopers)} avg per dev
                            </div>
                        </div>

                        {/* Average Score */}
                        <div className="bg-card border border-border rounded-xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-primary flex items-center text-sm font-medium">
                                    <Star className="h-4 w-4 mr-1" />
                                    Elite
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {data.avgScore}
                            </div>
                            <div className="text-sm text-muted-foreground">Average DevRank Score</div>
                            <div className="mt-3 w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${data.avgScore}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Top Languages Chart */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-md font-semibold text-foreground ">Programming Languages</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-sm text-muted-foreground">Last 30 days</div>
                                        <Download className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {data.topLanguages.map((lang, index) => (
                                        <div key={lang.name} className="group">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' :
                                                        index === 1 ? 'bg-blue-500' :
                                                            index === 2 ? 'bg-green-500' :
                                                                index === 3 ? 'bg-yellow-500' :
                                                                    index === 4 ? 'bg-purple-500' :
                                                                        'bg-pink-500'
                                                        }`}></div>
                                                    <span className="font-medium text-foreground">{lang.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {formatNumber(lang.count)} devs
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-foreground">{lang.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`h-1 rounded-full transition-all duration-700 group-hover:shadow-lg ${index === 0 ? 'bg-primary' :
                                                        index === 1 ? 'bg-blue-500' :
                                                            index === 2 ? 'bg-green-500' :
                                                                index === 3 ? 'bg-yellow-500' :
                                                                    index === 4 ? 'bg-purple-500' :
                                                                        'bg-pink-500'
                                                        }`}
                                                    style={{ width: `${lang.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Regional Distribution */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-md font-semibold text-foreground ">Global Distribution</h3>
                                    <Globe className="h-5 w-5 text-muted-foreground" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.regionStats.map((region, index) => (
                                        <div key={region.region} className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-foreground">{region.region}</h4>
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Developers</span>
                                                    <span className="font-medium text-foreground">{formatNumber(region.developers)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Avg Score</span>
                                                    <span className="font-medium text-primary">{region.avgScore}</span>
                                                </div>
                                                <div className="w-full bg-background rounded-full h-2 mt-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${(region.developers / data.totalDevelopers) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Score Distribution */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-md font-semibold text-foreground ">Score Distribution</h3>
                                    <PieChart className="h-5 w-5 text-muted-foreground" />
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.scoreDistribution.map((dist, index) => (
                                        <div key={dist.range} className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="text-lg font-bold text-foreground mb-1">
                                                {formatNumber(dist.count)}
                                            </div>
                                            <div className="text-sm text-muted-foreground mb-1">
                                                Score {dist.range}
                                            </div>
                                            <div className="text-xs text-primary font-medium">
                                                {dist.percentage}% of total
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trending Repositories */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-md font-semibold text-foreground ">Trending Repositories</h3>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        Fastest Growing
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {data.trending.repositories.map((repo, index) => (
                                        <div key={repo.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-lg font-bold text-muted-foreground">
                                                    #{index + 1}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {repo.name}
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                                        <span className="flex items-center">
                                                            <Star className="h-3 w-3 mr-1" />
                                                            {formatNumber(repo.stars)}
                                                        </span>
                                                        <span>{repo.language}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold flex items-center">
                                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                                    +{repo.growth}%
                                                </div>
                                                <div className="text-xs text-muted-foreground">growth</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Performance Metrics */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <h3 className="text-md font-semibold text-foreground mb-6 ">Platform Performance</h3>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-muted-foreground">Monthly Active Users</span>
                                            <span className="font-semibold text-foreground">
                                                {formatNumber(data.performance.monthlyActive)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full w-4/5 transition-all duration-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-muted-foreground">Retention Rate</span>
                                            <span className="font-semibold text-green-600">
                                                {data.performance.retentionRate}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${data.performance.retentionRate}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-primary mb-1">
                                                {data.performance.dailySignups}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Daily Signups</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trending Skills */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <h3 className="text-md font-semibold text-foreground mb-6 ">Trending Skills</h3>

                                <div className="space-y-4">
                                    {data.trending.skills.map((skill, index) => (
                                        <div key={skill.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div>
                                                <div className="font-medium text-foreground">{skill.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatNumber(skill.developers)} developers
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold text-sm">
                                                    +{skill.growth}%
                                                </div>
                                                <div className="text-xs text-muted-foreground">this week</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity Feed */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-md font-semibold text-foreground ">Live Activity</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-muted-foreground">Live</span>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {data.recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                                            <div className={`p-2 rounded-full ${activity.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-600' :
                                                activity.type === 'milestone' ? 'bg-blue-500/20 text-blue-600' :
                                                    activity.type === 'ranking' ? 'bg-green-500/20 text-green-600' :
                                                        activity.type === 'project' ? 'bg-purple-500/20 text-purple-600' :
                                                            'bg-primary/20 text-primary'
                                                }`}>
                                                {activity.type === 'achievement' ? <Award className="h-3 w-3" /> :
                                                    activity.type === 'milestone' ? <Target className="h-3 w-3" /> :
                                                        activity.type === 'ranking' ? <TrendingUp className="h-3 w-3" /> :
                                                            activity.type === 'project' ? <GitBranch className="h-3 w-3" /> :
                                                                <Code2 className="h-3 w-3" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-foreground text-sm">
                                                    @{activity.user}
                                                </div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {activity.action}
                                                    {activity.score && (
                                                        <span className="text-primary font-medium ml-1">
                                                            (Score: {activity.score})
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {activity.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-border">
                                    <Button className="w-full text-center text-sm text-white hover:text-primary/80 font-medium">
                                        View All Activity →
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Additional Metrics */}
                        <div className="space-y-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 col-span-3">
                            {/* AI Insights */}
                            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 professional-shadow">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                        <Zap className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="text-md font-semibold text-foreground ">AI Insights</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-card/50 rounded-lg">
                                        <div className="text-sm text-foreground font-medium mb-2">
                                            🚀 Emerging Trend Detected
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            WebAssembly adoption surged 67% this month among top developers
                                        </div>
                                    </div>

                                    <div className="p-4 bg-card/50 rounded-lg">
                                        <div className="text-sm text-foreground font-medium mb-2">
                                            📊 Score Prediction
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Developers focusing on AI/ML skills show 23% faster score growth
                                        </div>
                                    </div>

                                    <div className="p-4 bg-card/50 rounded-lg">
                                        <div className="text-sm text-foreground font-medium mb-2">
                                            🎯 Recommendation
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Consider featuring TypeScript + AI developers in next spotlight
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <h3 className="text-md font-semibold text-foreground mb-6 ">Quick Stats</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <Database className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground">Repositories</div>
                                                <div className="text-sm text-muted-foreground">Total tracked</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-foreground">{formatNumber(data.totalRepositories)}</div>
                                            <div className="text-xs text-green-600">+2.3%</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                                <Shield className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground">Verified Devs</div>
                                                <div className="text-sm text-muted-foreground">Identity confirmed</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-foreground">
                                                {formatNumber(Math.floor(data.totalDevelopers * 0.34))}
                                            </div>
                                            <div className="text-xs text-primary">34% verified</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <Award className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground">Top Performers</div>
                                                <div className="text-sm text-muted-foreground">Score 90+</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-foreground">
                                                {formatNumber(data.scoreDistribution[0].count + data.scoreDistribution[1].count)}
                                            </div>
                                            <div className="text-xs text-green-600">Elite tier</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System Status */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <h3 className="text-md font-semibold text-foreground mb-4 ">System Status</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">API Health</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-green-600">Operational</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Data Sync</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-green-600">Real-time</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">AI Processing</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-yellow-600">Processing</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Cache Status</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm font-medium text-green-600">Optimal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Center */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <h3 className="text-md font-semibold text-foreground mb-4 ">Action Center</h3>

                                <div className="space-y-3">
                                    <Button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Report
                                    </Button>

                                    <Button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center">
                                        <Bell className="h-4 w-4 mr-2" />
                                        Setup Alerts
                                    </Button>

                                    <Button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center">
                                        <Settings className="h-4 w-4 mr-2" />
                                        Dashboard Settings
                                    </Button>
                                </div>
                            </div>

                            {/* Top Contributors This Week */}
                            <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                                <h3 className="text-md font-semibold text-foreground mb-4 ">Weekly Champions</h3>

                                <div className="space-y-3">
                                    {[
                                        { name: 'Sarah Chen', avatar: '🧑‍💻', contributions: 127, score: 98.5 },
                                        { name: 'Alex Rodriguez', avatar: '👨‍💻', contributions: 89, score: 96.8 },
                                        { name: 'Emily Johnson', avatar: '👩‍💻', contributions: 76, score: 94.2 }
                                    ].map((dev, index) => (
                                        <div key={dev.name} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-500 text-yellow-900' :
                                                index === 1 ? 'bg-gray-400 text-gray-900' :
                                                    'bg-orange-600 text-orange-100'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div className="text-md">{dev.avatar}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-foreground text-sm truncate">{dev.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {dev.contributions} contributions • Score {dev.score}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Additional Analytics */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Technology Adoption Trends */}
                        <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                            <h3 className="text-md font-semibold text-foreground mb-6 ">Technology Adoption Trends</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-foreground mb-3">Frontend Frameworks</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'React', percentage: 67.3, change: '+2.1%' },
                                            { name: 'Vue.js', percentage: 23.8, change: '-1.2%' },
                                            { name: 'Angular', percentage: 18.9, change: '-0.8%' },
                                            { name: 'Svelte', percentage: 12.4, change: '+5.7%' }
                                        ].map((framework) => (
                                            <div key={framework.name} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-foreground">{framework.name}</span>
                                                    <div className="w-24 bg-muted rounded-full h-2">
                                                        <div
                                                            className="bg-primary h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${framework.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-muted-foreground">{framework.percentage}%</span>
                                                    <span className={`text-xs font-medium ${framework.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {framework.change}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-foreground mb-3">Backend Technologies</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Node.js', percentage: 45.2, change: '+1.8%' },
                                            { name: 'Python', percentage: 38.7, change: '+3.2%' },
                                            { name: 'Java', percentage: 32.1, change: '-0.5%' },
                                            { name: 'Go', percentage: 28.9, change: '+4.1%' }
                                        ].map((tech) => (
                                            <div key={tech.name} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-foreground">{tech.name}</span>
                                                    <div className="w-24 bg-muted rounded-full h-2">
                                                        <div
                                                            className="bg-accent h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${tech.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-muted-foreground">{tech.percentage}%</span>
                                                    <span className={`text-xs font-medium ${tech.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {tech.change}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Platform Analytics */}
                        <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                            <h3 className="text-md font-semibold text-foreground mb-6 ">Platform Analytics</h3>

                            <div className="space-y-6">
                                {/* Engagement Metrics */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground mb-4">Engagement Metrics</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                                            <div className="text-lg font-bold text-primary">94.7%</div>
                                            <div className="text-xs text-muted-foreground">Profile Completion</div>
                                        </div>
                                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                                            <div className="text-lg font-bold text-primary">8.2</div>
                                            <div className="text-xs text-muted-foreground">Avg Session (min)</div>
                                        </div>
                                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                                            <div className="text-lg font-bold text-primary">76%</div>
                                            <div className="text-xs text-muted-foreground">Weekly Return</div>
                                        </div>
                                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                                            <div className="text-lg font-bold text-primary">4.1</div>
                                            <div className="text-xs text-muted-foreground">Avg Reviews/Day</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Growth Indicators */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground mb-4">Growth Indicators</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                                            <span className="text-sm text-muted-foreground">New Developers</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-foreground">+342</span>
                                                <span className="text-green-600 text-xs">+12.7%</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                                            <span className="text-sm text-muted-foreground">Score Updates</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-foreground">1,247</span>
                                                <span className="text-blue-600 text-xs">Daily</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                                            <span className="text-sm text-muted-foreground">Badge Earnings</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-foreground">89</span>
                                                <span className="text-purple-600 text-xs">Today</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Platform Health */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground mb-4">Platform Health</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Uptime</span>
                                            <span className="text-sm font-semibold text-green-600">99.97%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Response Time</span>
                                            <span className="text-sm font-semibold text-foreground">1.2s avg</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Error Rate</span>
                                            <span className="text-sm font-semibold text-green-600">0.03%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Platform Updates */}
                    <div className="mt-8 bg-card border border-border rounded-xl p-6 professional-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-md font-semibold text-foreground ">Platform Updates & Insights</h3>
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Algorithm Update */}
                            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="p-1 bg-primary/20 rounded">
                                        <Zap className="h-4 w-4 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">Algorithm v2.1</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Enhanced AI scoring now includes contribution quality metrics and code impact analysis.
                                </p>
                                <div className="text-xs text-primary font-medium">Released 3 days ago</div>
                            </div>

                            {/* New Features */}
                            <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="p-1 bg-green-500/20 rounded">
                                        <Star className="h-4 w-4 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">Skills Tracking</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    New skill progression tracking with personalized learning recommendations.
                                </p>
                                <div className="text-xs text-green-600 font-medium">Beta Launch</div>
                            </div>

                            {/* Community Milestone */}
                            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="p-1 bg-purple-500/20 rounded">
                                        <Trophy className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">50K Milestone</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    DevRank community reached 50,000 verified developers worldwide!
                                </p>
                                <div className="text-xs text-purple-600 font-medium">Achieved yesterday</div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-card border-t border-border mt-12">
                    <div className="container mx-auto px-4 lg:px-6 py-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center">
                            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                                <div className="professional-gradient p-2 rounded-lg">
                                    <BarChart3 className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <div className="font-semibold text-foreground ">DevRank Dashboard</div>
                                    <div className="text-sm text-muted-foreground">Powered by AI • Real-time Analytics</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
                                <a href="#" className="hover:text-primary transition-colors">Data Sources</a>
                                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-primary transition-colors">Support</a>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border text-center">
                            <div className="text-xs text-muted-foreground">
                                Last updated: {new Date().toLocaleString()} • Data refreshes every 5 minutes
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;