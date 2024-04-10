'use client';

import { useRef, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button, Input, Textarea } from '@ems/common-ui';
import { api } from '../../config/api';

const validationSchema = z.object({
  author_name: z.string().min(1).max(100),
  content: z.string().min(1).max(100),
});

type FormValues = z.infer<typeof validationSchema>;

export const AddReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const sendForm: SubmitHandler<FormValues> = async (data) => {
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }
    try {
      await api.post('/api/reviews', data);
      toast.success(
        `Review has been sent successfully. It'll be displayed after approval by the administrator.`
      );
      startTransition(() => router.push('/review'));
      startTransition(() => router.refresh());
    } catch {
      toast.error(`Something went wrong`);
    }
  };

  return (
    <form onSubmit={handleSubmit(sendForm)}>
      {isPending && <p>Loading...</p>}
      <Input
        label="Name"
        {...register('author_name')}
        error={errors.author_name}
        className="w-1/2"
      />
      <Textarea
        label="Review"
        {...register('content')}
        error={errors.content}
      />
      <Button ref={submitButtonRef} label="Submit" type="submit" />
    </form>
  );
};
