import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, description },
}) => {
  return (
    <div>
      <h3 class='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> <span>{fieldofstudy}</span>
      </p>
      <p>
        {description && (
          <>
            <strong>Description: </strong> <span>{description}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default ProfileEducation;
