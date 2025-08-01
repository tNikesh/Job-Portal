import { tabOptions } from '@/app/types/candidate/tabOptions'
import Education from './education/Education'
import Experience from './experience/Experience';
import Skills from './skill/Skills';
import { educationHelper } from '@/app/types/candidate/educations';

interface Props {
  activeTab: tabOptions; // 👈 use your custom type here
  educations?:educationHelper[]|null;
}

const ProfileSection = ({activeTab,educations}:Props) => {
  const renderContent=()=>{
    switch(activeTab){
      case "education":
       return <Education />
      case "experience":
        return <Experience/>;
      default:
        return <div>Select a tab</div>;
    }
  }
  return (
    <div className='w-full h-fit p-10 '>
      {renderContent()}
    </div>
  )
}

export default ProfileSection