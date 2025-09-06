'use client';


import React, { useState, useEffect } from 'react';
import { Search, Trophy, Star, GitBranch, Users, TrendingUp, Code, Award, ChevronDown, Filter, SortDesc, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Developer {
  id: string;
  name: string;
  username: string;
  rank: number;
  score: number;
  avatar: string;
  location: string;
  bio: string;
  skills: string[];
  repositories: number;
  followers: number;
  contributions: number;
  yearsActive: number;
  trending: boolean;
  verified: boolean;
  badges: string[];
  recentActivity: {
    type: string;
    project: string;
    date: string;
  }[];
}

const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahcode',
    rank: 1,
    score: 98.5,
    avatar: '🧑‍💻',
    location: 'San Francisco, CA',
    bio: 'Full-stack engineer passionate about AI and open source',
    skills: ['TypeScript', 'React', 'Python', 'Machine Learning', 'GraphQL'],
    repositories: 142,
    followers: 8420,
    contributions: 2340,
    yearsActive: 6,
    trending: true,
    verified: true,
    badges: ['Top Contributor', 'AI Expert', 'Open Source Hero'],
    recentActivity: [
      { type: 'commit', project: 'ai-toolkit', date: '2h ago' },
      { type: 'pr', project: 'react-framework', date: '1d ago' }
    ]
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    username: 'alexdev',
    rank: 2,
    score: 96.8,
    avatar: '👨‍💻',
    location: 'New York, NY',
    bio: 'DevOps engineer and cloud architecture specialist',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Go'],
    repositories: 89,
    followers: 6120,
    contributions: 1890,
    yearsActive: 5,
    trending: false,
    verified: true,
    badges: ['Cloud Expert', 'DevOps Master'],
    recentActivity: [
      { type: 'release', project: 'k8s-operator', date: '3h ago' },
      { type: 'issue', project: 'terraform-modules', date: '5h ago' }
    ]
  },
  {
    id: '3',
    name: 'Emily Johnson',
    username: 'emilyj',
    rank: 3,
    score: 94.2,
    avatar: '👩‍💻',
    location: 'London, UK',
    bio: 'Frontend specialist with a passion for UX/UI design',
    skills: ['React', 'Vue.js', 'CSS', 'Design Systems', 'JavaScript'],
    repositories: 67,
    followers: 4890,
    contributions: 1560,
    yearsActive: 4,
    trending: true,
    verified: false,
    badges: ['UI/UX Expert', 'Frontend Leader'],
    recentActivity: [
      { type: 'commit', project: 'design-system', date: '1h ago' },
      { type: 'pr', project: 'component-lib', date: '4h ago' }
    ]
  },
  {
    id: '4',
    name: 'Michael Kim',
    username: 'mikek',
    rank: 4,
    score: 92.7,
    avatar: '🧑‍💻',
    location: 'Seoul, South Korea',
    bio: 'Backend developer specializing in microservices',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'PostgreSQL'],
    repositories: 95,
    followers: 3420,
    contributions: 2100,
    yearsActive: 7,
    trending: false,
    verified: true,
    badges: ['Backend Expert', 'Architecture Guru'],
    recentActivity: [
      { type: 'commit', project: 'microservice-template', date: '6h ago' },
      { type: 'review', project: 'api-gateway', date: '8h ago' }
    ]
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    username: 'lisadev',
    rank: 5,
    score: 90.1,
    avatar: '👩‍💻',
    location: 'Toronto, Canada',
    bio: 'Data scientist and ML engineer',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science', 'MLOps'],
    repositories: 78,
    followers: 5670,
    contributions: 1420,
    yearsActive: 5,
    trending: true,
    verified: true,
    badges: ['Data Science Expert', 'ML Pioneer'],
    recentActivity: [
      { type: 'commit', project: 'ml-pipeline', date: '2h ago' },
      { type: 'paper', project: 'research-repo', date: '1d ago' }
    ]
  }
];

const HomePage: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>(mockDevelopers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'followers' | 'contributions'>('rank');
  const [filterBy, setFilterBy] = useState<'all' | 'trending' | 'verified'>('all');
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);

  useEffect(() => {
    let filtered = mockDevelopers.filter(dev => {
      const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dev.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dev.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (filterBy === 'trending') return matchesSearch && dev.trending;
      if (filterBy === 'verified') return matchesSearch && dev.verified;
      return matchesSearch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rank': return a.rank - b.rank;
        case 'score': return b.score - a.score;
        case 'followers': return b.followers - a.followers;
        case 'contributions': return b.contributions - a.contributions;
        default: return a.rank - b.rank;
      }
    });

    setDevelopers(filtered);
  }, [searchQuery, sortBy, filterBy]);

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-yellow-900';
    if (rank === 2) return 'bg-gray-400 text-gray-900';
    if (rank === 3) return 'bg-orange-600 text-orange-100';
    return 'bg-muted text-muted-foreground';
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-primary';
    if (score >= 85) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 theme-bg-pattern"></div>
      <div className="absolute inset-0 hero-texture"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="professional-gradient p-2 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground instrument">DevRank</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Developer Rankings</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="bg-primary/10 px-3 py-2 rounded-lg">
                  <span className="text-sm font-medium text-primary">
                    🔥 Live Rankings Updated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10,247</div>
                <div className="text-sm text-muted-foreground">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.4M</div>
                <div className="text-sm text-muted-foreground">Code Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">847K</div>
                <div className="text-sm text-muted-foreground">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search developers by name, username, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-ring min-w-[140px]"
                >
                  <option value="rank">Sort by Rank</option>
                  <option value="score">Sort by Score</option>
                  <option value="followers">Sort by Followers</option>
                  <option value="contributions">Sort by Contributions</option>
                </select>
                
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-ring min-w-[120px]"
                >
                  <option value="all">All Developers</option>
                  <option value="trending">Trending</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Top Developers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rankings List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground instrument">Top Developers</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Updated 5 minutes ago
                </div>
              </div>

              <div className="space-y-4">
                {developers.map((developer) => (
                  <div 
                    key={developer.id}
                    onClick={() => setSelectedDeveloper(developer)}
                    className="bg-card border border-border rounded-xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/30 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Rank Badge */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeColor(developer.rank)}`}>
                          {developer.rank <= 3 ? (
                            developer.rank === 1 ? '🥇' : developer.rank === 2 ? '🥈' : '🥉'
                          ) : (
                            developer.rank
                          )}
                        </div>

                        {/* Avatar and Info */}
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center text-2xl">
                            {developer.avatar}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground truncate">
                                {developer.name}
                              </h3>
                              {developer.verified && (
                                <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                                  ✓ Verified
                                </div>
                              )}
                              {developer.trending && (
                                <div className="bg-red-500/10 text-red-500 px-2 py-1 rounded-full text-xs font-medium">
                                  🔥 Trending
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <span>@{developer.username}</span>
                              <span className="mx-2">•</span>
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{developer.location}</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {developer.bio}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {developer.skills.slice(0, 3).map((skill) => (
                                <span 
                                  key={skill}
                                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                              {developer.skills.length > 3 && (
                                <span className="text-xs text-muted-foreground px-2 py-1">
                                  +{developer.skills.length - 3} more
                                </span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center text-muted-foreground">
                                <GitBranch className="h-3 w-3 mr-1" />
                                {developer.repositories} repos
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Users className="h-3 w-3 mr-1" />
                                {developer.followers.toLocaleString()} followers
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Code className="h-3 w-3 mr-1" />
                                {developer.contributions} contributions
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(developer.score)}`}>
                          {developer.score}
                        </div>
                        <div className="text-sm text-muted-foreground">DevRank Score</div>
                        
                        {/* Progress Bar */}
                        <div className="w-20 h-2 bg-muted rounded-full mt-2">
                          <div 
                            className="h-2 bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${developer.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Developer Spotlight */}
              {selectedDeveloper && (
                <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                  <h3 className="text-lg font-semibold text-foreground mb-4 instrument">Developer Spotlight</h3>
                  
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      {selectedDeveloper.avatar}
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">{selectedDeveloper.name}</h4>
                    <p className="text-muted-foreground">@{selectedDeveloper.username}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">DevRank Score</span>
                      <span className={`font-semibold ${getScoreColor(selectedDeveloper.score)}`}>
                        {selectedDeveloper.score}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Global Rank</span>
                      <span className="font-semibold text-foreground">#{selectedDeveloper.rank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Years Active</span>
                      <span className="font-semibold text-foreground">{selectedDeveloper.yearsActive}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-foreground mb-2">Badges</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeveloper.badges.map((badge) => (
                        <span 
                          key={badge}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                        >
                          <Award className="h-3 w-3 inline mr-1" />
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-foreground mb-2">Recent Activity</h5>
                    <div className="space-y-2">
                      {selectedDeveloper.recentActivity.slice(0, 3).map((activity, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">
                            {activity.type} in {activity.project} • {activity.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Profile
                  </button>
                </div>
              )}

              {/* Trending Skills */}
              <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4 instrument">Trending Skills</h3>
                <div className="space-y-3">
                  {[
                    { skill: 'TypeScript', trend: '+12%', developers: 1240 },
                    { skill: 'Rust', trend: '+28%', developers: 890 },
                    { skill: 'Go', trend: '+15%', developers: 1120 },
                    { skill: 'Machine Learning', trend: '+22%', developers: 2340 },
                    { skill: 'WebAssembly', trend: '+45%', developers: 560 }
                  ].map(({ skill, trend, developers }) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{skill}</div>
                        <div className="text-sm text-muted-foreground">{developers} developers</div>
                      </div>
                      <div className="text-green-600 font-medium text-sm">{trend}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-xl p-6 professional-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4 instrument">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center">
                    <Star className="h-4 w-4 mr-2" />
                    Submit for Review
                  </button>
                  <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </button>
                  <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Join Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="professional-gradient p-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground instrument">DevRank</div>
                  <div className="text-sm text-muted-foreground">Powered by AI</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">About</a>
                <a href="#" className="hover:text-primary transition-colors">API</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;