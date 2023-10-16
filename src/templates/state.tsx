import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import DirectoryStateGrid from "../components/DirectoryStateGrid";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
import Breadcrumbs from "../components/Breadcrumbs";

import { TemplateConfig } from '@yext/pages';

export const config: TemplateConfig = {
  stream: {
    $id: 'stream',
    filter: {
      entityTypes: ['location'],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: ['id', 'uid', 'meta', 'name', 'slug', 'test2'],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ['en'],
    },
  },
};


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    siteDomain,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  return (
    <>
      <PageLayout>
        <Banner
          name={c_addressRegionDisplayName ? c_addressRegionDisplayName : name}
        />
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryStateGrid
            name={
              c_addressRegionDisplayName ? c_addressRegionDisplayName : name
            }
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default State;
