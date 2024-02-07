export const convertZodSchema = (schema: any) => {
  let convertedFormObject: {
    field: string;
    required: boolean;
    type: string;
    list?: { name: string; id: string }[];
    value?: string | number | boolean | null;
  }[] = [];

  Object.keys(schema.shape).forEach((el: any) => {
    const convertZod = schema.shape[el as keyof typeof schema.shape];
    if (el !== 'id' && el !== 'createdAt' && el !== 'updatedAt' && el !== 'isDeleted' && el !== 'createdBy') {
      const type = convertZod._def.typeName.replace('Zod', '')?.toLowerCase();

      const obj = {
        field: el,
        type: type === 'string' ? 'text' : type === 'nullable' ? 'text' : type,
        required: !convertZod.isNullable(),
        list: null,
        value: null,
      };
      convertedFormObject.push(obj as any);
    }
  });

  return convertedFormObject;
};
