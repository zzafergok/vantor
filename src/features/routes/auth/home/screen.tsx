import { Activity, ArrowRight, Boxes, Clock3 } from 'lucide-react';

import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAuthHomeCopy } from './i18n';
import type { AuthHomeMetric } from './types';

const metricIcons = {
  boxes: Boxes,
  activity: Activity,
  clock: Clock3,
} as const;

export async function AuthHomeScreen() {
  const locale = await getCurrentLocale();
  const copy = getAuthHomeCopy(locale);
  const metrics: AuthHomeMetric[] = copy.metrics.map((metric) => ({
    ...metric,
    icon: metricIcons[metric.icon],
  }));

  return (
    <section className="space-y-8 p-5 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge className="rounded-none border-vantor-blue/30 bg-vantor-blue/10 text-vantor-blue">
            {copy.badge}
          </Badge>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ash">
            {copy.description}
          </p>
        </div>
        <Button className="rounded-none font-bold uppercase tracking-widest">
          {copy.actionLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-gunmetal bg-obsidian">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs uppercase tracking-widest text-ash">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-vantor-blue" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black uppercase tracking-tight">
                {metric.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
