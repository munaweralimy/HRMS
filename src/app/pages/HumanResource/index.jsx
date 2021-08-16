import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Policy from '../../modules/HRMS/Policy';

const Components = { 
  Policy, 
};

export default (props) => {

  const [loading, setLoading] = useState(false);
  const HRMSComp = Components[props.Comp];

  return (
    <Dashboard load={loading}>
      <HRMSComp setLoading={setLoading} />
    </Dashboard>
  );
};
