interface SearchFormProps {
  handleSubmit: () => void;
  register: any;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  register,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter an existing github username to see details</h3>
      <div className="search_container">
        <div>
          <input type="text" {...register} />
          <span> </span>
        </div>
        <button>Search</button>
      </div>
    </form>
  );
};
