// eslint-disable-next-line import/prefer-default-export
export function showTooltip(field, tooltipMessage) {
  const tooltip = document.createElement('div');
  tooltip.classList.add('error');
  tooltip.textContent = tooltipMessage;
  field.after(tooltip);
}
