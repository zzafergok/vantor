import { Button } from '@/components/core/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { Switch } from '@/components/core/switch';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAuthSettingsCopy } from './i18n';

export async function AuthSettingsScreen() {
  const locale = await getCurrentLocale();
  const copy = getAuthSettingsCopy(locale);

  return (
    <section className="max-w-3xl space-y-6 p-5 md:p-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">
          {copy.title}
        </h1>
        <p className="mt-2 text-sm text-ash">{copy.description}</p>
      </div>
      <Card className="border-gunmetal bg-obsidian">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-widest">
            {copy.cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>{copy.displayNameLabel}</Label>
            <Input placeholder={copy.displayNamePlaceholder} />
          </div>
          <div className="flex items-center justify-between border border-gunmetal bg-void-black p-4">
            <div>
              <p className="text-sm font-semibold">{copy.updatesTitle}</p>
              <p className="text-xs text-ash">{copy.updatesDescription}</p>
            </div>
            <Switch />
          </div>
          <Button className="rounded-none font-bold uppercase tracking-widest">
            {copy.submitLabel}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
