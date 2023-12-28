export const textFieldStyle = {
  input: {
    display: 'block',
    width: '100%',
    padding: '7px 14px !important',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.53,
    color: '#697a8d',
    backgroundColor: '#fff',
    border: '1px solid #d9dee3',
    appearance: 'none',
    borderRadius: '0.375rem',
    transition: '0.15s ease-in-out',
    '&:focus': {
      // Styles for the focused state
      color: '#697a8d',
      backgroundColor: '#fff',
      borderColor: '#696cff',
      outline: 0,
      boxShadow: '0 0 0.25rem 0.05rem rgba(105, 108, 255, 0.1)',
    },
  },
};
