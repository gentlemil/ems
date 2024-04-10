import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import db from '@ems/prisma-client';

type FormValues = {
  author_name: string;
  content: string;
};

// create a new review
export async function POST(request: Request) {
  const data: FormValues = await request.json();

  const review = await db.review.create({
    data: {
      author_name: data.author_name,
      content: data.content,
    },
  });

  revalidatePath('/reviews', 'page');

  return NextResponse.json(review);
}
// get reviews
export async function GET(request: Request) {
  const reviews = await db.review.findMany({
    where: { is_confirmed: true },
    orderBy: { created_at: 'desc' },
  });

  return NextResponse.json(reviews);
}
