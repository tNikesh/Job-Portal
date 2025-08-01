import { Edit } from "lucide-react"
interface Props{
  setShowModal:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}
const EditButton = ({setShowModal}:Props) => {
  return (
    <button onClick={setShowModal} className="w-full h-12 gap-2 rounded-sm bg-slate-100 text-gray-900 flex justify-center items-center">
            <Edit />
            <span>Edit details</span>
    </button>
  )
}

export default EditButton