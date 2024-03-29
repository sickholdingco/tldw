import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { enterPress } from "../../utils/helperFunctions/enterPress";

interface SearchProps {
  searchInput: string
  setSearchInput: (value: string) => void
  onSubmit: () => void
}

export const Search = ({ searchInput, setSearchInput, onSubmit }: SearchProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="flex w-full items-center justify-start">
      <div className="relative flex w-full flex-grow rounded-md border border-dimmed-600 bg-dimmedBlack py-2">
        <input
          className="h-6 max-h-52 w-full resize-none bg-dimmedBlack bg-transparent p-2 text-sm   focus:outline-none focus:ring-0 focus-visible:ring-0"
          onKeyDown={(e) => enterPress(e, handleSubmit)}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search like on youtube..."
        />
        <button
          className="absolute bottom-1.5 right-1 rounded p-1"
          onClick={handleSubmit}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-dimmed-100 max-md:hidden" />
        </button>
      </div>
    </div>
  );
};
