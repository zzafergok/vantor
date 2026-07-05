'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/core/button';
import { toast } from '@/components/ui/toast';
import { ComponentPreview } from './component-preview';
import { FoundationList } from './foundation-list';
import type { PublicHomeCopy } from '../types';

export function PublicHomeClient({ copy }: { copy: PublicHomeCopy }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_520px]">
      <div className="space-y-8">
        <div className="space-y-5">
          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-titanium md:text-7xl">
            {copy.hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ash md:text-lg">
            {copy.hero.description}
          </p>
        </div>

        <FoundationList items={copy.foundations} />

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            className="rounded-none font-bold uppercase tracking-widest"
          >
            <Link href="/login">
              {copy.hero.primaryAction}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-none font-bold uppercase tracking-widest"
            onClick={() => toast.success(copy.hero.toastMessage)}
          >
            {copy.hero.secondaryAction}
          </Button>
        </div>
      </div>

      <ComponentPreview copy={copy.preview} />
    </section>
  );
}
