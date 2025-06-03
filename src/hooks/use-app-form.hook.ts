'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

export const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
    Switch,
    Checkbox,
    Textarea,
  },
  formComponents: {
    Button,
    Label,
  },
  fieldContext,
  formContext,
});
