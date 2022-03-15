interface SearchFormProps {
  handleSubmit: () => void;
  register: any;
  errorMessage?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  register,
  errorMessage,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter an existing github username to see details</h3>
      <div className="search_container">
        <div className="input_container">
          <input type="text" {...register} />
          {errorMessage && <p className="error_message">{errorMessage} </p>}
        </div>
        <div className="button_container">
          <button>Search</button>
        </div>
      </div>
    </form>
  );
};
