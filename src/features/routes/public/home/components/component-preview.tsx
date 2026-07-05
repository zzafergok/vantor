import { Layers3, LayoutGrid, Sparkles } from 'lucide-react';

import { Badge } from '@/components/core/badge';
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
import { Switch } from '@/components/core/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/core/tabs';
import { Textarea } from '@/components/core/textarea';
import type { PublicHomeCopy } from '../types';

export function ComponentPreview({
  copy,
}: {
  copy: PublicHomeCopy['preview'];
}) {
  return (
    <Card className="border-gunmetal bg-obsidian/80 shadow-2xl shadow-black/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="rounded-none border-arcly-blue/30 bg-arcly-blue/10 text-arcly-blue">
            {copy.badge}
          </Badge>
          <Sparkles className="h-4 w-4 text-arcly-blue" />
        </div>
        <CardTitle className="text-xl uppercase tracking-tight">
          {copy.title}
        </CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="controls">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="controls">
              <LayoutGrid className="mr-2 h-3.5 w-3.5" />
              {copy.controlsTab}
            </TabsTrigger>
            <TabsTrigger value="forms">
              <Layers3 className="mr-2 h-3.5 w-3.5" />
              {copy.formsTab}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="controls" className="space-y-4 pt-3">
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Default</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <Button size="sm" variant="destructive">
                Danger
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-sm border border-gunmetal bg-void-black p-3">
              <div>
                <p className="text-sm font-semibold">{copy.baseShellTitle}</p>
                <p className="text-xs text-ash">
                  {copy.baseShellDescription}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </TabsContent>
          <TabsContent value="forms" className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label>{copy.itemNameLabel}</Label>
              <Input placeholder={copy.itemNamePlaceholder} />
            </div>
            <div className="space-y-2">
              <Label>{copy.notesLabel}</Label>
              <Textarea placeholder={copy.notesPlaceholder} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
