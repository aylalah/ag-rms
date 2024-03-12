export const convertZodSchema = (schema: any) => {
  let convertedFormObject: {
    field: string;
    required: boolean;
    type: string;
    list?: { name: string | number; id: string | number }[];
    value?: string | number | boolean | null;
  }[] = [];

  Object.keys(schema.shape).forEach((el: any) => {
    const convertZod = schema.shape[el as keyof typeof schema.shape];
    if (el !== 'id' && el !== 'createdAt' && el !== 'updatedAt' && el !== 'isDeleted' && el !== 'createdBy') {
      const type =
        convertZod._def?.innerType?._def?.typeName || convertZod._def.typeName.replace('Zod', '')?.toLowerCase();

      const textUpdate = type?.replace('Zod', '').toLowerCase();

      const obj = {
        field: el,
        type: textUpdate?.toLowerCase().includes('string') ? 'text' : type === 'nullable' ? 'text' : textUpdate,
        required: !convertZod.isNullable(),
        list: null,
        value: null,
      };
      convertedFormObject.push(obj as any);
    }
  });

  return convertedFormObject;
};

//splitCamelCase and toTitleCase are helper functions to convert camelCase to Title Case

export const splitCamelCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
