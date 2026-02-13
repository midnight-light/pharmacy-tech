'use client';

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineSlotRecipe,
} from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { defineConfig } from '@chakra-ui/react';
import {
  dialogAnatomy,
  selectAnatomy,
  tabsAnatomy,
} from '@chakra-ui/react/anatomy';

const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: {
    content: {
      borderRadius: '8px',
    },
  },
});

const dialogSlotRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    content: {
      borderRadius: '15px',
      _dark: {
        bg: 'gray.800',
        borderWidth: '1px',
        borderColor: 'gray.700',
      },
    },
  },
});

const tabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  base: {
    trigger: {
      fontSize: '16px',
      fontWeight: 'medium',
    },
    content: {
      paddingY: '21px !important', // for all TabsContent
    },
  },
  variants: {
    size: {
      md: {
        trigger: {
          fontSize: '14px',
        },
      },
      lg: {
        trigger: {
          fontSize: '16px',
        },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  const customConfig = defineConfig({
    theme: {
      slotRecipes: {
        tabs: tabsSlotRecipe,
        dialog: dialogSlotRecipe,
        select: selectSlotRecipe,
      },
    },
    globalCss: {
      html: {
        colorPalette: 'gray',
      },
      'body [data-scope="tabs"][data-part="trigger"]': {
        fontSize: '16px !important',
        color: '#B0B0B0 !important',
      },
      'body [data-scope="tabs"][data-part="trigger"][data-selected]': {
        color: 'gray.950 !important',
      },
      'body button': {
        fontSize: '16px !important',
        paddingTop: '0.5rem !important',
        paddingBottom: '0.5rem !important',
      },
    },
  });
  const system = createSystem(defaultConfig, {
    ...customConfig,
  });
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
