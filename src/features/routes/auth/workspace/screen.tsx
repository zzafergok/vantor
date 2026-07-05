import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAuthWorkspaceCopy } from './i18n';

export async function AuthWorkspaceScreen() {
  const locale = await getCurrentLocale();
  const copy = getAuthWorkspaceCopy(locale);

  return (
    <section className="space-y-6 p-5 md:p-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">
          {copy.title}
        </h1>
        <p className="mt-2 text-sm text-ash">{copy.description}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {copy.lanes.map((lane) => (
          <Card key={lane} className="min-h-72 border-gunmetal bg-obsidian">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest">
                {lane}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border border-gunmetal bg-void-black p-4 text-sm text-ash">
                {copy.placeholder}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
