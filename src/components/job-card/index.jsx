import "./styles.scss";
import LocationIcon from "../../assets/location.svg";
import { Button } from "..";

const JobCard = ({
  title,
  description,
  location,
  buttonText,
  buttonHandler,
}) => {
  return (
    <div className="jobCard">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="jobCard__actionContainer">
        <div className="jobCard__locationContainer">
          <img src={LocationIcon} alt="L" />
          <p> {location}</p>
        </div>
        <div className="jobCard__buttonContainer">
          {buttonHandler && (
            <Button secondary onClick={buttonHandler}>
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
