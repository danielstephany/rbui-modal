import { configure } from '@storybook/react';

configure(
  [
    require.context("../src", false, /Intro\.stories\.mdx/),
    require.context("../src", true, /\.stories\.(js|mdx)$/)
  ],
  module
);