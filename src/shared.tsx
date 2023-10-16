import { TemplateConfig } from '@yext/pages';

export const SharedConfig: TemplateConfig = {
  stream: {
    $id: 'stream',
    filter: {
      entityTypes: ['location'],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: ['id', 'uid', 'meta', 'name', 'slug'],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ['en'],
    },
  },
};
