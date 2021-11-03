import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Application from '../../modules/Application';
import NotFound from '../../modules/Application/NotFound';

const Components = {
    Application,
    NotFound
}

export default (props) => {

    const DashboardComp = Components[props.Comp];
    const [loading, setLoading] = useState(false);

    return (
        <Dashboard load={loading}>
            <DashboardComp setLoading={setLoading} />
        </Dashboard>
    )
}