import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // users
  // const admin = await prisma.user.upsert({
  //   where: { email: 'admin@admin.pl' },
  //   update: {},
  //   create: {
  //     email: 'admin@admin.pl',
  //     firstName: 'Milosz',
  //     lastName: 'Admin',
  //     password: 'admin',
  //     role: 'ADMIN',
  //   },
  // });
  // const user = await prisma.user.upsert({
  //   where: { email: 'user@user.pl' },
  //   update: {},
  //   create: {
  //     email: 'user@user.pl',
  //     firstName: 'Milosz',
  //     lastName: 'User',
  //     password: 'user',
  //     role: 'USER',
  //   },
  // });
  // const marek = await prisma.user.upsert({
  //   where: { email: 'marek@mostowiak.pl' },
  //   update: {},
  //   create: {
  //     email: 'marek@mostowiak.pl',
  //     firstName: 'Marek',
  //     lastName: 'Mostowiak',
  //     password: 'mjakmilosc',
  //     role: 'USER',
  //   },
  // });

  // articles
  for (let i = 1; i <= 10; i++) {
    await prisma.article.upsert({
      where: { id: i },
      update: {},
      create: {
        title: `Article ${i}`,
        content: `This is the content of article ${i}.`,
        is_published: i % 2 === 0 ? true : false,
      },
    });
  }

  // reviews
  const firstReview = await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create: {
      content: 'Amazing, fabulous, creative, bold, and interesting. I love it!',
      author_name: 'Murtagh Fitzgibbons',
      is_confirmed: true,
      sentiment: 'POSITIVE',
    },
  });
  const secondReview = await prisma.review.upsert({
    where: { id: 2 },
    update: {},
    create: {
      content:
        'The happiness of your life depends upon the quality of your thoughts.',
      author_name: 'Marcus Aurelius',
      is_confirmed: false,
      sentiment: 'NEUTRAL',
    },
  });
  const thirdReview = await prisma.review.upsert({
    where: { id: 3 },
    update: {},
    create: {
      content: 'I am a big fan of this app. Thanks guys.',
      author_name: 'John Travolta',
      is_confirmed: false,
      sentiment: 'POSITIVE',
    },
  });
  const fourthReview = await prisma.review.upsert({
    where: { id: 4 },
    update: {},
    create: {
      content:
        "Ought we not to ask the media to agree among themselves a voluntary code of conduct, under which they would not say or show anything which could assist the terrorists' morale or their cause while the hijack lasted.",
      author_name: 'Margaret Thatcher',
      is_confirmed: true,
      sentiment: 'NEUTRAL',
    },
  });
  const fifthReview = await prisma.review.upsert({
    where: { id: 5 },
    update: {},
    create: {
      content:
        'I am not the richest, smartest or most talented person in the world, but I succeed because I keep going and going and going.',
      author_name: 'Sylvester Stallone',
      is_confirmed: true,
      sentiment: 'NEUTRAL',
    },
  });
  const sixthReview = await prisma.review.upsert({
    where: { id: 6 },
    update: {},
    create: {
      content: 'Some functionalities do not behave correctly',
      author_name: 'John Doe',
      is_confirmed: true,
      sentiment: 'NEGATIVE',
    },
  });
  const seventhReview = await prisma.review.upsert({
    where: { id: 7 },
    update: {},
    create: {
      content: 'Ok',
      author_name: 'Anonymous',
      is_confirmed: true,
    },
  });

  // console.log({ admin, user, marek });
  console.log({
    firstReview,
    secondReview,
    thirdReview,
    fourthReview,
    fifthReview,
    sixthReview,
    seventhReview,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
