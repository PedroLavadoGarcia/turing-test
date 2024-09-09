import "@testing-library/jest-dom";

import { expect, afterEach, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/vue";
import { config } from '@vue/test-utils'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'


global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Configuración de Vuetify
config.global.plugins = [Vuetify]

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
