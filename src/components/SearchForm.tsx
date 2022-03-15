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
      <h3>Enter an existing Github username:</h3>
      <div className="search_container">
        <div className="input_container">
          <input
            className={`search_field ${errorMessage && "show_error"}`}
            type="text"
            {...register}
          />
          {errorMessage && <p className="error_message">{errorMessage} </p>}
        </div>
        <div className="button_container">
          <button>Search</button>
        </div>
      </div>
    </form>
  );
};
