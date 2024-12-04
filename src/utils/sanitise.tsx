// Helper function for a basic sanitisation of input
export function sanitiseInput(input: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = input;
  return tempDiv.innerHTML.trim();
}
