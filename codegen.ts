import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.NODE_ENV === 'production'
      ? 'https://api-td.glpzghoo.space/graphql'
      : 'http://localhost:4000/graphql',
  documents: 'src/graphql/all.graphql',
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
