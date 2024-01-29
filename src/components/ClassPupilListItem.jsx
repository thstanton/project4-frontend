import { Link } from "react-router-dom";
import { classesAPI } from "../utils/classes-api";
import { useState } from "react";

export default function ClassPupilListItem({
  pupil,
  pupilClass,
  setPupilClass,
  showEditClassForm,
}) {
  const [confirmRemove, setConfirmRemove] = useState(false);

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
      <td className="w-60">
        <Link to={`/pupil/${pupil.id}`} className="hover:font-bold">
          {pupil.first_name}
        </Link>
      </td>
      {showEditClassForm &&
        (!confirmRemove ? (
          <td>
            <button
              className="btn btn-warning btn-xs"
              onClick={() => setConfirmRemove(true)}
            >
              Remove from class
            </button>
          </td>
        ) : (
          <td>
            Are you sure?{" "}
            <button className="btn btn-error btn-xs" onClick={removePupil}>
              Confirm
            </button>
            <button
              className="btn btn-xs"
              onClick={() => setConfirmRemove(false)}
            >
              Cancel
            </button>
          </td>
        ))}
    </tr>
  );
}
