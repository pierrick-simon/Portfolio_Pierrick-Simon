// Renders `text between backticks` as <code>, the rest as plain text.
function InlineCode({ text }) {
  return text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}

export default InlineCode;
