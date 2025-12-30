'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'What We Do', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Publications', href: '/publications' },
    { name: 'Updates', href: '/updates' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Close mobile menu on navigation
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    const handleNavClick = useCallback((href: string) => {
        setMobileMenuOpen(false);
        router.push(href);
    }, [router]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 p-4 lg:p-6 flex justify-center pointer-events-none">
            <nav className={`flex w-full max-w-7xl items-center justify-between px-6 py-2 lg:px-10 pointer-events-auto rounded-[2.5rem] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 border border-white/20' : 'bg-[#F5F7F8]/50 backdrop-blur-sm'}`} aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                        <Image
                            src="/logo.png"
                            alt="Interworld Logo"
                            width={200}
                            height={80}
                            className="h-14 lg:h-16 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-[#111111] hover:text-[#007F5F] transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <button
                            type="button"
                            className="-m-1.5 p-1.5"
                            onClick={() => handleNavClick('/')}
                        >
                            <Image
                                src="/logo.png"
                                alt="Interworld Logo"
                                width={120}
                                height={48}
                                className="h-8 lg:h-10 w-auto object-contain"
                            />
                        </button>
                        <button
                            type="button"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-soft-grey text-charcoal-black"
                            onClick={closeMenu}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex-grow flex flex-col justify-center px-8 py-8 overflow-y-auto">
                        <nav className="space-y-4">
                            {navigation.map((item, i) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    className="block w-full text-left text-2xl font-serif font-bold text-charcoal-black hover:text-royal-green transition-colors animate-reveal"
                                    style={{ animationDelay: `${i * 40}ms` }}
                                    onClick={() => handleNavClick(item.href)}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-soft-grey/30 flex flex-col gap-3">
                        <div className="flex flex-col">
                            <p className="text-[10px] font-bold text-elegant-grey uppercase tracking-widest">Connect with us</p>
                            <p className="text-sm font-bold text-charcoal-black">info@interworld.org</p>
                        </div>
                        <Button
                            className="w-full h-12 rounded-xl bg-royal-green hover:bg-royal-green/90 text-white font-bold text-sm shadow-lg shadow-royal-green/10"
                            onClick={() => handleNavClick('/contact')}
                        >
                            Get in Touch
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
