import { useState, useRef, useEffect } from 'react';
import { Award, Star, Shield, Zap, CheckCircle, X, Mail, Phone, Linkedin } from 'lucide-react';
import yashVaniaImage from '../profile/yash-vania.webp';
import parasPatelImage from '../profile/paras-patel.webp';
import mananImage from '../profile/manan.webp';

// Custom hook for enhanced 3D tilt effect on images
const useImageTilt = (active: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !active) return;

    const element = ref.current;
    const img = element.querySelector('img');
    if (!img) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = (rect.width / 2) - x;
      const centerY = (rect.height / 2) - y;

      // Enhanced 3D transform with more pronounced effect
      const rotateY = centerX / 15;
      const rotateX = -centerY / 15;
      const translateZ = 30; // Increased for more depth

      // Apply transform to the image
      img.style.transform = `
        perspective(1000px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
        translateZ(${translateZ}px)
        scale3d(1.1, 1.1, 1.1)
      `;

      // Add dynamic lighting effect
      const shadowX = (centerX / 30) * -1;
      const shadowY = (centerY / 30) * -1;
      const shadowBlur = 30;
      const shadowColor = 'rgba(0, 0, 0, 0.3)';

      element.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor},
        ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.7)
      `;

      // Smooth transition
      img.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      img.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0) scale3d(1, 1, 1)';
      img.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      element.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active]);

  return ref;
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  certifications: string[];
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  bio?: string;
}

type RoleKey = 'PRESIDENT' | 'CEO_CTO' | 'CFO_COO' | 'DEFAULT';

interface RoleConfig {
  displayName: string;
  gradient: string;
  shortName: string;
  description: string;
}

const ROLES: Record<RoleKey, RoleConfig> = {
  PRESIDENT: {
    displayName: 'President',
    gradient: 'from-purple-600 to-indigo-600',
    shortName: 'PRESIDENT',
    description: 'President & Lead Developer'
  },
  CEO_CTO: {
    displayName: 'CEO & CTO',
    gradient: 'from-blue-600 to-cyan-500',
    shortName: 'CEO & CTO',
    description: 'CEO & Chief Technology Officer'
  },
  CFO_COO: {
    displayName: 'CFO & COO',
    gradient: 'from-amber-600 to-yellow-500',
    shortName: 'CFO & COO',
    description: 'Chief Financial & Operations Officer'
  },
  DEFAULT: {
    displayName: 'Team Member',
    gradient: 'from-gray-600 to-slate-500',
    shortName: 'MEMBER',
    description: 'Team Member'
  }
};

const TEAM_MEMBERS: Record<string, RoleKey> = {
  'Paras Patel': 'PRESIDENT',
  'Yash Vania': 'CEO_CTO',
  'Manan Joshi': 'CFO_COO'
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRoleConfig = (name: string): RoleConfig => {
    const roleKey = TEAM_MEMBERS[name] || 'DEFAULT';
    return ROLES[roleKey];
  };

  const getPositionColor = (role: string) => {
    return getRoleConfig(role).gradient;
  };

  const getPositionDisplayName = (name: string) => {
    return getRoleConfig(name).displayName;
  };

  const teamMembers: TeamMember[] = [
    {
      id: 'paras-patel',
      name: "Paras Patel",
      role: ROLES.PRESIDENT.shortName,
      expertise: [
        "Full Stack Development (MERN Stack)",
        "Cloud Architecture (AWS, GCP, Azure)",
        "DevOps & CI/CD Pipelines",
        "Microservices Architecture",
        "System Design & Scalability",
        "Cybersecurity Best Practices",
        "Agile & Scrum Methodologies",
        "Database Design & Optimization",
        "API Development & Integration",
        "Mobile App Development (React Native)"
      ],
      certifications: [
        "AWS Certified Solutions Architect - Associate",
        "Certified Kubernetes Administrator (CKA)",
        "Google Cloud Professional Cloud Architect",
        "Docker Certified Associate",
        "Microsoft Certified: Azure Solutions Architect Expert",
        "Certified Scrum Master (CSM)",
        "CompTIA Security+",
        "Oracle Certified Professional: Java SE Programmer"
      ],
      image: parasPatelImage,
      email: "paraspatel0824@technofixer.com",
      phone: "+91 92656 27252",
      linkedin: "linkedin.com/in/paras-patel",
      bio: "Leading cybersecurity expert with over 8 years of experience in protecting organizations from digital threats. Specializes in ethical hacking, security assessments, and developing robust security frameworks."
    },
    {
      id: 'yash-vania',
      name: "Yash Vania",
      role: ROLES.CEO_CTO.shortName,
      expertise: ["Offensive Security", "Vulnerability Assessment and Penetration Testing (VAPT)", "IT Infrastructure", "AI/ML", "System Architecture", "Network Security", "Full Stack Development", "IoT", "Robotics", "Machine Learning", "Cloud Computing (AWS)", "Ethical Hacking", "Remote Sensing", "Linux", "Hardware Projects (Raspberry Pi)", "Database Management", "API Development", "Malware Analysis"],
      certifications: ["Certified Information and Offensive Security Expert (CIOSE)", "Foundation Level Threat Intelligence Analyst", "CISSP Identity and Access Management", "Cyber Security", "Google Cloud", "Linux", "CompTIA Network+", "Certified Cyber Defence Professional (CCDP)", "Email Forensic Essentials", "Certified Information Security and Ethical Hacking", "Computer and Information Sciences and Support Services"],
      image: yashVaniaImage,
      email: "yashvania04@technofixer.com",
      phone: "+91 99982 58249",
      linkedin: "www.linkedin.com/in/yash-vania-a66575203",
      bio: "Versatile IT professional with expertise spanning development, infrastructure, and security. Passionate about creating innovative solutions and driving digital transformation."
    },
    {
      id: 'manan-joshi',
      name: "Manan Joshi",
      role: ROLES.CFO_COO.shortName,
      expertise: [
        "Financial Analysis & Reporting",
        "Strategic Financial Planning",
        "Budgeting & Forecasting",
        "Investment Management",
        "Risk Assessment",
        "Corporate Finance",
        "Financial Modeling",
        "Cash Flow Management",
        "Tax Planning",
        "Business Valuation"
      ],
      certifications: [
        "Chartered Financial Analyst (CFA) - Level 2 Candidate",
        "Certified Public Accountant (CPA) - In Progress",
        "Financial Modeling & Valuation Analyst (FMVA)",
        "Investment Banking Certification (IBC)",
        "Corporate Finance Fundamentals"
      ],
      image: mananImage,
      email: "mananjoshi10@technofixer.com",
      phone: "+91 87804 24706",
      linkedin: "linkedin.com/in/manan-joshi-5288a52bb",
      bio: "Experienced financial executive with expertise in strategic financial planning, risk management, and business development. Specializes in driving financial growth and operational excellence."
    }
  ];

  const achievements = [
    { icon: Award, title: "Industry Certifications", count: "15+", description: "Professional certifications" },
    { icon: Star, title: "Years Experience", count: "8+", description: "Combined experience" },
    { icon: Shield, title: "Projects Completed", count: "500+", description: "Successful deliveries" },
    { icon: Zap, title: "Response Time", count: "<2hrs", description: "Average response" }
  ];

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Expert Team</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Certified professionals with years of experience in IT solutions and cybersecurity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden relative cursor-pointer transform hover:-translate-y-2 flex flex-col"
                onClick={() => openModal(member)}
              >
                <div className="w-full py-2.5 text-center text-sm font-extrabold text-black dark:text-white bg-white dark:bg-gray-800 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  {getRoleConfig(member.name).shortName}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300 rounded-xl transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>

                <div className={`text-center p-6 bg-gradient-to-br ${getPositionColor(member.role)}/10 dark:${getPositionColor(member.role)}/20 group-hover:opacity-90 transition-all duration-500 relative z-10 flex-grow flex flex-col items-center`}>
                  <div className="relative"></div>
                  <div
                    ref={useImageTilt(true)}
                    className="w-28 h-28 mx-auto mt-4 mb-2 rounded-full p-0.5 transition-all duration-500 overflow-hidden transform-style-preserve-3d"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px',
                      willChange: 'transform',
                      background: 'linear-gradient(145deg, #f6d365 0%, #fda085 100%)',
                      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {member.image ? (
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full transition-all duration-500"
                          style={{
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                            WebkitFontSmoothing: 'subpixel-antialiased',
                            willChange: 'transform',
                            transform: 'translateZ(0)'
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-amber-900 dark:group-hover:text-amber-400 mb-1 transition-colors duration-500">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-amber-700 dark:group-hover:text-amber-300 font-medium leading-relaxed transition-colors duration-500">
                    {getRoleConfig(member.name).description}
                  </p>
                </div>

                <div className="p-6 pt-0 relative z-10">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-amber-800 dark:group-hover:text-amber-400 mb-3 flex items-center transition-colors duration-500">
                      <CheckCircle className="h-4 w-4 mr-2 text-blue-500 group-hover:text-amber-600 transition-colors duration-500" />
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-blue-50 text-blue-700 group-hover:bg-amber-100 group-hover:text-amber-800 rounded-md text-xs font-medium border border-blue-100 group-hover:border-amber-200 transition-all duration-500 group-hover:scale-105">
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 group-hover:bg-amber-50 group-hover:text-amber-700 rounded-md text-xs font-medium border border-gray-100 group-hover:border-amber-200 transition-all duration-500">
                          +{member.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-amber-800 dark:group-hover:text-amber-400 mb-3 flex items-center transition-colors duration-500">
                      <Shield className="h-4 w-4 mr-2 text-green-500 group-hover:text-amber-600 transition-colors duration-500" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.slice(0, 2).map((cert, certIndex) => (
                        <span key={certIndex} className="px-2 py-1 bg-green-50 text-green-700 group-hover:bg-amber-100 group-hover:text-amber-800 rounded-md text-xs font-medium border border-green-100 group-hover:border-amber-200 transition-all duration-500 group-hover:scale-105">
                          {cert}
                        </span>
                      ))}
                      {member.certifications.length > 2 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 group-hover:bg-amber-50 group-hover:text-amber-700 rounded-md text-xs font-medium border border-gray-100 group-hover:border-amber-200 transition-all duration-500">
                          +{member.certifications.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:border-amber-200">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:from-amber-500 group-hover:to-yellow-500 transition-all duration-300">
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 mb-2 transition-colors duration-300">
                    {achievement.count}
                  </h3>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-300 mb-1 transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <div className={`sticky top-0 bg-gradient-to-r ${getPositionColor(selectedMember.role)} text-white p-6 rounded-t-2xl`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 p-1 overflow-hidden">
                    {(selectedMember.name === "Yash Vania" || selectedMember.name === "Paras Patel" || selectedMember.name === "Manan Joshi") ? (
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-600">{selectedMember.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                    <p className="text-blue-100">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedMember.bio && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedMember.bio}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {selectedMember.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-600">{selectedMember.email}</span>
                      </div>
                    )}
                    {selectedMember.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">{selectedMember.phone}</span>
                      </div>
                    )}
                    {selectedMember.linkedin && (
                      <div className="flex items-center space-x-3">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-600">{selectedMember.linkedin}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                      <div className={`text-2xl font-bold ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]}`}>{selectedMember.expertise.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Areas of Expertise</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                      <div className={`text-2xl font-bold ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]}`}>{selectedMember.certifications.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className={`h-5 w-5 mr-2 ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]}`} />
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedMember.expertise.map((skill, index) => (
                    <span key={index} className={`px-3 py-2 ${getPositionColor(selectedMember.role).replace('from-', 'bg-').split(' ')[0]}/10 ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]} rounded-lg text-sm font-medium border ${getPositionColor(selectedMember.role).replace('from-', 'border-').split(' ')[0]}/30`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className={`h-5 w-5 mr-2 ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]}`} />
                  Professional Certifications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedMember.certifications.map((cert, index) => (
                    <span key={index} className={`px-3 py-2 ${getPositionColor(selectedMember.role).replace('from-', 'bg-').split(' ')[0]}/10 ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]} rounded-lg text-sm font-medium border ${getPositionColor(selectedMember.role).replace('from-', 'border-').split(' ')[0]}/30 flex items-center`}>
                      <Shield className={`h-4 w-4 mr-2 ${getPositionColor(selectedMember.role).replace('from-', 'text-').split(' ')[0]}`} />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
