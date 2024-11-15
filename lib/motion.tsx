'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const MotionDiv = motion.div;
export const MotionLink = motion(Link);
export const MotionImage = motion(Image);
export const MotionButton = motion(Button);
