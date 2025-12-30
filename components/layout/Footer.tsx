import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-white">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="Interworld Logo"
                                width={180}
                                height={60}
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <p className="text-sm leading-6 text-gray-400">
                            Transforming vision into lasting impact. We are a purpose-driven institution
                            turning bold ideas into practical solutions.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-400 hover:text-[#007F5F]">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-[#007F5F]">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-[#007F5F]">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-[#007F5F]">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 xl:col-span-3 xl:mt-0">
                        <div>
                            <h3 className="text-sm font-bold leading-6 text-royal-green uppercase tracking-[0.2em] mb-8">Organisation</h3>
                            <ul role="list" className="space-y-4">
                                <li><Link href="/about" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/services" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Services</Link></li>
                                <li><Link href="/gallery" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
                                <li><Link href="/projects" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                                <li><Link href="/publications" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Publications</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold leading-6 text-royal-green uppercase tracking-[0.2em] mb-8">Quick Links</h3>
                            <ul role="list" className="space-y-4">
                                <li><Link href="/partners" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Partners</Link></li>
                                <li><Link href="/updates" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Updates</Link></li>
                                <li><Link href="/faq" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link href="/contact" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <h3 className="text-sm font-bold leading-6 text-royal-green uppercase tracking-[0.2em] mb-8">Contact Info</h3>
                            <ul role="list" className="space-y-6">
                                <li className="flex gap-x-4 text-sm leading-6 text-gray-400">
                                    <Mail className="h-5 w-5 text-royal-green shrink-0" />
                                    <span>info@interworld.org</span>
                                </li>
                                <li className="flex gap-x-4 text-sm leading-6 text-gray-400">
                                    <Phone className="h-5 w-5 text-royal-green shrink-0" />
                                    <span>+256 (0) 123 456 789</span>
                                </li>
                                <li className="flex gap-x-4 text-sm leading-6 text-gray-400">
                                    <MapPin className="h-5 w-5 text-royal-green shrink-0" />
                                    <span>Kampala, Uganda</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} Interworld Innovative Development Organisation Limited. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
