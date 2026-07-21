import { Shield } from 'lucide-react';

import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { PublicShell } from '@/features/routes/_shared/layouts';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAdminLoginCopy } from './i18n';

export async function AdminLoginScreen() {
  const locale = await getCurrentLocale();
  const copy = getAdminLoginCopy(locale);

  return (
    <PublicShell>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-5 py-12">
        <Card className="w-full border-gunmetal bg-obsidian">
          <CardHeader>
            <CardTitle className="uppercase tracking-tight">
              {copy.title}
            </CardTitle>
            <CardDescription>{copy.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>{copy.emailLabel}</Label>
              <Input placeholder={copy.emailPlaceholder} type="email" />
            </div>
            <div className="space-y-2">
              <Label>{copy.passwordLabel}</Label>
              <Input placeholder={copy.passwordPlaceholder} type="password" />
            </div>
            <Button className="w-full rounded-none font-bold uppercase tracking-widest">
              <Shield className="mr-2 h-4 w-4" />
              {copy.submitLabel}
            </Button>
          </CardContent>
        </Card>
      </section>
    </PublicShell>
  );
}
