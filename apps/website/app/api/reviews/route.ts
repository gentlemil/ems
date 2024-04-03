import db from '@ems/prisma-client';
import { NextResponse } from 'next/server';

type FormValues = {
  author_name: string;
  content: string;
};

export async function POST(request: Request) {
  const data: FormValues = await request.json();

  const review = await db.review.create({
    data: {
      author_name: data.author_name,
      content: data.content,
    },
  });

  return NextResponse.json(review);
}
