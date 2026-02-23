import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Laptop,
  Cpu,
  Network,
  Shield,
  ShieldCheck,
  Globe,
  ArrowRight,
  Settings,
  X,
  HardDrive,
  Cloud,
  Home,
  Wrench,
  Star
} from 'lucide-react';
import ServiceCarousel from './ServiceCarousel';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  services: string[];
  color: string;
  isExpanded: boolean;
  onClick: () => void;
  onGetService: (e: React.MouseEvent, title: string, targetId: string) => void;
  targetId?: string;
  description?: string;
  additionalInfo?: {
    time: string;
    warranty: string;
    support: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  services,
  color,
  isExpanded,
  onClick,
  onGetService,
  targetId = "laptop-repair",
  description = "Detailed information about this service will be displayed here.",
  additionalInfo = {
    time: "1-3 hours",
    warranty: "6 months",
    support: "24/7 available"
  }
}) => {
  const cardClasses = `bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-500 cursor-pointer relative overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 ${isExpanded
    ? 'transform scale-[1.02] z-10 shadow-2xl ring-blue-500/50'
    : 'hover:-translate-y-2 hover:shadow-2xl group hover:ring-blue-500/30'
    }`;

  const titleClasses = `text-xl font-bold mb-4 transition-all duration-500 ${isExpanded ? 'text-gray-900 dark:text-white text-2xl tracking-tight' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
    }`;

  return (
    <div
      className={cardClasses}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isExpanded ? 'scale-110 shadow-lg ring-4 ring-white dark:ring-gray-700' : 'group-hover:scale-110 group-hover:shadow-xl'
            }`}>
            <div className={`transition-transform duration-500 ${isExpanded ? 'scale-110' : 'group-hover:scale-110'}`}>
              {icon}
            </div>
          </div>

          {isExpanded && (
            <button
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        <h3 className={titleClasses}>
          {title}
        </h3>

        {isExpanded ? (
          <div className="space-y-4 text-black dark:text-gray-100">
            <p className="text-black dark:text-gray-100 font-medium mb-4">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-black dark:text-white mb-3 text-lg">Services Include:</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-black dark:text-gray-200 text-base font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-black dark:text-white mb-4 text-lg">Additional Info</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Average Service Time</p>
                    <p className="text-black dark:text-white font-semibold">{additionalInfo.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Warranty</p>
                    <p className="text-black dark:text-white font-semibold">{additionalInfo.warranty} warranty</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Support</p>
                    <p className="text-black dark:text-white font-semibold">{additionalInfo.support}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => onGetService(e, title, targetId)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>Get This Service</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <ul className="space-y-2">
            {services.slice(0, 3).map((service, index) => (
              <li key={index} className="flex items-center space-x-2 group-hover:text-gray-200 transition-colors duration-500">
                <span className="text-green-500 group-hover:text-green-400 text-sm transition-colors duration-300">✓</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-800 transition-colors duration-500">{service}</span>
              </li>
            ))}
          </ul>
        )}

        {!isExpanded && (
          <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-400"></div>
        )}
      </div>

      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${isExpanded ? 'border-blue-400' : 'border-gray-200 dark:border-gray-700 group-hover:border-blue-400'
        }`}></div>
    </div>
  );
};

const Services = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGetService = (e?: React.MouseEvent, _title?: string, targetId?: string) => {
    if (e) e.stopPropagation();
    navigate(`/quotation?service=${targetId}`);
  };

  const handleCarouselGetService = (targetId: string) => {
    navigate(`/quotation?service=${targetId}`);
  };

  const handleCardClick = (title: string) => {
    setExpandedCard(expandedCard === title ? null : title);
  };

  const coreServices = [
    {
      icon: <Laptop className="h-8 w-8 text-blue-600" />,
      title: "Computer & Laptop Services",
      targetId: "laptop-repair",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Expert diagnostics and surgical-precision repairs for all modern computing hardware.",
      services: [
        "Hardware diagnostics & repair",
        "Screen & keyboard replacement",
        "Battery service & replacement",
        "Performance upgrades",
        "Data recovery services"
      ],
      color: "bg-blue-100"
    },
    {
      icon: <Cpu className="h-8 w-8 text-indigo-600" />,
      title: "Custom PC Building",
      targetId: "pc-build",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Bespoke high-performance workstations and gaming rigs tailored to your exact specifications.",
      services: [
        "Component selection advice",
        "Professional assembly",
        "Cable management",
        "OS installation & tuning",
        "Stress testing"
      ],
      color: "bg-indigo-100"
    },
    {
      icon: <Network className="h-8 w-8 text-cyan-600" />,
      title: "Network Solutions",
      targetId: "network-setup",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Seamless wireless and enterprise-grade networking for homes and small businesses.",
      services: [
        "Router & mesh setup",
        "WiFi optimization",
        "Structured cabling",
        "Network security audit",
        "VPN configuration"
      ],
      color: "bg-cyan-100"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Cybersecurity & Audit",
      targetId: "cybersecurity",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Comprehensive security assessments and robust defense deployment to protect your digital assets.",
      services: [
        "Vulnerability assessment",
        "Malware removal",
        "Security hardening",
        "Employee training",
        "Incident response"
      ],
      color: "bg-red-100"
    },
    {
      icon: <HardDrive className="h-8 w-8 text-purple-600" />,
      title: "Data Recovery",
      targetId: "data-recovery",
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Professional recovery of lost, deleted or corrupted data from all types of storage media.",
      services: [
        "File recovery",
        "System restoration",
        "Hard drive repair",
        "SSD data recovery",
        "External drive support"
      ],
      color: "bg-purple-100"
    },
    {
      icon: <Settings className="h-8 w-8 text-emerald-600" />,
      title: "Software Installation",
      targetId: "software-install",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Hassle-free installation and configuration of operating systems and essential applications.",
      services: [
        "OS installation & setup",
        "Driver configuration",
        "Application setup",
        "System optimization",
        "Error troubleshooting"
      ],
      color: "bg-emerald-100"
    },
    {
      icon: <Cloud className="h-8 w-8 text-sky-600" />,
      title: "Cloud Migration",
      targetId: "cloud-migration",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Scale your business with secure and seamless transition to cloud-based infrastructure.",
      services: [
        "Cloud planning & strategy",
        "Infrastructure setup",
        "Data migration",
        "Cloud security",
        "Performance monitoring"
      ],
      color: "bg-sky-100"
    },
    {
      icon: <Star className="h-8 w-8 text-amber-600" />,
      title: "IT Consulting",
      targetId: "it-consulting",
      image: "https://images.unsplash.com/photo-1454165833767-13a6ad05c6f3?q=80&w=2000&auto=format&fit=crop&fm=webp",
      description: "Strategic technology advice to optimize your IT infrastructure and drive business growth.",
      services: [
        "Technology assessment",
        "Strategy planning",
        "Implementation guides",
        "System audits",
        "Ongoing IT support"
      ],
      color: "bg-amber-100"
    }
  ];

  const advancedServices = [
    {
      icon: <Settings className="h-8 w-8 text-indigo-600" />,
      title: "Advanced IT Setup",
      targetId: "pc-build",
      services: [
        "High-performance gaming PCs",
        "Professional workstations",
        "Server configuration",
        "Liquid cooling systems",
        "RGB lighting solutions"
      ],
      color: "bg-indigo-100"
    },
    {
      icon: <HardDrive className="h-8 w-8 text-purple-600" />,
      title: "Hardware Engineering",
      targetId: "pc-build",
      services: [
        "High-end component upgrades",
        "Custom water cooling",
        "Multi-GPU setups",
        "Overclocking services",
        "Server hardware configuration"
      ],
      color: "bg-purple-100"
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-600" />,
      title: "Cloud Infrastructure",
      targetId: "cloud-migration",
      services: [
        "Business network infrastructure",
        "Server deployment",
        "Cloud integration",
        "Advanced security setup",
        "Business continuity planning"
      ],
      color: "bg-blue-100"
    }
  ];

  const businessServices = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-rose-600" />,
      title: "Enterprise Security",
      targetId: "cybersecurity",
      services: [
        "Vulnerability Assessment (VAPT)",
        "Firewall & Endpoint Protection",
        "Data Protection & Compliance",
        "Ransomware Protection",
        "IT Helpdesk & AMC"
      ],
      color: "bg-rose-100"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Digital Presence",
      targetId: "cloud-migration",
      services: [
        "Cloud Storage & Remote Work",
        "Microsoft 365 / Google Workspace",
        "Virtualization Solutions",
        "Website Development",
        "E-commerce Store Setup"
      ],
      color: "bg-blue-100"
    },
    {
      icon: <Home className="h-8 w-8 text-green-600" />,
      title: "Smart Enterprise",
      targetId: "network-setup",
      services: [
        "CCTV & Surveillance Systems",
        "Smart Home Automation",
        "Biometric Locks & IoT",
        "Enterprise Wi-Fi Solutions",
        "AI/ML Ready Systems"
      ],
      color: "bg-green-100"
    }
  ];

  return (
    <section id="services" className="py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to your needs - from quick repairs to enterprise-level infrastructure
          </p>
        </div>

        <div className="mb-24 slide-in-bottom relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-60"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-8 group">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">Core Services</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Essential IT services for everyday needs</p>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-2 rounded-full transform group-hover:scale-x-125 origin-left transition-transform duration-500"></div>
              </div>
            </div>

            <div className="mb-16">
              <ServiceCarousel
                services={coreServices.map(s => ({
                  title: s.title,
                  description: s.description || "",
                  image: s.image || "",
                  targetId: s.targetId
                }))}
                onGetService={handleCarouselGetService}
              />
            </div>

            <div className="flex items-center mb-8 group mt-16">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">Advanced Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Cutting-edge technology for complex challenges</p>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mt-2 rounded-full transform group-hover:scale-x-125 origin-left transition-transform duration-500"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {advancedServices.map((service, index) => (
                <ServiceCard
                  key={`advanced-${index}`}
                  icon={service.icon}
                  title={service.title}
                  services={service.services}
                  color={service.color}
                  isExpanded={expandedCard === service.title}
                  onClick={() => handleCardClick(service.title)}
                  onGetService={handleGetService}
                  targetId={service.targetId}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="slide-in-bottom relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 p-8 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 opacity-80"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-8 group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors duration-300">Business & Enterprise Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Scalable solutions for growing businesses</p>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mt-2 rounded-full transform group-hover:scale-x-125 origin-left transition-transform duration-500"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {businessServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  {...service}
                  isExpanded={expandedCard === service.title}
                  onClick={() => handleCardClick(service.title)}
                  onGetService={handleGetService}
                  targetId={service.targetId}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Need a custom solution? We're here to help with specialized IT requirements.
          </p>
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Get Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;