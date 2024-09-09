import { render, fireEvent } from '@testing-library/vue';
import ConfirmDialog from '@/components/common/dialog/ResultDialog.vue'; 
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

  it('renders the dialog and checks elements with data-test-id', () => {
    const { getByTestId } = renderComponent({ modelValue: true, resultTitle: 'Confirm', resultMessage: 'Do you want to save the changes?' });

    // Verifica que el diálogo se muestra correctamente
    const dialog = getByTestId('confirm-dialog');
    expect(dialog).toBeTruthy();

    // Verifica el ícono
    const icon = getByTestId('icon');
    expect(icon).toBeTruthy();

    // Verifica el título
    const title = getByTestId('dialog-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('Confirm');

    // Verifica el subtítulo
    const subtitle = getByTestId('dialog-subtitle');
    expect(subtitle).toBeTruthy();

    // Verifica los botones
    const cancelButton = getByTestId('cancel-button');
    const saveButton = getByTestId('save-button');

    expect(cancelButton).toBeTruthy();
    expect(cancelButton.textContent).toBe('Cancel');

    expect(saveButton).toBeTruthy();
    expect(saveButton.textContent).toBe('Save');
  });

  it('emits "close" event when Cancel button is clicked', async () => {
    const { getByTestId, emitted } = renderComponent({ modelValue: true, resultTitle: 'Confirm', resultMessage: 'Do you want to save the changes?' });

    const cancelButton = getByTestId('cancel-button');
    await fireEvent.click(cancelButton);

    // Verifica que el evento "close" ha sido emitido
    expect(emitted()).toHaveProperty('close');

    // Verifica que el diálogo se cierre
    expect(emitted()).toHaveProperty('update:modelValue');
    expect(emitted()['update:modelValue'][0]).toEqual([false]);
  });

  it('emits "confirm" event when Save button is clicked', async () => {
    const { getByTestId, emitted } = renderComponent({ modelValue: true, resultTitle: 'Confirm', resultMessage: 'Do you want to save the changes?' });

    const saveButton = getByTestId('save-button');
    await fireEvent.click(saveButton);

    // Verifica que el evento "confirm" ha sido emitido
    expect(emitted()).toHaveProperty('confirm');

    // Verifica que el diálogo se cierre
    expect(emitted()).toHaveProperty('update:modelValue');
    expect(emitted()['update:modelValue'][0]).toEqual([false]);
  });
});
