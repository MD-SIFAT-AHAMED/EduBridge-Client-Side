import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import OverviewAdmin from '../OverviewAdmin/OverviewAdmin';

const Overview = () => {

    const {role} = useUserRole();
    return (
        <div>
           {
            role ==="admin" && <OverviewAdmin/>
           }
        </div>
    );
};

export default Overview;