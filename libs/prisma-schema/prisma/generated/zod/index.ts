import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','public_id','first_name','last_name','email','password','role','position','created_at','updated_at']);

export const ReviewScalarFieldEnumSchema = z.enum(['id','public_id','content','author_name','created_at','is_confirmed','sentiment']);

export const ArticleScalarFieldEnumSchema = z.enum(['id','public_id','title','content','created_at','updated_at','is_published','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const SentimentSchema = z.enum(['POSITIVE','NEGATIVE','NEUTRAL']);

export type SentimentType = `${z.infer<typeof SentimentSchema>}`

export const RoleSchema = z.enum(['ADMIN','USER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.number().int(),
  public_id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  position: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
  sentiment: SentimentSchema.nullable(),
  id: z.number().int(),
  public_id: z.string().uuid(),
  content: z.string(),
  author_name: z.string(),
  created_at: z.coerce.date(),
  is_confirmed: z.boolean(),
})

export type Review = z.infer<typeof ReviewSchema>

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.number().int(),
  public_id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  is_published: z.boolean(),
  userId: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  articles: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  public_id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  position: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  articles: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REVIEW
//------------------------------------------------------

export const ReviewSelectSchema: z.ZodType<Prisma.ReviewSelect> = z.object({
  id: z.boolean().optional(),
  public_id: z.boolean().optional(),
  content: z.boolean().optional(),
  author_name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  is_confirmed: z.boolean().optional(),
  sentiment: z.boolean().optional(),
}).strict()

// ARTICLE
//------------------------------------------------------

export const ArticleIncludeSchema: z.ZodType<Prisma.ArticleInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ArticleArgsSchema: z.ZodType<Prisma.ArticleDefaultArgs> = z.object({
  select: z.lazy(() => ArticleSelectSchema).optional(),
  include: z.lazy(() => ArticleIncludeSchema).optional(),
}).strict();

export const ArticleSelectSchema: z.ZodType<Prisma.ArticleSelect> = z.object({
  id: z.boolean().optional(),
  public_id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  is_published: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CREATE MANY USER AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyUserAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyUserAndReturnOutputTypeSelect> = z.object({
  id: z.boolean().optional(),
  public_id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  position: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// CREATE MANY REVIEW AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyReviewAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyReviewAndReturnOutputTypeSelect> = z.object({
  id: z.boolean().optional(),
  public_id: z.boolean().optional(),
  content: z.boolean().optional(),
  author_name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  is_confirmed: z.boolean().optional(),
  sentiment: z.boolean().optional(),
}).strict()

// CREATE MANY ARTICLE AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyArticleAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyArticleAndReturnOutputTypeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CreateManyArticleAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyArticleAndReturnOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CreateManyArticleAndReturnOutputTypeSelectSchema).optional(),
  include: z.lazy(() => CreateManyArticleAndReturnOutputTypeIncludeSchema).optional(),
}).strict();

export const CreateManyArticleAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyArticleAndReturnOutputTypeSelect> = z.object({
  id: z.boolean().optional(),
  public_id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  is_published: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  articles: z.lazy(() => ArticleOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    public_id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
    public_id: z.string().uuid(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    public_id: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    public_id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewWhereInputSchema: z.ZodType<Prisma.ReviewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_confirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  sentiment: z.union([ z.lazy(() => EnumSentimentNullableFilterSchema),z.lazy(() => SentimentSchema) ]).optional().nullable(),
}).strict();

export const ReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  author_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  is_confirmed: z.lazy(() => SortOrderSchema).optional(),
  sentiment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const ReviewWhereUniqueInputSchema: z.ZodType<Prisma.ReviewWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    public_id: z.string().uuid()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    public_id: z.string().uuid(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_confirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  sentiment: z.union([ z.lazy(() => EnumSentimentNullableFilterSchema),z.lazy(() => SentimentSchema) ]).optional().nullable(),
}).strict());

export const ReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  author_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  is_confirmed: z.lazy(() => SortOrderSchema).optional(),
  sentiment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ReviewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReviewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReviewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReviewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReviewSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  author_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  is_confirmed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  sentiment: z.union([ z.lazy(() => EnumSentimentNullableWithAggregatesFilterSchema),z.lazy(() => SentimentSchema) ]).optional().nullable(),
}).strict();

export const ArticleWhereInputSchema: z.ZodType<Prisma.ArticleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ArticleOrderByWithRelationInputSchema: z.ZodType<Prisma.ArticleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ArticleWhereUniqueInputSchema: z.ZodType<Prisma.ArticleWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    public_id: z.string().uuid()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    public_id: z.string().uuid(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArticleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ArticleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArticleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ArticleSumOrderByAggregateInputSchema).optional()
}).strict();

export const ArticleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ArticleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  is_published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  public_id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  position: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  position: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  articles: z.lazy(() => ArticleUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  articles: z.lazy(() => ArticleUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  articles: z.lazy(() => ArticleUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  position: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z.object({
  public_id: z.string().uuid().optional(),
  content: z.string(),
  author_name: z.string(),
  created_at: z.coerce.date().optional(),
  is_confirmed: z.boolean().optional(),
  sentiment: z.lazy(() => SentimentSchema).optional().nullable()
}).strict();

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  content: z.string(),
  author_name: z.string(),
  created_at: z.coerce.date().optional(),
  is_confirmed: z.boolean().optional(),
  sentiment: z.lazy(() => SentimentSchema).optional().nullable()
}).strict();

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_confirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sentiment: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NullableEnumSentimentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_confirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sentiment: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NullableEnumSentimentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  content: z.string(),
  author_name: z.string(),
  created_at: z.coerce.date().optional(),
  is_confirmed: z.boolean().optional(),
  sentiment: z.lazy(() => SentimentSchema).optional().nullable()
}).strict();

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_confirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sentiment: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NullableEnumSentimentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_confirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sentiment: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NullableEnumSentimentFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ArticleCreateInputSchema: z.ZodType<Prisma.ArticleCreateInput> = z.object({
  public_id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_published: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArticlesInputSchema)
}).strict();

export const ArticleUncheckedCreateInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_published: z.boolean().optional(),
  userId: z.string()
}).strict();

export const ArticleUpdateInputSchema: z.ZodType<Prisma.ArticleUpdateInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional()
}).strict();

export const ArticleUncheckedUpdateInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleCreateManyInputSchema: z.ZodType<Prisma.ArticleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_published: z.boolean().optional(),
  userId: z.string()
}).strict();

export const ArticleUpdateManyMutationInputSchema: z.ZodType<Prisma.ArticleUpdateManyMutationInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ArticleListRelationFilterSchema: z.ZodType<Prisma.ArticleListRelationFilter> = z.object({
  every: z.lazy(() => ArticleWhereInputSchema).optional(),
  some: z.lazy(() => ArticleWhereInputSchema).optional(),
  none: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export const ArticleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ArticleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumSentimentNullableFilterSchema: z.ZodType<Prisma.EnumSentimentNullableFilter> = z.object({
  equals: z.lazy(() => SentimentSchema).optional().nullable(),
  in: z.lazy(() => SentimentSchema).array().optional().nullable(),
  notIn: z.lazy(() => SentimentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NestedEnumSentimentNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  author_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  is_confirmed: z.lazy(() => SortOrderSchema).optional(),
  sentiment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  author_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  is_confirmed: z.lazy(() => SortOrderSchema).optional(),
  sentiment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  author_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  is_confirmed: z.lazy(() => SortOrderSchema).optional(),
  sentiment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumSentimentNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSentimentNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SentimentSchema).optional().nullable(),
  in: z.lazy(() => SentimentSchema).array().optional().nullable(),
  notIn: z.lazy(() => SentimentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NestedEnumSentimentNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSentimentNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSentimentNullableFilterSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ArticleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  public_id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_published: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleSumOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ArticleCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ArticleCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutUserInputSchema),z.lazy(() => ArticleCreateWithoutUserInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ArticleUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutUserInputSchema),z.lazy(() => ArticleCreateWithoutUserInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ArticleUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutUserInputSchema),z.lazy(() => ArticleCreateWithoutUserInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ArticleUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutUserInputSchema),z.lazy(() => ArticleCreateWithoutUserInputSchema).array(),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema),z.lazy(() => ArticleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ArticleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ArticleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ArticleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ArticleWhereUniqueInputSchema),z.lazy(() => ArticleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ArticleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ArticleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ArticleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ArticleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableEnumSentimentFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumSentimentFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SentimentSchema).optional().nullable()
}).strict();

export const UserCreateNestedOneWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArticlesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutArticlesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArticlesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArticlesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArticlesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutArticlesInputSchema),z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSentimentNullableFilterSchema: z.ZodType<Prisma.NestedEnumSentimentNullableFilter> = z.object({
  equals: z.lazy(() => SentimentSchema).optional().nullable(),
  in: z.lazy(() => SentimentSchema).array().optional().nullable(),
  notIn: z.lazy(() => SentimentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NestedEnumSentimentNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumSentimentNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSentimentNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SentimentSchema).optional().nullable(),
  in: z.lazy(() => SentimentSchema).array().optional().nullable(),
  notIn: z.lazy(() => SentimentSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => SentimentSchema),z.lazy(() => NestedEnumSentimentNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSentimentNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSentimentNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ArticleCreateWithoutUserInputSchema: z.ZodType<Prisma.ArticleCreateWithoutUserInput> = z.object({
  public_id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_published: z.boolean().optional()
}).strict();

export const ArticleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_published: z.boolean().optional()
}).strict();

export const ArticleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ArticleCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ArticleCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArticleCreateManyUserInputSchema),z.lazy(() => ArticleCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ArticleUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ArticleUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArticleUpdateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ArticleUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ArticleUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutUserInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ArticleUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateManyMutationInputSchema),z.lazy(() => ArticleUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ArticleScalarWhereInputSchema: z.ZodType<Prisma.ArticleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereInputSchema),z.lazy(() => ArticleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  public_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateWithoutArticlesInput> = z.object({
  public_id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  position: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutArticlesInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  position: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutArticlesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArticlesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]),
}).strict();

export const UserUpsertWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpsertWithoutArticlesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedCreateWithoutArticlesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArticlesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutArticlesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutArticlesInputSchema) ]),
}).strict();

export const UserUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUpdateWithoutArticlesInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutArticlesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutArticlesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleCreateManyUserInputSchema: z.ZodType<Prisma.ArticleCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  public_id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_published: z.boolean().optional()
}).strict();

export const ArticleUpdateWithoutUserInputSchema: z.ZodType<Prisma.ArticleUpdateWithoutUserInput> = z.object({
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ArticleUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  public_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithAggregationInputSchema.array(),ReviewOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewScalarFieldEnumSchema.array(),
  having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ArticleFindFirstArgsSchema: z.ZodType<Prisma.ArticleFindFirstArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindFirstOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleFindManyArgsSchema: z.ZodType<Prisma.ArticleFindManyArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ArticleAggregateArgsSchema: z.ZodType<Prisma.ArticleAggregateArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArticleGroupByArgsSchema: z.ZodType<Prisma.ArticleGroupByArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithAggregationInputSchema.array(),ArticleOrderByWithAggregationInputSchema ]).optional(),
  by: ArticleScalarFieldEnumSchema.array(),
  having: ArticleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ArticleFindUniqueArgsSchema: z.ZodType<Prisma.ArticleFindUniqueArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindUniqueOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserAndReturnCreateManyArgsSchema: z.ZodType<Prisma.UserAndReturnCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  data: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
}).strict() ;

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
  create: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
  update: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewAndReturnCreateManyArgsSchema: z.ZodType<Prisma.ReviewAndReturnCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  data: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> = z.object({
  data: z.union([ ReviewUpdateManyMutationInputSchema,ReviewUncheckedUpdateManyInputSchema ]),
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const ArticleCreateArgsSchema: z.ZodType<Prisma.ArticleCreateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  data: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
}).strict() ;

export const ArticleUpsertArgsSchema: z.ZodType<Prisma.ArticleUpsertArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
  create: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
  update: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
}).strict() ;

export const ArticleCreateManyArgsSchema: z.ZodType<Prisma.ArticleCreateManyArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArticleAndReturnCreateManyArgsSchema: z.ZodType<Prisma.ArticleAndReturnCreateManyArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ArticleDeleteArgsSchema: z.ZodType<Prisma.ArticleDeleteArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleUpdateArgsSchema: z.ZodType<Prisma.ArticleUpdateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  include: ArticleIncludeSchema.optional(),
  data: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
  where: ArticleWhereUniqueInputSchema,
}).strict() ;

export const ArticleUpdateManyArgsSchema: z.ZodType<Prisma.ArticleUpdateManyArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
}).strict() ;

export const ArticleDeleteManyArgsSchema: z.ZodType<Prisma.ArticleDeleteManyArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
}).strict() ;