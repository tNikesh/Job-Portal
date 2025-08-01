import { CirclePlus } from "lucide-react"
interface Props{
  setShowModal:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}
const AddButton = ({setShowModal}:Props) => {
  return (
    <button onClick={setShowModal} className="w-full h-12 rounded-sm bg-slate-100 text-gray-900 flex justify-center gap-2 items-center">
            <CirclePlus />
            <span>Add Professional Info</span>
    </button>
  )
}

export default AddButton