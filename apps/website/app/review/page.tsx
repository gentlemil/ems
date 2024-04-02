import { Header } from '@ems/common-ui';
// import db from '@ems/prisma-client';

export default async function Review() {
  // const reviews = await db.review.findMany({
  //   where: { is_confirmed: true },
  //   orderBy: { created_at: 'desc' },
  // });

  return (
    <div>
      <Header>Reviews</Header>
      {/* <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author_name}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
