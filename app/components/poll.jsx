import React from 'react';
import {Link} from 'react-router';

const Poll = (props) => {
  return (
      <tr>
        <td><Link to={"/polls/" + props.id}>{props.title}</Link></td>
      </tr>
  );
};

export default Poll;