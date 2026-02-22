import { useState } from 'react';
import { Calculator, Clock, CheckCircle, Info, X, User, Phone, Mail, MapPin, Download } from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  estimatedTime: string;
  category: string;
  icon: React.ComponentType<any>;
  features: string[];
  availability?: 'available' | 'limited' | 'unavailable';
}

interface DetailedService {
  id: string;
  name: string;
  description: string;
  price: number;
  time: string;
  included: string[];
  optional: string[];
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ServiceCalculator = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSubServices, setSelectedSubServices] = useState<Record<string, string[]>>({});
  const [urgency, setUrgency] = useState<'normal' | 'express' | 'emergency'>('normal');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [comparisonMode] = useState(false);
  const [comparisonServices] = useState<ServiceComparison[]>([]);
  const [builderMode] = useState(false);
  const [showAvailability] = useState(false);


  const detailedServices: Record<string, DetailedService[]> = {
    'laptop-repair': [
      {
        id: 'diagnostics',
        name: 'Complete System Diagnostics',
        description: 'Comprehensive hardware and software analysis',
        price: 500,
        time: '1-2 hours',
        included: ['Hardware component testing', 'Software performance analysis', 'System health report', 'Issue identification'],
        optional: ['Advanced diagnostic tools', 'Performance benchmarking', 'Battery health check'],
        dependencies: ['hardware-repair', 'software-fix', 'cleaning'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['hardware-repair']
      },
      {
        id: 'hardware-repair',
        name: 'Hardware Component Repair',
        description: 'Repair or replacement of faulty components',
        price: 800,
        time: '2-4 hours',
        included: ['Component identification', 'Repair or replacement', 'Testing and validation', 'Warranty on parts'],
        optional: ['Premium components', 'Extended warranty', 'Performance upgrades'],
        dependencies: ['software-fix'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['hardware-repair']
      },
      {
        id: 'software-fix',
        name: 'Software Issues Resolution',
        description: 'Operating system and software problem fixes',
        price: 400,
        time: '1-3 hours',
        included: ['Virus removal', 'Driver updates', 'System optimization', 'Software reinstallation'],
        optional: ['Data backup', 'System restore points', 'Performance optimization'],
        dependencies: ['hardware-repair'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['software-fix']
      },
      {
        id: 'cleaning',
        name: 'Deep Cleaning & Maintenance',
        description: 'Physical cleaning and preventive maintenance',
        price: 300,
        time: '1-2 hours',
        included: ['Dust removal', 'Thermal paste replacement', 'Fan cleaning', 'General maintenance'],
        optional: ['Premium cleaning materials', 'Anti-static treatment', 'Performance monitoring setup'],
        dependencies: ['hardware-repair'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['cleaning']
      }
    ],
    'pc-build': [
      {
        id: 'consultation',
        name: 'Custom Configuration Consultation',
        description: 'Expert advice on component selection',
        price: 1000,
        time: '2-3 hours',
        included: ['Requirements analysis', 'Component recommendations', 'Budget optimization', 'Performance planning'],
        optional: ['Future-proofing advice', 'Upgrade path planning', 'Aesthetic consultation'],
        dependencies: ['assembly'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['consultation']
      },
      {
        id: 'assembly',
        name: 'Professional Assembly',
        description: 'Complete system assembly and testing',
        price: 2000,
        time: '4-6 hours',
        included: ['Component assembly', 'Cable management', 'Initial testing', 'Basic setup'],
        optional: ['Premium cable management', 'Custom modifications', 'Extended testing'],
        dependencies: ['software-setup'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['assembly']
      },
      {
        id: 'software-setup',
        name: 'Software Installation & Setup',
        description: 'Operating system and essential software installation',
        price: 1200,
        time: '2-3 hours',
        included: ['OS installation', 'Driver installation', 'Essential software', 'Basic configuration'],
        optional: ['Additional software', 'Custom configurations', 'User profile setup'],
        dependencies: ['testing'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['software-setup']
      },
      {
        id: 'testing',
        name: 'Comprehensive Testing',
        description: 'Full system testing and validation',
        price: 800,
        time: '2-4 hours',
        included: ['Stress testing', 'Performance benchmarking', 'Stability testing', 'Quality assurance'],
        optional: ['Extended testing period', 'Performance optimization', 'Custom benchmarks'],
        dependencies: ['software-setup'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['testing']
      }
    ],
    'network-setup': [
      {
        id: 'assessment',
        name: 'Network Assessment',
        description: 'Complete network infrastructure analysis',
        price: 800,
        time: '2-3 hours',
        included: ['Site survey', 'Signal strength analysis', 'Interference detection', 'Coverage mapping'],
        optional: ['Advanced network analysis', 'Security assessment', 'Performance testing'],
        dependencies: ['router-setup'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['router-setup']
      },
      {
        id: 'router-setup',
        name: 'Router & WiFi Configuration',
        description: 'Complete router setup and optimization',
        price: 1000,
        time: '2-3 hours',
        included: ['Router installation', 'WiFi configuration', 'Security setup', 'Performance optimization'],
        optional: ['Advanced security features', 'Guest network setup', 'Parental controls'],
        dependencies: ['device-config'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['router-setup']
      },
      {
        id: 'device-config',
        name: 'Device Configuration',
        description: 'Network setup for all devices',
        price: 600,
        time: '2-4 hours',
        included: ['Device connection', 'Network configuration', 'Security setup', 'Testing'],
        optional: ['Advanced device management', 'Remote access setup', 'Backup configuration'],
        dependencies: ['security'],
        conflicts: ['cybersecurity'],
        availability: 'available',
        recommended: ['device-config']
      },
      {
        id: 'security',
        name: 'Network Security Setup',
        description: 'Comprehensive security configuration',
        price: 600,
        time: '2-3 hours',
        included: ['Firewall configuration', 'Access control', 'Security protocols', 'Monitoring setup'],
        optional: ['Advanced security features', 'VPN setup', 'Intrusion detection'],
        dependencies: ['cybersecurity'],
        conflicts: ['router-setup'],
        availability: 'limited',
        recommended: ['security']
      }
    ],
    'cybersecurity': [
      {
        id: 'vulnerability-scan',
        name: 'Vulnerability Assessment',
        description: 'Comprehensive security vulnerability scanning',
        price: 2000,
        time: '4-6 hours',
        included: ['System scanning', 'Vulnerability identification', 'Risk assessment', 'Detailed report'],
        optional: ['Penetration testing', 'Advanced scanning tools', 'Compliance checking'],
        dependencies: ['malware-removal'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['vulnerability-scan']
      },
      {
        id: 'malware-removal',
        name: 'Malware Removal & Protection',
        description: 'Complete malware removal and protection setup',
        price: 1500,
        time: '3-5 hours',
        included: ['Malware detection', 'Complete removal', 'Protection installation', 'System hardening'],
        optional: ['Advanced protection tools', 'Real-time monitoring', 'Incident response setup'],
        dependencies: ['security-config'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['malware-removal']
      },
      {
        id: 'security-config',
        name: 'Security Configuration',
        description: 'Comprehensive security system setup',
        price: 2500,
        time: '4-6 hours',
        included: ['Security software setup', 'Policy configuration', 'Access control', 'Monitoring setup'],
        optional: ['Advanced security features', 'Compliance frameworks', 'Custom policies'],
        dependencies: ['training'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['security-config']
      },
      {
        id: 'training',
        name: 'Security Awareness Training',
        description: 'Employee security training and education',
        price: 2000,
        time: '3-4 hours',
        included: ['Security best practices', 'Threat awareness', 'Policy training', 'Assessment'],
        optional: ['Custom training materials', 'Ongoing support', 'Certification'],
        dependencies: ['cybersecurity'],
        conflicts: ['security-config'],
        availability: 'limited',
        recommended: ['training']
      }
    ],
    'data-recovery': [
      {
        id: 'assessment',
        name: 'Data Recovery Assessment',
        description: 'Initial assessment and recovery planning',
        price: 500,
        time: '1-2 hours',
        included: ['Damage assessment', 'Recovery feasibility', 'Cost estimation', 'Recovery plan'],
        optional: ['Advanced diagnostics', 'Priority assessment', 'Recovery timeline'],
        dependencies: ['file-recovery'],
        conflicts: ['system-recovery'],
        availability: 'available',
        recommended: ['file-recovery']
      },
      {
        id: 'file-recovery',
        name: 'File Recovery',
        description: 'Recovery of deleted or corrupted files',
        price: 800,
        time: '2-6 hours',
        included: ['File scanning', 'Recovery attempt', 'File validation', 'Safe transfer'],
        optional: ['Advanced recovery tools', 'Priority processing', 'Multiple attempts'],
        dependencies: ['system-recovery'],
        conflicts: ['data-recovery'],
        availability: 'available',
        recommended: ['file-recovery']
      },
      {
        id: 'system-recovery',
        name: 'System Recovery',
        description: 'Complete system recovery and restoration',
        price: 1200,
        time: '4-8 hours',
        included: ['System analysis', 'Recovery attempt', 'System restoration', 'Testing'],
        optional: ['Advanced recovery methods', 'System optimization', 'Backup creation'],
        dependencies: ['backup-setup'],
        conflicts: ['data-recovery'],
        availability: 'available',
        recommended: ['system-recovery']
      },
      {
        id: 'backup-setup',
        name: 'Backup Solution Setup',
        description: 'Preventive backup system implementation',
        price: 600,
        time: '2-3 hours',
        included: ['Backup strategy', 'System setup', 'Testing', 'Documentation'],
        optional: ['Cloud backup', 'Automated scheduling', 'Monitoring setup'],
        dependencies: ['data-recovery'],
        conflicts: ['system-recovery'],
        availability: 'available',
        recommended: ['backup-setup']
      }
    ],
    'software-install': [
      {
        id: 'os-install',
        name: 'Operating System Installation',
        description: 'Complete OS installation and setup',
        price: 400,
        time: '2-3 hours',
        included: ['OS installation', 'Driver installation', 'Basic configuration', 'Testing'],
        optional: ['Data migration', 'Custom configurations', 'Performance optimization'],
        dependencies: ['software-install'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['os-install']
      },
      {
        id: 'app-install',
        name: 'Application Installation',
        description: 'Essential software installation and setup',
        price: 300,
        time: '1-2 hours',
        included: ['Software installation', 'Configuration', 'Testing', 'Documentation'],
        optional: ['Custom software', 'License management', 'User training'],
        dependencies: ['software-install'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['app-install']
      },
      {
        id: 'driver-setup',
        name: 'Driver Installation & Updates',
        description: 'Complete driver setup and optimization',
        price: 200,
        time: '1-2 hours',
        included: ['Driver identification', 'Installation', 'Updates', 'Testing'],
        optional: ['Performance drivers', 'Custom drivers', 'Ongoing updates'],
        dependencies: ['software-install'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['driver-setup']
      },
      {
        id: 'optimization',
        name: 'System Optimization',
        description: 'Performance optimization and tuning',
        price: 300,
        time: '1-2 hours',
        included: ['Performance analysis', 'Optimization', 'Testing', 'Documentation'],
        optional: ['Advanced optimization', 'Custom tweaks', 'Monitoring setup'],
        dependencies: ['software-install'],
        conflicts: ['network-setup'],
        availability: 'available',
        recommended: ['optimization']
      }
    ],
    'cloud-migration': [
      {
        id: 'planning',
        name: 'Migration Planning & Strategy',
        description: 'Comprehensive migration planning',
        price: 3000,
        time: '1-2 days',
        included: ['Requirements analysis', 'Strategy development', 'Timeline planning', 'Risk assessment'],
        optional: ['Custom migration plan', 'Compliance review', 'Cost optimization'],
        dependencies: ['infrastructure'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['cloud-migration']
      },
      {
        id: 'infrastructure',
        name: 'Cloud Infrastructure Setup',
        description: 'Complete cloud infrastructure deployment',
        price: 4000,
        time: '2-3 days',
        included: ['Infrastructure design', 'Deployment', 'Configuration', 'Testing'],
        optional: ['Advanced configurations', 'Auto-scaling setup', 'Monitoring integration'],
        dependencies: ['data-migration'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['infrastructure']
      },
      {
        id: 'data-migration',
        name: 'Data Migration',
        description: 'Secure data migration to cloud',
        price: 3000,
        time: '2-4 days',
        included: ['Data analysis', 'Migration planning', 'Secure transfer', 'Validation'],
        optional: ['Incremental migration', 'Real-time sync', 'Backup creation'],
        dependencies: ['security-setup'],
        conflicts: ['cybersecurity'],
        availability: 'limited',
        recommended: ['data-migration']
      },
      {
        id: 'security-setup',
        name: 'Cloud Security Configuration',
        description: 'Comprehensive cloud security setup',
        price: 2000,
        time: '1-2 days',
        included: ['Security configuration', 'Access control', 'Monitoring setup', 'Compliance'],
        optional: ['Advanced security features', 'Compliance frameworks', 'Custom policies'],
        dependencies: ['cybersecurity'],
        conflicts: ['infrastructure'],
        availability: 'available',
        recommended: ['security-setup']
      }
    ],
    'it-consulting': [
      {
        id: 'assessment',
        name: 'Technology Assessment',
        description: 'Comprehensive IT infrastructure assessment',
        price: 800,
        time: '2-4 hours',
        included: ['Infrastructure review', 'Performance analysis', 'Recommendations', 'Report'],
        optional: ['Detailed analysis', 'Benchmarking', 'Future planning'],
        dependencies: ['strategy'],
        conflicts: ['implementation'],
        availability: 'available',
        recommended: ['assessment']
      },
      {
        id: 'strategy',
        name: 'IT Strategy Planning',
        description: 'Strategic IT planning and roadmap',
        price: 1200,
        time: '3-5 hours',
        included: ['Strategy development', 'Roadmap creation', 'Implementation plan', 'Documentation'],
        optional: ['Custom strategy', 'Long-term planning', 'Budget optimization'],
        dependencies: ['implementation'],
        conflicts: ['assessment'],
        availability: 'available',
        recommended: ['strategy']
      },
      {
        id: 'implementation',
        name: 'Implementation Support',
        description: 'Hands-on implementation assistance',
        price: 1000,
        time: '2-4 hours',
        included: ['Implementation guidance', 'Technical support', 'Testing', 'Documentation'],
        optional: ['Extended support', 'Training', 'Ongoing assistance'],
        dependencies: ['ongoing'],
        conflicts: ['strategy'],
        availability: 'available',
        recommended: ['implementation']
      },
      {
        id: 'ongoing',
        name: 'Ongoing IT Support',
        description: 'Continuous IT support and maintenance',
        price: 800,
        time: '2-3 hours',
        included: ['Regular maintenance', 'Issue resolution', 'Updates', 'Monitoring'],
        optional: ['24/7 support', 'Priority response', 'Custom SLA'],
        dependencies: ['it-consulting'],
        conflicts: ['implementation'],
        availability: 'available',
        recommended: ['ongoing']
      }
    ]
  };

  // Service Builder Steps
  const serviceBuilderSteps: ServiceBuilderStep[] = [
    {
      id: 'assessment',
      title: 'Assessment & Planning',
      description: 'Let us understand your needs and create a customized plan',
      services: ['laptop-repair', 'pc-build', 'network-setup', 'cybersecurity'],
      required: true,
      completed: false
    },
    {
      id: 'core-services',
      title: 'Core Services',
      description: 'Select the main services you need',
      services: ['laptop-repair', 'pc-build', 'network-setup', 'cybersecurity', 'data-recovery', 'software-install'],
      required: true,
      completed: false
    },
    {
      id: 'enhancement',
      title: 'Enhancement Services',
      description: 'Add additional services to optimize your setup',
      services: ['cloud-migration', 'it-consulting'],
      required: false,
      completed: false
    },
    {
      id: 'review',
      title: 'Review & Confirm',
      description: 'Review your selections and get your final quote',
      services: [],
      required: true,
      completed: false
    }
  ];

  // Availability data (simulated real-time data)
  const serviceAvailabilityData: Record<string, 'available' | 'limited' | 'unavailable'> = {
    'laptop-repair': 'available',
    'pc-build': 'available',
    'network-setup': 'limited',
    'cybersecurity': 'limited',
    'data-recovery': 'available',
    'software-install': 'available',
    'cloud-migration': 'limited',
    'it-consulting': 'available'
  };

  const serviceOptions: ServiceOption[] = [
    { 
      id: 'laptop-repair', 
      name: 'Laptop Repair', 
      basePrice: 1500, 
      description: 'Hardware diagnostics and repair', 
      estimatedTime: '2-4 hours',
      category: 'repair',
      icon: Zap,
      features: ['Hardware Diagnostics', 'Component Replacement', 'Performance Optimization', 'Warranty Included'],
      popular: true,
      dependencies: ['hardware-repair', 'software-fix', 'cleaning'],
      conflicts: ['network-setup'],
      availability: 'available',
      recommended: ['hardware-repair']
    },
    { 
      id: 'pc-build', 
      name: 'Custom PC Build', 
      basePrice: 5000, 
      description: 'Complete system assembly', 
      estimatedTime: '1-2 days',
      category: 'build',
      icon: Shield,
      features: ['Custom Configuration', 'High-Quality Components', 'Performance Testing', 'Setup & Installation'],
      popular: true,
      dependencies: ['assembly'],
      conflicts: ['network-setup'],
      availability: 'available',
      recommended: ['consultation']
    },
    { 
      id: 'network-setup', 
      name: 'Network Setup', 
      basePrice: 3000, 
      description: 'WiFi and network configuration', 
      estimatedTime: '4-6 hours',
      category: 'network',
      icon: TrendingUp,
      features: ['WiFi Configuration', 'Security Setup', 'Device Management', 'Performance Optimization'],
      popular: true,
      dependencies: ['router-setup'],
      conflicts: ['cybersecurity'],
      availability: 'available',
      recommended: ['router-setup']
    },
    { 
      id: 'cybersecurity', 
      name: 'Cybersecurity Audit', 
      basePrice: 8000, 
      description: 'Security assessment and protection', 
      estimatedTime: '2-3 days',
      category: 'security',
      icon: Shield,
      features: ['Security Assessment', 'Vulnerability Testing', 'Protection Setup', 'Compliance Check'],
      popular: true,
      dependencies: ['malware-removal'],
      conflicts: ['network-setup'],
      availability: 'available',
      recommended: ['vulnerability-scan']
    },
    { 
      id: 'data-recovery', 
      name: 'Data Recovery', 
      basePrice: 2500, 
      description: 'File and system recovery', 
      estimatedTime: '1-3 days',
      category: 'recovery',
      icon: Star,
      features: ['File Recovery', 'System Recovery', 'Backup Solutions', 'Data Protection'],
      popular: true,
      dependencies: ['file-recovery'],
      conflicts: ['system-recovery'],
      availability: 'available',
      recommended: ['file-recovery']
    },
    { 
      id: 'software-install', 
      name: 'Software Installation', 
      basePrice: 800, 
      description: 'OS and application setup', 
      estimatedTime: '2-3 hours',
      category: 'software',
      icon: CheckCircle,
      features: ['OS Installation', 'Driver Setup', 'Application Installation', 'System Optimization'],
      popular: true,
      dependencies: ['software-install'],
      conflicts: ['network-setup'],
      availability: 'available',
      recommended: ['os-install']
    },
    { 
      id: 'cloud-migration', 
      name: 'Cloud Migration', 
      basePrice: 12000, 
      description: 'Migrate to cloud infrastructure', 
      estimatedTime: '3-5 days',
      category: 'cloud',
      icon: TrendingUp,
      features: ['Infrastructure Setup', 'Data Migration', 'Security Configuration', 'Performance Optimization'],
      popular: true,
      dependencies: ['cloud-migration'],
      conflicts: ['cybersecurity'],
      availability: 'available',
      recommended: ['cloud-migration']
    },
    { 
      id: 'it-consulting', 
      name: 'IT Consulting', 
      basePrice: 2000, 
      description: 'Professional IT consultation', 
      estimatedTime: '2-4 hours',
      category: 'consulting',
      icon: Star,
      features: ['Technology Assessment', 'Strategy Planning', 'Implementation Guide', 'Ongoing Support'],
      popular: true,
      dependencies: ['assessment'],
      conflicts: ['strategy'],
      availability: 'available',
      recommended: ['assessment']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: CheckCircle },
    { id: 'repair', name: 'Repair', icon: Zap },
    { id: 'build', name: 'Build', icon: Shield },
    { id: 'network', name: 'Network', icon: TrendingUp },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'cloud', name: 'Cloud', icon: TrendingUp },
    { id: 'consulting', name: 'Consulting', icon: Star }
  ];

  const urgencyMultipliers = {
    normal: 1,
    express: 1.5,
    emergency: 2
  };

  const urgencyTimeFactors: Record<typeof urgency, number> = {
    normal: 1,
    express: 0.7,
    emergency: 0.5
  };

  const urgencyInfo = {
    normal: { color: 'green', description: 'Standard service timeline' },
    express: { color: 'yellow', description: '30% faster delivery' },
    emergency: { color: 'red', description: '50% faster delivery' }
  };

  const adjustTimeString = (timeStr?: string, factor: number = 1): string => {
    if (!timeStr) return 'Select services first';
    const match = timeStr.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*(hours|hour|days|day)/i);
    if (!match) return timeStr;

    const minVal = parseFloat(match[1]);
    const maxVal = match[2] ? parseFloat(match[2]) : undefined;
    const unitRaw = match[3].toLowerCase();
    const unit = unitRaw.startsWith('hour') ? 'hours' : 'days';

    const applyFactor = (v: number) => {
      const adjusted = v * factor;
      const rounded = Math.max(1, Math.round(adjusted));
      return rounded;
    };

    const minAdj = applyFactor(minVal);
    const maxAdj = maxVal ? applyFactor(maxVal) : undefined;

    if (maxAdj && maxAdj !== minAdj) {
      return `${minAdj}-${maxAdj} ${unit}`;
    }
    return `${minAdj} ${unit}`;
  };

  const calculateTotal = () => {
    const baseTotal = selectedServices.reduce((total, serviceId) => {
      const selectedSubServiceIds = selectedSubServices[serviceId] || [];
      const detailedServiceList = detailedServices[serviceId] || [];
      
      // Calculate total based on selected sub-services
      const subServiceTotal = selectedSubServiceIds.reduce((subTotal, subServiceId) => {
        const subService = detailedServiceList.find(s => s.id === subServiceId);
        return subTotal + (subService?.price || 0);
      }, 0);
      
      return total + subServiceTotal;
    }, 0);
    
    return baseTotal * urgencyMultipliers[urgency];
  };

  const getEstimatedTime = () => {
    if (selectedServices.length === 0) return 'Select services first';
    
    // Calculate total time based on selected sub-services
    let totalHours = 0;
    selectedServices.forEach(serviceId => {
      const selectedSubServiceIds = selectedSubServices[serviceId] || [];
      const detailedServiceList = detailedServices[serviceId] || [];
      
      selectedSubServiceIds.forEach(subServiceId => {
        const subService = detailedServiceList.find(s => s.id === subServiceId);
        if (subService?.time) {
          const timeMatch = subService.time.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*(hours|hour|days|day)/i);
          if (timeMatch) {
            const minVal = parseFloat(timeMatch[1]);
            const maxVal = timeMatch[2] ? parseFloat(timeMatch[2]) : minVal;
            const avgTime = (minVal + maxVal) / 2;
            totalHours += avgTime;
          }
        }
      });
    });
    
    if (totalHours === 0) return 'Select services first';
    
    const adjustedHours = totalHours * urgencyTimeFactors[urgency];
    if (adjustedHours < 24) {
      return `${Math.round(adjustedHours)} hours`;
    } else {
      const days = Math.ceil(adjustedHours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        // Remove service and its sub-services
        const newSelected = prev.filter(id => id !== serviceId);
        setSelectedSubServices(current => {
          const newSubServices = { ...current };
          delete newSubServices[serviceId];
          return newSubServices;
        });
        return newSelected;
      } else {
        // Add service with all sub-services selected by default
        const newSelected = [...prev, serviceId];
        const detailedServiceList = detailedServices[serviceId] || [];
        setSelectedSubServices(current => ({
          ...current,
          [serviceId]: detailedServiceList.map(subService => subService.id)
        }));
        return newSelected;
      }
    });
  };

  const handleSubServiceToggle = (serviceId: string, subServiceId: string) => {
    setSelectedSubServices(prev => {
      const currentSubServices = prev[serviceId] || [];
      if (currentSubServices.includes(subServiceId)) {
        // Remove sub-service
        const newSubServices = currentSubServices.filter(id => id !== subServiceId);
        if (newSubServices.length === 0) {
          // If no sub-services selected, remove the main service
          setSelectedServices(current => current.filter(id => id !== serviceId));
          const { [serviceId]: removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [serviceId]: newSubServices };
      } else {
        // Add sub-service
        return { ...prev, [serviceId]: [...currentSubServices, subServiceId] };
      }
    });
  };

  const isSubServiceSelected = (serviceId: string, subServiceId: string) => {
    return selectedSubServices[serviceId]?.includes(subServiceId) || false;
  };

  // Comparison functions removed as they were unused
  // Dependency and conflict checking
  const checkDependencies = (serviceId: string) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    const dependencies = service?.dependencies || [];
    const missingDependencies = dependencies.filter(dep => !selectedServices.includes(dep));
    
    return missingDependencies;
  };

  const checkConflicts = (serviceId: string) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    const conflicts = service?.conflicts || [];
    const activeConflicts = conflicts.filter(conflict => selectedServices.includes(conflict));
    
    return activeConflicts;
  };

  const getRecommendedServices = (serviceId: string) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    const recommended = service?.recommended || [];
    return recommended.filter(rec => !selectedServices.includes(rec));
  };

  // Availability functions
  const getAvailabilityStatus = (serviceId: string) => {
    return serviceAvailabilityData[serviceId] || 'available';
  };

  const getAvailabilityIcon = (status: 'available' | 'limited' | 'unavailable') => {
    switch (status) {
      case 'available':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'limited':
        return <WifiOff className="h-4 w-4 text-yellow-500" />;
      case 'unavailable':
        return <X className="h-4 w-4 text-red-500" />;
    }
  };

  const getAvailabilityText = (status: 'available' | 'limited' | 'unavailable') => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'limited':
        return 'Limited Availability';
      case 'unavailable':
        return 'Currently Unavailable';
    }
  };

  const filteredServices = activeCategory === 'all' 
    ? serviceOptions 
    : serviceOptions.filter(service => service.category === activeCategory);

  const getSavings = () => {
    const total = calculateTotal();
    const baseTotal = selectedServices.reduce((total, serviceId) => {
      const selectedSubServiceIds = selectedSubServices[serviceId] || [];
      const detailedServiceList = detailedServices[serviceId] || [];
      
      const subServiceTotal = selectedSubServiceIds.reduce((subTotal, subServiceId) => {
        const subService = detailedServiceList.find(s => s.id === subServiceId);
        return subTotal + (subService?.price || 0);
      }, 0);
      
      return total + subServiceTotal;
    }, 0);
    return total - baseTotal;
  };

  const openQuoteModal = () => {
    if (selectedServices.length === 0) {
      setFormErrors({ services: 'Please select at least one service to get a quote.' });
      return;
    }
    setShowQuoteModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeQuoteModal = () => {
    setShowQuoteModal(false);
    document.body.style.overflow = 'unset';
  };

  const getQuoteNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TF-${year}${month}${day}-${random}`;
  };

  const handleClientInfoChange = (field: string, value: string) => {
    setClientInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Check if any services are selected
    if (selectedServices.length === 0) {
      errors.services = 'Please select at least one service to get a quote.';
    }
    
    // Validate required fields
    if (!clientInfo.name.trim()) {
      errors.name = 'Full name is required.';
    }
    
    if (!clientInfo.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    
    if (!clientInfo.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(clientInfo.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number.';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateQuotePDF = () => {
    const quoteData = {
      quoteNumber: getQuoteNumber(),
      date: new Date().toLocaleDateString(),
      clientInfo,
      services: selectedServices.map(id => serviceOptions.find(s => s.id === id)),
      urgency,
      total: calculateTotal(),
      subtotal: selectedServices.reduce((total, serviceId) => {
        const service = serviceOptions.find(s => s.id === serviceId);
        return total + (service?.basePrice || 0);
      }, 0)
    };
    
    // Create PDF content with Techno Fixer branding
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Techno Fixer - Professional Quote</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
          .company-info { font-size: 14px; opacity: 0.9; }
          .quote-details { background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .client-info { background: #f1f5f9; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .services-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .services-table th, .services-table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          .services-table th { background: #3b82f6; color: white; }
          .total-section { background: #dbeafe; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .total-amount { font-size: 24px; font-weight: bold; color: #1d4ed8; }
          .terms { background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .contact-info { background: #ecfdf5; padding: 20px; border-radius: 10px; }
          .contact-item { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🔧 Techno Fixer</div>
          <div class="company-info">IT Solutions & Repair Services</div>
        </div>
        
        <div class="quote-details">
          <h2>Professional Quote</h2>
          <p><strong>Quote Number:</strong> ${quoteData.quoteNumber}</p>
          <p><strong>Date:</strong> ${quoteData.date}</p>
          <p><strong>Valid Until:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          <p><strong>Urgency Level:</strong> ${urgency}</p>
        </div>
        
        <div class="client-info">
          <h3>Client Information</h3>
          <p><strong>Name:</strong> ${clientInfo.name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${clientInfo.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${clientInfo.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> ${clientInfo.address || 'Not provided'}</p>
        </div>
        
        <h3>Detailed Services Breakdown</h3>
        ${selectedServices.map(serviceId => {
          const service = serviceOptions.find(s => s.id === serviceId);
          const adjusted = adjustTimeString(service?.estimatedTime, urgencyTimeFactors[urgency]);
          const detailedServiceList = detailedServices[serviceId] || [];
          
          let serviceHtml = `
            <div style="margin-bottom: 30px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
              <h4 style="color: #1d4ed8; margin-bottom: 10px; font-size: 18px;">${service?.name}</h4>
              <p style="color: #64748b; margin-bottom: 15px;">${service?.description}</p>
              <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <span style="color: #64748b;">Time: ${adjusted}</span>
                <span style="font-weight: bold; color: #1d4ed8;">₹${service?.basePrice.toLocaleString()}</span>
              </div>
          `;
          
          if (detailedServiceList.length > 0 && selectedSubServices[serviceId]?.length > 0) {
            serviceHtml += `
              <h5 style="color: #374151; margin-bottom: 10px; font-size: 14px;">Selected Sub-Services:</h5>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                <thead>
                  <tr style="background: #f1f5f9;">
                    <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; font-size: 12px;">Sub-Service</th>
                    <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; font-size: 12px;">Description</th>
                    <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; font-size: 12px;">Time</th>
                    <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; font-size: 12px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${selectedSubServices[serviceId].map(subServiceId => {
                    const subService = detailedServiceList.find(s => s.id === subServiceId);
                    if (!subService) return '';
                    return `
                      <tr>
                        <td style="border: 1px solid #e2e8f0; padding: 8px; font-size: 12px; font-weight: bold;">${subService.name}</td>
                        <td style="border: 1px solid #e2e8f0; padding: 8px; font-size: 12px;">${subService.description}</td>
                        <td style="border: 1px solid #e2e8f0; padding: 8px; font-size: 12px;">${subService.time}</td>
                        <td style="border: 1px solid #e2e8f0; padding: 8px; font-size: 12px;">₹${subService.price.toLocaleString()}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            `;
          }
          
          serviceHtml += `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
              <h6 style="color: #374151; margin-bottom: 8px; font-size: 12px;">Package Features:</h6>
              <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #64748b;">
                ${service?.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            </div>
          `;
          
          return serviceHtml;
        }).join('')}
        
        <div class="total-section">
          <h3>Pricing Summary</h3>
          <p><strong>Subtotal:</strong> ₹${quoteData.subtotal.toLocaleString()}</p>
          <p><strong>Urgency Fee (${urgencyMultipliers[urgency]}x):</strong> +₹${getSavings().toLocaleString()}</p>
          <p class="total-amount">Total Amount: ₹${quoteData.total.toLocaleString()}</p>
        </div>
        
        <div class="terms">
          <h3>Terms & Conditions</h3>
          <ul>
            <li>All services include 30-day warranty and free consultation</li>
            <li>Payment terms: 50% advance, 50% upon completion</li>
            <li>Estimated completion time: ${getEstimatedTime()}</li>
            <li>Professional certified technicians will handle your project</li>
          </ul>
        </div>
        
        <div class="contact-info">
          <h3>Contact Information</h3>
          <div class="contact-item">📞 Phone: +91 9265627252</div>
          <div class="contact-item">📧 Email: officialtechnofixer@gmail.com</div>
          <div class="contact-item">📍 Address: Mumbai, Maharashtra, India</div>
          <div class="contact-item">🕒 Business Hours: Mon-Fri 9AM-7PM, Sat 10AM-6PM</div>
        </div>
      </body>
      </html>
    `;
    
    // Create a blob and download the PDF
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TechnoFixer_Quote_${quoteData.quoteNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return quoteData;
  };

  const handleWhatsAppShare = () => {
    const quoteData = generateQuotePDF();
    
    // Create a comprehensive message with all quote details
    const message = `Hi Techno Fixer Team! 👋\n\nI'm interested in your services. Here's my detailed quote:\n\n🔧 *TECHNO FIXER - PROFESSIONAL QUOTE*\n\n📋 Quote Number: ${quoteData.quoteNumber}\n📅 Date: ${quoteData.date}\n⏰ Valid Until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}\n⚡ Urgency Level: ${urgency}\n\n👤 *CLIENT INFORMATION:*\nName: ${clientInfo.name || 'Not provided'}\nEmail: ${clientInfo.email || 'Not provided'}\nPhone: ${clientInfo.phone || 'Not provided'}\nAddress: ${clientInfo.address || 'Not provided'}\n\n🔧 *DETAILED SERVICES BREAKDOWN:*\n${selectedServices.map(serviceId => {
  const service = serviceOptions.find(s => s.id === serviceId);
  const selectedSubServiceIds = selectedSubServices[serviceId] || [];
  const detailedServiceList = detailedServices[serviceId] || [];
  
  // Calculate service total
  const serviceTotal = selectedSubServiceIds.reduce((total, subServiceId) => {
    const subService = detailedServiceList.find(s => s.id === subServiceId);
    return total + (subService?.price || 0);
  }, 0);
  
  let serviceDetails = `• *${service?.name}*: ₹${serviceTotal.toLocaleString()}\n`;
  
  if (selectedSubServiceIds.length > 0) {
    serviceDetails += `  📋 *Selected Sub-Services:*\n`;
    selectedSubServiceIds.forEach(subServiceId => {
      const subService = detailedServiceList.find(s => s.id === subServiceId);
      if (subService) {
        serviceDetails += `    - ${subService.name}: ₹${subService.price.toLocaleString()} (${subService.time})\n`;
        serviceDetails += `      ✅ ${subService.included.slice(0, 2).join(', ')}\n`;
        if (subService.optional.length > 0) {
          serviceDetails += `      🔧 Optional: ${subService.optional.slice(0, 2).join(', ')}\n`;
        }
      }
    });
  }
  
  return serviceDetails;
}).join('\n')}\n\n💰 *PRICING SUMMARY:*\nSubtotal: ₹${quoteData.subtotal.toLocaleString()}\nUrgency Fee (${urgencyMultipliers[urgency]}x): +₹${getSavings().toLocaleString()}\n*TOTAL AMOUNT: ₹${quoteData.total.toLocaleString()}*\n\n📋 *TERMS & CONDITIONS:*\n• All services include 30-day warranty\n• Payment: 50% advance, 50% upon completion\n• Estimated completion: ${getEstimatedTime()}\n• Professional certified technicians\n\n📞 *CONTACT INFORMATION:*\nPhone: +91 9265627252\nEmail: officialtechnofixer@gmail.com\nAddress: Mumbai, Maharashtra, India\nHours: Mon-Fri 9AM-7PM, Sat 10AM-6PM\n\n---\nGenerated by Techno Fixer Quote System\n\nPlease contact me for more details.\n\nBest regards,\n${clientInfo.name || 'Client'}`;
    
    const whatsappUrl = `https://wa.me/919265627252?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const quoteData = generateQuotePDF();
    const subject = `Quote Request - ${quoteData.quoteNumber}`;
    
    // Create a comprehensive email with all quote details
    const emailContent = `Hi Techno Fixer Team,

I'm interested in your services. Here's my detailed quote:

🔧 TECHNO FIXER - PROFESSIONAL QUOTE

📋 Quote Number: ${quoteData.quoteNumber}
📅 Date: ${quoteData.date}
⏰ Valid Until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
⚡ Urgency Level: ${urgency}

👤 CLIENT INFORMATION:
Name: ${clientInfo.name || 'Not provided'}
Email: ${clientInfo.email || 'Not provided'}
Phone: ${clientInfo.phone || 'Not provided'}
Address: ${clientInfo.address || 'Not provided'}

🔧 DETAILED SERVICES BREAKDOWN:
${selectedServices.map(serviceId => {
  const service = serviceOptions.find(s => s.id === serviceId);
  const selectedSubServiceIds = selectedSubServices[serviceId] || [];
  const detailedServiceList = detailedServices[serviceId] || [];
  
  // Calculate service total
  const serviceTotal = selectedSubServiceIds.reduce((total, subServiceId) => {
    const subService = detailedServiceList.find(s => s.id === subServiceId);
    return total + (subService?.price || 0);
  }, 0);
  
  let serviceDetails = `• ${service?.name}: ₹${serviceTotal.toLocaleString()}\n`;
  
  if (selectedSubServiceIds.length > 0) {
    serviceDetails += `  📋 Selected Sub-Services:\n`;
    selectedSubServiceIds.forEach(subServiceId => {
      const subService = detailedServiceList.find(s => s.id === subServiceId);
      if (subService) {
        serviceDetails += `    - ${subService.name}: ₹${subService.price.toLocaleString()} (${subService.time})\n`;
        serviceDetails += `      ✅ ${subService.included.slice(0, 2).join(', ')}\n`;
        if (subService.optional.length > 0) {
          serviceDetails += `      🔧 Optional: ${subService.optional.slice(0, 2).join(', ')}\n`;
        }
      }
    });
  }
  
  return serviceDetails;
}).join('\n')}

💰 PRICING SUMMARY:
Subtotal: ₹${quoteData.subtotal.toLocaleString()}
Urgency Fee (${urgencyMultipliers[urgency]}x): +₹${getSavings().toLocaleString()}
TOTAL AMOUNT: ₹${quoteData.total.toLocaleString()}

📋 TERMS & CONDITIONS:
• All services include 30-day warranty
• Payment: 50% advance, 50% upon completion
• Estimated completion: ${getEstimatedTime()}
• Professional certified technicians

📞 CONTACT INFORMATION:
Phone: +91 9265627252
Email: officialtechnofixer@gmail.com
Address: Mumbai, Maharashtra, India
Hours: Mon-Fri 9AM-7PM, Sat 10AM-6PM

---
Generated by Techno Fixer Quote System

Please contact me for more details.

Best regards,
${clientInfo.name || 'Client'}`;
    
    const mailtoUrl = `mailto:officialtechnofixer@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoUrl);
  };

  return (
          <section className="py-20 bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-400/30 mb-6">
            <Calculator className="h-6 w-6 text-blue-300" />
            <span className="text-lg font-medium">Service Calculator</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Get Instant Price Estimates
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Calculate the cost of your IT services with our transparent pricing calculator. 
            Get accurate estimates for all your technology needs.
          </p>
        </div>

        {/* Mode Selection and Controls */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {/* Mode Toggle Buttons */}
            <button
              onClick={() => {
                setComparisonMode(false);
                setBuilderMode(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                !comparisonMode && !builderMode
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span className="text-sm font-medium">Calculator</span>
            </button>
            
            <button
              onClick={() => {
                setComparisonMode(true);
                setBuilderMode(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                comparisonMode
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">Compare</span>
            </button>
            
            <button
              onClick={startServiceBuilder}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                builderMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Service Builder</span>
            </button>
            
            <button
              onClick={() => setShowAvailability(!showAvailability)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                showAvailability
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm font-medium">Availability</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Availability Display */}
        {showAvailability && (
          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-white">Service Availability</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serviceOptions.map((service) => {
                const status = getAvailabilityStatus(service.id);
                return (
                  <div key={service.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    {getAvailabilityIcon(status)}
                    <div>
                      <div className="text-sm font-medium text-white">{service.name}</div>
                      <div className="text-xs text-blue-200">{getAvailabilityText(status)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Service Builder */}
        {builderMode && (
          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Service Builder</h3>
              <button
                onClick={() => setBuilderMode(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6">
              {builderSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentBuilderStep
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'bg-white/20 text-blue-200'
                  }`}>
                    {index + 1}
                  </div>
                  {index < builderSteps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      index < currentBuilderStep ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Current Step Content */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                {builderSteps[currentBuilderStep]?.title}
              </h4>
              <p className="text-blue-200 mb-4">{builderSteps[currentBuilderStep]?.description}</p>
              
              {currentBuilderStep < 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {builderSteps[currentBuilderStep]?.services.map((serviceId) => {
                    const service = serviceOptions.find(s => s.id === serviceId);
                    return (
                      <div key={serviceId} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-white">{service?.name}</h5>
                            <p className="text-sm text-blue-200">{service?.description}</p>
                          </div>
                          <button
                            onClick={() => handleServiceToggle(serviceId)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              selectedServices.includes(serviceId)
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                                : 'bg-white/10 text-blue-200 hover:bg-white/20'
                            }`}
                          >
                            {selectedServices.includes(serviceId) ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={prevBuilderStep}
                disabled={currentBuilderStep === 0}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 text-blue-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={nextBuilderStep}
                disabled={currentBuilderStep === builderSteps.length - 1}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700"
              >
                <span>{currentBuilderStep === builderSteps.length - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Comparison Mode Display */}
        {comparisonMode && comparisonServices.length > 0 && (
          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Service Comparison</h3>
              <button
                onClick={clearComparison}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonServices.map((comparison) => {
                const service = serviceOptions.find(s => s.id === comparison.serviceId);
                return (
                  <div key={comparison.serviceId} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">{service?.name}</h4>
                      <button
                        onClick={() => removeFromComparison(comparison.serviceId)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                      >
                        <X className="h-4 w-4 text-red-300" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-200">Price:</span>
                        <span className="text-white font-medium">₹{comparison.totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Time:</span>
                        <span className="text-white">{comparison.totalTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Sub-services:</span>
                        <span className="text-white">{comparison.selectedSubServices.length}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-xs text-blue-200 mb-1">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {comparison.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-white/10 text-white rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {comparison.features.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-white rounded text-xs">
                            +{comparison.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service Selection */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Select Services</h3>
              <div className="flex items-center space-x-2 text-sm text-blue-200">
                <Info className="h-4 w-4" />
                <span>{selectedServices.length} selected</span>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-300 mt-0.5" />
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Pricing Information</p>
                  <p className="text-blue-300 text-xs">
                    Final pricing depends on work complexity and specific requirements. 
                    Contact us for custom quotes and bulk discounts.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div 
                  key={service.id} 
                  className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    selectedServices.includes(service.id) 
                      ? 'border-blue-400 bg-blue-500/20' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </div>
                  )}

                  {/* Availability Badge */}
                  <div className="absolute top-4 left-4">
                    {getAvailabilityIcon(getAvailabilityStatus(service.id))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <service.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <label htmlFor={service.id} className="text-lg font-semibold cursor-pointer">
                              {service.name}
                            </label>
                            <p className="text-blue-200 text-sm">{service.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 mb-3 text-sm text-blue-300">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {adjustTimeString(service.estimatedTime, urgencyTimeFactors[urgency])}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            ₹{service.basePrice.toLocaleString()}
                          </span>
                        </div>

                        {/* Selected Sub-Services Preview */}
                        {selectedServices.includes(service.id) && (
                          <div className="mb-3">
                            <div className="text-xs text-blue-300 mb-2">
                              Selected: {selectedSubServices[service.id]?.length || 0} of {detailedServices[service.id]?.length || 0} sub-services
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {selectedSubServices[service.id]?.slice(0, 3).map((subServiceId) => {
                                const subService = detailedServices[service.id]?.find(s => s.id === subServiceId);
                                return (
                                  <span key={subServiceId} className="px-2 py-1 bg-green-500/20 text-green-200 rounded-md text-xs border border-green-400/30">
                                    {subService?.name}
                                  </span>
                                );
                              })}
                              {selectedSubServices[service.id]?.length > 3 && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-200 rounded-md text-xs border border-green-400/30">
                                  +{selectedSubServices[service.id].length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Features Preview */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-white/10 text-blue-200 rounded-md text-xs border border-white/20">
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 2 && (
                            <span className="px-2 py-1 bg-white/10 text-blue-200 rounded-md text-xs border border-white/20">
                              +{service.features.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Dependency Warnings */}
                        {selectedServices.includes(service.id) && (
                          <div className="mt-3 space-y-2">
                            {checkDependencies(service.id).length > 0 && (
                              <div className="flex items-center space-x-2 text-xs text-yellow-300 bg-yellow-500/10 p-2 rounded-lg">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Missing dependencies: {checkDependencies(service.id).join(', ')}</span>
                              </div>
                            )}
                            
                            {checkConflicts(service.id).length > 0 && (
                              <div className="flex items-center space-x-2 text-xs text-red-300 bg-red-500/10 p-2 rounded-lg">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Conflicts with: {checkConflicts(service.id).join(', ')}</span>
                              </div>
                            )}
                            
                            {getRecommendedServices(service.id).length > 0 && (
                              <div className="flex items-center space-x-2 text-xs text-green-300 bg-green-500/10 p-2 rounded-lg">
                                <Target className="h-3 w-3" />
                                <span>Recommended: {getRecommendedServices(service.id).join(', ')}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDetails(showDetails === service.id ? null : service.id);
                            }}
                            className="text-blue-300 text-sm hover:text-blue-200 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <span>{showDetails === service.id ? 'Hide' : 'Show'} details</span>
                            <ArrowRight className={`h-3 w-3 transition-transform duration-200 ${showDetails === service.id ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {comparisonMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToComparison(service.id);
                              }}
                              className="text-green-300 text-sm hover:text-green-200 transition-colors duration-200 flex items-center space-x-1"
                            >
                              <BarChart3 className="h-3 w-3" />
                              <span>Compare</span>
                            </button>
                          )}
                        </div>

                        {/* Expanded Details */}
                        {showDetails === service.id && (
                          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            <h4 className="font-semibold text-blue-200 mb-3">Select Sub-Services:</h4>
                            <div className="space-y-3">
                              {detailedServices[service.id]?.map((subService) => (
                                <div key={subService.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                                  <div className="flex items-start space-x-3">
                                    <input
                                      type="checkbox"
                                      id={`${service.id}-${subService.id}`}
                                      checked={isSubServiceSelected(service.id, subService.id)}
                                      onChange={() => handleSubServiceToggle(service.id, subService.id)}
                                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                                    />
                                    <div className="flex-1">
                                      <label htmlFor={`${service.id}-${subService.id}`} className="cursor-pointer">
                                        <div className="flex justify-between items-start mb-1">
                                          <h5 className="font-medium text-blue-200">{subService.name}</h5>
                                          <div className="text-right">
                                            <div className="text-sm font-semibold text-blue-300">₹{subService.price.toLocaleString()}</div>
                                            <div className="text-xs text-blue-400">{subService.time}</div>
                                          </div>
                                        </div>
                                        <p className="text-sm text-blue-300 mb-2">{subService.description}</p>
                                        
                                        {/* Included Features */}
                                        <div className="mb-2">
                                          <div className="text-xs text-blue-400 mb-1">Included:</div>
                                          <div className="flex flex-wrap gap-1">
                                            {subService.included.slice(0, 2).map((feature, index) => (
                                              <span key={index} className="px-2 py-1 bg-green-500/20 text-green-200 rounded text-xs">
                                                {feature}
                                              </span>
                                            ))}
                                            {subService.included.length > 2 && (
                                              <span className="px-2 py-1 bg-green-500/20 text-green-200 rounded text-xs">
                                                +{subService.included.length - 2} more
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Optional Features */}
                                        {subService.optional.length > 0 && (
                                          <div>
                                            <div className="text-xs text-blue-400 mb-1">Optional:</div>
                                            <div className="flex flex-wrap gap-1">
                                              {subService.optional.slice(0, 2).map((feature, index) => (
                                                <span key={index} className="px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">
                                                  {feature}
                                                </span>
                                              ))}
                                              {subService.optional.length > 2 && (
                                                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">
                                                  +{subService.optional.length - 2} more
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Package Features */}
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <h5 className="font-semibold text-blue-200 mb-2">Package Features:</h5>
                              <ul className="space-y-1">
                                {service.features.map((feature, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-sm text-blue-300">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency Selection */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white">Service Urgency</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'normal', label: 'Normal', color: 'green', icon: Clock, bgColor: 'bg-green-500', hoverColor: 'hover:bg-green-600', borderColor: 'border-green-400' },
                  { value: 'express', label: 'Express', color: 'yellow', icon: Zap, bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600', borderColor: 'border-yellow-400' },
                  { value: 'emergency', label: 'Emergency', color: 'red', icon: AlertCircle, bgColor: 'bg-red-500', hoverColor: 'hover:bg-red-600', borderColor: 'border-red-400' }
                ].map((option) => {
                  const IconComponent = option.icon;
                  const info = urgencyInfo[option.value as keyof typeof urgencyInfo];
                  return (
                    <button
                      key={option.value}
                      onClick={() => setUrgency(option.value as any)}
                      className={`p-4 rounded-xl text-center transition-all duration-300 relative overflow-hidden group ${
                        urgency === option.value 
                          ? `${option.bgColor} text-white shadow-lg scale-105 border-2 ${option.borderColor}` 
                          : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <IconComponent className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-80 mb-1">
                          {option.value === 'normal' ? '1x' : option.value === 'express' ? '1.5x' : '2x'}
                        </div>
                        <div className="text-xs opacity-60">{info.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 sticky top-24 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Price Summary</h3>
              <p className="text-blue-200 text-sm">Get your instant quote</p>
            </div>
            
            {selectedServices.length === 0 ? (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-blue-300 mx-auto mb-4 opacity-50" />
                <p className="text-blue-200 mb-2">No services selected</p>
                <p className="text-blue-300 text-sm">Choose services to see pricing</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Selected Services */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    Selected Services ({selectedServices.length})
                  </h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedServices.map(serviceId => {
                      const service = serviceOptions.find(s => s.id === serviceId);
                      const selectedSubServiceIds = selectedSubServices[serviceId] || [];
                      const detailedServiceList = detailedServices[serviceId] || [];
                      
                      // Calculate service total
                      const serviceTotal = selectedSubServiceIds.reduce((total, subServiceId) => {
                        const subService = detailedServiceList.find(s => s.id === subServiceId);
                        return total + (subService?.price || 0);
                      }, 0);
                      
                      return (
                        <div key={serviceId} className="bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <span className="text-sm font-medium">{service?.name}</span>
                              <div className="text-xs text-blue-300">
                                {selectedSubServiceIds.length} sub-services selected
                              </div>
                            </div>
                            <span className="text-sm font-bold">₹{serviceTotal.toLocaleString()}</span>
                          </div>
                          
                          {/* Selected Sub-Services */}
                          <div className="space-y-1">
                            {selectedSubServiceIds.map(subServiceId => {
                              const subService = detailedServiceList.find(s => s.id === subServiceId);
                              return (
                                <div key={subServiceId} className="flex justify-between items-center text-xs bg-white/5 rounded px-2 py-1">
                                  <span className="text-blue-300">{subService?.name}</span>
                                  <span className="text-blue-200">₹{subService?.price.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center py-3 border-t border-white/20">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{selectedServices.reduce((total, serviceId) => {
                    const selectedSubServiceIds = selectedSubServices[serviceId] || [];
                    const detailedServiceList = detailedServices[serviceId] || [];
                    
                    const subServiceTotal = selectedSubServiceIds.reduce((subTotal, subServiceId) => {
                      const subService = detailedServiceList.find(s => s.id === subServiceId);
                      return subTotal + (subService?.price || 0);
                    }, 0);
                    
                    return total + subServiceTotal;
                  }, 0).toLocaleString()}</span>
                </div>

                {/* Urgency Multiplier */}
                <div className="flex justify-between items-center py-3 border-t border-white/20">
                  <div>
                    <span>Urgency ({urgency})</span>
                    <div className="text-xs text-blue-300">{urgencyInfo[urgency].description}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{urgencyMultipliers[urgency]}x</span>
                    <div className="text-xs text-blue-300">+₹{getSavings().toLocaleString()}</div>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Estimate</span>
                    <span className="text-3xl text-blue-300">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-blue-300 mt-1">Including urgency fee</div>
                </div>

                {/* Estimated Time */}
                <div className="text-center py-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-400/30">
                  <div className="text-sm text-blue-200 mb-1 flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Estimated Time
                  </div>
                  <div className="font-semibold text-lg">{getEstimatedTime()}</div>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-blue-300 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3" />
                    <span>All services include warranty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-3 w-3" />
                    <span>Professional certified technicians</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Free consultation included</span>
                  </div>
                </div>

                {/* Service Selection Error */}
                {formErrors.services && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <p className="text-red-700 font-medium">{formErrors.services}</p>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <button 
                  onClick={openQuoteModal}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Get Detailed Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Contact Info */}
                <div className="text-center text-xs text-blue-300">
                  <p>Need a custom quote? Contact us directly</p>
                  <p className="font-medium">+91 9265627252 | officialtechnofixer@gmail.com</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
            {/* Quote Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Professional Quote</h2>
                    <p className="text-blue-100">Techno Fixer - IT Solutions & Repair Services</p>
                  </div>
                </div>
                <button
                  onClick={closeQuoteModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Quote Content */}
            <div className="p-8">
              {/* Quote Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Client Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => handleClientInfoChange('name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => handleClientInfoChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={clientInfo.phone}
                        onChange={(e) => handleClientInfoChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+91 9265627252"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={clientInfo.address}
                        onChange={(e) => handleClientInfoChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500"
                        rows={3}
                        placeholder="Enter your complete address"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Quote Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quote Number:</span>
                      <span className="font-medium text-gray-900">{getQuoteNumber()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid Until:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Urgency:</span>
                      <span className="font-medium text-gray-900 capitalize">{urgency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Services Selected:</span>
                      <span className="font-medium text-gray-900">{selectedServices.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Breakdown */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Services Breakdown</h3>
                <div className="space-y-6">
                  {selectedServices.map(serviceId => {
                    const service = serviceOptions.find(s => s.id === serviceId);
                    const adjusted = adjustTimeString(service?.estimatedTime, urgencyTimeFactors[urgency]);
                    const detailedServiceList = detailedServices[serviceId] || [];
                    
                    return (
                      <div key={serviceId} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        {/* Main Service Header */}
                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{service?.name}</h4>
                            <p className="text-gray-600 mb-2">{service?.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-blue-600">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {adjusted}
                              </span>
                              <span className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {detailedServiceList.length} sub-services included
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">₹{service?.basePrice.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Total Package Price</div>
                          </div>
                        </div>

                        {/* Selected Sub-Services */}
                        {detailedServiceList.length > 0 && (
                          <div className="space-y-4">
                            <h5 className="font-semibold text-gray-900 text-lg mb-3">Selected Sub-Services:</h5>
                            <div className="grid md:grid-cols-2 gap-4">
                              {selectedSubServices[serviceId]?.map((subServiceId) => {
                                const subService = detailedServiceList.find(s => s.id === subServiceId);
                                if (!subService) return null;
                                
                                return (
                                  <div key={subService.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                      <div className="flex-1">
                                        <h6 className="font-semibold text-gray-900 mb-1">{subService.name}</h6>
                                        <p className="text-sm text-gray-600 mb-2">{subService.description}</p>
                                        <div className="flex items-center space-x-3 text-xs text-blue-600">
                                          <span className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {subService.time}
                                          </span>
                                          <span className="flex items-center">
                                            <DollarSign className="h-3 w-3 mr-1" />
                                            ₹{subService.price.toLocaleString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Included Features */}
                                    <div className="mb-3">
                                      <div className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">Included:</div>
                                      <ul className="space-y-1">
                                        {subService.included.map((feature, index) => (
                                          <li key={index} className="flex items-start space-x-2 text-xs text-gray-600">
                                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Optional Features */}
                                    {subService.optional.length > 0 && (
                                      <div>
                                        <div className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">Optional Add-ons:</div>
                                        <ul className="space-y-1">
                                          {subService.optional.map((feature, index) => (
                                            <li key={index} className="flex items-start space-x-2 text-xs text-gray-500">
                                              <div className="h-3 w-3 rounded-full border border-gray-300 mt-0.5 flex-shrink-0"></div>
                                              <span>{feature}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                );
                              }).filter(Boolean)}
                            </div>
                          </div>
                        )}

                        {/* Service Features Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h5 className="font-semibold text-gray-900 mb-3">Package Features:</h5>
                          <div className="grid md:grid-cols-2 gap-2">
                            {service?.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-medium text-gray-900">₹{selectedServices.reduce((total, serviceId) => {
                        const selectedSubServiceIds = selectedSubServices[serviceId] || [];
                        const detailedServiceList = detailedServices[serviceId] || [];
                        
                        const subServiceTotal = selectedSubServiceIds.reduce((subTotal, subServiceId) => {
                          const subService = detailedServiceList.find(s => s.id === subServiceId);
                          return subTotal + (subService?.price || 0);
                        }, 0);
                        
                        return total + subServiceTotal;
                      }, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-700">Urgency Fee ({urgencyMultipliers[urgency]}x)</span>
                        <div className="text-xs text-blue-600">{urgencyInfo[urgency].description}</div>
                      </div>
                      <span className="font-medium text-gray-900">+₹{getSavings().toLocaleString()}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-3">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-900">Total Amount</span>
                        <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
                <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600 space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>All services include 30-day warranty and free consultation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Payment terms: 50% advance, 50% upon completion</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Estimated completion time: {getEstimatedTime()}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Professional certified technicians will handle your project</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Techno Fixer</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>+91 9265627252</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>officialtechnofixer@gmail.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>Mumbai, Maharashtra, India</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Business Hours</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Monday - Friday: 9:00 AM - 7:00 PM</div>
                      <div>Saturday: 10:00 AM - 6:00 PM</div>
                      <div>Sunday: Emergency Services Only</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacing */}
              <div className="h-8"></div>

              {/* Professional Note */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200/50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Info className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      For faster processing and better service, please ensure you share the downloaded PDF quote along with your message when contacting us via WhatsApp or Email.
                    </p>
                    <div className="bg-white/70 rounded-lg p-4 border border-amber-200/50">
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Recommended Sharing Process:
                      </h5>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-600 font-medium">1.</span>
                          <span>Download the PDF quote using the buttons above</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-600 font-medium">2.</span>
                          <span>Share the complete quote details via WhatsApp/Email</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-600 font-medium">3.</span>
                          <span>Attach the downloaded PDF file to your message</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-600 font-medium">4.</span>
                          <span>Include your contact information for faster response</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200/50">
                      <p className="text-sm text-blue-800 font-medium">
                        💡 <strong>Pro Tip:</strong> Sharing the PDF ensures we have all your requirements and can provide you with the most accurate service estimate and faster response time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => {
                    if (validateForm()) {
                      setIsSubmitting(true);
                      try {
                        generateQuotePDF();
                        setTimeout(() => {
                          handleWhatsAppShare();
                          setIsSubmitting(false);
                        }, 1000);
                      } catch (error) {
                        console.error('Error generating quote:', error);
                        setIsSubmitting(false);
                      }
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{isSubmitting ? 'Processing...' : 'Download PDF & Share via WhatsApp'}</span>
                </button>
                <button 
                  onClick={() => {
                    if (validateForm()) {
                      setIsSubmitting(true);
                      try {
                        generateQuotePDF();
                        setTimeout(() => {
                          handleEmailShare();
                          setIsSubmitting(false);
                        }, 1000);
                      } catch (error) {
                        console.error('Error generating quote:', error);
                        setIsSubmitting(false);
                      }
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>{isSubmitting ? 'Processing...' : 'Download PDF & Send Email'}</span>
                </button>
                <button 
                  onClick={() => {
                    if (validateForm()) {
                      setIsSubmitting(true);
                      try {
                        generateQuotePDF();
                        setIsSubmitting(false);
                      } catch (error) {
                        console.error('Error generating quote:', error);
                        setIsSubmitting(false);
                      }
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{isSubmitting ? 'Processing...' : 'Download PDF Only'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceCalculator;
