import { TemplateConfig } from "@yext/pages";

export const config: TemplateConfig = {
  stream: {
    $id: 'stream',
    filter: {
      entityTypes: ['location'],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: ['id', 'uid', 'meta', 'name', 'slug', 'test1'],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ['en'],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

const TestTwo: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
  } = document;

  return (
    <div>
      {name}
    </div>
  );
};

export default TestTwo;
