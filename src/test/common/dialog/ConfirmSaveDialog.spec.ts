import { render, fireEvent } from '@testing-library/vue';
import ConfirmDialog from '@/components/common/dialog/ConfirmSaveDialog.vue'; 
import { describe, it, expect } from 'vitest';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

describe('ConfirmDialog.vue', () => {
  const vuetify = createVuetify({ components, directives });

  const renderComponent = (propsData: any) => {
    return render(ConfirmDialog, {
      global: {
        plugins: [vuetify],
      },
      props: propsData,
    });
  };

  it('renders the dialog and checks elements with data-test-id', async () => {
    const { getByTestId, getByText } = renderComponent({ modelValue: true });

    // Verifica que el diálogo se muestra correctamente
    const dialog = getByTestId('confirm-dialog');
    expect(dialog).not.toBeNull();
    expect(document.body.contains(dialog)).toBe(true);

    // Verifica el ícono
    const icon = getByTestId('icon');
    expect(icon).not.toBeNull();
    expect(document.body.contains(icon)).toBe(true);

    // Verifica el título
    const title = getByText('Confirm');
    expect(title).not.toBeNull();
    expect(document.body.contains(title)).toBe(true);

    // Verifica el subtítulo
    const subtitle = getByText('Do you want to save the changes?');
    expect(subtitle).not.toBeNull();
    expect(document.body.contains(subtitle)).toBe(true);

    // Verifica los botones
    const cancelButton = getByTestId('cancel-button');
    const saveButton = getByTestId('save-button');

    expect(cancelButton).not.toBeNull();
    expect(document.body.contains(cancelButton)).toBe(true);

    expect(saveButton).not.toBeNull();
    expect(document.body.contains(saveButton)).toBe(true);

    // Verifica el texto de los botones
    expect(cancelButton.textContent).toBe('Cancel');
    expect(saveButton.textContent).toBe('Save');
  });

  it('emits "close" event when Cancel button is clicked', async () => {
    const { getByTestId, emitted } = renderComponent({ modelValue: true });

    const cancelButton = getByTestId('cancel-button');
    await fireEvent.click(cancelButton);

    // Verifica que el evento "close" ha sido emitido
    expect(emitted()).toHaveProperty('close');

    // Verifica que el diálogo se cierre
    expect(emitted()).toHaveProperty('update:modelValue');
    expect(emitted()['update:modelValue'][0]).toEqual([false]);
  });

  it('emits "confirm" event when Save button is clicked', async () => {
    const { getByTestId, emitted } = renderComponent({ modelValue: true });

    const saveButton = getByTestId('save-button');
    await fireEvent.click(saveButton);

    // Verifica que el evento "confirm" ha sido emitido
    expect(emitted()).toHaveProperty('confirm');

    // Verifica que el diálogo se cierre
    expect(emitted()).toHaveProperty('update:modelValue');
    expect(emitted()['update:modelValue'][0]).toEqual([false]);
  });
});
