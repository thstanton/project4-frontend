import { classesAPI } from "../utils/classes-api";

export default function ClassPupilListItem({
  pupil,
  pupilClass,
  setPupilClass,
  showEditClassForm,
}) {
  async function removePupil() {
    try {
      const response = await classesAPI.removePupil(pupilClass.id, pupil.id);
      if (response.status === 202) {
        setPupilClass((prevPupilClass) => ({
          ...prevPupilClass,
          pupils: prevPupilClass.pupils.filter(
            (currentPupil) => currentPupil.id !== pupil.id,
          ),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <tr>
      <td>{pupil.first_name}</td>
      {showEditClassForm && (
        <td>
          <button className="btn btn-warning btn-xs" onClick={() => document.getElementById('remove-pupil-modal').showModal()}>
            Remove from class
          </button>
        </td>
      )}
    </tr>
  );
}
