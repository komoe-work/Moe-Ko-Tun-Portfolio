import { useState, useEffect, useMemo, useRef, FormEvent } from 'react';
import {
  BookOpen,
  Award,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  Atom,
  TrendingUp,
  CheckCircle,
  User,
  MapPin,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Layers,
  Video,
  Users,
  BarChart2,
  Globe,
  FileText,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Check
} from 'lucide-react';

type Language = 'my' | 'en';

export default function App() {
  const [lang, setLang] = useState<Language>('my');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState('IGCSE');

  // Rates Calculator State
  const [format, setFormat] = useState<'online' | 'inperson'>('online');
  const [size, setSize] = useState<'one-on-one' | 'group'>('one-on-one');
  const [hours, setHours] = useState(4); // hours per week

  // Interactive Sandbox State (STEM Physics & Graph Demo)
  const [sandboxTab, setSandboxTab] = useState<'physics' | 'math'>('physics');
  const [gravity, setGravity] = useState(9.8); // m/s^2
  const [launchSpeed, setLaunchSpeed] = useState(25); // m/s
  const [launchAngle, setLaunchAngle] = useState(45); // degrees
  const [mathA, setMathA] = useState(1); // coefficient a for y = ax^2 + bx + c
  const [mathB, setMathB] = useState(-2); // coefficient b
  const [mathC, setMathC] = useState(-3); // coefficient c

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquirySubject, setInquirySubject] = useState('IGCSE Additional Mathematics (0606)');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State for Verified Certificates
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  // Project Showcase State
  const [selectedProject, setSelectedProject] = useState('revision-toolkit');

  // Dict for Quick Translation
  const dict = {
    my: {
      brand: "ဆရာ မိုးကိုထွန်း",
      role: "STEM ပညာရေးဦးဆောင်ဆရာ",
      taglineBadge: "၁၆ နှစ်ကျော် အဆင့်မြင့် သင်္ချာနှင့် ရူပဗေဒ သင်ကြားမှုအတွေ့အကြုံ",
      heroTitle: "ကမ္ဘာ့အဆင့်မီ စာမေးပွဲထူးချွန်မှုအတွက် သင်္ချာနှင့် ရူပဗေဒ",
      heroSubtitle: "အပြန်အလှန်ထိတွေ့လေ့လာမှုစနစ်၊ နိုင်ငံတကာသင်ရိုးပြဌာန်းချက်များဖြင့် အကောင်းဆုံးပညာရေးကို လက်တွေ့ဖော်ဆောင်ပါ။ Cambridge IGCSE, GCE A-Level, IB AA DP, Digital SAT နှင့် OSSD အတန်းများအတွက် စနစ်တကျ ပြင်ဆင်ပေးပြီး အမှတ်အထွက်ကောင်းစေပါသည်။",
      btnRates: "သင်တန်းကြေးခန့်မှန်းချက်တွက်ရန်",
      btnSandbox: "STEM သရုပ်ပြစနစ်စမ်းရန်",
      yrsLabel: "၁၆ နှစ်ကျော်",
      yrsSub: "သင်ကြားမှု သက်တမ်း",
      syllabusLabel: "၁၀၀%",
      syllabusSub: "သင်ရိုးကိုက်ညီမှု",
      certsLabel: "၆ ခု",
      certsSub: "စစ်ဆေးပြီး အောင်လက်မှတ်",
      profileBadge: "စစ်ဆေးပြီး ကိုယ်ရေးရာဇဝင်",
      coachingLabel: "ဘာသာရပ်ဆိုင်ရာ အထူးပြဆရာကြီး",
      location: "ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ (တစ်ကမ္ဘာလုံး အွန်လိုင်းမှတဆင့် သင်ကြားပေးသည်)",
      birthLabel: "မွေးသက္ကရာဇ် / အသက်",
      birthVal: "၂၇ မတ် ၁၉၈၈ (အသက် ၃၈ နှစ်)",
      degreeLabel: "ပညာအရည်အချင်း ဘွဲ့ဒီဂရီ",
      degreeVal: "B.Sc. Mathematics, PostGrad YUFL",
      mediumLabel: "သင်ကြားသည့် ဘာသာစကား",
      mediumVal: "အင်္ဂလိပ်နှင့် မြန်မာ နှစ်ဘာသာ",
      navHome: "ပင်မစာမျက်နှာ",
      navShowcase: "သင်ကြားရေးပြခန်း",
      navCurriculum: "သင်ရိုးညွှန်းတမ်း",
      navSandbox: "STEM သရုပ်ပြကွင်း",
      navExperience: "လုပ်ငန်းအတွေ့အကြုံ",
      navCredentials: "အောင်လက်မှတ်များ",
      navRates: "သင်တန်းကြေးခန့်မှန်းရန်",
      btnEnroll: "အတန်းအပ်နှံရန်",
      showcaseBadge: "ထူးခြားသော သင်ကြားမှုပုံစံ",
      showcaseTitle: "သင်ကြားရေး အထောက်အကူပြုပစ္စည်းများနှင့် အရင်းအမြစ်များ",
      showcaseDesc: "ကျောင်းသားများ ထူးချွန်သော ရမှတ်များ ရရှိစေရန် ဆရာမိုး ကိုယ်တိုင် ပြုစုဖန်တီးထားသော သင်ရိုးအရင်းအမြစ်များနှင့် ခေတ်မီဆော့ဖ်ဝဲလ်များ။",
      performance: "ရလဒ်စံနှုန်း - ",
      deliverables: "ထူးခြားသော အကျိုးကျေးဇူးများ",
      sampleRequest: "ကမ္ဘာ့နမူနာပစ္စည်းများ တောင်းဆိုရန်",
      pathwayTitle: "အထူးပြု နိုင်ငံတကာ သင်ရိုးလမ်းညွှန်",
      pathwaySub: "နိုင်ငံတကာစံနှုန်းမီ အထက်တန်းအဆင့် သင်ရိုးတစ်ခုချင်းစီအလိုက် သီးခြားရေးဆွဲထားသော စနစ်တကျ စာမေးပွဲပြင်ဆင်ရေး လမ်းညွှန်ချက်များ။",
      syllabusTitle: "သင်ရိုးသတ်မှတ်ချက်",
      outlineTitle: "အထူးပြုအကျဉ်းချုပ်",
      philosophyLabel: "သင်ကြားရေးခံယူချက်ဆိုင်ရာ ဒဿန",
      btnPathway: "သင်ရိုးသတ်မှတ်ချက်ကို ရွေးချယ်ရန်",
      simulatorTitle: "သင်္ချာနှင့် ရူပဗေဒ သရုပ်ပြ ဆိုင်ဘာကွင်း",
      simulatorSub: "ဆရာမိုးသည် ကျောင်းသားများ သီအိုရီများကို မျက်စိထဲမြင်သာစေရန် Live ဂရပ်ဖစ်စနစ်ဖြင့် လက်တွေ့ ရှင်းပြပါသည်။ စမ်းသပ်ကြည့်ပါ။",
      physicsTab: "ရူပဗေဒ - လမ်းကြောင်းနိယာမများ",
      mathTab: "သင်္ချာ - ညီမျှခြင်း မျဉ်းကွေးများ",
      physicsParamsTitle: "ဒုံးပျံပစ်လွှတ်မှု အတိုင်းအတာများ",
      physicsParamsDesc: "ပစ်လွှတ်မှုအမြန်နှုန်းနှင့် ကမ္ဘာဆွဲအားပြောင်းလဲမှုများက ဖန်တီးသော လမ်းကြောင်းပုံရိပ်များ",
      initVel: "ပစ်လွှတ်နှုန်းအမြန် ($v_0$)",
      launchAng: "ပစ်လွှတ်ထောင့် ($\theta$)",
      gravityLabel: "ဆွဲအား စံကိန်း ($g$)",
      calculatedMetrics: "တိုက်ရိုက်ရရှိသော အတိုင်းအတာများ",
      maxRange: "အဝေးဆုံး ရောက်နိုင်သည့် အကွာအဝေး ($R$)",
      maxHeight: "အမြင့်ဆုံး ရောက်နိုင်သည့် အမြင့် ($H$)",
      flightTime: "ပျံသန်းချိန် စုစုပေါင်း ($T$)",
      mathParamsTitle: "သင်္ချာ ညီမျှခြင်း စံနှုန်းများ",
      mathParamsDesc: "ညီမျှခြင်း $y = ax^2 + bx + c$ အရ ကိန်းသေများကို ပြောင်းလဲပြီး မျဉ်းကွေးကျုံ့ခြင်း၊ ဆွဲဆန့်ခြင်းများကို လေ့လာပါ။",
      coeffA: "ကိန်းသေ $a$ (ဆွဲဆန့်ခြင်း / ကျုံ့ခြင်း)",
      coeffB: "ကိန်းသေ $b$ (ဝင်ရိုးရွှေ့ပြောင်းခြင်း)",
      coeffC: "ကိန်းသေ $c$ (Y-ဝင်ရိုးဖြတ်မှတ်)",
      algebraicSummary: "ဂျီသြမေတြီ တွက်ချက်မှု ရလဒ်များ",
      vertex: "မျဉ်းကွေးထိပ်စွန်း vertex ($h, k$)",
      roots: "X-ဖြတ်မှတ်များ (သုညတန်ဖိုးများ)",
      discriminant: "ခွဲခြားကိန်း Discriminant ($\Delta$)",
      originLabel: "မူလမှတ် (၀, ၀)",
      axisX: "အလျားလိုက် အကွာအဝေး / ဝင်ရိုး",
      quote: "သီအိုရီအနှစ်ချုပ် များကို မျက်စိဖြင့် လက်တွေ့ ဂရပ်ဖစ်စနစ်ဖြင့် မြင်သာသောအခါ ကျောင်းသားများ စာမေးပွဲတွင် ပိုမို အလွယ်တကူ ဖြေဆိုနိုင်ပါသည်။",
      careerTitle: "အတွေ့အကြုံမြင့်မားသော သင်ကြားရေးသမိုင်း",
      careerSub: "၂၀၀၈ ခုနှစ်မှ စတင်ကာ ၁၆ နှစ်ကျော် ကမ္ဘာ့အဆင့်မီ တက္ကသိုလ်ဝင်တန်း ကျောင်းသားများကို အောင်မြင်စွာ ထူးချွန်စေခဲ့သော သမိုင်းကြောင်း။",
      certHeader: "တရားဝင် အသိအမှတ်ပြု အောင်လက်မှတ်များနှင့် ဘွဲ့များ",
      certSub: "ဆရာမိုးကိုထွန်း၏ စနစ်တကျ စစ်ဆေးပြီးသော နိုင်ငံတကာအဆင့် အောင်လက်မှတ်များနှင့် ဘာသာစကားဆိုင်ရာ ဒီဂရီများ။",
      accreditation: "စစ်ဆေးပြီးသော အောင်လက်မှတ်",
      modalIssuer: "တရားဝင် ထုတ်ပေးသည့်အဖွဲ့",
      modalContext: "တရားဝင် သင်တန်းအသေးစိတ်",
      modalCredits: "အောင်လက်မှတ် အထောက်အထား / ခရက်ဒစ်",
      modalValid: "ပြီးမြောက်သော ရက်စွဲ",
      btnClose: "ပိတ်ရန်",
      btnAsk: "သင်တန်းအကြောင်း ထပ်မံမေးမြန်းရန်",
      ratesTitle: "ပွင့်လင်းမြင်သာသော သင်တန်းကြေးခန့်မှန်းချက်",
      ratesSub: "သင်ရိုးညွှန်းတမ်းအလိုက် စာသင်ခချိန်များကို တိုက်ရိုက်တွက်ချက်ကြည့်ပါ။ မည်သည့် လျှို့ဝှက်ကြေးမှ မရှိပါ။",
      cohortScale: "အတန်းစကေး အမျိုးအစား",
      oneOnOne: "တစ်ဦးချင်း သီးသန့်သင်တန်း",
      groupScale: "အုပ်စုလိုက်သင်တန်း (အများဆုံး ၉ ဦး)",
      deliveryMethod: "သင်ကြားရေး နည်းစနစ်",
      onlineClass: "အွန်လိုင်းအတန်း (Zoom Classroom)",
      inpersonClass: "လူကိုယ်တိုင်အတန်း (ရန်ကုန်မြို့တွင်း)",
      hoursWeekly: "တစ်ပတ်လျှင် စာသင်ကြားလိုသည့် နာရီအရေအတွက်",
      billingInvoice: "ခန့်မှန်း သင်တန်းကြေးပြေစာ",
      monthlyEstMMK: "လစဉ် စုစုပေါင်းခန့်မှန်းခြေ (ကျပ်ငွေ)",
      monthlyEstUSD: "လစဉ် စုစုပေါင်းခန့်မှန်းခြေ (ဒေါ်လာ)",
      hoursCumulative: "တစ်လလျှင် စုစုပေါင်း {total} နာရီ သင်ကြားမှုပေါ်အခြေခံသည်",
      benchmarkRate: "စံနှုန်းငွေလဲလှယ်နှုန်း ခန့်မှန်းချက်အရဖြစ်သည်",
      baseRate: "နာရီအလိုက် စံဈေးနှုန်း",
      weeklyTotal: "တစ်ပတ်စာ စုစုပေါင်း",
      weeklyLoad: "တစ်ပတ်စာ သင်ကြားချိန်",
      btnApplyPreset: "ဤသတ်မှတ်ချက်ကို ဖောင်တွင် ထည့်သွင်းရန်",
      enrollTitle: "ဆွေးနွေးတိုင်ပင်ရန် စာရင်းသွင်းပါ",
      enrollSub: "နိုင်ငံတကာသင်ရိုးပြောင်းလဲမှု၊ ရူပဗေဒလက်တွေ့သရုပ်ပြစနစ်များ၊ အစမ်းစာမေးပွဲများနှင့် နာရီသတ်မှတ်ချက်များကို အသေးစိတ် အချိန်မရွေး တိုင်ပင်မေးမြန်းနိုင်ပါသည်။ ဖောင်ဖြည့်သွင်း၍ဖြစ်စေ၊ တိုက်ရိုက်ဖြစ်စေ ဆက်သွယ်နိုင်ပါသည်။",
      emailLabel: "တရားဝင် အီးမေးလ် ဆက်သွယ်ရန်",
      viberLabel: "ဖုန်းနှင့် ဗိုင်ဘာ (Viber) ဆက်သွယ်ရန်",
      availLabel: "သင်ကြားရေး အချိန်ဇယားများ",
      availHours: "တနင်္လာ - တနင်္ဂနွေ (နံနက် ၇ နာရီ မှ ည ၉ နာရီ မြန်မာစံတော်ချိန်)",
      recommendationBadge: "ဘွဲ့လွန် မာစတာသင်တန်း တရားဝင် ထောက်ခံချက်",
      recommendationDesc: "Dagon ယူနီဗာစီတီနှင့် ရန်ကုန်နိုင်ငံခြားဘာသာတက္ကသိုလ် (YUFL) တို့မှ ထူးချွန်စွာ အောင်မြင်ပြီးနောက် သုတေသန မာစတာ (Master's) သင်တန်းတက်ရောက်ရန် တရားဝင် အဆင့်ပြည့် ထောက်ခံချက် ရရှိထားသည်။",
      formName: "သင့်အမည် (မိဘ သို့မဟုတ် ကျောင်းသား)",
      formContact: "ဆက်သွယ်ရန် ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ်",
      formSubject: "သင်ကြားလိုသော သင်ရိုး / ဘာသာရပ်",
      formGoals: "သင်တန်းရည်မှန်းချက်နှင့် အကြံပြုလိုသည့် အချက်အလက်များ",
      btnSubmit: "ဆွေးနွေးတိုင်ပင်ရန် ဖောင်တင်သွင်းမည်",
      confidential: "🔒 အချက်အလက်လုံခြုံမှုပေးထားပါသည်။ ကျောင်းသားမှတ်တမ်းများနှင့် ကိုယ်ရေးကိုယ်တာ အချက်အလက်များကို လုံးဝ လျှို့ဝှက်ထိန်းသိမ်းပေးပါသည်။",
      footerVerified: "Cambridge သင်ရိုး marking standards၊ YUFL English Postgrad အောင်လက်မှတ် Na Ba Ta-7761 နှင့် MRCS TOT Coding အထောက်အထားများဖြင့် အောင်မြင်စွာ ပူးပေါင်းစစ်ဆေးပြီးဖြစ်သည်။",
      enSwitch: "English",
      mySwitch: "မြန်မာ"
    },
    en: {
      brand: "Tr. Moe Ko Tun",
      role: "STEM Academic Lead",
      taglineBadge: "Verified 16+ Years Higher Math & Physics Experience",
      heroTitle: "De-mystifying Math & Physics For Peak Global Grades.",
      heroSubtitle: "Unlock potential with interactive, syllabus-mapped academic coaching. Specializing in Cambridge IGCSE, GCE A-Level, IB AA DP, Digital SAT, and Canadian OSSD.",
      btnRates: "Tuition Rate Calculator",
      btnSandbox: "Try Concept Simulator",
      yrsLabel: "16+ Yrs",
      yrsSub: "Tutoring Career",
      syllabusLabel: "100%",
      syllabusSub: "Syllabus Aligned",
      certsLabel: "6+",
      certsSub: "Verified Credentials",
      profileBadge: "Verified Profile",
      coachingLabel: "Classrooms & Online Master Coach",
      location: "Yangon, Myanmar (Available Globally Online)",
      birthLabel: "Birth / Age",
      birthVal: "27 March 1988 (38 Years Old)",
      degreeLabel: "Academic Degree",
      degreeVal: "B.Sc. Mathematics, PostGrad YUFL",
      mediumLabel: "Teaching Medium",
      mediumVal: "English & Myanmar Bilingual",
      navHome: "Home",
      navShowcase: "Showcase",
      navCurriculum: "Curricula",
      navSandbox: "STEM Sandbox",
      navExperience: "Experience",
      navCredentials: "Credentials",
      navRates: "Tuition Estimates",
      btnEnroll: "Enroll Online",
      showcaseBadge: "Pedagogy Showcases",
      showcaseTitle: "Educational Resources & Materials",
      showcaseDesc: "A closer look at the actual custom revision tools and data analytics files used by Tr. Moe to elevate candidate grades.",
      performance: "Performance: ",
      deliverables: "Core Content Deliverables",
      sampleRequest: "Request Sample Resource",
      pathwayTitle: "Curriculums & Syllabus Breakdowns",
      pathwaySub: "Providing specialized target lesson plans matching modern international high-school programs.",
      syllabusTitle: "Syllabus Plan",
      outlineTitle: "Specialty Outline",
      philosophyLabel: "Pedagogy Philosophy",
      btnPathway: "Select Pathway",
      simulatorTitle: "Mathematics & Physics Sandbox Simulator",
      simulatorSub: "Tr. Moe specializes in using digital visual modeling tools so formulas become intuitive. Try playing with parameters live.",
      physicsTab: "Physics: Trajectory Kinetics",
      mathTab: "Math: Quadratic Parabola",
      physicsParamsTitle: "Projectile Motion Parameters",
      physicsParamsDesc: "Observe the effects of launch forces and gravity on instantaneous parabolic trajectories.",
      initVel: "Initial Velocity ($v_0$)",
      launchAng: "Angle of Elevation ($\theta$)",
      gravityLabel: "Gravitational Fields ($g$)",
      calculatedMetrics: "Real-time Kinematics outputs",
      maxRange: "Max Range ($R$)",
      maxHeight: "Peak Altitude ($H$)",
      flightTime: "Continuous Flight Time ($T$)",
      mathParamsTitle: "Quadratic Graph Parameters",
      mathParamsDesc: "Interact with parameters to alter parabola vectors under standard formula $y = ax^2 + bx + c$.",
      coeffA: "Coefficient $a$ (Stretch / Compress)",
      coeffB: "Coefficient $b$ (Axis translation)",
      coeffC: "Constant $c$ (Y-Intercept node)",
      algebraicSummary: "Discriminant analysis outcomes",
      vertex: "Parabola Vertex ($h, k$)",
      roots: "X-Intercepts (Roots)",
      discriminant: "DiscriminantDelta ($\Delta$)",
      originLabel: "Origin (0,0)",
      axisX: "Horizontal axis / Distance",
      quote: "Abstract equations become intuitive when you can see and interact with their graphs in real time.",
      careerTitle: "An Academic Career Focused on Exceptional Teaching",
      careerSub: "16 years (since 2008) guiding elite candidates to peak performances across prestigious local institutions and international academies.",
      certHeader: "Credentials & Professional Certifications",
      certSub: "Moe Ko Tun maintains rigorous compliance with global teaching and linguistic standards. Click cards to view details.",
      accreditation: "Active Verified Credential",
      modalIssuer: "Official Issuer",
      modalContext: "Completion Context",
      modalCredits: "License / Credits",
      modalValid: "Valid Completion",
      btnClose: "Close Vault",
      btnAsk: "Ask Educator About This",
      ratesTitle: "Transparent Tuition Rates Estimator",
      ratesSub: "Expected rates mapped directly from CV guidelines (no surprise fees). Configure your student's metrics to gauge budgets.",
      cohortScale: "Cohort Structure format",
      oneOnOne: "1-On-1 Target",
      groupScale: "Group (Max 9 Candidates)",
      deliveryMethod: "Delivery Methodology",
      onlineClass: "Online (Zoom Classroom)",
      inpersonClass: "In-Person (Yangon Area)",
      hoursWeekly: "Tutoring Hours Weekly",
      billingInvoice: "Simulated Billing Invoice",
      monthlyEstMMK: "Monthly Estimate (MMK)",
      monthlyEstUSD: "Monthly Estimate (USD)",
      hoursCumulative: "Evaluated on {total} hours cumulative monthly teaching",
      benchmarkRate: "Estimated at benchmark conversion rates",
      baseRate: "Base Rate",
      weeklyTotal: "Weekly Total",
      weeklyLoad: "Weekly Load",
      btnApplyPreset: "Apply Preset To Form",
      enrollTitle: "Book an Academic Consultation Slot",
      enrollSub: "Have questions about specific syllabus transitions, interactive mechanics modeling, past Mock examinations, or custom hours? Submit a booking form directly or reach out via direct channels.",
      emailLabel: "Primary Correspondence",
      viberLabel: "Viber / Phone & SMS Contacts",
      availLabel: "Available Teaching Hours",
      availHours: "Monday - Sunday (7 AM - 9 PM MMT timezone)",
      recommendationBadge: "Academic Eligibility Endorsement",
      recommendationDesc: "Officially qualified for PG Master’s degree research pathways after achieving commendable targets under Dagon and Yangon Foreign Language programs.",
      formName: "Your Name (Parent or Candidate)",
      formContact: "Primary Contact Details",
      formSubject: "Target Subject Standard",
      formGoals: "Lesson Goals or Calendar Scheduling Constraints",
      btnSubmit: "Submit Booking Consultation Request",
      confidential: "🔒 Protected enrollment details. We maintain strict student data confidentiality under general educational guidelines.",
      footerVerified: "Verified qualifications under CAIE marking, YUFL English Postgraduate Na Ba Ta-7761 and Myanmar TOT Coding certification.",
      enSwitch: "English",
      mySwitch: "မြန်မာ"
    }
  };

  const t = dict[lang];

  // Auto Scroll Segment Highlight Tracker
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'showcase', 'curriculum', 'sandbox', 'experience', 'credentials', 'rates', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expected rates compiled directly from his resume PDF
  const rateData = {
    'one-on-one': {
      online: { mmk: 50000, usd: 12 },
      inperson: { mmk: 80000, usd: 20 }
    },
    'group': {
      online: { mmk: 100000, usd: 25 },
      inperson: { mmk: 160000, usd: 40 }
    }
  };

  const calculatedCosts = useMemo(() => {
    const hourlyMMK = rateData[size][format].mmk;
    const hourlyUSD = rateData[size][format].usd;
    
    return {
      hourlyMMK,
      hourlyUSD,
      weeklyMMK: hourlyMMK * hours,
      weeklyUSD: hourlyUSD * hours,
      monthlyMMK: hourlyMMK * hours * 4,
      monthlyUSD: hourlyUSD * hours * 4
    };
  }, [format, size, hours]);

  // Projectile Motion Simulator math
  const trajectoryPoints = useMemo(() => {
    const g = gravity;
    const v0 = launchSpeed;
    const angleRad = (launchAngle * Math.PI) / 180;
    
    const v0x = v0 * Math.cos(angleRad);
    const v0y = v0 * Math.sin(angleRad);
    
    const tFlight = (2 * v0y) / g;
    const points: { x: number; y: number }[] = [];
    
    for (let i = 0; i <= 50; i++) {
      const t = (tFlight * i) / 50;
      const x = v0x * t;
      const y = (v0y * t) - (0.5 * g * t * t);
      if (y >= 0) {
        points.push({ x, y });
      }
    }
    
    const maxRange = (v0 * v0 * Math.sin(2 * angleRad)) / g;
    const maxHeight = (v0y * v0y) / (2 * g);
    
    return {
      points,
      maxRange: maxRange.toFixed(1),
      maxHeight: maxHeight.toFixed(1),
      tFlight: tFlight.toFixed(1)
    };
  }, [gravity, launchSpeed, launchAngle]);

  // Quadratic equation mathematician formula analyzer
  const quadraticGraphData = useMemo(() => {
    const a = mathA;
    const b = mathB;
    const c = mathC;
    
    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;
    
    const delta = b * b - 4 * a * c;
    let roots: string[] = [];
    if (delta > 0) {
      const r1 = (-b + Math.sqrt(delta)) / (2 * a);
      const r2 = (-b - Math.sqrt(delta)) / (2 * a);
      roots = [r1.toFixed(2), r2.toFixed(2)];
    } else if (delta === 0) {
      roots = [(-b / (2 * a)).toFixed(2)];
    } else {
      roots = lang === 'my' ? ["ကိန်းစစ်အဖြေမရှိပါ (No Real Roots)"] : ["No Real Roots (Complex Context)"];
    }

    const points: { x: number; y: number }[] = [];
    for (let x = h - 6; x <= h + 6; x += 0.3) {
      const y = a * x * x + b * x + c;
      if (y >= -15 && y <= 25) {
        points.push({ x, y });
      }
    }

    return {
      points,
      vertex: `(${h.toFixed(2)}, ${k.toFixed(2)})`,
      roots,
      discriminant: delta.toFixed(1)
    };
  }, [mathA, mathB, mathC, lang]);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryContact.trim()) {
      const errorMsg = lang === 'my' ? 'သင့်အမည်နှင့် ဆက်သွယ်ရန် လိပ်စာဖြည့်စွက်ပါဦး။' : 'Please fill out your Name and primary Contact detail.';
      triggerToast(errorMsg);
      return;
    }

    const successMsg = lang === 'my' 
      ? `တိုင်ပင်ဆွေးနွေးမှု တင်သွင်းပြီးပါပြီ။ ဆရာမိုးကိုထွန်းမှ သင့်ထံသို့ ၂၄ နာရီအတွင်း ${inquiryContact} ကတဆင့် ဆက်သွယ်ပါမည်။` 
      : `Inquiry sent! Moe Ko Tun will connect via ${inquiryContact} within 24 hours regarding ${inquirySubject}.`;
    
    triggerToast(successMsg);
    
    // Clear inputs
    setInquiryName('');
    setInquiryContact('');
    setInquiryMessage('');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Raw Curriculums detailed specifications
  const curriculumDetails = {
    'IGCSE': {
      title: lang === 'my' ? 'Cambridge IGCSE & Additional Mathematics / Physics' : 'Cambridge IGCSE & Additional Mathematics / Physics',
      sub: lang === 'my' ? 'ကင်းဘရစ်ချ် (CAIE) စာမေးပွဲစံနှုန်းများနှင့်အညီ ရမှတ်ကောင်းရန် တည်ဆောက်ထားသောစနစ်' : 'Specially built around Cambridge Assessment (CAIE) frameworks to conquer core exams.',
      focus: lang === 'my' ? [
        'Core & Extended သင်ရိုး အခြေခံများ (0580/0607)',
        'Additional Math (0606) စာမေးပွဲ မေးခွန်းဟောင်း တွက်နည်းစနစ်များ',
        'IGCSE Physics (0625/0972) သီအိုရီနှင့် လက်တွေ့ဖြေနည်းများ',
        'အဆင့်မြင့် မေးခွန်းတွက်နည်းများနှင့် အမှတ်ပေးစံညွှန်းများလေ့လာခြင်း'
      ] : [
        'Core & Extended Syllabus parameters (0580/0607)',
        'Additional Mathematics (0606) specialized markings',
        'IGCSE Physics (0625/0972) transition concepts',
        'Intensive Past Paper drills & structured exam templates'
      ],
      tagline: lang === 'my' ? 'ကျောင်းသားများ စဥ်ဆက်မပြတ် A* ရမှတ်များ ဆွတ်ခူးနိုင်ရန် စနစ်တကျ သင်ကြားပေးပါသည်။' : 'Empowering students with targeted analytical workflows to achieve consistent A* results.'
    },
    'GCE A-Level': {
      title: lang === 'my' ? 'GCE Advanced Level (Pure Mathematics & Mechanics)' : 'GCE Advanced Level (Pure Mathematics & Mechanics)',
      sub: lang === 'my' ? 'တက္ကသိုလ်အကြို အဆင့်မြင့် သင်္ချာနှင့် မက္ကင်းနစ်သင်ရိုးများ' : 'Advanced algorithmic mechanics aligning secondary education with modern college-level expectations.',
      focus: lang === 'my' ? [
        'Pure Mathematics 1 to 4 (P1, P2, P3, P4) အခန်းစုံ',
        'Mechanics (M1) ဗက်တာလှုပ်ရှားမှုနှင့် အလျင်တွက်နည်းများ',
        'Probability and Statistics မော်ဒယ်များနှင့် တွက်ပုံများ (S1, S2)',
        'Calculus အဆင့်မြင့် Calculus နှင့် သက်သေပြချက် ရေးဆွဲနည်းများ'
      ] : [
        'Pure Mathematics 1 to 4 (P1, P2, P3, P4)',
        'Mechanics (M1) coordinate vector components & kinematics',
        'Probability and Statistics models (S1, S2)',
        'Rigorous Proof formulation & Calculus workflows'
      ],
      tagline: lang === 'my' ? 'အဆင့်မြင့် ဆန်းစစ်နိုင်စွမ်းကို လေ့ကျင့်ပေးပြီး အကောင်းဆုံးရမှတ်များ ရရှိစေသည်။' : 'Guiding aspiring engineers and scientists to master deep analytical proofs.'
    },
    'IB DP / SAT': {
      title: lang === 'my' ? 'IB DP Mathematics & Digital SAT Prep' : 'IB DP Mathematics & Digital SAT Prep',
      sub: lang === 'my' ? 'ဖြေဆိုမှုအမြန်နှုန်းနှင့် လက်တွေ့သုံး သင်္ချာပိုင်းဆိုင်ရာများကို ဗဟိုပြုခြင်း' : 'Problem-solving accuracy and rapid quantitative reasoning methods.',
      focus: lang === 'my' ? [
        'IB Mathematics Analysis & Approaches (AA HL/SL)',
        'Digital SAT Mathematics အပိုင်းအတွက် မေးခွန်းတွက်နည်းဗျူဟာများ',
        'အမြန်တွက် စိတ်တွက် သင်္ချာနည်းစနစ်များနှင့် အမှားနည်းအောင် လေ့ကျင့်ပေးပုံ',
        'ခေါင်းစဥ်အလိုက် စာမေးပွဲပြင်ဆင်ရေး Bluebook မေးခွန်းများလေ့ကျင့်ခြင်း'
      ] : [
        'IB Mathematics Analysis & Approaches (AA HL/SL)',
        'Digital SAT Mathematics sections layout drill',
        'Proofs, Conics, Complex analysis logic',
        'Mental maths tricks and pacing strategies'
      ],
      tagline: status => lang === 'my' ? 'Digital SAT သင်္ချာ အပြည့်ရမှတ် ၈၀၀ မဏ္ဍိုင်ကို အရောက်လှမ်းနိုင်ရန် လေ့ကျင့်ပေးသည်။' : 'Scoring peak 800 thresholds on SAT and Level 7s under International Baccalaureate metrics.'
    },
    'OSSD / Grade 12': {
      title: lang === 'my' ? 'Ontario Secondary Diploma (OSSD) & Grade 12' : 'Ontario Secondary Diploma (OSSD) & Grade 12',
      sub: lang === 'my' ? 'ပြည်ပတက္ကသိုလ်ဝင်ခွင့်ရမှတ် ညီမျှစေရန် နိုင်ငံတကာစံနှုန်းအတန်းများ' : 'Connecting local curriculum benchmarks to overseas academic credits and qualifications.',
      focus: lang === 'my' ? [
        'High-school Grade 12 Advanced Functions (MHF4U) မော်ဂျူး',
        'Calculus & Vectors structures (MCV4U) အဆင့်မြင့်သင်္ချာ',
        'မြန်မာနိုင်ငံ Grade 12 စံပြ မေးခွန်းဟောင်းနှင့် သင်ရိုးသစ်သင်္ချာ',
        'နိုင်ငံခြား တက္ကသိုလ်ဝင်ခွင့်အတွက် ကိုယ်ပိုင် အထောက်အထား Portfolio ပြုစုခြင်း'
      ] : [
        'High-school Grade 12 Advanced Functions (MHF4U)',
        'Calculus & Vectors structures (MCV4U)',
        'Myanmar National Grade 12 Standard Maths modules',
        'Comprehensive assessment portfolios for overseas college entries'
      ],
      tagline: lang === 'my' ? 'အထက်တန်းမှသည် ကမ္ဘာ့အဆင့်မီသုတေသနတက္ကသိုလ်ကြီးများသို့ ကူးပြောင်းနိုင်ရန် ပြင်ဆင်ပေးသည်။' : 'Ensuring seamless entry requirements into elite international research universities.'
    }
  };

  // Pedagogy highlights and showcases
  const projectShowcases = [
    {
      id: 'revision-toolkit',
      title: lang === 'my' ? 'ကင်းဘရစ်ချ် CAM-0606 စာမေးပွဲလမ်းညွှန် ပစ္စည်းကိရိယာစု' : 'CAM-0606 Exam Revision Suite',
      category: lang === 'my' ? 'သင်ရိုးညွှန်းတမ်း အရင်းအမြစ်' : 'Curriculum Resource',
      description: lang === 'my' ? 'အခန်းပေါင်း ၁၂ ခန်းကျော်မှ ပုစ္ဆာဟောင်းများကို ဆရာမိုးကိုယ်တိုင် ရေးဆွဲထားသော စာမေးပွဲ အရမှတ်ရလွယ်ကူစေမည့် marking guidance များဖြင့် လေ့လာနိုင်သောအရင်းအမြစ်။' : 'An interactive database of categorized past papers spanning 12 chapters, complete with Teacher Moe’s step-by-step marking schemes pointing out common diagnostic errors.',
      features: lang === 'my' ? ['၁၂ နှစ်စာအမျိုးအစားတူ ခွဲခြားထားသောစာမေးပွဲမေးခွန်းများ', 'ကျောင်းသားများ အမှားအများဆုံးနေရာများကို ထောက်ပြချက်', 'ပုစ္ဆာဖြေရှင်းနည်းအဆင့်ဆင့် ဖြေရှင်းပုံများ'] : ['12 Years of Categorized Past Papers', 'Common Error Diagnosis Matrix', 'Step-by-Step Marking Hints'],
      metric: lang === 'my' ? 'အသုံးပြုသူကျောင်းသား ၉၂% ရာခိုင်နှုန်း A/A* ရမှတ်များရခဲ့သည်' : '92% of users achieved A/A*'
    },
    {
      id: 'simulation-slides',
      title: lang === 'my' ? 'ရွေ့လျားလှုပ်ရှားမှုပညာရပ် ဆိုင်ရာ အပြန်အလှန်သင်ခန်းစာများ' : 'Kinematics Interactive Lesson Deck',
      category: lang === 'my' ? 'သင်ကြားရေး အဆင့်မြင့် ဆော့ဖ်ဝဲလ်' : 'Teaching Software',
      description: lang === 'my' ? 'အရှိန်ပြောင်းလဲမှု၊ လမ်းကြောင်းမျဉ်းကွေး အမြင့်ဆုံးနေရာများ၊ ရွေ့လျားအလျင် အစရှိသည်တို့ကို တိုက်ရိုက် Online အတန်းတွင်း မျက်စိဖြင့် ထိတွေ့စမ်းသပ်လေ့လာနိုင်သော ဆော့ဖ်ဝဲလ်စနစ်။' : 'A custom, animated presentation system demonstrating the components of acceleration, vector kinematics, and parabolic heights interactively directly in the online classroom.',
      features: lang === 'my' ? ['Dynamic သရုပ်ပြညီမျှခြင်းမျဉ်းကွေးဂရပ်များ', 'Vector Resolution Layout သရုပ်ဖော်ပုံများ', 'ဖုန်းလှည့်ပြီးဖြစ်စေ လွယ်ကူလျင်မြန်စွာ စမ်းသပ်နိုင်ပုံ'] : ['Live Mathematical Curve Plots', 'Vector Resolution Layouts', 'Responsive Mobile-Friendly Controls'],
      metric: lang === 'my' ? 'သင်ကြားရေးနာရီပေါင်း ၅၀၀ ကျော်ကို စနစ်တကျ သင်ကြားပြီးဖြစ်သည်' : 'Over 500+ teaching hours logged'
    },
    {
      id: 'mock-matrix',
      title: lang === 'my' ? 'ကျောင်းသားတစ်ဦးချင်းစီ၏ နောက်ဆုံးတိုးတက်မှု စာရင်းဇယား' : 'Candidate Progress Analytics Sheet',
      category: lang === 'my' ? 'သင်တန်းတိုးတက်မှု ကွန်ရက်' : 'Analytics Framework',
      description: lang === 'my' ? 'အိမ်စာရမှတ်၊ အခန်းအလိုက် နားလည်မှုနှင့် စာမေးပွဲစမ်းသပ်မှုရလဒ်များကို အချိန်နှင့်တပြေးညီ မှတ်တမ်းတင်ပြီး ကျောင်းသား၏ အားနည်းချက်ကို adapt စနစ်ဖြင့် ပြုပြင်ပေးသော စာရင်းဇယားစနစ်။' : 'A data-driven assessment framework tracking homework scores, mock trials, and chapter-by-chapter mastery of GCE candidates to dynamically adapt lesson priorities.',
      features: lang === 'my' ? ['အခန်းအလိုက် ကျွမ်းကျင်မှု ရာခိုင်နှုန်းပြဂရပ်', 'မိဘများထံ အပတ်စဉ် တိုးတက်မှု အစီရင်ခံစာများ တိုက်ရိုက်ပို့စနစ်', 'အဓိကအားဖြည့်လေ့ကျင့်ရမည့်အခန်းများ ထောက်ပြချက်'] : ['Automated Chapter Mastery Charts', 'Personalized Target Areas Generator', 'Parent Progress Reports'],
      metric: lang === 'my' ? 'GCE စာမေးပွဲ အောင်မြင်မှုနှုန်း ၁၀၀% ရရှိခဲ့သည်' : '100% GCE pass rate achieved'
    }
  ];

  // Professional Credentials (CV-verified details)
  const credentialsList = [
    {
      id: 'caie-addmath-cert',
      title: lang === 'my' ? 'ထပ်ဆင့်သင်္ချာ (0606) ကင်းဘရစ်ချ် အဆင့်မြင့်သင်ကြားရေး အောင်လက်မှတ်' : 'Additional Mathematics (0606) Marking Standard Certificate',
      issuer: 'Cambridge Assessment International Education (CAIE)',
      date: 'November 2021',
      details: lang === 'my' ? 'IGCSE Additional Mathematics (0606) အတွက် ကင်းဘရစ်ချ်၏ တရားဝင် Marking standards ဖြစ်သော အဆင့်မြင့် အကဲဖြတ်မှုပညာရပ်ဆိုင်ရာ သင်တန်းအောင်လက်မှတ်။' : 'Official Cambridge Professional Development training course completion for IGCSE Additional Mathematics (0606) syllabi. Deep analysis of grading, marker standards, and examiner perspectives.',
      category: lang === 'my' ? 'Cambridge CAIE သင်တန်းစံနှုန်း' : 'Cambridge CAIE Accreditation'
    },
    {
      id: 'caie-physics-cert',
      title: lang === 'my' ? 'IGCSE ရူပဗေဒ (0625) နိုင်ငံတကာအထူးသင်ကြားရေး လက်မှတ်' : 'IGCSE Physics Extension Syllabus Certification',
      issuer: 'Cambridge Assessment International Education (CAIE)',
      date: 'February 2022',
      details: lang === 'my' ? 'CAIE Physical State, အပူလှိုင်းဆိုင်ရာ၊ အင်ဂျင်နီယာမက္ကင်းနစ်နှင့် နိုင်ငံတကာ စာမေးပွဲ marking standards ဆိုင်ရာ တရားဝင် အောင်လက်မှတ်သင်တန်း။' : 'Completed official Extension Cambridge IGCSE Physics (0625) course covering core mechanics, thermal state transitions, and analytical laboratory simulation designs.',
      category: lang === 'my' ? 'Cambridge CAIE သင်တန်းစံနှုန်း' : 'Cambridge CAIE Accreditation'
    },
    {
      id: 'tot-robotics',
      title: lang === 'my' ? 'စက်ရုပ်နည်းပညာနှင့် နည်းပညာဆရာဖြစ်သင်တန်း (TOT)' : 'Robotics & Coding Teacher of Training (TOT)',
      issuer: 'Myanmar Robotics & Coding School (MRCS)',
      date: 'August 16, 2020',
      details: lang === 'my' ? 'နာရီပေါင်း ၆၀ ကျော်ကြာ တစ်ဦးချင်း နည်းပညာဆရာဖြစ် အိုင်တီ၊ စက်ရုပ်တည်ဆောက်ပုံနှင့် Scratch သင်ရိုးဆိုင်ရာ သင်တန်း ပြီးမြောက်ကြောင်းလက်မှတ် (ID: #T00252/24)။' : 'Completed rigorous 60 contact hours of instructor-training courses covering robotic algorithm design, Scratch logic block structures, and STEM syllabus implementation (ID: #T00252/24).',
      category: lang === 'my' ? 'STEM နည်းပညာသင်ကြားရေး အောင်လက်မှတ်' : 'STEM Educator Credential'
    },
    {
      id: 'yufl-english',
      title: lang === 'my' ? 'အင်္ဂလိပ်စာ ဒီပလိုမာ ဘွဲ့လွန်သင်တန်း (Post Graduate Diploma)' : 'Post Graduate Diploma in English (Full-Time)',
      issuer: 'Yangon University of Foreign Languages (YUFL)',
      date: 'Jan 25, 2014',
      details: lang === 'my' ? 'ရန်ကုန်နိုင်ငံခြားဘာသာတက္ကသိုလ်မှ တရားဝင် ထုတ်ပေးသော ဘာသာစကားသင်ကြားရေးဆိုင်ရာ ဘွဲ့လွန်ဒီပလိုမာ (Graduate Registration Na Ba Ta-7761)။' : 'Formal, native English fluency and professional educational pedagogy curriculum completion. Completed under Graduate Registration Na Ba Ta-7761.',
      category: lang === 'my' ? 'အင်္ဂလိပ်စာ ဘာသာစကား ဘွဲ့' : 'Linguistic Degree'
    },
    {
      id: 'yu-ir',
      title: lang === 'my' ? 'နိုင်ငံတကာဆက်ဆံရေး ဘွဲ့လွန်ဒီპလိုမာ (Diploma in IR)' : 'Post Graduate Diploma in International Relations',
      issuer: 'Yangon University',
      date: '2015',
      details: lang === 'my' ? 'ရန်ကုန်တက္ကသိုလ်မှ နိုင်ငံတကာ ပညာရေးဆက်ဆံမှုစံနှုန်းများ၊ ဆွေးနွေးမှုဗျူဟာများနှင့် ပညာရေးဆက်သွယ်ရေး အောင်လက်မှတ်သင်တန်း။' : 'Advanced strategic studies, policy context, and international academic communication structures (Part-Time academic curriculum).',
      category: lang === 'my' ? 'ဘွဲ့လွန် ဒီပလိုမာ' : 'Post Graduate Degree'
    },
    {
      id: 'dagon-bsc',
      title: lang === 'my' ? 'သင်္ချာအထူးပြု သိပ္ပံဘွဲ့ (B.Sc. Mathematics)' : 'Bachelor of Science (B.Sc.) in Mathematics',
      issuer: 'Dagon University',
      date: 'Graduated',
      details: lang === 'my' ? 'ဒဂုံတက္ကသိုလ်မှ သင်္ချာဘာသာရပ်ဆိုင်ရာ ဘွဲ့ဒီဂရီ။ Linear Algebra, Calculus, Mechanics အစရှိသော သီအိုရီအခြေခံများအားလုံးကို စနစ်တကျ သင်ယူဆည်းပူးခဲ့သည်။' : 'Complete undergraduate degree program in pure and applied mathematics. Specialized coursework in Advanced Calculus, Numerical Linear Algebra, Mechanics, and Statistics.',
      category: lang === 'my' ? 'တက္ကသိုလ် ဘွဲ့' : 'Undergraduate Degree'
    }
  ];

  const currentProject = projectShowcases.find(p => p.id === selectedProject) || projectShowcases[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 antialiased overflow-x-hidden">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div id="toast" className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-teal-500/60 shadow-[0_0_25px_rgba(20,184,166,0.15)] rounded-2xl p-4 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-1 text-teal-400 bg-teal-500/20 rounded-full shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">{lang === 'my' ? 'သတိပေးချက်' : 'Notification'}</p>
              <p className="text-xs text-slate-300 mt-1">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header and Floating Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-teal-500/20 text-lg select-none">
              ∑
            </div>
            <div>
              <span className="text-base font-bold text-slate-100 uppercase tracking-wider block">
                {t.brand}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span>{t.role}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'home', label: t.navHome },
              { id: 'showcase', label: t.navShowcase },
              { id: 'curriculum', label: t.navCurriculum },
              { id: 'sandbox', label: t.navSandbox },
              { id: 'experience', label: t.navExperience },
              { id: 'credentials', label: t.navCredentials },
              { id: 'rates', label: t.navRates }
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setActiveSection(section.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeSection === section.id 
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          {/* Contact Actions Button + Language Picker */}
          <div className="flex items-center gap-2.5">
            
            {/* Small Elegant Language Switcher Button */}
            <button
              onClick={() => {
                setLang(lang === 'my' ? 'en' : 'my');
                triggerToast(lang === 'my' ? 'Syllabus content switched to English format.' : 'ကိုယ်ရေးပရိုဖိုင်အား မြန်မာဘာသာဖြင့် ဖော်ပြပေးလိုက်ပါသည်။');
              }}
              title="Change Language / ဘာသာစကားပြောင်းလဲရန်"
              className="px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-bold hover:bg-slate-900 text-slate-350 hover:text-slate-100 flex items-center gap-1.5 transition-all cursor-pointer bg-slate-950"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-mono">{lang === 'my' ? 'EN' : 'မြန်မာ'}</span>
            </button>

            <a 
              href="#contact"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/10 hover:shadow-teal-500/25 flex items-center gap-1.5"
            >
              <span>{t.btnEnroll}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-900 px-4 py-4 space-y-1.5 shadow-xl">
            {[
              { id: 'home', label: t.navHome },
              { id: 'showcase', label: t.navShowcase },
              { id: 'curriculum', label: t.navCurriculum },
              { id: 'sandbox', label: t.navSandbox },
              { id: 'experience', label: t.navExperience },
              { id: 'credentials', label: t.navCredentials },
              { id: 'rates', label: t.navRates },
              { id: 'contact', label: t.contact }
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => {
                  setActiveSection(section.id);
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeSection === section.id
                    ? 'bg-teal-500/10 text-teal-400 border-l-2 border-teal-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Core Section */}
      <main>
        
        {/* Hero Section */}
        <section id="home" className="relative pt-12 pb-24 md:py-32 overflow-hidden border-b border-slate-900/60">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.06),transparent_50%)]" />
          <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-teal-500/5 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              {/* Active Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-teal-400 text-xs font-semibold tracking-wide shadow-lg">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>{t.taglineBadge}</span>
              </div>

              {/* Title display */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-100">
                {t.heroTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-light leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Statistical features */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900 max-w-xs transition-colors hover:border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-teal-400 block">{t.yrsLabel}</span>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1 block">{t.yrsSub}</span>
                </div>
                <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900 max-w-xs transition-colors hover:border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">{t.syllabusLabel}</span>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1 block">{t.syllabusSub}</span>
                </div>
                <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900 max-w-xs transition-colors hover:border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">{t.certsLabel}</span>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1 block">{t.certsSub}</span>
                </div>
              </div>

              {/* Primary Call to actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#rates" 
                  className="bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-teal-400" />
                  <span>{t.btnRates}</span>
                </a>
                <a 
                  href="#sandbox" 
                  className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/20 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Atom className="w-4 h-4 text-teal-400" />
                  <span>{t.btnSandbox}</span>
                </a>
              </div>

            </div>

            {/* Profile Sidebar Info card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-slate-900/80 p-6 rounded-3xl border border-slate-800/80 relative shadow-2xl backdrop-blur-sm">
                
                <div className="absolute top-4 right-4 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {t.profileBadge}
                </div>

                {/* Styled Professional Avatar Design */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-2xl blur opacity-25 animate-pulse" />
                    <div className="w-32 h-32 rounded-2xl bg-slate-850 border-2 border-slate-750 flex flex-col items-center justify-center relative overflow-hidden">
                      <GraduationCap className="w-12 h-12 text-teal-400 mb-1" />
                      <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">MKT TEACHER</span>
                      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500" />
                    </div>
                  </div>
                </div>

                {/* Profile Core Metadata */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-black text-slate-100 tracking-tight">{lang === 'my' ? 'ဆရာ မိုးကိုထွန်း' : 'Moe Ko Tun'}</h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-400">{t.coachingLabel}</p>
                  <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.location}</span>
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-800/80 pt-6 space-y-3.5 px-1">
                  <div className="flex justify-between items-center text-xs gap-4">
                    <span className="text-slate-500 uppercase font-bold tracking-wider">{t.birthLabel}</span>
                    <span className="text-slate-200 text-right">{t.birthVal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs gap-4">
                    <span className="text-slate-500 uppercase font-bold tracking-wider">{t.degreeLabel}</span>
                    <span className="text-slate-200 text-right">{t.degreeVal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs gap-4">
                    <span className="text-slate-500 uppercase font-bold tracking-wider">{t.mediumLabel}</span>
                    <span className="text-slate-100 text-right font-medium">{t.mediumVal}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 flex justify-around text-center">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase tracking-wider font-extrabold">{t.profileTutoring}</span>
                    <span className="text-base font-bold text-slate-200">16+ Years</span>
                  </div>
                  <div className="w-px bg-slate-800 h-8" />
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase tracking-wider font-extrabold">{t.profileCAIE}</span>
                    <span className="text-base font-bold text-slate-200">Math & Physics</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Project Showcases Section */}
        <section id="showcase" className="py-24 bg-slate-900/10 border-b border-slate-900/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full">
                {t.showcaseBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
                {t.showcaseTitle}
              </h2>
              <p className="text-slate-400 text-sm">
                {t.showcaseDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector List */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {projectShowcases.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      selectedProject === project.id
                        ? 'bg-slate-900 border-teal-500/40 text-teal-400 shadow-lg shadow-teal-500/5'
                        : 'border-slate-800/60 hover:bg-slate-900/40 hover:border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                        {project.category}
                      </span>
                      <h4 className="font-bold text-slate-200 block text-xs tracking-wide leading-relaxed">{project.title}</h4>
                    </div>
                    <div className={`p-2 rounded-xl transition-colors shrink-0 ml-3 ${
                      selectedProject === project.id ? 'bg-teal-500/25 text-teal-400' : 'bg-slate-950 text-slate-600'
                    }`}>
                      <FileText className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Display Feature Card */}
              <div className="lg:col-span-8 bg-slate-900/50 rounded-3xl border border-slate-800 p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
                
                <div className="space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-850 pb-5">
                    <div>
                      <span className="text-xs text-teal-400 font-bold uppercase tracking-widest">
                        {currentProject.category} Highlight
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-100 mt-1">{currentProject.title}</h3>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 self-start">
                      {t.performance}{currentProject.metric}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {currentProject.description}
                  </p>

                  <div className="space-y-3.5">
                    <h5 className="text-[11px] uppercase tracking-widest font-extrabold text-slate-300">{t.deliverables}:</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentProject.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2 items-center p-3.5 bg-slate-950/60 rounded-xl border border-slate-900/80">
                          <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                          <span className="text-slate-300 text-xs font-medium leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-950/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-450 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">{t.resourceFormatLabel}</span>
                      <span className="text-slate-300 text-xs">{t.resourceFormatVal}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerToast(lang === 'my' ? 'အရင်းအမြစ်နမူနာတောင်းဆိုမှု တင်သွင်းပြီးပါပြီ။' : 'Sample resource file request logged successfully!')}
                    className="bg-slate-900 hover:bg-slate-850 text-teal-400 border border-teal-500/20 text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {t.sampleRequest}
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Curriculums Section */}
        <section id="curriculum" className="py-24 bg-slate-900/30 border-b border-slate-900/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest block">
                {t.pathwayTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
                {t.pathwayTitle}
              </h2>
              <p className="text-slate-400 text-sm">
                {t.pathwaySub}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector List */}
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                {Object.keys(curriculumDetails).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCurriculum(key)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-150 flex items-center justify-between ${
                      selectedCurriculum === key
                        ? 'bg-slate-900 border-teal-500/40 text-teal-400 shadow-md'
                        : 'border-slate-800/60 hover:bg-slate-900/40 hover:border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-xs tracking-wide uppercase">{key} {t.curriculumSyllabus}</span>
                    <div className={`p-1.5 rounded-lg ${selectedCurriculum === key ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-950 text-slate-600'}`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Display Node */}
              <div className="lg:col-span-8 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800 min-h-[410px] flex flex-col justify-between">
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] text-teal-400 uppercase tracking-widest font-extrabold block">{t.outlineTitle}</span>
                    <h3 className="text-xl font-bold text-slate-100 mt-1">{curriculumDetails[selectedCurriculum as keyof typeof curriculumDetails].title}</h3>
                    <p className="text-slate-400 text-xs mt-2 italic">"{curriculumDetails[selectedCurriculum as keyof typeof curriculumDetails].sub}"</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {curriculumDetails[selectedCurriculum as keyof typeof curriculumDetails].focus.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-slate-950/40 rounded-xl border border-slate-900">
                        <div className="mt-0.5 p-0.5 bg-teal-500/10 rounded">
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-xs font-medium leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-3">
                    <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl shrink-0 max-h-11">
                      <Award className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-400 font-extrabold uppercase tracking-wider block">{t.philosophyLabel}</span>
                      <p className="text-slate-405 text-xs font-light">{curriculumDetails[selectedCurriculum as keyof typeof curriculumDetails].tagline}</p>
                    </div>
                  </div>
                  <a 
                    href="#contact" 
                    className="bg-slate-900 hover:bg-slate-850 border border-teal-500/25 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-teal-355 transition-colors shrink-0"
                  >
                    {t.btnPathway}
                  </a>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* STEM Dynamic Concept Simulator Sandbox Section */}
        <section id="sandbox" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
              <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full">
                {t.sandboxBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
                {t.simulatorTitle}
              </h2>
              <p className="text-slate-400 text-xs">
                {t.simulatorSubtitle}
              </p>
            </div>

            {/* Sandbox Tabs Navigator */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-900/90 p-1.5 rounded-2xl inline-flex border border-slate-800 shadow-xl">
                <button
                  onClick={() => setSandboxTab('physics')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                    sandboxTab === 'physics'
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Atom className="w-4 h-4" />
                  <span>{t.physicsTab}</span>
                </button>
                <button
                  onClick={() => setSandboxTab('math')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                    sandboxTab === 'math'
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>{t.mathTab}</span>
                </button>
              </div>
            </div>

            {/* Config & Workstation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Controllers Workspace Panel */}
              <div className="lg:col-span-5 bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                
                {sandboxTab === 'physics' ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-bold text-slate-105 flex items-center gap-2">
                        <span>{t.physicsParamsTitle}</span>
                      </h3>
                      <p className="text-[11px] text-slate-450 mt-1">
                        {t.physicsParamsDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      
                      {/* Launch Speed */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{t.initVel}</span>
                          <span className="text-teal-400 font-mono">{launchSpeed} m/s</span>
                        </div>
                        <input 
                          type="range" 
                          min="5" 
                          max="45" 
                          value={launchSpeed} 
                          onChange={(e) => setLaunchSpeed(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-teal-500"
                        />
                      </div>

                      {/* Launch Angle */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{t.launchAng}</span>
                          <span className="text-teal-400 font-mono">{launchAngle}°</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="85" 
                          value={launchAngle} 
                          onChange={(e) => setLaunchAngle(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-teal-500"
                        />
                      </div>

                      {/* Gravitational force coefficient */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-semibold text-slate-400 block uppercase tracking-wide">{t.gravityLabel}</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: lang === 'my' ? 'ကမ္ဘာမြေ (Earth)' : 'Earth', val: 9.8 },
                            { name: lang === 'my' ? 'လကမ္ဘာ (Moon)' : 'Moon', val: 1.62 },
                            { name: lang === 'my' ? 'ကြာသပတေး (Jupiter)' : 'Jupiter', val: 24.79 }
                          ].map((env) => (
                            <button
                              key={env.name}
                              onClick={() => setGravity(env.val)}
                              className={`py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                                gravity === env.val
                                  ? 'bg-teal-500/10 border-teal-500/40 text-teal-400'
                                  : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {env.name} ({env.val}m/s²)
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Calculated Outcome Receipts */}
                    <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-850 space-y-3">
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block font-mono">{t.calculatedMetrics}</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">{t.maxRange}</span>
                          <span className="text-base font-bold text-teal-405 font-mono">{trajectoryPoints.maxRange} m</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">{t.maxHeight}</span>
                          <span className="text-base font-bold text-teal-405 font-mono">{trajectoryPoints.maxHeight} m</span>
                        </div>
                        <div className="col-span-2 border-t border-slate-900 pt-3">
                          <span className="text-[10px] text-slate-400 block uppercase">{t.flightTime}</span>
                          <span className="text-base font-bold text-cyan-405 font-mono">{trajectoryPoints.tFlight} s</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-bold text-slate-105 flex items-center gap-2">
                        <span>{t.mathParamsTitle}</span>
                      </h3>
                      <p className="text-[11px] text-slate-450 mt-1">
                        {t.mathParamsDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      
                      {/* Coefficient A */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{t.coeffA}</span>
                          <span className={`font-mono font-bold ${mathA > 0 ? 'text-teal-400' : 'text-rose-450'}`}>{mathA}</span>
                        </div>
                        <input 
                          type="range" 
                          min="-4" 
                          max="4" 
                          step="0.5"
                          value={mathA} 
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMathA(val === 0 ? 0.5 : val); // Avoid zero horizontal flat lines
                          }}
                          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-teal-500"
                        />
                      </div>

                      {/* Coefficient B */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{t.coeffB}</span>
                          <span className="text-teal-400 font-mono">{mathB}</span>
                        </div>
                        <input 
                          type="range" 
                          min="-8" 
                          max="8" 
                          value={mathB} 
                          onChange={(e) => setMathB(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-teal-500"
                        />
                      </div>

                      {/* Coefficient C */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{t.coeffC}</span>
                          <span className="text-teal-400 font-mono">{mathC}</span>
                        </div>
                        <input 
                          type="range" 
                          min="-8" 
                          max="8" 
                          value={mathC} 
                          onChange={(e) => setMathC(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-teal-500"
                        />
                      </div>

                    </div>

                    {/* Quadratic Algebraic outcomes */}
                    <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-850 space-y-3">
                      <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest block font-mono">{t.algebraicSummary}</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">{t.vertex}</span>
                          <span className="text-xs sm:text-sm font-bold text-teal-450 font-mono">{quadraticGraphData.vertex}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">{t.discriminant}</span>
                          <span className="text-xs sm:text-sm font-bold text-teal-450 font-mono">{quadraticGraphData.discriminant}</span>
                        </div>
                        <div className="col-span-2 border-t border-slate-900 pt-3">
                          <span className="text-[10px] text-slate-400 block uppercase">{t.roots}</span>
                          <span className="text-xs sm:text-sm font-bold text-cyan-405 leading-relaxed block">
                            {quadraticGraphData.roots.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Dynamic Graphing Canvas Grid Section */}
              <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-4 sm:p-6 flex flex-col justify-between relative shadow-inner">
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{t.liveGraphing}</span>
                  <span className="text-[11px] font-medium text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded">
                    {sandboxTab === 'physics' ? t.parabolicRangeGraph : t.parabolaCurveRep}
                  </span>
                </div>

                {/* Plot Area */}
                <div className="w-full aspect-[4/3] bg-slate-900/40 rounded-2xl relative border border-slate-850 overflow-hidden flex items-end">
                  
                  {/* Visual background grids */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Ground base line */}
                  <div className="absolute bottom-6 left-0 right-0 h-px bg-slate-750" />
                  
                  {/* Left margin line */}
                  <div className="absolute top-0 bottom-0 left-8 w-px bg-slate-750" />

                  {/* SVG Path Render */}
                  {sandboxTab === 'physics' ? (
                    <svg className="absolute inset-0 w-full h-full text-teal-400" viewBox="0 0 400 300" preserveAspectRatio="none">
                      {trajectoryPoints.points.length > 0 && (
                        <path
                          d={trajectoryPoints.points.reduce((acc, pt, index) => {
                            const scaledX = 32 + (pt.x / (45 * 5)) * 340;
                            const scaledY = 274 - (pt.y / (45 * 2.5)) * 240;
                            return acc + `${index === 0 ? 'M' : 'L'} ${scaledX} ${scaledY}`;
                          }, '')}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      )}
                      
                      {/* Simualted projectile point */}
                      {trajectoryPoints.points.length > 0 && (
                        <circle
                          cx={32 + (trajectoryPoints.points[trajectoryPoints.points.length - 1]?.x / (45 * 5)) * 340}
                          cy={274 - (trajectoryPoints.points[trajectoryPoints.points.length - 1]?.y / (45 * 2.5)) * 240}
                          r="5"
                          className="fill-cyan-400 animate-ping"
                        />
                      )}
                    </svg>
                  ) : (
                    <svg className="absolute inset-0 w-full h-full text-teal-405" viewBox="0 0 400 300" preserveAspectRatio="none">
                      {quadraticGraphData.points.length > 0 && (
                        <path
                          d={quadraticGraphData.points.reduce((acc, pt, index) => {
                            const scaledX = 200 + (pt.x * 15);
                            const scaledY = 150 - (pt.y * 5);
                            if (scaledX >= 32 && scaledX <= 390 && scaledY >= 10 && scaledY <= 274) {
                              return acc + `${acc === '' ? 'M' : 'L'} ${scaledX} ${scaledY}`;
                            }
                            return acc;
                          }, '')}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      )}
                      
                      {/* Central cartesian dash lines (0, 0) */}
                      <line x1="32" y1="150" x2="390" y2="150" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                      <line x1="200" y1="10" x2="200" y2="274" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                    </svg>
                  )}

                  <div className="absolute left-10 bottom-8 text-[9px] text-slate-500 font-bold uppercase tracking-wider select-none">
                    {t.originLabel}
                  </div>
                  <div className="absolute right-4 bottom-8 text-[9px] text-slate-500 font-bold uppercase tracking-wider select-none">
                    {t.axisX}
                  </div>

                </div>

                <div className="mt-4 flex gap-4 text-xs text-slate-450 bg-slate-900/30 p-4 rounded-xl border border-slate-850/80 items-center">
                  <StarIcon className="w-5 h-5 text-teal-400 shrink-0" />
                  <p className="font-light italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="py-24 bg-slate-900/30 border-b border-slate-900/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest block">
                {t.navExperience}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
                {t.careerTitle}
              </h2>
              <p className="text-slate-400 text-sm">
                {t.careerSub}
              </p>
            </div>

            <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
              
              {/* Job 1 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-4 top-1.5 md:-left-36 w-8 h-8 rounded-full bg-slate-950 border border-teal-500/50 flex items-center justify-center text-teal-400 font-bold text-xs shadow z-10 font-mono">
                  23
                </div>
                <div className="hidden md:block absolute -left-32 top-3 text-right text-[10px] font-extrabold text-teal-400 tracking-wider font-mono">
                  2023 - PRES
                </div>

                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-850/80 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{t.expFaculty}</h3>
                      <p className="text-teal-400 text-xs font-semibold">Auston University (Yangon Campus)</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-[10px] font-bold border border-teal-500/20 self-start sm:self-center uppercase tracking-wide">
                      HIGHER EDUCATION
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {lang === 'my' 
                      ? 'GCE A-Level ကျောင်းသားများနှင့် IGCSE ဘာသာရပ်များကို စာသင်ခန်းအတွင်း စံစနစ်တကျ သင်ကြားပေးခြင်း၊ Pure Mathematics နှင့် Mechanics ပိုင်းအား အဓိက လေ့ကျင့်ပေးပုံကို တာဝန်ယူရသည်။' 
                      : 'Responsible for preparing GCE A-Level candidates and IGCSE classes in classrooms. Providing focused tutoring on integrals, kinematics, vectors and exam strategies.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">GCE A-Level</span>
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">Calculus & Mechanics</span>
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">CAIE 0580 / 0606</span>
                  </div>
                </div>
              </div>

              {/* Job 2 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-4 top-1.5 md:-left-36 w-8 h-8 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-450 font-bold text-xs z-10 font-mono">
                  20
                </div>
                <div className="hidden md:block absolute -left-32 top-3 text-right text-[10px] font-extrabold text-slate-450 tracking-wider font-mono">
                  2020 - PRES
                </div>

                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-850/80 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{t.expPeti}</h3>
                      <p className="text-teal-400 text-xs font-semibold">Peti Academy</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20 self-start sm:self-center uppercase tracking-wide">
                      MULTI-CURRICULUM
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {lang === 'my' 
                      ? 'IGCSE, GCE, IB, SAT, OSSD နှင့် မြန်မာသင်ရိုးသစ် Grade 12 ကျောင်းသားများအတွက် တစ်ဦးချင်းနှင့် အုပ်စုလိုက် စနစ်တကျ ပြင်ဆင်သင်ကြားပေးခြင်း။' 
                      : 'Tutoring students inside competitive international frameworks such as IB DP AA, SAT Quantitative sections, and Ontario credit platforms (MHF4U/MCV4U).'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">IB AA Math</span>
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">SAT Section 800</span>
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">OSSD High School</span>
                  </div>
                </div>
              </div>

              {/* Job 3 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-4 top-1.5 md:-left-36 w-8 h-8 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-455 font-bold text-xs z-10 font-mono">
                  21
                </div>
                <div className="hidden md:block absolute -left-32 top-3 text-right text-[10px] font-extrabold text-slate-500 tracking-wider font-mono">
                  2021 - 2023
                </div>

                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-850/80 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{t.expPhysics}</h3>
                      <p className="text-teal-400 text-xs font-semibold">Nelson International Education Centre (Tachileik)</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-850 text-slate-350 text-[10px] font-bold border border-slate-800 self-start sm:self-center uppercase tracking-wide">
                      SECONDARY FACULTY
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {lang === 'my' 
                      ? 'Nelson နိုင်ငံတကာကျောင်း၏ Secondary ၁ မှ ၄ အထိ ရူပဗေဒ (Physics 0625) ဘာသာရပ်ကို သီအိုရီပိုင်းဆိုင်ရာများနှင့် Lab စမ်းသပ်ခန်း သရုပ်ပြချက်များဖြင့် ကူညီသင်ကြားပေးခဲ့သည်။' 
                      : 'Delivered systematic Physics lessons targeting IGCSE (0625) candidates. Coordinated school mechanical simulation workshops for lower & upper secondary cohorts.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">Physics 0625/0972</span>
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">Kinetic Science</span>
                  </div>
                </div>
              </div>

              {/* Job 4 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-4 top-1.5 md:-left-36 w-8 h-8 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-455 font-bold text-xs z-10 font-mono">
                  18
                </div>
                <div className="hidden md:block absolute -left-32 top-3 text-right text-[10px] font-extrabold text-slate-500 tracking-wider font-mono">
                  2018 - 2020
                </div>

                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-850/80 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{t.expFounder}</h3>
                      <p className="text-teal-400 text-xs font-semibold">New Endeavour Private & Boarding School (Kyauk Phyu)</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 self-start sm:self-center uppercase tracking-wide">
                      MANAGEMENT
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {lang === 'my' 
                      ? 'ဘော်ဒါကျောင်း၏ ဥက္ကဋ္ဌနှင့် အကြီးတန်းပညာရေးဦးစီးအဖြစ် ကျောင်းအုပ်ချုပ်မှုပိုင်းနှင့် အထက်တန်းအဆင့် စာမေးပွဲပြင်ဆင်ရေး သင်ရိုးများအားလုံးကို စီမံကြီးကြပ်ခဲ့သည်။' 
                      : 'Co-founded and managed complex operations for dormitory high-school students. Managed final exam alignments, lesson plans and teaching staff assessments.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">School Operations</span>
                    <span className="bg-slate-950 text-slate-450 text-[10px] px-2.5 py-1 rounded-lg border border-slate-900">Academic Leadership</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Verified Professional Credentials Vault */}
        <section id="credentials" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full">
                {t.navCredentials}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
                {t.certHeader}
              </h2>
              <p className="text-slate-400 text-sm">
                {t.certSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentialsList.map((cert) => (
                <div 
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/40 transition-all duration-200 cursor-pointer hover:shadow-xl group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">
                        {cert.category}
                      </span>
                      <div className="p-1.5 bg-slate-950 rounded text-slate-500 group-hover:text-teal-400 transition-colors">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-150 leading-relaxed group-hover:text-teal-300 transition-colors font-sans">
                      {cert.title}
                    </h3>
                    
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
                      {cert.details}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-550 block uppercase tracking-wider text-[8px] font-bold">Issuer</span>
                      <span className="text-slate-300 font-semibold text-[11px] font-sans">{cert.issuer}</span>
                    </div>
                    <span className="text-teal-400 font-bold bg-slate-950 px-2 py-1 rounded text-[10px]">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Certificate Modal Overlay */}
          {selectedCert && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 bg-slate-950 hover:bg-slate-850 w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>

                <div className="space-y-2">
                  <span className="text-[10px] text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {t.accreditation}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-100 leading-snug">{selectedCert.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">Authenticated Academic Milestone Verification</p>
                </div>

                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-550 uppercase tracking-widest font-extrabold block">{t.modalIssuer}</span>
                    <span className="text-slate-250 font-semibold text-sm">{selectedCert.issuer}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-550 uppercase tracking-widest font-extrabold block">{t.modalContext}</span>
                    <p className="text-slate-350 text-xs leading-relaxed mt-1">{selectedCert.details}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900">
                    <div>
                      <span className="text-[10px] text-slate-550 uppercase tracking-widest font-extrabold block">{t.modalCredits}</span>
                      <span className="text-xs text-teal-400 font-mono font-bold">Standardized CV Alignment</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-550 uppercase tracking-widest font-extrabold block">{t.modalValid}</span>
                      <span className="text-xs text-slate-300 font-medium">{selectedCert.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="bg-slate-950 hover:bg-slate-850 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-800 transition-all cursor-pointer"
                  >
                    {t.btnClose}
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedCert(null)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-teal-500/15"
                  >
                    {t.btnAsk}
                  </a>
                </div>

              </div>
            </div>
          )}
        </section>

        {/* Tuition Rates and Dynamic Interactive Calculator */}
        <section id="rates" className="py-24 bg-slate-900/30 border-b border-slate-900/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full">
                {t.ratesBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
                {t.ratesTitle}
              </h2>
              <p className="text-slate-400 text-sm">
                {t.ratesSub}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Configuration Panel */}
              <div className="lg:col-span-5 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between space-y-8">
                
                <div className="space-y-6">
                  
                  {/* Sizing structure selection */}
                  <div className="space-y-2.5">
                    <label className="text-xs text-slate-450 uppercase tracking-widest font-extrabold block">{t.cohortScale}</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-910">
                      <button
                        onClick={() => setSize('one-on-one')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          size === 'one-on-one'
                            ? 'bg-teal-500 text-slate-950 shadow-md'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.oneOnOne}
                      </button>
                      <button
                        onClick={() => setSize('group')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          size === 'group'
                            ? 'bg-teal-500 text-slate-950 shadow-md'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.groupScale}
                      </button>
                    </div>
                  </div>

                  {/* Delivery Methodology online/inperson */}
                  <div className="space-y-2.5">
                    <label className="text-xs text-slate-455 uppercase tracking-widest font-extrabold block">{t.deliveryMethod}</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-910">
                      <button
                        onClick={() => setFormat('online')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          format === 'online'
                            ? 'bg-teal-500 text-slate-950 shadow-md'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.onlineClass}
                      </button>
                      <button
                        onClick={() => setFormat('inperson')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          format === 'inperson'
                            ? 'bg-teal-500 text-slate-950 shadow-md'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.inpersonClass}
                      </button>
                    </div>
                  </div>

                  {/* Tutoring load hoursweekly slider */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs font-extrabold uppercase tracking-widest text-slate-400">
                      <span>{t.hoursWeekly}</span>
                      <span className="text-teal-400 font-mono font-bold">{hours} Hours</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      value={hours} 
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 accent-teal-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold font-mono select-none">
                      <span>1 hr/wk</span>
                      <span>8 hrs/wk</span>
                      <span>15 hrs/wk</span>
                    </div>
                  </div>

                </div>

                {/* Info Disclaimer alerts in Myanmar-first biling */}
                <div className="bg-slate-950/60 p-4.5 rounded-xl border border-slate-900 text-[11px] text-slate-405 space-y-2.5 leading-relaxed">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-450 shrink-0 mt-0.5" />
                    <span>{t.baseRate}: {calculatedCosts.hourlyMMK.toLocaleString()} MMK (approx. ${calculatedCosts.hourlyUSD} USD).</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-455 shrink-0 mt-0.5" />
                    <span>{t.ratesSub} ({lang === 'my' ? '၄ ပတ်စာအပေါ်အခြေခံတွက်ချက်ပါသည်' : 'Cost models estimate simple 4-week Month blocks'}).</span>
                  </div>
                </div>

              </div>

              {/* Invoice receipt breakdown panel */}
              <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-850 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-2xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs text-slate-550 uppercase tracking-widest font-extrabold block font-mono">{t.billingInvoice}</span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1">
                      {size === 'one-on-one' ? t.billingOne : t.billingGroup}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Method: {format === 'online' ? t.billingMethodOnline : t.billingMethodInPerson}</p>
                  </div>

                  {/* pricing grids */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-450 block uppercase tracking-wide font-extrabold">{t.monthlyEstMMK}</span>
                      <span className="text-xl sm:text-2xl font-black text-teal-400 font-mono block">
                        {calculatedCosts.monthlyMMK.toLocaleString()} MMK
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono block">{t.hoursCumulative.replace('{total}', String(hours * 4))}</span>
                    </div>

                    <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-405 block uppercase tracking-wide font-extrabold">{t.monthlyEstUSD}</span>
                      <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono block">
                        ${calculatedCosts.monthlyUSD.toLocaleString()} USD
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono block">{t.benchmarkRate}</span>
                    </div>

                  </div>

                  <div className="pt-6 border-t border-slate-900/80 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-[8px] text-slate-550 uppercase font-bold tracking-widest">{t.baseRate}</span>
                      <span className="text-slate-300 font-bold block text-xs font-mono mt-0.5">{calculatedCosts.hourlyMMK.toLocaleString()} MMK/hr</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-550 uppercase font-bold tracking-widest">{t.weeklyTotal}</span>
                      <span className="text-slate-300 font-bold block text-xs font-mono mt-0.5">{calculatedCosts.weeklyMMK.toLocaleString()} MMK</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-550 uppercase font-bold tracking-widest">{t.weeklyLoad}</span>
                      <span className="text-slate-300 font-bold block text-xs font-mono mt-0.5">{hours} hr/wk</span>
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-200">{lang === 'my' ? 'ဤသင်တန်းမှုပုံစံpresetကို ဖောင်တွင် ထည့်သွင်းမလား' : 'Apply custom schedule settings?'}</span>
                    <span className="text-[10px] text-slate-500 block">{lang === 'my' ? 'အောက်ပါ စာရင်းသွင်းတိုင်ပင်လွှာ ဖောင်တွင် အလိုအလျောက် ရေးသားပေးပါဦးမည်။' : 'Fills details directly on the inquiry desk below.'}</span>
                  </div>
                  <button
                    onClick={() => {
                      const msgInput = lang === 'my' 
                        ? `ဆရာမိုးရှင့်၊ တစ်ဦးချင်း ${size === 'one-on-one' ? '1-on-1 Personalized' : 'group'} စာသင်ပြကွက်ကို ${format === 'online' ? 'Online' : 'In-Person'} နည်းစနစ်ဖြင့် တစ်ပတ်လျှင် ${hours} နာရီခန့်သင်ကြားလိုပါသည်။`
                        : `Hi Teacher Moe. I want to inquire about a ${size === 'one-on-one' ? '1-on-1 target' : 'group scale'} session plan delivered ${format === 'online' ? 'Online' : 'In-Person'}, focusing on approximately ${hours} hours weekly.`;
                      setInquiryMessage(msgInput);
                      const target = document.getElementById('contact');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                      triggerToast(lang === 'my' ? 'Invoice Preset အချက်အလက်ဖောင်ကို ဖြည့်သွင်းပေးလိုက်ပါပြီ။' : 'Invoice preset applied to consultation form!');
                    }}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 px-5 py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider transition-all shadow-md shadow-teal-500/10 shrink-0 cursor-pointer"
                  >
                    {t.btnApplyPreset}
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Unified Booking Portal */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.04),transparent_40%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Contact direct nodes */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs text-teal-400 font-extrabold uppercase tracking-widest block">{t.contactBadge}</span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
                    {t.contactTitle}
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    {t.enrollSub}
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <div className="flex gap-4 p-4.5 bg-slate-900/40 rounded-2xl border border-slate-850/60 items-center transition-colors hover:border-slate-800">
                    <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
                      <Mail className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold block">{t.emailLabel}</span>
                      <span className="text-slate-100 font-bold block text-xs sm:text-sm mt-0.5 select-all">moekotun88@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4.5 bg-slate-900/40 rounded-2xl border border-slate-850/60 items-center transition-colors hover:border-slate-800">
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold block">{t.viberLabel}</span>
                      <span className="text-slate-100 font-bold block text-xs sm:text-sm mt-0.5 select-all">
                        +95 9 45000 7861 / +95 9 77800 7761
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4.5 bg-slate-900/40 rounded-2xl border border-slate-850/60 items-center transition-colors hover:border-slate-800">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold block">{t.availLabel}</span>
                      <span className="text-slate-200 font-bold block text-xs mt-0.5">{t.availHours}</span>
                    </div>
                  </div>

                </div>

                {/* Master eligibility credential badge from the second page of CV */}
                <div className="bg-slate-950/80 border border-slate-900 p-4.5 rounded-2xl text-xs text-slate-500 leading-relaxed">
                  <span className="text-slate-450 font-bold text-xs flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.recommendationBadge}</span>
                  </span>
                  <p className="font-light leading-relaxed text-[11px]">{t.recommendationDesc}</p>
                </div>

              </div>

              {/* Inquiry Interactive Form layout */}
              <div className="lg:col-span-12 xl:col-span-7 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-800">
                
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 uppercase tracking-widest font-extrabold block">{t.formName}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. John Doe / မောင်မင်းခန့်"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-teal-500/40 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 transition-colors focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 uppercase tracking-widest font-extrabold block">{t.formContact}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. +95 940001 / Viber account"
                        value={inquiryContact}
                        onChange={(e) => setInquiryContact(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-teal-500/40 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 transition-colors focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase tracking-widest font-extrabold block">{t.formSubject}</label>
                    <select
                      value={inquirySubject}
                      onChange={(e) => setInquirySubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-teal-500/40 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-300 transition-colors focus:outline-none"
                    >
                      <option>IGCSE Additional Mathematics (0606)</option>
                      <option>Cambridge IGCSE Physics (0625)</option>
                      <option>GCE Advanced Levels (Mathematics & Mechanics)</option>
                      <option>Digital SAT Quantitative Section Training</option>
                      <option>IB Diploma Program Analysis & Approaches</option>
                      <option>Ontario Secondary School Diploma (OSSD) Math</option>
                      <option>Myanmar National Grade 12 Math</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase tracking-widest font-extrabold block">{t.formGoals}</label>
                    <textarea 
                      rows={4}
                      placeholder={lang === 'my' ? 'ကျောင်းသား၏ လက်ရှိအားနည်းချက်ပုံစံများ၊ အဓိကအားဖြည့်လိုသော အခန်းများ သို့မဟုတ် တက်ရောက်လိုသည့်အချိန်ဇယား...' : 'Outline any current problem areas, high-priority chapters, timezone details, or budget limits...'}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-teal-500/40 rounded-xl p-4 text-xs sm:text-sm text-slate-100 transition-colors focus:outline-none resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 transition-colors shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25 cursor-pointer"
                  >
                    {t.formSubmit}
                  </button>

                  <p className="text-[10px] text-center text-slate-500 italic mt-2 leading-tight">
                    {t.confidential}
                  </p>

                </form>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Elegant Footer layout */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs select-none">
              ∑
            </div>
            <div>
              <span className="font-bold text-slate-300 uppercase tracking-wider block">{t.footerTitle}</span>
              <p className="text-[10px] text-slate-500 mt-0.5">{t.footerCopy}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-slate-400 text-[9px] uppercase font-bold tracking-wider">
            <a href="#home" className="hover:text-teal-400">{t.navHome}</a>
            <a href="#showcase" className="hover:text-teal-400">{t.navShowcase}</a>
            <a href="#curriculum" className="hover:text-teal-400">{t.navCurriculum}</a>
            <a href="#sandbox" className="hover:text-teal-400">{t.navSandbox}</a>
            <a href="#experience" className="hover:text-teal-400">{t.navExperience}</a>
            <a href="#rates" className="hover:text-teal-400">{t.navRates}</a>
          </div>

          <div className="text-[10px] text-slate-500 text-center md:text-right max-w-sm leading-relaxed">
            {t.footerVerified}
          </div>

        </div>
      </footer>

    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
