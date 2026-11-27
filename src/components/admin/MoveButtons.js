// ↑/↓ buttons for a row in an admin list. `action(direction)` is a Server
// Action already bound to the row, called with -1 (up) or +1 (down).
function MoveButtons({ action, first, last }) {
  return (
    <form className='row-actions'>
      <button formAction={action.bind(null, -1)} disabled={first} aria-label='Monter' title='Monter'>↑</button>
      <button formAction={action.bind(null, 1)} disabled={last} aria-label='Descendre' title='Descendre'>↓</button>
    </form>
  );
}

export default MoveButtons;
