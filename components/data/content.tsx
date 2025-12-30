import React from 'react';

export const bookPages = [
    {
        title: "Interworld",
        content: (
            <div className="space-y-6">
                <p className="text-2xl font-semibold text-[#007F5F]">Transforming Vision into Lasting Impact</p>
                <p>We are a purpose-driven institution turning bold ideas into practical solutions that strengthen communities, empower industries, and shape a sustainable future.</p>
                <p>Through innovation, research, and knowledge, we bridge the gap between insight and action.</p>
                <div className="pt-8">
                    <div className="h-40 w-full bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                        <p className="text-[#007F5F] font-serif italic">Bold Ideas. Practical Innovation.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Who We Are",
        content: (
            <div className="space-y-4">
                <p>Interworld is a home of bold ideas, visionary thinking, and practical innovation. We are more than an organisation; we are a movement committed to creating sustainable, measurable, and transformative impact.</p>
                <p>We listen deeply, learn continuously, and work collaboratively with communities, institutions, and industries.</p>
                <p className="font-semibold text-[#007F5F]">Our Identity Pillars:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Innovation</strong> – We think boldly and design with purpose.</li>
                    <li><strong>Research</strong> – Evidence is the foundation of everything we do.</li>
                    <li><strong>Knowledge</strong> – We generate insights that inspire action.</li>
                    <li><strong>Collaboration</strong> – We co-create solutions.</li>
                </ul>
            </div>
        )
    },
    {
        title: "Our Mission & Vision",
        content: (
            <div className="space-y-6">
                <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-[#007F5F]">
                    <h4 className="font-bold text-[#007F5F] mb-2 uppercase text-xs tracking-widest">Our Mission</h4>
                    <p className="text-sm">To empower communities, organisations, and industries by designing innovative, practical, and research-driven solutions that create real and lasting impact.</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-[#007F5F]">
                    <h4 className="font-bold text-[#007F5F] mb-2 uppercase text-xs tracking-widest">Our Vision</h4>
                    <p className="text-sm">A world where knowledge, innovation, and collaboration unite to create sustainable, resilient, and thriving communities. A world where ideas move beyond imagination and become powerful tools for transformation.</p>
                </div>
            </div>
        )
    },
    {
        title: "What We Do",
        content: (
            <div className="space-y-4">
                <p className="text-sm">Eight clean, spacious service areas:</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md text-xs font-semibold">Strategic Consulting</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">Research & Knowledge</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">M&E Systems</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">Proposal Writing</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">Technical Docs</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">Training & Capacity</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">Professional Writing</div>
                    <div className="p-3 border rounded-md text-xs font-semibold">Book Publishing</div>
                </div>
            </div>
        )
    },
    {
        title: "Our Approach",
        content: (
            <div className="space-y-6">
                <div className="flex items-start gap-3">
                    <span className="bg-[#007F5F] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                    <div>
                        <p className="font-bold">Research & Evidence</p>
                        <p className="text-sm">Grounding solutions in rigorous research and data.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-[#007F5F] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                    <div>
                        <p className="font-bold">Creativity & Innovation</p>
                        <p className="text-sm">Designing bold, adaptive solutions for real-world needs.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-[#007F5F] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                    <div>
                        <p className="font-bold">Documentation & Knowledge</p>
                        <p className="text-sm">Producing books and reports that shape conversations.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-[#007F5F] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                    <div>
                        <p className="font-bold">Collaboration</p>
                        <p className="text-sm">Partnering across governments, business, and communities.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Featured Projects",
        content: (
            <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-bold text-[#007F5F]">Supertech</h4>
                    <p className="text-sm">Italian engineered combustion optimization technology reducing fuel use by up to 12% and emissions by up to 80%.</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-bold text-[#007F5F]">Organic Fertilizers</h4>
                    <p className="text-sm">Promoting bio-manufactured organic fertilizers that restore soil health and increase yields.</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-bold text-[#007F5F]">Calcifeed</h4>
                    <p className="text-sm">Advancing circular-economy livestock feed solutions using Black Soldier Fly larvae.</p>
                </div>
            </div>
        )
    },
    {
        title: "Our Partners",
        content: (
            <div className="space-y-6">
                <p>We work with a growing ecosystem committed to turning knowledge into transformation.</p>
                <div className="h-64 w-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center p-8 text-center">
                    <p className="text-gray-400 italic">"Join Us in Transforming the Future. Become part of a movement where ideas are applied with purpose."</p>
                </div>
            </div>
        )
    },
    {
        title: "Contact Us",
        content: (
            <div className="space-y-8">
                <p>Let’s build a future defined by innovation, knowledge, and purposeful action.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-[#007F5F]">📧</span>
                        </div>
                        <p className="text-sm">info@interworld.org</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-[#007F5F]">📞</span>
                        </div>
                        <p className="text-sm">+256 (0) 123 456 789</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-[#007F5F]">📍</span>
                        </div>
                        <p className="text-sm">Kampala, Uganda</p>
                    </div>
                </div>
                <div className="pt-8 text-center">
                    <p className="text-xs text-gray-400">© INTERWORLD - VISION INTO IMPACT</p>
                </div>
            </div>
        )
    }
];
