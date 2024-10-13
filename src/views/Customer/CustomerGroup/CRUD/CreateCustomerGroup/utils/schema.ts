import Validation from '@/utils/Validation';

export const createCustomerGroupSchema = Validation.shape({
  id: Validation.string().optional().nullable().default(null),
  name: Validation.string().optional().nullable().default(null),
  description: Validation.string().optional().nullable().default(null),
  createdAt: Validation.string().optional().nullable().default(null),
});
