'use client';

import { Button, Input } from '@ems/common-ui';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
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

  const sendForm: SubmitHandler<FormValues> = async (data) => {
    console.log('submitted data: ', data);
    try {
      await api.post('/api/reviews', data);
      toast.success(
        `Review has been sent successfully. It'll be displayed after approval by the administrator.`
      );
    } catch {
      toast.error(`Something went wrong`);
    }
  };

  return (
    <form onSubmit={handleSubmit(sendForm)}>
      <Input
        label="Name"
        {...register('author_name')}
        error={errors.author_name}
        className="w-1/2"
      />
      <Input label="Review" {...register('content')} error={errors.content} />
      <Button label="Submit" type="submit" />
    </form>
  );
};
