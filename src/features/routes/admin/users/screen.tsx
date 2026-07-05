import { Badge } from '@/components/core/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { getAdminUsersCopy } from './i18n';

export async function AdminUsersScreen() {
  const locale = await getCurrentLocale();
  const copy = getAdminUsersCopy(locale);

  return (
    <section className="space-y-6 p-5 md:p-8">
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
        <CardContent className="space-y-2">
          {copy.users.map((user) => (
            <div
              key={user.name}
              className="grid gap-3 border border-gunmetal bg-void-black p-4 text-sm md:grid-cols-[1fr_120px_100px]"
            >
              <span className="font-semibold text-titanium">{user.name}</span>
              <span className="text-ash">{user.role}</span>
              <Badge
                className="w-fit rounded-none border-arcly-blue/30 bg-arcly-blue/10 text-arcly-blue"
                variant="none"
              >
                {user.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
