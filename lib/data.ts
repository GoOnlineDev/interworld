import {
    Users,
    Search,
    BarChart4,
    FileText,
    GraduationCap,
    PenTool,
    BookOpen,
    ShieldCheck,
    Award,
    Zap,
    Sprout,
    TrendingUp,
    ScrollText
} from 'lucide-react';
import React from 'react';

export const PILLARS = [
    { title: "Innovation", desc: "We think boldly and design with purpose.", icon: 'Lightbulb' },
    { title: "Research", desc: "Evidence is the foundation of everything we do.", icon: 'Search' },
    { title: "Knowledge", desc: "We generate insights that inspire action.", icon: 'BookOpen' },
    { title: "Collaboration", desc: "We co-create solutions that scale and endure.", icon: 'Users' }
];

export const SERVICES = [
    {
        id: "strategic-consulting",
        slug: "strategic-consulting",
        title: "Strategic Consulting & Advisory",
        shortDesc: "We help institutions navigate complex development challenges through clarity, foresight, and evidence-based strategy.",
        fullDesc: "Our consulting services are designed for impact. We provide deep institutional strengthening and policy guidance that helps organizations thrive in rapidly changing environments. By combining global standards with local insights, we ensure that every strategy is both ambitious and achievable.",
        focus: ["Policy & governance", "Climate resilience", "Gender equality", "Institutional strengthening", "Financial systems", "Urban development"],
        iconName: 'Users'
    },
    {
        id: "research-development",
        slug: "research-development",
        title: "Research & Knowledge Development",
        shortDesc: "We design and deliver rigorous studies, assessments, surveys, and knowledge products that support decision-making.",
        fullDesc: "Evidence is the heartbeat of Interworld. We specialize in gathering primary data, conducting secondary analysis, and synthesizing complex information into actionable knowledge products. Our research informs national policies and international development programs.",
        iconName: 'Search'
    },
    {
        id: "monitoring-evaluation",
        slug: "monitoring-evaluation",
        title: "Monitoring & Evaluation Systems",
        shortDesc: "We create M&E frameworks, tools, dashboards, and learning systems that improve performance and accountability.",
        fullDesc: "We move beyond simple tracking to create learning-oriented evaluation systems. Our frameworks help organizations understand not just what happened, but why, enabling real-time adjustments for maximum impact.",
        iconName: 'BarChart4'
    },
    {
        id: "proposal-writing",
        slug: "proposal-writing",
        title: "Proposal Writing & Grant Support",
        shortDesc: "We transform ideas into compelling, fundable proposals backed by strong logic, strategy, and financial coherence.",
        fullDesc: "We support organizations in resource mobilization by developing high-quality technical proposals. Our approach focuses on theory of change, logical frameworks, and strategic alignment with donor priorities.",
        iconName: 'FileText'
    },
    {
        id: "technical-documentation",
        slug: "technical-documentation",
        title: "Technical Documentation & Compliance",
        shortDesc: "We prepare manuals, regulatory documents, SOPs, and high-standard technical reports aligned to best practices.",
        fullDesc: "Precision and clarity are our benchmarks. We produce technical manuals and compliance documentation that meet international standards, ensuring operational excellence for our partners.",
        iconName: 'ShieldCheck'
    },
    {
        id: "training-capacity",
        slug: "training-capacity",
        title: "Training & Capacity Building",
        shortDesc: "We equip leaders, youth, professionals, and communities with practical skills for transformation and growth.",
        fullDesc: "Our training programs are experiential and impact-driven. We believe in empowering people with the tools they need to lead their own development journey.",
        iconName: 'GraduationCap'
    },
    {
        id: "professional-writing",
        slug: "professional-writing",
        title: "Professional Writing & Editorial Services",
        shortDesc: "We deliver high-quality reports, business plans, and documentation refined to publication-ready standards.",
        fullDesc: "We provide professional editorial support to ensure that your messages are communicated with clarity, authority, and elegance.",
        iconName: 'PenTool'
    },
    {
        id: "book-publishing",
        slug: "book-publishing",
        title: "Book Writing & Publishing",
        shortDesc: "We support authors, leaders, and institutions to turn their ideas and stories into professionally produced books.",
        fullDesc: "Stories have the power to change the world. We offer end-to-end publishing support, from conceptualization and ghostwriting to design and printing.",
        iconName: 'BookOpen'
    },
    {
        id: "academic-mentorship",
        slug: "academic-mentorship",
        title: "Academic Writing & Mentorship",
        shortDesc: "We provide scholarly guidance in thesis development, research analysis, and intellectual development.",
        fullDesc: "We foster the next generation of African scholars by providing rigorous academic mentorship and support for high-impact research.",
        iconName: 'Award'
    }
];

export const PROJECTS = [
    {
        slug: "supertech",
        title: "Supertech Awareness & Promotion",
        shortDesc: "A combustion optimisation technology that reduces fuel use by up to 12% and emissions by up to 80%.",
        fullDesc: "Interworld leads national awareness, marketing, and outreach for Supertech technology. This initiative is critical for reducing the carbon footprint of industrial operations in Uganda while significantly cutting operational costs for businesses. Our work involves technical demonstrations, market mapping, and strategic partnership building.",
        image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80",
        stats: [
            { label: "Fuel Reduction", value: "12%" },
            { label: "Emission Cut", value: "80%" },
            { label: "Industries Reached", value: "50+" }
        ],
        iconName: 'Zap',
        color: "bg-blue-600"
    },
    {
        slug: "organic-fertilizers",
        title: "Organic Fertilizers Sensitisation Initiative",
        shortDesc: "Promoting bio-manufactured organic fertilizers that restore soil health and increase yields.",
        fullDesc: "Through this initiative, we are sensitizing thousands of farmers on the benefits of organic fertilizers over chemical alternatives. Our focus is on soil regeneration, long-term yield stability, and the creation of a sustainable agricultural ecosystem that empowers smallholder farmers.",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80",
        stats: [
            { label: "Farmers Reached", value: "10k+" },
            { label: "Soil Recovery Rate", value: "High" },
            { label: "Yield Increase", value: "25%" }
        ],
        iconName: 'Sprout',
        color: "bg-emerald-600"
    },
    {
        slug: "calcifeed",
        title: "Calcifeed Market Development",
        shortDesc: "Advancing adoption of Black Soldier Fly–based livestock feed that transforms waste into high-value feed.",
        fullDesc: "Calcifeed represents the pinnacle of circular economy in agriculture. We are building the market for protein-rich animal feed derived from Black Soldier Fly larvae. This project effectively turns organic waste into a valuable resource, lowering the cost of livestock production and reducing environmental impact.",
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80",
        stats: [
            { label: "Protien Content", value: "45%" },
            { label: "Waste Processed", value: "500T" },
            { label: "Feed Cost Saving", value: "30%" }
        ],
        iconName: 'TrendingUp',
        color: "bg-amber-600"
    }
];

export const PUBLICATIONS = [
    {
        slug: "future-sustainable-ag",
        title: "The Future of Sustainable Agriculture in Uganda",
        category: "Reports",
        summary: "A comprehensive analysis of current trends and future directions for sustainable farming practices in the region.",
        fullDetails: "This report provides an in-depth look at how climate change, technology, and policy are reshaping agriculture in East Africa. It offers strategic recommendations for NGOs, government bodies, and private investors looking to support the green transition.",
        cover: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80",
        iconName: 'FileText'
    },
    {
        slug: "innovating-for-impact",
        title: "Innovating for Impact: A Guide for Visionaries",
        category: "Books",
        summary: "Turning bold ideas into practical solutions that strengthen communities and empower industries.",
        fullDetails: "Authored by our leadership team, this book is a manifesto for purposeful innovation. It breaks down the Interworld methodology for bridging the gap between imagination and execution, illustrated with real-world case studies from across the continent.",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80",
        iconName: 'BookOpen'
    },
    {
        slug: "climate-resilience-policy",
        title: "Climate Resilience & Policy Framework",
        category: "Policy Briefs",
        summary: "Strategic guidelines for policymakers to enhance climate resilience in urban and rural settings.",
        fullDetails: "This policy brief addresses the urgent need for adaptive urban planning and resilient rural infrastructure. It explores financial mechanisms for climate adaptation and the role of community-led governance.",
        cover: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80",
        iconName: 'ScrollText'
    },
    {
        slug: "circular-economy-bsf",
        title: "Black Soldier Fly: Circular Economy Insights",
        category: "Knowledge Products",
        summary: "Technical documentation on the adoption and benefits of BSF larvae in animal feed production.",
        fullDetails: "A technical guide for entrepreneurs and development practitioners looking to scale BSF-based waste management and feed production systems.",
        cover: "https://images.unsplash.com/photo-1495107336281-19d4f1a415ff?auto=format&fit=crop&q=80",
        iconName: 'GraduationCap'
    }
];

export const UPDATES = [
    {
        slug: "interworld-launches-new-innovation-hub",
        title: "Interworld Launches New Innovation Hub in Kampala",
        category: "News",
        date: "December 20, 2024",
        excerpt: "A new space dedicated to co-creating sustainable solutions for the East African region.",
        content: "We are thrilled to announce the opening of our physical Innovation Hub. This space is designed to bring together researchers, entrepreneurs, and policy makers to design and test practical solutions for the region's most pressing challenges.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
    },
    {
        slug: "scaling-supertech-nationwide",
        title: "Scaling Supertech: Impact Report Published",
        category: "Announcements",
        date: "December 15, 2024",
        excerpt: "New data shows 15% reduction in fuel consumption across 20 pilot industrial sites.",
        content: "Our latest impact report on Supertech technology shows promising results. Industries that participated in the pilot phase have reported significant savings in operational costs and a measurable reduction in emissions.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    }
];

export const GALLERY = [
    {
        id: 1,
        title: "Agricultural Workshop",
        category: "Events",
        image: "https://images.unsplash.com/photo-1590682847055-667732951882?auto=format&fit=crop&q=80",
        description: "Training sessions with local farming communities."
    },
    {
        id: 2,
        title: "Impact Measurement",
        category: "Projects",
        image: "https://images.unsplash.com/photo-1454165833767-0275585b03f8?auto=format&fit=crop&q=80",
        description: "On-site data collection for project evaluation."
    },
    {
        id: 3,
        title: "Innovation Hub Kampala",
        category: "Team",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
        description: "Our core team collaborating at the Kampala hub."
    },
    {
        id: 4,
        title: "Sustainability Seminar",
        category: "Events",
        image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80",
        description: "Sharing insights with regional stakeholders."
    },
    {
        id: 5,
        title: "Community Outreach",
        category: "Projects",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
        description: "Connecting with communities for localized impact."
    },
    {
        id: 6,
        title: "Research Expedition",
        category: "Projects",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
        description: "Field research conducted in rural East Africa."
    }
];

export const FAQS = [
    {
        category: "General",
        items: [
            {
                question: "What does Interworld do?",
                answer: "Interworld is a multi-disciplinary innovation and research agency. We bridge the gap between complex developmental data and practical, scalable solutions in sectors like sustainable agriculture, circular economy, and institutional policy."
            },
            {
                question: "Where are you located?",
                answer: "Our primary innovation hub is located in Kampala, Uganda, but we operate across the East African region through various project sites and partnerships."
            }
        ]
    },
    {
        category: "Services",
        items: [
            {
                question: "How can I partner with Interworld?",
                answer: "We partner with NGOs, government bodies, and private enterprises. You can initiate a conversation through our Contact page to discuss your project needs or research requirements."
            },
            {
                question: "Do you offer tailored research services?",
                answer: "Yes, we specialize in evidence-based strategy and customized research frameworks designed to address specific institutional or community challenges."
            }
        ]
    },
    {
        category: "Impact",
        items: [
            {
                question: "How do you measure impact?",
                answer: "We use robust Monitoring & Evaluation (M&E) systems that track primary data markers, from emission reductions in industrial sites to yield increases in agricultural communities."
            }
        ]
    }
];
